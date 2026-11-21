import Container from "@/components/containers";
import Projects from "@/components/projects";
import { getGithubData } from "@/lib/github";

export default async function ProjectsPage() {
  const { stars } = await getGithubData();

  return (
    <Container className="mx-auto min-h-screen px-8 pt-24 md:p-20 md:pb-10">
      <h1 className="font-custom text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
        <span className="link--elara">Projects</span>
      </h1>

      <p className="font-custom2 mt-4 max-w-lg text-sm tracking-tight text-neutral-600 md:text-base dark:text-neutral-400">
        Hi there! I love building software for people. Here is a collection of
        projects focused on backend systems, full-stack engineering, and
        production-grade applications.
      </p>
      <br />
      <div className="border-t border-solid border-(--pattern-fg) opacity-100 dark:opacity-15"></div>

      <Projects showAll={true} stars={stars}></Projects>
    </Container>
  );
}
