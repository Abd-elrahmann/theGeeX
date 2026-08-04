import { projects } from "@/features/projects/constants/projects";
import type {
  ServiceFaqsSection,
  ServiceProjectsSection,
} from "@/features/services/constants/services";

export const deliverTransition = {
  type: "spring" as const,
  duration: 0.4,
  bounce: 0.15,
};

export const deliverNumberColor = {
  active: "var(--color-service-detail-text)",
  inactive: "var(--color-service-detail-inactive)",
} as const;

export const deliverTextReveal = {
  initial: {
    opacity: 0,
    y: 32,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    amount: 0.45,
  },
  transition: {
    duration: 0.65,
    ease: "easeInOut" as const,
  },
} as const;

export const faqTextReveal = {
  initial: {
    opacity: 0,
    y: 16,
    filter: "blur(12px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  transition: {
    duration: 0.6,
    type: "spring" as const,
    stiffness: 120,
    damping: 18,
  },
  viewport: {
    once: true,
    amount: 0.5,
  },
} as const;

export function getDeliverableImageOffset(index: number, activeIndex: number): string {
  if (index === activeIndex) {
    return "0%";
  }

  if (index < activeIndex) {
    return "-100%";
  }

  return "100%";
}

export function getSelectedProjects(projectsSection?: ServiceProjectsSection) {
  if (!projectsSection) {
    return [];
  }

  return projects.filter((project) => projectsSection.projectIds.includes(project.id));
}

export function hasFaqs(faqs?: ServiceFaqsSection) {
  return Boolean(faqs && faqs.items.length > 0);
}