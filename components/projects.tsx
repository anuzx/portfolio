"use client";

import { useState, useEffect } from "react";
import type { ComponentType } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FloatingPreview,
  useFloatingPreview,
} from "@/components/hover-preview";
import { Globe, Github, Star, X, Network, Search } from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiThreedotjs,
  SiPrisma,
  SiCloudflare,
  SiLangchain,
  SiNodedotjs,
  SiFramer,
  SiTailwindcss,
  SiBun,
  SiEslint,
  SiRadixui,
  SiChartdotjs,
  SiGithub,
  SiFastapi,
  SiRedis,
  SiCelery,
  SiTldraw,
  SiCss,
  SiPython,
  SiAnthropic,
  SiClaude,
  SiGooglegemini,
  SiMeta,
  SiMongodb,
  SiPostgresql,
  SiApachekafka,
  SiElasticsearch,
  SiDrizzle,
  SiSvelte,
  SiVercel,
  SiCloudinary,
  SiGo,
  SiOpenai,
  SiRust,
  SiWebrtc,
} from "react-icons/si";
type TechIcon = ComponentType<{ className?: string }>;
import { TbPlugConnected } from "react-icons/tb";

type TechKey =
  | "next"
  | "ts"
  | "react"
  | "three"
  | "prisma"
  | "cloud"
  | "langchain"
  | "langgraph"
  | "rag"
  | "node"
  | "motion"
  | "tailwind"
  | "bun"
  | "eslint"
  | "radixui"
  | "charts"
  | "github"
  | "fastapi"
  | "redis"
  | "celery"
  | "tldraw"
  | "css3"
  | "python"
  | "anthropic"
  | "claude"
  | "gemini"
  | "llama"
  | "mongodb"
  | "postgres"
  | "kafka"
  | "elasticsearch"
  | "drizzle"
  | "svelte"
  | "aisdk"
  | "websocket"
  | "cloudinary"
  | "go"
  | "openai"
  | "rust"
  | "webrtc";

type TechItem =
  | TechKey
  | {
      label: string;
      tooltip?: string;
    };

// NEW ------------------------------------------------------------
type Category = "full-stack" | "systems" | "applied ai" | "ml";
type Filter = "all" | Category;
const FILTERS: Filter[] = ["all", "full-stack", "systems", "applied ai", "ml"];
// ----------------------------------------------------------------

interface Project {
  title: string;
  categories: Category[]; // NEW
  src: string;
  lightModeSrc?: string;
  video: string;
  description: string;
  tech: TechItem[];
  github: string;
  live: string;
  starsText?: string;
  backgroundImage?: string;
  status?: "building" | "not-started";
}

const iconMap: Record<TechKey, TechIcon> = {
  next: SiNextdotjs,
  ts: SiTypescript,
  react: SiReact,
  three: SiThreedotjs,
  prisma: SiPrisma,
  cloud: SiCloudflare,
  langchain: SiLangchain,
  langgraph: Network,
  rag: Search,
  node: SiNodedotjs,
  motion: SiFramer,
  tailwind: SiTailwindcss,
  bun: SiBun,
  eslint: SiEslint,
  radixui: SiRadixui,
  charts: SiChartdotjs,
  github: SiGithub,
  fastapi: SiFastapi,
  redis: SiRedis,
  celery: SiCelery,
  tldraw: SiTldraw,
  css3: SiCss,
  python: SiPython,
  anthropic: SiAnthropic,
  claude: SiClaude,
  gemini: SiGooglegemini,
  llama: SiMeta,
  mongodb: SiMongodb,
  postgres: SiPostgresql,
  kafka: SiApachekafka,
  elasticsearch: SiElasticsearch,
  drizzle: SiDrizzle,
  svelte: SiSvelte,
  aisdk: SiVercel,
  websocket: TbPlugConnected,
  cloudinary: SiCloudinary,
  go: SiGo,
  openai: SiOpenai,
  rust: SiRust,
  webrtc: SiWebrtc,
};

const techNames: Record<TechKey, string> = {
  next: "Next.js",
  ts: "TypeScript",
  react: "React",
  three: "Three.js",
  prisma: "Prisma",
  cloud: "Cloudflare",
  langchain: "LangChain",
  langgraph: "LangGraph",
  rag: "RAG (Retrieval-Augmented Generation)",
  node: "Node.js",
  motion: "Framer Motion",
  tailwind: "Tailwind CSS",
  bun: "Bun",
  eslint: "ESLint",
  radixui: "Radix UI (shadcn/ui)",
  charts: "Charts (Recharts)",
  github: "GitHub API (Octokit)",
  fastapi: "FastAPI",
  redis: "Redis",
  celery: "Celery",
  tldraw: "tldraw",
  css3: "CSS3",
  python: "Python",
  anthropic: "Anthropic",
  claude: "Claude",
  gemini: "Gemini",
  llama: "LLaMA",
  mongodb: "MongoDB",
  postgres: "PostgreSQL",
  kafka: "Apache Kafka",
  elasticsearch: "Elasticsearch",
  drizzle: "Drizzle ORM",
  svelte: "svelte",
  aisdk: "Ai SDK",
  websocket: "websocket",
  cloudinary: "Cloudinary",
  go: "go",
  openai: "openai",
  rust: "rust",
  webrtc: "webrtc",
};

const ProjectCard = ({
  project,
  setActiveVideo,
}: {
  project: Project;
  setActiveVideo: (video: string) => void;
}) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const imageSrc =
    mounted && theme === "light" && project.lightModeSrc
      ? project.lightModeSrc
      : project.src;

  // Clean, consistent gradients

  return (
    <motion.div
      className="group relative z-10 rounded-xl border border-neutral-200 bg-white p-3 transition-all duration-300 hover:border-neutral-300 hover:shadow-2xl hover:shadow-neutral-500/5 dark:border-neutral-800 dark:bg-black dark:hover:border-neutral-700"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <div className="flex w-full cursor-pointer flex-col gap-4">
        {/* Image container wrapper - Clean style */}
        <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-[4px] dark:border-neutral-800 dark:bg-neutral-900/50">
          {/* Main Image container */}
          <div className="relative h-[220px] w-full overflow-hidden rounded-[8px] border border-neutral-200 bg-neutral-100 select-none dark:border-neutral-800 dark:bg-neutral-900">
            {/* Ambient Background - Image Style */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${project.backgroundImage || "/image.png"}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              variants={{
                rest: { opacity: 0, scale: 1 },
                hover: { opacity: 1, scale: 1.05 },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/* Title - Subtler slide */}
            <motion.h1
              className="font-custom absolute top-2 left-2 z-30 text-[11px] font-bold tracking-widest text-neutral-500 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] dark:text-neutral-400"
              variants={{
                rest: {
                  left: "0.75rem",
                  top: "0.75rem",
                  x: "0%",
                  color: "var(--neutral-500)",
                  opacity: 0,
                },
                hover: {
                  left: "50%",
                  top: "22%",
                  x: "-50%",
                  color: "#000000",
                  opacity: 1,
                },
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              View Project
            </motion.h1>

            {/* Play Button - Scales up with a nice bounce */}
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
                setActiveVideo(project.video);
              }}
              className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center group-hover:pointer-events-auto"
              variants={{
                rest: { scale: 0.5, opacity: 0 },
                hover: { scale: 1, opacity: 1 },
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.05,
              }}
            >
              <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-110 active:scale-95">
                <svg
                  className="ml-0.5 h-5 w-5 fill-current text-neutral-900"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.25 5.653v12.694c0 .856.926 1.39 1.668.958l11.1-6.347a1.125 1.125 0 000-1.916L6.918 4.695c-.742-.432-1.668.102-1.668.958z" />
                </svg>
              </div>
            </motion.div>

            {/* Floating screenshot - The signature Narsi move */}
            <motion.div
              className="absolute bottom-0 left-1/2 z-20 w-[340px] max-w-[90%] rounded-t-[6px] border-x border-t border-neutral-200 bg-white p-[2px] pb-0 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
              variants={{
                rest: { height: "76%", y: 0, x: "-50%" },
                hover: { height: "70%", y: 4, x: "-50%" }, // floats down/shrinks slightly
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="w-full rounded-t-[4px]">
                <Image
                  src={imageSrc}
                  alt={`${project.title} preview`}
                  width={600}
                  height={400}
                  className="size-full object-cover object-top"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col gap-2 px-1">
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="font-custom truncate text-lg font-bold tracking-wide text-neutral-900 transition-colors duration-300 dark:text-neutral-100">
                {project.title}
              </h3>
              {project.starsText && (
                <span className="font-custom2 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50/80 px-2 py-0.5 text-[10px] font-medium text-neutral-700 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-200">
                  <Star
                    size={12}
                    fill="currentColor"
                    className="text-amber-500/90 dark:text-amber-400"
                  />
                  <span>{project.starsText}</span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {project.live && (
                <Globe
                  size={16}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.live, "_blank");
                  }}
                  className="cursor-pointer text-neutral-700 opacity-50 transition hover:opacity-100 dark:text-neutral-300"
                />
              )}
              <Github
                size={16}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.github, "_blank");
                }}
                className="cursor-pointer text-neutral-700 opacity-50 transition hover:opacity-100 dark:text-neutral-300"
              />
            </div>
          </div>

          <p className="font-custom2 line-clamp-2 h-10 text-sm text-neutral-600 transition-colors duration-300 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-200">
            {project.description}
          </p>

          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap gap-3">
              {project.tech.map((item) => {
                const key = typeof item === "string" ? item : item.label;
                const isIconItem = typeof item === "string";
                const tooltipText = isIconItem
                  ? techNames[item]
                  : item.tooltip || item.label;
                const uniqueId = `${project.title}-${key}`;

                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => setHoveredTech(uniqueId)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    {isIconItem ? (
                      (() => {
                        const TechIcon = iconMap[item];
                        return (
                          <TechIcon className="h-4 w-4 text-neutral-400 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100" />
                        );
                      })()
                    ) : (
                      <span className="font-custom2 rounded border border-neutral-200 px-1.5 py-0.5 text-[9px] leading-none text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                        {item.label}
                      </span>
                    )}
                    <AnimatePresence>
                      {hoveredTech === uniqueId && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="pointer-events-none absolute -top-8 left-1/2 z-50 -translate-x-1/2"
                        >
                          <div className="font-custom2 rounded bg-neutral-900 px-2 py-0.5 text-[10px] whitespace-nowrap text-neutral-100 shadow-xl dark:bg-neutral-100 dark:text-neutral-900">
                            {tooltipText}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {(() => {
              const isNotStarted = project.status === "not-started";
              const isBuilding = project.status === "building";

              const dotColor = isNotStarted
                ? "bg-neutral-400"
                : isBuilding
                  ? "bg-red-500"
                  : "bg-emerald-500";

              const label = isNotStarted
                ? "Not Started Yet"
                : isBuilding
                  ? "Building"
                  : "All Systems Operational";

              return (
                <span className="font-custom2 inline-flex shrink-0 items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-medium text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-200">
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full ${dotColor} animate-[statusDotPulse_2.6s_ease-in-out_infinite] motion-reduce:animate-none`}
                    />
                    <span
                      className={`relative inline-flex h-2 w-2 rounded-full ${dotColor}`}
                    />
                  </span>
                  {label}
                </span>
              );
            })()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectListItem = ({
  project,
  idx,
  active,
  onActivate,
}: {
  project: Project;
  idx: number;
  active: boolean;
  onActivate: () => void;
}) => {
  const href = project.live || project.github;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-preview-row=""
      onMouseEnter={onActivate}
      className={`group relative -mx-2 grid grid-cols-[2rem_1fr] gap-x-3 rounded-lg px-2 py-3 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 sm:grid-cols-[2.5rem_1fr] sm:gap-x-4 ${
        active
          ? "bg-neutral-200/80 dark:bg-neutral-900/60"
          : "hover:bg-neutral-200/80 dark:hover:bg-neutral-900/60"
      }`}
    >
      <span
        className={`font-custom2 pt-0.5 text-xs tabular-nums transition-colors ${
          active
            ? "text-neutral-600 dark:text-neutral-400"
            : "text-neutral-400 dark:text-neutral-500"
        }`}
      >
        {String(idx + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-custom2 text-sm font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
            {project.title}
            <span className="ml-1 inline-block text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-neutral-500">
              ↗
            </span>
          </h3>
          <span className="font-custom2 text-xs text-neutral-400 dark:text-neutral-500">
            {project.categories.join(" · ")}
          </span>
          {project.status === "building" && (
            <span className="font-custom2 text-[10px] tracking-widest text-red-400 uppercase dark:text-red-400">
              building
            </span>
          )}
          {project.status === "not-started" && (
            <span className="font-custom2 text-[10px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
              not started
            </span>
          )}
        </div>
        <p className="font-custom2 mt-1 line-clamp-2 text-sm leading-6 text-neutral-600 transition-colors group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-300">
          {project.description}
        </p>
        <p className="font-custom2 mt-1.5 text-xs text-neutral-400 dark:text-neutral-500">
          {project.tech
            .map((item) =>
              typeof item === "string" ? techNames[item] : item.label,
            )
            .join(" · ")}
        </p>
      </div>
    </a>
  );
};

const ProjectListSection = ({ items }: { items: Project[] }) => {
  const {
    mounted,
    listRef,
    activeIdx,
    setHoveredIdx,
    onMouseMove,
    onMouseLeave,
    previewX,
    previewY,
  } = useFloatingPreview();

  const active =
    activeIdx !== null
      ? { title: items[activeIdx].title, image: items[activeIdx].src }
      : null;

  return (
    <section aria-labelledby="projects-heading">
      <div className="mb-6 flex items-baseline justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
        <h2
          id="projects-heading"
          className="font-custom2 text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          Projects
        </h2>
        <Link
          href="/projects"
          className="font-custom2 inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          all projects
          <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div
        ref={listRef}
        className="flex flex-col"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {items.map((project, idx) => (
          <ProjectListItem
            key={project.title}
            project={project}
            idx={idx}
            active={activeIdx === idx}
            onActivate={() => setHoveredIdx(idx)}
          />
        ))}
      </div>

      <FloatingPreview
        mounted={mounted}
        previewX={previewX}
        previewY={previewY}
        active={active}
      />
    </section>
  );
};

const Projects = ({
  showAll = false,
  variant = "cards",
}: {
  showAll?: boolean;
  variant?: "cards" | "list";
}) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all"); // NEW

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const projects: Project[] = [
    {
      title: "Repolyzer",
      categories: ["applied ai", "full-stack"],
      src: "/project-image/repolyzer.png",
      lightModeSrc: "/project-image/repolyzer.png",
      video: "",
      description:
        "AI-powered GitHub repository analyzer that builds system architecture, repository knowledge graphs, and intelligent summaries, enabling context-aware conversations to understand and resolve repository issues",
      tech: ["ts", "next", "redis", "prisma", "postgres"],
      github: "https://github.com/anuzx/Repolyzer",
      live: "https://x.com/0xzdev/status/2086373140142358580",
      backgroundImage: "",
    },
    {
      title: "Grabpic",
      categories: ["applied ai", "full-stack"],
      src: "/project-image/grabpic.png",
      lightModeSrc: "project-image/grabpic.png",
      video: "",
      description:
        "AI-powered event photo retrieval platform where organizers can upload event photos in bulk and attendees can instantly find photos containing them by uploading a selfie",
      tech: ["ts", "react", "python", "postgres", "redis", "cloudinary"],
      github: "https://github.com/anuzx/Grabpic",
      live: "https://grabpic.framer.ai/",
      backgroundImage: "/image copy 4.png",
    },
    {
      title: "Mind Journal",
      categories: ["applied ai", "full-stack"],
      src: "/project-image/mind_journal.png",
      lightModeSrc: "/project-image/mind_journal.png",
      video: "",
      description:
        "AI-powered personal knowledge management system that automatically analyzes videos, documents, images, tweets, and links to generate summaries, tags, and searchable metadata",
      tech: ["react", "ts", "tailwind", "mongodb", "redis", "cloudinary"],
      github: "https://github.com/anuzx/Mind-Journal",
      live: "https://mind-journal-pi.vercel.app/",
      backgroundImage: "",
    },
    {
      title: "zenocode",
      categories: ["applied ai"],
      src: "/project-image/zenocode.png",
      lightModeSrc: "/project-image/zenocode.png",
      video: "",
      description:
        "minimal terminal coding harness that runs bash commands and edits code inside a sandboxed workspace, spawn subagents to explore the codebase and does compaction to maintain context-window",
      tech: ["python", "openai"],
      github: "https://github.com/anuzx/ZenoCode",
      live: "",
      backgroundImage: "/image copy 2.png",
    },
    {
      title: "paracosm",
      categories: ["full-stack"],
      src: "/project-image/paracosm.jpeg",
      lightModeSrc: "/project-image/paracosm.jpeg",
      video: "",
      description:
        "2d imaginary world, where people can create spaces, elements, choose their character, talk to each other and roam around",
      tech: ["ts", "webrtc", "go", "react", "drizzle", "postgres"],
      github: "https://github.com/anuzx/paracosm",
      live: "",
      backgroundImage: "/image copy.png",
    },
    {
      title: "prepioz",
      categories: ["applied ai", "full-stack"],
      src: "/coming_soon.jpg",
      lightModeSrc: "/coming_soon.jpg",
      video: "",
      description:
        "interview preparation platform where people can come and submit their resume and github id and a voice agent will take their mock interview and give them a score",
      tech: ["python", "postgres", "react"],
      github: "https://github.com/anuzx/interview_agent",
      live: "",
      backgroundImage: "/image copy 2.png",
      status: "building",
    },
    {
      title: "beru",
      categories: ["applied ai", "full-stack"],
      src: "/coming_soon.jpg",
      lightModeSrc: "/coming_soon.jpg",
      video: "",
      description: "autonomous cloud coding agent",
      tech: ["ts", "redis", "openai", "react", "drizzle"],
      github: "https://github.com/anuzx/beru",
      live: "",
      backgroundImage: "/image copy 3.png",
      status: "building",
    },
    {
      title: "doodle",
      categories: ["full-stack"],
      src: "/project-image/doodle.jpg",
      lightModeSrc: "/project-image/doodle.jpg",
      video: "",
      description:
        "Real-time multiplayer drawing & guessing game (Skribbl.io clone) built with raw WebSockets",
      tech: ["ts", "websocket", "react", "tailwind"],
      github: "https://github.com/anuzx/doodle",
      live: "",
      backgroundImage: "/image copy 2.png",
      status: "building",
    },
    {
      title: "Streamix",
      categories: ["full-stack"],
      src: "/project-image/streamix.jpg",
      lightModeSrc: "/project-image/streamix.jpg",
      video: "",
      description: "video uploading platform with transcoding and hls pipeline",
      tech: ["react", "ts", "mongodb", "redis", "cloudinary", "tailwind"],
      github: "https://github.com/anuzx/Streamix",
      live: "",
      backgroundImage: "/image copy.png",
      status: "building",
    },

    {
      title: "Chess",
      categories: ["full-stack"],
      src: "/project-image/chess.jpg",
      lightModeSrc: "/project-image/chess.jpg",
      video: "",
      description:
        "multiplayer realtime chess with chat and video calling feature",
      tech: ["next", "ts", "tailwind", "prisma", "redis"],
      github: "https://github.com/anuzx/chess",
      live: "",
      backgroundImage: "/image copy 3.png",
      status: "building",
    },
    {
      title: "load balancer",
      categories: ["systems"],
      src: "/project-image/loadbalancer.png",
      lightModeSrc: "/project-image/loadbalancer.png",
      video: "https://x.com/0xzdev/status/2102756997703840221",
      description: "L7 Load Balancer in go using round robin algortihm",
      tech: ["go"],
      github: "https://github.com/anuzx/load_balancer",
      live: "https://x.com/0xzdev/status/2102756997703840221",
      backgroundImage: "/image copy 2.png",
    },
    {
      title: "tcp echo server",
      categories: ["systems"],
      src: "/project-image/tcp.png",
      lightModeSrc: "/project-image/tcp.png",
      video: "https://x.com/0xzdev/status/2109741180162576530",
      description: "server that sends back exactly what the client sends to it",
      tech: ["rust"],
      github: "https://github.com/anuzx/tcp_echo_server",
      live: "https://x.com/0xzdev/status/2109741180162576530",
      backgroundImage: "/image copy 2.png",
    },
    {
      title: "ai-flappy bird",
      categories: ["ml"],
      src: "/project-image/bird.jpg",
      lightModeSrc: "/project-image/bird.jpg",
      video: "",
      description:
        "population of neural networks learns to play Flappy Bird through a genetic algorithm",
      tech: ["ts"],
      github: "https://github.com/anuzx/AI_flappy_bird",
      live: "https://nnflappybird.netlify.app/",
      backgroundImage: "/image copy.png",
    },
    {
      title: "RL snake game",
      categories: ["ml"],
      src: "/project-image/snake.png",
      lightModeSrc: "/project-image/snake.png",
      video: "",
      description:
        "A snake that teaches itself to play Snake Game, trained live in the browser with a Deep Q-Network (DQN)",
      tech: ["ts"],
      github: "https://github.com/anuzx/RL_snake_game",
      live: "https://rl-snakegame.netlify.app/",
      backgroundImage: "/image copy.png",
    },
    {
      title: "cex",
      categories: ["full-stack"],
      src: "/coming_soon.jpg",
      lightModeSrc: "/coming_soon.jpg",
      video: "",
      description: "centralized spot exchange",
      tech: ["ts", "prisma", "postgres", "redis", "websocket", "react"],
      github: "https://github.com/anuzx/cex",
      live: "",
      backgroundImage: "/image copy 3.png",
      status: "building",
    },

    {
      title: "SyncBoard",
      categories: ["full-stack"],
      src: "/coming_soon.jpg",
      lightModeSrc: "/coming_soon.jpg",
      video: "",
      description: "collaborative doodling tool",
      tech: ["next", "ts", "tailwind", "drizzle", "websocket"],
      github: "https://github.com/anuzx/SyncBoard",
      live: "",
      status: "building",
    },
    {
      title: "Pulse Guard",
      categories: ["full-stack"],
      src: "/project-image/pulse.jpeg",
      lightModeSrc: "/project-image/pulse.jpeg",
      video: "",
      description:
        "Real-time log monitoring and intelligent threat detection for modern applications.",
      tech: ["python", "fastapi", "svelte", "kafka"],
      github: "https://github.com/anuzx/Pulse_Guard",
      live: "",
      backgroundImage: "/image copy 2.png",
    },
  ];

  // NEW
  const filtered = projects.filter(
    (p) => filter === "all" || p.categories.includes(filter),
  );

  if (variant === "list") {
    return <ProjectListSection items={projects.slice(0, 5)} />;
  }

  return (
    <div className="mt-8">
      {/* NEW: FILTERS (only on /projects) */}
      {showAll && (
        <div
          className="mt-6 flex flex-wrap gap-x-5 gap-y-1 font-mono text-sm"
          role="group"
          aria-label="Filter projects"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`underline-offset-4 transition-colors ${
                filter === f
                  ? "text-neutral-900 underline dark:text-neutral-50"
                  : "text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-2">
        {(showAll ? filtered : projects.slice(0, 2)).map(
          (
            project,
            idx, // NEW: filtered
          ) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ProjectCard project={project} setActiveVideo={setActiveVideo} />
            </motion.div>
          ),
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90%] max-w-3xl overflow-hidden rounded-xl bg-black shadow-2xl"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 z-50 cursor-pointer rounded-full bg-neutral-800/80 p-2 transition-colors hover:bg-neutral-700"
              >
                <X size={20} className="text-neutral-200" />
              </button>

              {activeVideo.includes("youtube") ? (
                <iframe
                  src={activeVideo}
                  className="aspect-video w-full border-0"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  src={activeVideo}
                  className="h-auto w-full"
                  controls
                  autoPlay
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
