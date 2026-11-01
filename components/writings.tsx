import Link from "next/link";
import { posts } from "@/lib/posts";

const Writings = () => {
  return (
    <section aria-labelledby="writings-heading" className="w-full">
      <div className="mb-6 flex items-baseline justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
        <h2
          id="writings-heading"
          className="font-custom2 text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          Writings
        </h2>
        <Link
          href="/blog"
          className="font-custom2 inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          see all
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="flex flex-col">
        {posts.slice(0, 2).map((post) => (
          <a
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg px-2 py-3 transition-colors duration-200 outline-none hover:bg-neutral-200/80 focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-neutral-900/60"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="font-custom2 text-sm font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                {post.title}
                <span className="ml-1 inline-block text-neutral-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-neutral-500">
                  ↗
                </span>
              </h3>
              <time
                dateTime={post.date}
                className="font-custom2 shrink-0 text-xs text-neutral-400 dark:text-neutral-500"
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </time>
            </div>
            <p className="font-custom2 mt-1 line-clamp-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
              {post.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Writings;
