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
  const activationY = Math.min(viewportHeight * 0.35, viewportHeight - 220);
  let activeIndex: number | null = null;

  for (let index = cardElements.length - 1; index >= 0; index -= 1) {
    const cardElement = cardElements[index];

    if (!cardElement) {
      continue;
    }

    const rect = cardElement.getBoundingClientRect();
    const cardCenterY = rect.top + rect.height / 2;

    if (cardCenterY <= activationY) {
      activeIndex = index;
      break;
    }
  }

  return activeIndex;
}