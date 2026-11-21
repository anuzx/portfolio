/**
 * GitHub API helpers.
 *
 * Small, dependency-free wrappers around the public GitHub REST API used to
 * keep things like the profile picture and project star counts in sync with
 * GitHub automatically.
 *
 * Requests are authenticated with `NEXT_PUBLIC_GITHUB_TOKEN` when available
 * (falling back to unauthenticated requests) and cached in-memory for a short
 * while so navigating between pages doesn't burn through the rate limit.
 */

export const GITHUB_USERNAME = "anuzx";

const GITHUB_API = "https://api.github.com";
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

interface CacheEntry<T> {
  value: T;
  expires: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

const readCache = <T>(key: string): T | undefined => {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (entry.expires < Date.now()) {
    cache.delete(key);
    return undefined;
  }
  return entry.value as T;
};

const writeCache = <T>(key: string, value: T) => {
  cache.set(key, { value, expires: Date.now() + CACHE_TTL });
};

const githubHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export interface GithubProfile {
  login: string;
  name: string | null;
  avatarUrl: string;
  htmlUrl: string;
  bio: string | null;
}

/**
 * Fetch a GitHub user's public profile (avatar, name, bio, ...).
 * Returns `null` if the request fails.
 */
export async function fetchGithubProfile(
  username: string = GITHUB_USERNAME,
): Promise<GithubProfile | null> {
  const key = `user:${username}`;
  const cached = readCache<GithubProfile | null>(key);
  if (cached !== undefined) return cached;

  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: githubHeaders(),
    });
    if (!res.ok) throw new Error(`GitHub user request failed (${res.status})`);

    const data = await res.json();
    const profile: GithubProfile = {
      login: data.login,
      name: data.name ?? null,
      avatarUrl: data.avatar_url,
      htmlUrl: data.html_url,
      bio: data.bio ?? null,
    };

    writeCache(key, profile);
    return profile;
  } catch (error) {
    console.error("[github] failed to fetch profile:", error);
    return null;
  }
}

/**
 * Normalize a repo reference to `owner/name`.
 * Accepts a full URL (`https://github.com/owner/name`) or `owner/name`.
 */
export function normalizeRepo(input: string): string | null {
  if (!input) return null;

  try {
    const url = new URL(input);
    if (url.hostname.endsWith("github.com")) {
      const [owner, repo] = url.pathname.split("/").filter(Boolean);
      if (owner && repo) return `${owner}/${repo.replace(/\.git$/, "")}`;
    }
  } catch {
    // Not a URL, fall through to the `owner/name` check below.
  }

  const match = input.match(/^([\w.-]+)\/([\w.-]+)$/);
  if (match) return `${match[1]}/${match[2].replace(/\.git$/, "")}`;

  return null;
}

/** Fetch the number of stargazers for a single repository. */
export async function fetchRepoStars(repo: string): Promise<number> {
  const normalized = normalizeRepo(repo);
  if (!normalized) return 0;

  const key = `stars:${normalized}`;
  const cached = readCache<number>(key);
  if (cached !== undefined) return cached;

  try {
    const res = await fetch(`${GITHUB_API}/repos/${normalized}`, {
      headers: githubHeaders(),
    });
    if (!res.ok) throw new Error(`GitHub repo request failed (${res.status})`);

    const data = await res.json();
    const count =
      typeof data.stargazers_count === "number" ? data.stargazers_count : 0;

    writeCache(key, count);
    return count;
  } catch (error) {
    console.error(`[github] failed to fetch stars for ${normalized}:`, error);
    return 0;
  }
}

/**
 * Fetch stargazer counts for many repositories at once.
 * The returned map is keyed by the original (pre-normalization) inputs so it
 * can be looked up directly with `project.github`.
 */
export async function fetchStarsForRepos(
  repos: string[],
): Promise<Record<string, number>> {
  const unique = Array.from(new Set(repos.filter(Boolean)));

  const entries = await Promise.all(
    unique.map(async (repo) => [repo, await fetchRepoStars(repo)] as const),
  );

  return Object.fromEntries(entries);
}
