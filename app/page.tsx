"use client";

import Container from "@/components/containers";
import Image from "next/image";
import Projects from "@/components/projects";
import Footer from "@/components/footer";
import { ArrowUpRight } from "lucide-react";
import Timeline from "@/components/timeline";
import GithubGraph from "@/components/githubgraph";
import Writings from "@/components/writings";
import Skills from "@/components/skills";

const socials = [
  { name: "GitHub", href: "https://github.com/anuzx" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/anuj-parasar-0a905b360",
  },
  { name: "X", href: "https://x.com/0xzdev" },
  {
    name: "Resume",
    href: "https://drive.google.com/file/d/1bLoDpBItudr6yVcl9LdtrGnp-4pL88gT/view?usp=sharing",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center font-sans">
      <Container className="mx-auto min-h-screen px-8 pt-24 pb-0 md:p-20 md:pb-0">
        <div className="flex items-center gap-4">
          <Image
            src="/pfp.jpg"
            alt="Anuj Parasar"
            width={64}
            height={64}
            priority
            className="h-16 w-16 shrink-0 rounded-full border border-neutral-200 object-cover dark:border-neutral-800"
          />
          <div>
            <h1 className="font-custom text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">
              Anuj Parasar
            </h1>
            <p className="font-custom2 mt-0.5 text-xs tracking-wide text-neutral-500 dark:text-neutral-400">
              backend / ai engineer
            </p>
          </div>
        </div>

        <p className="font-custom2 mt-6 max-w-xl text-base leading-7 text-neutral-800 dark:text-neutral-50">
          I am a pre-final year Computer Science undergraduate focused on{" "}
          <strong className="font-semibold">
            Backend Engineering, Distributed Systems, and Applied AI
          </strong>
          . Experienced in building scalable backend services, fault-tolerant
          systems, and AI-powered applications using modern frameworks and
          infrastructure tools. Passionate about system design, concurrency, and building reliable, production-oriented software.
        </p>
        {/* Socials */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-custom2 group flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs transition-all duration-300 ${
                social.name === "Resume"
                  ? "border-neutral-900 bg-neutral-900 text-neutral-50 hover:bg-neutral-700 dark:border-neutral-100 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                  : "border-neutral-200/70 text-neutral-500 hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
              }`}
            >
              {social.name}
              <ArrowUpRight
                size={12}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-14">
          <Projects variant="list" />
          <Timeline />
          <GithubGraph />
          <Writings />
          <Skills />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
