import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, ProjectCase, projects } from "../../../components/ProjectCase";

export const dynamicParams = false;

// TSK-961 Phase 9: The Office Chef is retired from the public portfolio surface. The
// project data stays in the repo as canonical internal evidence; it is simply no longer
// emitted as a public route. dynamicParams = false means an unlisted slug 404s cleanly.
const RETIRED_PUBLIC_SLUGS = new Set(["office-chef"]);

export function generateStaticParams() {
  return projects
    .filter((project) => !RETIRED_PUBLIC_SLUGS.has(project.slug))
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  const path = `/work/${project?.slug}/`;
  const ogImage = project?.ogImage ?? `/og-${project?.slug}.png`;
  // Retired public slugs are not emitted at all (see generateStaticParams); this guard
  // stays as defence in depth if a concept route is ever re-enabled.
  const conceptOnly = RETIRED_PUBLIC_SLUGS.has(slug);
  return project ? {
    title: `${project.title} — Angel Vergara`,
    description: project.dek,
    alternates: { canonical: path },
    robots: conceptOnly ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      url: path,
      title: `${project.title} — Angel Vergara`,
      description: project.dek,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${project.title} case study by Angel Vergara` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Angel Vergara`,
      description: project.dek,
      images: [ogImage],
    },
  } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectCase project={project} />;
}
