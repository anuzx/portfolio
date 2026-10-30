"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";

type TechKey =
  | "next"
  | "ts"
  | "react"
  | "three"
  | "prisma"
  | "cloud"
  | "langchain"
  | "node";

const techNames: Record<TechKey, string> = {
  next: "Next.js",
  ts: "TypeScript",
  react: "React",
  three: "Three.js",
  prisma: "Prisma",
  cloud: "Cloudflare",
  langchain: "LangChain",
  node: "Node.js",
};

type Data = {
  title: string;
  href?: string;
  content: {
    title: string;
    description: string;
    src: string;
    href: string;
    tech?: TechKey[];
    type?: string;
    dates?: string;
    location?: string;
    imageFit?: "contain" | "cover";
    imageZoom?: number;
  }[];
};

export const Timeline = () => {
  // Track which experience is open (by index)
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const data: Data[] = [
    {
      title: "Open Source Contributor",
      href: "https://github.com/",
      content: [
        {
          title: "Open Source Contributor",
          description: `
            Mastered React, Node.js, databases, and deployment technologies
            Contributed to multiple popular open source projects
            Built strong foundation in full-stack development practices
            Participated in code reviews and community discussions actively
          `,
          src: "/Experience-image/pngegg%20(1).png",
          href: "https://github.com/",
          tech: ["react", "node", "ts"],
          dates: "December 2025 - Present",
          location: "Remote",
          imageFit: "contain",
          imageZoom: 1.5,
        },
      ],
    },
  ];

  return (
    <section aria-labelledby="experience-heading" className="font-sans">
      <h2
        id="experience-heading"
        className="mb-6 border-b border-neutral-200 pb-3 text-lg font-medium tracking-tight text-neutral-900 dark:border-neutral-800 dark:text-neutral-100"
      >
        Experience
      </h2>
      <div className="space-y-6">
        {data.map((year, idx) => (
          <div key={year.title}>
            {year.content.map((item, cidx) => {
              const itemIdx = idx * 100 + cidx;
              const isOpen = openIdx === itemIdx;
              const detailsId = `experience-details-${itemIdx}`;

              return (
                <div key={item.title}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={detailsId}
                    onClick={() => setOpenIdx(isOpen ? null : itemIdx)}
                    className="group flex w-full items-start gap-3 rounded-md  text-left outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-4 sm:items-center sm:gap-4 dark:focus-visible:ring-offset-neutral-950"
                  >
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md bg-neutral-50 p-1 ring-1 ring-neutral-200 dark:ring-neutral-800">
                      <Image
                        src={item.src}
                        alt=""
                        width={36}
                        height={36}
                        className={`h-full w-full ${item.imageFit === "contain" ? "object-contain" : "object-cover"}`}
                        style={
                          item.imageZoom
                            ? { transform: `scale(${item.imageZoom})` }
                            : undefined
                        }
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                      <span className="text-sm leading-6 font-medium text-neutral-900 dark:text-neutral-200">
                        {item.title}
                        {item.type && (
                          <span className="ml-2 text-xs font-normal text-neutral-500">
                            {item.type}
                          </span>
                        )}
                      </span>
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-neutral-500 sm:flex-col sm:items-end sm:gap-0">
                        <span>{item.dates}</span>
                        <span>{item.location || "Remote"}</span>
                      </span>
                    </div>
                    <FiChevronDown
                      aria-hidden="true"
                      className={`mt-1 h-4 w-4 shrink-0 text-neutral-400 transition-transform motion-reduce:transition-none sm:mt-0 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    id={detailsId}
                    hidden={!isOpen}
                    className="pt-4 sm:pl-[52px]"
                  >
                    <ul className="list-disc space-y-2 pl-4 text-sm leading-7 text-neutral-600 marker:text-neutral-400 dark:text-neutral-400">
                      {item.description
                        .split("\n")
                        .filter((line) => line.trim())
                        .map((point, i) => (
                          <li key={i}>{point.trim()}</li>
                        ))}
                    </ul>
                    {item.tech && (
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-500">
                        {item.tech.map((key) => (
                          <span key={key}>{techNames[key]}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
