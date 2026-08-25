import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, ProjectCase, projects } from "../../../components/ProjectCase";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  const path = `/work/${project?.slug}/`;
  const ogImage = project?.ogImage ?? `/og-${project?.slug}.png`;
  return project ? {
    title: `${project.title} — Angel Vergara`,
    description: project.dek,
    alternates: { canonical: path },
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
