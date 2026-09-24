import Container from "@/components/containers";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Anuj",
  description:
    "Thoughts on software engineering, web development, and technology",
};

const posts = [
  {
    title: "The Journey of Your Input in an LLM",
    description:
      "This article traces the journey of your input through an LLM, from raw text to the final generated response.",
    date: "2026-08-21",
    url: "https://medium.com/@anujparasar1101/the-journey-of-your-input-in-an-llm-9926a92599c1",
  },
  {
    title:
      "A Beginner’s Journey Through the History of AI: From MLPs to Transformers",
    description:
      "This article explains that journey in simple terms, starting from the earliest neural networks and ending with Transformers.",
    date: "2026-07-24",
    url: "https://medium.com/@anujparasar1101/a-beginners-journey-through-the-history-of-ai-from-mlps-to-transformers-382ade1ef76c",
  },
];

export default async function BlogIndex() {
  return (
    <Container className="relative mx-auto min-h-screen px-8 pt-24 md:p-20 md:pb-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-3">
          <h1 className="font-custom text-3xl font-bold tracking-tight text-neutral-900 md:text-3xl dark:text-neutral-50">
            <span className="link--elara">All blogs</span>
          </h1>

          <p className="text-s font-custom2 mt-1 max-w-xl leading-relaxed tracking-tight text-neutral-600 dark:text-neutral-400">
            I write about software engineering, scalable systems, AI, backend
            architecture, and modern web development.
          </p>
        </div>
        <br />
        <div className="border-t border-solid border-(--pattern-fg) opacity-100 dark:opacity-15"></div>
        {/* Blog Posts */}
        <div className="mt-8 flex flex-col gap-4">
          {posts.map((p) => (
            <Link
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-transparent p-5 transition-all duration-300 hover:border-neutral-300/50 hover:bg-white hover:shadow-sm md:p-6 dark:border-neutral-800/50 dark:hover:border-neutral-700/50 dark:hover:bg-neutral-900/40 dark:hover:shadow-none"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between gap-3 md:justify-start">
                    <h2 className="font-custom text-lg font-bold text-neutral-900 transition-colors group-hover:text-neutral-700 md:text-xl dark:text-neutral-100 dark:group-hover:text-neutral-300">
                      {p.title}
                    </h2>

                    {/* Mobile Arrow */}
                    <ArrowRight className="h-4 w-4 -rotate-45 text-neutral-400 md:hidden" />
                  </div>

                  <p className="font-custom2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {p.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-1">
                  <time className="font-custom2 text-xs font-medium tracking-widest whitespace-nowrap text-neutral-400 uppercase dark:text-neutral-500">
                    {new Date(p.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>

                  {/* Desktop Arrow */}
                  <div className="absolute right-6 bottom-4 hidden translate-y-2 items-center gap-1 text-xs font-medium text-neutral-500 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex dark:text-neutral-400">
                    <span>Read on Medium</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
