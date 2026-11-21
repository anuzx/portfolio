"use client";

import { useEffect, useState, cloneElement, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { Tooltip } from "react-tooltip";

interface PR {
  id: number;
  title: string;
  url: string;
  repository: {
    nameWithOwner: string;
  };
  state: string;
  createdAt: string;
  mergedAt?: string;
  closedAt?: string;
}

const GithubGraph = () => {
  const { resolvedTheme } = useTheme();
  const [prs, setPrs] = useState<PR[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [filterType, setFilterType] = useState<
    "all" | "merged" | "open" | "closed"
  >("all");
  const [mounted, setMounted] = useState(false);
  const [graphWidth, setGraphWidth] = useState(0);

  const initialCount = 2;

  const graphAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track the available width so the calendar can be sized to fit phones
  // instead of overflowing to the side.
  useEffect(() => {
    if (!mounted) return;
    const area = graphAreaRef.current;
    if (!area) return;
    const updateWidth = () => setGraphWidth(area.clientWidth);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(area);
    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    const fetchPRs = async () => {
      try {
        const searchQuery =
          filterType === "all"
            ? "author:anuzx type:pr"
            : filterType === "merged"
              ? "author:anuzx type:pr is:merged"
              : filterType === "open"
                ? "author:anuzx type:pr is:open"
                : "author:anuzx type:pr is:closed is:unmerged";

        const query = `query {
          search(query: "${searchQuery}", type: ISSUE, first: 12) {
            edges {
              node {
                ... on PullRequest {
                  id
                  title
                  url
                  repository {
                    nameWithOwner
                  }
                  state
                  createdAt
                  mergedAt
                  closedAt
                }
              }
            }
          }
        }`;

        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN || ""}`,
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        if (data.data?.search?.edges) {
          const fetchedPRs = (data.data.search.edges as { node: PR }[]).map(
            (edge) => edge.node,
          );
          // Sort by date (newest first)
          fetchedPRs.sort((a: PR, b: PR) => {
            const dateA = new Date(
              b.mergedAt || b.closedAt || b.createdAt,
            ).getTime();
            const dateB = new Date(
              a.mergedAt || a.closedAt || a.createdAt,
            ).getTime();
            return dateA - dateB;
          });
          setPrs(fetchedPRs);
          setShowAll(false);
        }
      } catch (error) {
        console.error("Failed to fetch PRs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPRs();
  }, [filterType]);

  const isDark = resolvedTheme === "dark";

  // Phones keep a comfortable, readable block size and scroll horizontally so
  // the entire year is reachable. Larger screens size the calendar to fit.
  const isPhone = graphWidth > 0 && graphWidth < 640;
  const blockMargin = isPhone ? 2 : 3;
  const fittedBlockSize = graphWidth
    ? Math.floor((graphWidth - 52 * blockMargin) / 53)
    : 12;
  const blockSize = isPhone
    ? 12
    : Math.max(6, Math.min(14, fittedBlockSize));
  const calendarFontSize = graphWidth < 640 ? 11 : 13;

  // Higher-contrast ramp so every level clearly stands out from the page
  // background (index 0 = empty day).
  const calendarTheme = {
    light: ["#e6e6e6", "#b8b8b8", "#858585", "#4f4f4f", "#171717"],
    dark: ["#2b2b2b", "#4d4d4d", "#7a7a7a", "#ababab", "#ededed"],
  };

  // On phones, start at the most recent contributions instead of a year ago.
  useEffect(() => {
    if (!mounted || !isPhone) return;
    const scroller = graphAreaRef.current?.querySelector<HTMLElement>(
      ".react-activity-calendar__scroll-container",
    );
    if (!scroller) return;
    const frame = requestAnimationFrame(() => {
      scroller.scrollLeft = scroller.scrollWidth;
    });
    return () => cancelAnimationFrame(frame);
  }, [mounted, isPhone, blockSize]);

  return (
    <section aria-labelledby="proof-of-work-heading">
      <h2
        id="proof-of-work-heading"
        className="font-custom2 mb-6 border-b border-neutral-200 pb-3 text-lg font-medium tracking-tight text-neutral-900 dark:border-neutral-800 dark:text-neutral-100"
      >
        Proof of Work
      </h2>
      {/* Graph Component */}
      <div ref={graphAreaRef} className="w-full">
        {mounted && (
          <>
            <GitHubCalendar
              username="anuzx"
              colorScheme={isDark ? "dark" : "light"}
              theme={calendarTheme}
              blockSize={blockSize}
              blockMargin={blockMargin}
              blockRadius={2}
              fontSize={calendarFontSize}
              showWeekdayLabels={false}
              labels={{
                totalCount:
                  "{{count}} contributions in the last year on GitHub.",
              }}
              style={{
                color: isDark ? "#8f8f8f" : "#737373",
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              renderBlock={(block: any, activity: any) =>
                cloneElement(block, {
                  "data-tooltip-id": "github-tooltip",
                  "data-tooltip-content": `${activity.count} contributions on ${activity.date}`,
                })
              }
            />
            <Tooltip
              id="github-tooltip"
              style={{
                backgroundColor: isDark ? "#171717" : "#ffffff",
                color: isDark ? "#e5e5e5" : "#171717",
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "12px",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: isDark ? "1px solid #404040" : "1px solid #e5e5e5",
                opacity: 1,
              }}
            />
          </>
        )}
      </div>
      <div className="mt-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <h3 className="font-custom2 text-xs font-medium tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
              Pull requests
            </h3>
            <div
              className="font-custom2 flex flex-wrap gap-x-3 text-xs"
              role="group"
              aria-label="Filter pull requests"
            >
              {(["all", "merged", "open", "closed"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilterType(f)}
                  aria-pressed={filterType === f}
                  className={`underline-offset-4 transition-colors ${
                    filterType === f
                      ? "text-neutral-900 underline dark:text-neutral-50"
                      : "text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="font-custom2 mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Loading pull requests...
            </div>
          ) : prs.length > 0 ? (
            <div>
              <div className="mt-1 space-y-0.5">
                {prs
                  .slice(0, showAll ? prs.length : initialCount)
                  .map((pr) => (
                    <div
                      key={pr.id}
                      className="group flex items-start gap-3 rounded-md py-2"
                    >
                      <div className="mt-0.5 shrink-0">
                        <div
                          className={`h-1 w-1 rounded-full transition-transform duration-200 group-hover:scale-150 ${
                            pr.state === "MERGED"
                              ? "bg-linear-to-r from-purple-400 to-pink-400"
                              : pr.state === "OPEN"
                                ? "bg-linear-to-r from-green-400 to-emerald-400"
                                : "bg-linear-to-r from-red-400 to-rose-400"
                          }`}
                        ></div>
                      </div>
                      <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-0 flex-1 hover:no-underline"
                      >
                        <h3 className="truncate text-sm font-medium text-neutral-900 transition-colors group-hover:text-neutral-700 dark:text-neutral-50 dark:group-hover:text-neutral-200">
                          {pr.title}
                        </h3>
                        <p className="font-custom2 mt-0.5 text-xs text-neutral-500 dark:text-neutral-500">
                          {pr.repository.nameWithOwner}
                        </p>
                      </a>
                    </div>
                  ))}
              </div>
              {prs.length > initialCount && (
                <div className="mt-2 flex">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="font-custom2 text-xs text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-neutral-100"
                  >
                    {showAll
                      ? "show less"
                      : `${prs.length - initialCount} more`}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-secondary font-custom2 mt-4 text-sm">
              No pull requests found
            </div>
          )}
        </div>
    </section>
  );
};

export default GithubGraph;
