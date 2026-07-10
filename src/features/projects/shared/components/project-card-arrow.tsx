"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

import { AnimatedArrowSwap } from "@/components/shared/animations/animated-arrow-swap";
import { ArrowUpRightIcon } from "@/components/shared/icons/arrow-up-right";
import { cn } from "@/lib/cn";

import { projectsCardArrowScrollAnimationMs } from "@/features/projects/constants/projects";

interface ProjectCardArrowProps {
  scrollProgress: MotionValue<number>;
  index: number;
  enterStart: number;
  nextEnterStart: number;
  isCardHovered: boolean;
}

function shouldTriggerScrollAnimation(
  prev: number,
  progress: number,
  index: number,
  enterStart: number,
  nextEnterStart: number,
): boolean {
  if (index === 0) {
    if (prev <= 0 && progress > 0) {
      return true;
    }
  } else if (prev < enterStart && progress >= enterStart) {
    return true;
  }

  if (nextEnterStart < 1 && prev >= nextEnterStart && progress < nextEnterStart) {
    return true;
  }

  return false;
}

const projectCardArrowClassName = cn(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
  "size-[var(--projects-card-arrow-size)] translate-x-[var(--projects-card-arrow-offset-x)]",
  "text-[var(--color-project-card-foreground)]",
);

export function ProjectCardArrow({
  scrollProgress,
  index,
  enterStart,
  nextEnterStart,
  isCardHovered,
}: ProjectCardArrowProps) {
  const [isScrollAnimating, setIsScrollAnimating] = useState(false);
  const prevProgressRef = useRef(scrollProgress.get());
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerScrollAnimation = () => {
    setIsScrollAnimating(true);

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      setIsScrollAnimating(false);
      animationTimeoutRef.current = null;
    }, projectsCardArrowScrollAnimationMs);
  };

  useLayoutEffect(() => {
    prevProgressRef.current = scrollProgress.get();

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [scrollProgress]);

  useMotionValueEvent(scrollProgress, "change", (progress) => {
    const prev = prevProgressRef.current;

    if (shouldTriggerScrollAnimation(prev, progress, index, enterStart, nextEnterStart)) {
      triggerScrollAnimation();
    }

    prevProgressRef.current = progress;
  });

  const isHovered = isCardHovered || isScrollAnimating;

  return (
    <span aria-hidden="true" className={projectCardArrowClassName}>
      <AnimatedArrowSwap
        icon={ArrowUpRightIcon}
        isHovered={isHovered}
        sizeVar="--projects-card-arrow-size"
        sizeFallback={40}
        primaryClassName="text-[var(--color-project-card-foreground)]"
        hoverClassName="text-[var(--color-project-card-foreground)]"
      />
    </span>
  );
}