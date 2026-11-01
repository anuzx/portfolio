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
  SiGo,
  SiWebrtc,
  SiElasticsearch,
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
  {name: "Elasticsearch" , icon: SiElasticsearch},
  { name: "Websocket", icon: TbPlugConnected },
  {name: "Web-RTC" , icon: SiWebrtc},
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

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="font-custom2 flex cursor-default items-center gap-1.5 rounded-md border border-neutral-200 px-2.5 py-1 text-xs text-neutral-600 transition-colors duration-200 hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-neutral-200"
          >
            <skill.icon className="h-3.5 w-3.5 shrink-0" />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
