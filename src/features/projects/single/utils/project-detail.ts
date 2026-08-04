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
  const preferredProjects = projectItems.filter(
    (projectItem) => relatedProjectIds.includes(projectItem.id) && projectItem.id !== project.id,
  );

  if (preferredProjects.length === relatedProjectIds.length) {
    return preferredProjects;
  }

  const fallbackProjects = projectItems.filter(
    (projectItem) =>
      projectItem.id !== project.id && !preferredProjects.some((preferredProject) => preferredProject.id === projectItem.id),
  );

  return [...preferredProjects, ...fallbackProjects].slice(0, relatedProjectIds.length);
}

export function getClosestProcessIndex(
  cardElements: Array<HTMLElement | null>,
  activationY: number,
) {
  let activeIndex: number | null = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  for (let index = 0; index < cardElements.length; index += 1) {
    const cardElement = cardElements[index];

    if (!cardElement) {
      continue;
    }

    const rect = cardElement.getBoundingClientRect();
    const cardCenterY = rect.top + rect.height / 2;
    const distance = Math.abs(cardCenterY - activationY);

    if (distance < closestDistance) {
      closestDistance = distance;
      activeIndex = index;
    }
  }

  return activeIndex;
}