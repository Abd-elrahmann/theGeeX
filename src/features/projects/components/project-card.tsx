"use client";

import { useState } from "react";
import { motion, type MotionValue, useTransform } from "framer-motion";
import Image from "next/image";

import { cn } from "@/lib/cn";
import { formatIndex } from "@/lib/format-index";

import { ProjectCardArrow } from "@/features/projects/components/project-card-arrow";

import {
  projectsCardExitScaleSpeed,
  projectsFirstCardEnterProgress,
  projectsCardHiddenOffsetY,
  projectsCardParallaxTravel,
  projectsCardRevealOffsetY,
  projectsCardRevealScaleTo,
  projectsCardScaleDepthStep,
  projectsCardSpeedBase,
  projectsCardSpeedStep,
  type ProjectItem,
} from "@/features/projects/constants/projects";

const projectCardIndexClassName = cn(
  "h-auto w-auto whitespace-pre text-left",
  "font-[family-name:var(--font-cal-sans)] font-[var(--projects-card-index-weight)] not-italic",
  "text-[length:var(--projects-card-index-size)] leading-none tracking-[0px]",
  "text-[var(--color-project-card-foreground)] [font-feature-settings:normal]",
);

const projectCardCategoryBadgeClassName = cn(
  "z-[2] flex h-min min-w-0 flex-row flex-wrap items-start justify-end",
  "gap-[var(--projects-card-category-gap)]",
);

const projectCardCategoryTextClassName = cn(
  "block h-auto w-auto max-w-full whitespace-nowrap rounded-[var(--projects-card-category-radius)] px-[var(--projects-card-category-padding-x)] py-[var(--projects-card-category-padding-y)] text-left",
  "bg-[var(--color-project-card-category-bg)]",
  "font-[family-name:var(--font-poppins)] font-[var(--projects-card-category-text-weight)] not-italic",
  "text-[length:var(--projects-card-category-text-size)] leading-[var(--projects-card-category-line-height)]",
  "tracking-[var(--projects-card-category-letter-spacing)]",
  "text-[var(--color-project-card-category-text)] [font-feature-settings:normal]",
);

const projectCardTitleClassName = cn(
  "m-0 min-w-0 flex-1 whitespace-pre-wrap break-words",
  "h-[var(--projects-card-title-height)] font-[family-name:var(--font-cal-sans)]",
  "font-[var(--projects-card-title-weight)] not-italic",
  "text-[length:var(--projects-card-title-size)] leading-[var(--projects-card-title-line-height)]",
  "tracking-[var(--projects-card-title-letter-spacing)]",
  "text-[var(--color-project-card-foreground)] [font-feature-settings:normal]",
);

const projectCardHeaderRowClassName = cn(
  "relative mx-auto flex h-[var(--projects-card-header-height)] w-full max-w-[var(--projects-card-content-max-width)] shrink-0 items-center justify-between",
);

const projectCardSubheaderRowClassName = cn(
  "relative mx-auto mt-[var(--projects-card-subheader-margin-top)] flex w-full max-w-[var(--projects-card-content-max-width)] items-center justify-between gap-3",
);

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  scrollProgress: MotionValue<number>;
  exitProgress: MotionValue<number>;
}

function easeOutCubic(value: number): number {
  return 1 - Math.pow(1 - value, 3);
}

function getCardEnterRange(
  index: number,
  totalCards: number,
): { enterStart: number; enterEnd: number } {
  if (totalCards <= 1) {
    return { enterStart: 0, enterEnd: 1 };
  }

  const firstCardSpan = Math.min(projectsFirstCardEnterProgress, 1);

  if (index === 0) {
    return { enterStart: 0, enterEnd: firstCardSpan };
  }

  const remainingCards = totalCards - 1;
  const remainingSpan = Math.max(1 - firstCardSpan, 0) / remainingCards;
  const enterStart = firstCardSpan + (index - 1) * remainingSpan;

  return {
    enterStart,
    enterEnd: Math.min(enterStart + remainingSpan, 1),
  };
}

function getCardY(
  progress: number,
  index: number,
  enterStart: number,
  enterEnd: number,
  speedFactor: number,
): number {
  const parallaxY = -progress * projectsCardParallaxTravel * speedFactor;

  if (index === 0) {
    if (progress >= enterEnd) {
      return parallaxY;
    }

    const t = easeOutCubic(enterEnd > 0 ? progress / enterEnd : 1);
    return projectsCardRevealOffsetY * (1 - t) + parallaxY;
  }

  if (progress <= enterStart) {
    return projectsCardHiddenOffsetY + parallaxY;
  }

  if (progress >= enterEnd) {
    return parallaxY;
  }

  const t = easeOutCubic((progress - enterStart) / (enterEnd - enterStart));
  return projectsCardHiddenOffsetY * (1 - t) + parallaxY;
}

function getSettledStackScale(progress: number, index: number, totalCards: number): number {
  const baseStackDepth = totalCards > 1 ? 1 : 0;
  let stackDepth = index > 0 ? 1 : baseStackDepth;

  for (let stackedIndex = index + 1; stackedIndex < totalCards; stackedIndex += 1) {
    const { enterStart: stackStart, enterEnd: stackEnd } = getCardEnterRange(
      stackedIndex,
      totalCards,
    );

    if (progress >= stackEnd) {
      stackDepth += 1;
    } else if (progress > stackStart) {
      stackDepth += (progress - stackStart) / (stackEnd - stackStart);
    }
  }

  return Math.max(projectsCardRevealScaleTo, 1 - stackDepth * projectsCardScaleDepthStep);
}

function getStackScale(progress: number, index: number, totalCards: number): number {
  const { enterStart, enterEnd } = getCardEnterRange(index, totalCards);

  if (progress <= enterStart) {
    return 1;
  }

  const settledScale = getSettledStackScale(progress, index, totalCards);

  if (progress < enterEnd) {
    const enterT = easeOutCubic(
      enterEnd > enterStart ? (progress - enterStart) / (enterEnd - enterStart) : 1,
    );

    if (index === 0) {
      return 1 - (1 - settledScale) * enterT;
    }

    const previousScale = getStackScale(progress, index - 1, totalCards);

    return previousScale + (settledScale - previousScale) * enterT;
  }

  return settledScale;
}

function applyExitScaleRecovery(
  scale: number,
  exitProgress: number,
  speedMultiplier = 1,
): number {
  if (exitProgress <= 0) {
    return scale;
  }

  const easedExit = Math.min(exitProgress * projectsCardExitScaleSpeed * speedMultiplier, 1);

  return scale + (1 - scale) * easedExit;
}

function getLastCardScale(
  progress: number,
  index: number,
  totalCards: number,
): number {
  const { enterEnd } = getCardEnterRange(index, totalCards);
  let scale = getStackScale(progress, index, totalCards);

  if (progress >= enterEnd) {
    const tailSpan = Math.max(1 - enterEnd, Number.EPSILON);
    const tailT = (progress - enterEnd) / tailSpan;
    const tailScale = Math.max(
      projectsCardRevealScaleTo,
      1 - tailT * projectsCardScaleDepthStep,
    );

    scale = Math.min(scale, tailScale);
  }

  return scale;
}

function getCardScale(
  progress: number,
  exitProgress: number,
  index: number,
  totalCards: number,
): number {
  const isLastCard = index === totalCards - 1;
  const baseScale = isLastCard
    ? getLastCardScale(progress, index, totalCards)
    : getStackScale(progress, index, totalCards);

  return applyExitScaleRecovery(baseScale, exitProgress, isLastCard ? 1.8 : 1);
}

export function ProjectCard({
  project,
  index,
  totalCards,
  scrollProgress,
  exitProgress,
}: ProjectCardProps) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const { enterStart, enterEnd } = getCardEnterRange(index, totalCards);
  const nextEnterStart =
    index < totalCards - 1 ? getCardEnterRange(index + 1, totalCards).enterStart : 1;
  const speedFactor = projectsCardSpeedBase + index * projectsCardSpeedStep;

  const cardY = useTransform(scrollProgress, (progress) =>
    getCardY(progress, index, enterStart, enterEnd, speedFactor),
  );

  const cardScale = useTransform([scrollProgress, exitProgress], ([progress, exit]) =>
    getCardScale(
      progress as number,
      exit as number,
      index,
      totalCards,
    ),
  );

  return (
    <motion.article
      data-project-card=""
      data-project-cursor-zone=""
      className={cn(
        "pointer-events-auto absolute inset-x-0 top-0 isolate h-[var(--projects-card-height)] w-full min-w-0 origin-top",
        "transform-gpu will-change-transform backface-hidden",
      )}
      style={{
        top: `calc(${index} * var(--projects-card-stack-offset-step))`,
        y: cardY,
        zIndex: `calc(var(--projects-card-stack-z-index) + ${index})`,
      }}
      initial={false}
      onMouseEnter={() => {
        setIsCardHovered(true);
      }}
      onMouseLeave={() => {
        setIsCardHovered(false);
      }}
    >
      <motion.div
        className={cn(
          "flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--projects-card-radius)]",
          "p-[var(--projects-card-padding)] text-[var(--color-project-card-foreground)]",
          "shadow-[var(--projects-card-shadow)] transform-gpu will-change-transform backface-hidden",
        )}
        style={{
          backgroundColor: project.background,
          scale: cardScale,
        }}
      >
        <header className={projectCardHeaderRowClassName}>
          <span className={projectCardIndexClassName}>{formatIndex(index)}</span>
          <span className={projectCardCategoryBadgeClassName}>
            {project.categories.map((category) => (
              <span key={category} className={projectCardCategoryTextClassName}>
                {category}
              </span>
            ))}
        </span>
        </header>

        <span
          aria-hidden="true"
          className="mt-[var(--projects-card-divider-margin-top)] block h-px w-full bg-[var(--color-project-card-divider)]"
        />

        <div className={projectCardSubheaderRowClassName}>
          <h3 className={projectCardTitleClassName}>{project.name}</h3>
          <ProjectCardArrow
            scrollProgress={scrollProgress}
            index={index}
            enterStart={enterStart}
            nextEnterStart={nextEnterStart}
            isCardHovered={isCardHovered}
          />
        </div>

        <div className="relative mt-[var(--projects-card-image-margin-top)] min-h-0 w-full flex-1 overflow-hidden rounded-[var(--projects-card-image-radius)]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={1600}
            height={1200}
            sizes="(min-width: 1024px) min(100vw, 1280px), 100vw"
            loading={index === 0 ? "eager" : undefined}
            priority={index === 0}
            unoptimized
            draggable={false}
            className="block h-full w-full object-cover"
          />
        </div>
      </motion.div>
    </motion.article>
  );
}
