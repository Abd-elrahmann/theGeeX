import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/features/projects/components/project-detail-page";
import { getProjectBySlug, projects } from "@/features/projects/constants/projects";

interface ProjectRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project | theGeeX",
    };
  }

  return {
    title: `${project.name} | theGeeX`,
    description: project.description,
  };
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}