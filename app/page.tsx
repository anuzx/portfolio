"use client";

import Container from "@/components/containers";
import Projects from "@/components/projects";
import { Github, Linkedin, FileText } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Timeline from "@/components/timeline";
import GithubGraph from "@/components/githubgraph";
import Skills from "@/components/skills";

const socials = [
  { name: "GitHub", icon: Github, href: "https://github.com/anuzx" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/anuj-parasar-0a905b360",
  },
  { name: "X", icon: FaXTwitter, href: "https://x.com/0xzdev" },
  {
    name: "Resume",
    icon: FileText,
    href: "https://drive.google.com/file/d/1bLoDpBItudr6yVcl9LdtrGnp-4pL88gT/view?usp=sharing",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen justify-center font-sans">
      <Container className="mx-auto min-h-screen px-8 pt-24 md:p-20 md:pb-10">
        <h1 className="font-custom text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          <span className="link--elara">Anuj Parasar</span>
        </h1>

        <div className="font-custom2 mt-1 text-neutral-700 dark:text-neutral-300">
          <p>Backend &amp; systems engineer, and an avid Linux enthusiast.</p>
          <p>Building applied AI systems and the infrastructure behind them.</p>
          <p>“Focused on building robust backends &amp; resilient systems.”</p>
        </div>
        <br/>
        {/* Socials */}
        <div className="mt-4 flex flex-wrap gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="group relative"
            >
              <social.icon
                size={18}
                className="text-neutral-900 opacity-70 transition group-hover:opacity-100 group-focus-visible:opacity-100 dark:text-neutral-50"
              />
              <span className="font-custom2 pointer-events-none absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 rounded-md bg-neutral-900 px-2 py-1 text-[10px] whitespace-nowrap text-neutral-100 opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-neutral-100 dark:text-neutral-900">
                {social.name}
              </span>
            </a>
          ))}
        </div>

        <div className="my-6 w-auto border-t border-solid border-(--pattern-fg) opacity-100 dark:opacity-15"></div>
        <p className="font-custom2 mt-3 inline-block border border-dashed border-neutral-300 bg-neutral-100 px-4 py-[7px] text-sm text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
          I love building scalable backend systems and production-grade
          applications.
        </p>
        <Projects />

        <div className="my-4 w-auto border-t border-solid border-(--pattern-fg) opacity-100 dark:opacity-15"></div>

        <Timeline />

        <GithubGraph />

        <Skills />
      </Container>
    </div>
  );
}
