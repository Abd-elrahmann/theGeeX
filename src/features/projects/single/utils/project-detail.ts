import type { ProjectItem, ProjectProcessStep } from "@/features/projects/constants/projects";
import { projects as projectItems } from "@/features/projects/constants/projects";

const relatedProjectIds: number[] = [4, 6, 3];
const fallbackProcessSteps =
  projectItems.find((projectItem) => projectItem.slug === "travx")?.processSteps ?? [];

export function getProjectTitle(project: ProjectItem) {
  return project.detailTitle ?? project.name;
}

export function getProjectBreadcrumbLabel(project: ProjectItem) {
  return project.breadcrumbLabel ?? project.name;
}

export function getProjectPrimaryCategory(project: ProjectItem) {
  return project.detailCategory ?? project.categories[0] ?? "Project";
}

export function getProjectProcessSteps(project: ProjectItem): ProjectProcessStep[] {
  return project.processSteps ?? fallbackProcessSteps;
}

export function getRelatedProjects(project: ProjectItem): ProjectItem[] {
  return projectItems.filter(
    (projectItem) => relatedProjectIds.includes(projectItem.id) && projectItem.id !== project.id,
  );
}

export function getClosestProcessIndex(
  cardElements: Array<HTMLElement | null>,
  viewportHeight: number,
) {
  const targetY = Math.min(viewportHeight * 0.42, viewportHeight - 140);
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  cardElements.forEach((cardElement, index) => {
    if (!cardElement) {
      return;
    }

    const rect = cardElement.getBoundingClientRect();
    const cardAnchorY = rect.top + rect.height * 0.35;
    const distance = Math.abs(cardAnchorY - targetY);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}