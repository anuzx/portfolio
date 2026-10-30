"use client";

import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiNextdotjs,
  SiPrisma,
  SiPostgresql,
  SiPython,
  SiVercel,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiExpress,
  SiRedis,
  SiRabbitmq,
  SiApachekafka,
  SiDrizzle,
  SiBun,
  SiCloudinary,
  SiGo
} from "react-icons/si";
import { FaLink, FaAws } from "react-icons/fa";
import { TbPlugConnected } from "react-icons/tb";

const skills = [
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Go", icon: SiGo },
  { name: "Express", icon: SiExpress },
  { name: "Nodejs", icon: SiNodedotjs },
  { name: "Bun", icon: SiBun },
  { name: "Python", icon: SiPython },
  { name: "Langchain", icon: FaLink },
  { name: "Langgraph", icon: FaLink },
  { name: "Postgres", icon: SiPostgresql },
  { name: "Prisma", icon: SiPrisma },
  { name: "Drizzle", icon: SiDrizzle },
  { name: "Redis", icon: SiRedis },
  { name: "Rabbitmq", icon: SiRabbitmq },
  { name: "Bullmq", icon: SiRedis },
  { name: "Kafka", icon: SiApachekafka },
  { name: "Websocket", icon: TbPlugConnected },
  { name: "React", icon: SiReact },
  { name: "NextJs", icon: SiNextdotjs },
  { name: "AWS", icon: FaAws },
  { name: "Docker", icon: SiDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Git", icon: SiGit },
  { name: "Cloudinary", icon: SiCloudinary },
  { name: "Ai SDK", icon: SiVercel },
];

export default function Skills() {
  return (
    <section aria-labelledby="skills-heading" className="w-full">
      <h2
        id="skills-heading"
        className="font-custom2 mb-6 border-b border-neutral-200 pb-3 text-lg font-medium tracking-tight text-neutral-900 dark:border-neutral-800 dark:text-neutral-100"
      >
        Skills
      </h2>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex cursor-default items-center gap-1.5 text-neutral-500 dark:text-neutral-400"
          >
            <skill.icon className="h-4 w-4" />
            <span className="font-custom2 text-xs">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
