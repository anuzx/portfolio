/**
 * Server-side GitHub data (profile + star counts).
 *
 * Why server-side?
 *  - The token stays on the server and is never shipped to the browser.
 *  - A single GraphQL request fetches the avatar AND every repo's star count,
 *    and the result is cached (default 1 hour) so GitHub is hit once per cache
 *    window for ALL visitors instead of once per visitor.
 *
 * GitHub rate limits
 *  (https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
 *  - Unauthenticated REST:  60 requests / hour / IP
 *  - Authenticated REST:    5,000 requests / hour / token
 *  - GraphQL:               5,000 points / hour / token
 *  - `https://github.com/<user>.png` (avatar CDN): no API quota at all
 */

export const GITHUB_USERNAME = "anuzx";

const GITHUB_API = "https://api.github.com";
/** How long a fetched result is reused before GitHub is asked again. */
const REVALIDATE_SECONDS = 60 * 60; // 1 hour

const token =
  process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export interface GithubProfile {
  login: string;
  name: string | null;
  avatarUrl: string;
  htmlUrl: string;
  bio: string | null;
}

export interface GithubData {
  profile: GithubProfile;
  /** Star counts keyed by lowercase `https://github.com/<owner>/<repo>`. */
  stars: Record<string, number>;
}

/**
 * Public avatar CDN. This does not touch the API and therefore never counts
 * against the rate limit — perfect as a fallback.
 */
export const avatarCdnUrl = (username: string = GITHUB_USERNAME, size = 256) =>
  `https://github.com/${username}.png?size=${size}`;

/** Key used to look up a repo's stars: lowercase full GitHub URL. */
export const repoUrlKey = (owner: string, repo: string) =>
  `https://github.com/${owner}/${repo}`.toLowerCase();

const fallback = (): GithubData => ({
  profile: {
    login: GITHUB_USERNAME,
    name: null,
    avatarUrl: avatarCdnUrl(),
    htmlUrl: `https://github.com/${GITHUB_USERNAME}`,
    bio: null,
  },
  stars: {},
});

const authHeaders = (json = false): HeadersInit => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (json) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const cacheOptions = { next: { revalidate: REVALIDATE_SECONDS, tags: ["github"] } };

const PROFILE_QUERY = /* GraphQL */ `
  query ($login: String!) {
    user(login: $login) {
      login
      name
      avatarUrl(size: 256)
      bio
      url
      repositories(
        first: 100
        ownerAffiliations: OWNER
        privacy: PUBLIC
        isFork: false
      ) {
        nodes {
          name
          stargazerCount
        }
      }
    }
  }
`;

interface GraphqlRepository {
  name: string;
  stargazerCount: number;
}

interface GraphqlUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  url: string;
  repositories: { nodes: GraphqlRepository[] };
}

async function fetchViaGraphql(): Promise<GithubData | null> {
  const res = await fetch(`${GITHUB_API}/graphql`, {
    method: "POST",
    headers: authHeaders(true),
    body: JSON.stringify({
      query: PROFILE_QUERY,
      variables: { login: GITHUB_USERNAME },
    }),
    ...cacheOptions,
  });

  if (!res.ok) throw new Error(`GitHub GraphQL request failed (${res.status})`);

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`GitHub GraphQL error: ${JSON.stringify(json.errors)}`);
  }

  const user: GraphqlUser | undefined = json.data?.user;
  if (!user) return null;

  const stars: Record<string, number> = {};
  for (const repo of user.repositories.nodes) {
    stars[repoUrlKey(user.login, repo.name)] = repo.stargazerCount;
  }

  return {
    profile: {
      login: user.login,
      name: user.name,
      avatarUrl: user.avatarUrl,
      htmlUrl: user.url,
      bio: user.bio,
    },
    stars,
  };
}

/** Fallback used when there is no token (or GraphQL is unavailable). */
async function fetchViaRest(): Promise<GithubData> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
      headers: authHeaders(),
      ...cacheOptions,
    }),
    fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`,
      { headers: authHeaders(), ...cacheOptions },
    ),
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error(
      `GitHub REST request failed (${userRes.status}/${reposRes.status})`,
    );
  }

  const user = await userRes.json();
  const repos: { name: string; stargazers_count: number }[] =
    await reposRes.json();

  const stars: Record<string, number> = {};
  for (const repo of repos) {
    stars[repoUrlKey(user.login, repo.name)] = repo.stargazers_count;
  }

  return {
    profile: {
      login: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
      htmlUrl: user.html_url,
      bio: user.bio,
    },
    stars,
  };
}

/**
 * Fetch the profile and every repo's star count. Cached, so callers can use
 * this from any Server Component without worrying about the rate limit.
 */
export async function getGithubData(): Promise<GithubData> {
  if (token) {
    try {
      const data = await fetchViaGraphql();
      if (data) return data;
    } catch (error) {
      console.error(
        "[github] GraphQL fetch failed, falling back to REST:",
        error,
      );
    }
  }

  try {
    return await fetchViaRest();
  } catch (error) {
    console.error("[github] REST fetch failed, using fallback:", error);
    return fallback();
  }
}
