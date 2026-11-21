export type Post = {
  title: string;
  description: string;
  date: string;
  url: string;
};

export const posts: Post[] = [
  {
    title: "Vulnerabilities Every Developer Should Know—[Part 1]",
    description:
      "This article explores four critical security vulnerabilities every backend engineer should understand",
    date: "2026-11-5",
    url: "https://medium.com/@anujparasar1101/vulnerabilities-every-developer-should-know-part-1-ef66a083cc34",
  },
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
