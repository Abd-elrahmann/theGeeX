"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectItem } from "@/features/projects/constants/projects";
import { ProjectDetailGallerySection } from "@/features/projects/single/components/project-detail-gallery-section";
import { ProjectDetailHeroSection } from "@/features/projects/single/components/project-detail-hero-section";
import { ProjectDetailProcessSection } from "@/features/projects/single/components/project-detail-process-section";
import { ProjectDetailRelatedProjectsSection } from "@/features/projects/single/components/project-detail-related-projects-section";
import {
  getClosestProcessIndex,
  getProjectBreadcrumbLabel,
  getProjectPrimaryCategory,
  getProjectProcessSteps,
  getProjectTitle,
  getRelatedProjects,
} from "@/features/projects/single/utils/project-detail";

interface ProjectDetailPageProps {
  project: ProjectItem;
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);
  const processCardRefs = useRef<Array<HTMLElement | null>>([]);
  const projectTitle = getProjectTitle(project);
  const breadcrumbLabel = getProjectBreadcrumbLabel(project);
  const primaryCategory = getProjectPrimaryCategory(project);
  const processSteps = getProjectProcessSteps(project);
  const relatedProjects = getRelatedProjects(project);

  useEffect(() => {
    if (!processSteps.length) {
      return;
    }

    let animationFrame = 0;

    const updateActiveProcessIndex = () => {
      animationFrame = 0;
      setActiveProcessIndex(
        getClosestProcessIndex(processCardRefs.current, window.innerHeight),
      );
    };

    const requestUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateActiveProcessIndex);
    };

    updateActiveProcessIndex();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [processSteps.length]);

  return (
    <main className="relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--projects-detail-top-padding)">
      <ProjectDetailHeroSection
        project={project}
        projectTitle={projectTitle}
        breadcrumbLabel={breadcrumbLabel}
        primaryCategory={primaryCategory}
      />
      <ProjectDetailGallerySection project={project} />
      <ProjectDetailProcessSection
        processSteps={processSteps}
        activeProcessIndex={activeProcessIndex}
        processCardRefs={processCardRefs}
      />
      <ProjectDetailRelatedProjectsSection relatedProjects={relatedProjects} />
    </main>
  );
}