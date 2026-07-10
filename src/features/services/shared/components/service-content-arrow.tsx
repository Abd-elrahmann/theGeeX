"use client";

import { useState } from "react";

import { ArrowUpRightIcon } from "@/components/shared/icons/arrow-up-right";
import { AnimatedArrowSwap } from "@/components/shared/animations/animated-arrow-swap";
import { cn } from "@/lib/cn";

interface ServiceContentArrowProps {
  isGridHovered?: boolean;
}

export function ServiceContentArrow({ isGridHovered = false }: ServiceContentArrowProps) {
  const [isArrowHovered, setIsArrowHovered] = useState(false);
  const isHovered = isGridHovered || isArrowHovered;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden p-0",
        "size-(--services-content-arrow-size) transition-colors duration-300",
        isHovered ? "text-(--color-services-content-accent)" : "text-(--color-services-content-arrow)",
      )}
      onMouseEnter={() => {
        setIsArrowHovered(true);
      }}
      onMouseLeave={() => {
        setIsArrowHovered(false);
      }}
    >
      <AnimatedArrowSwap
        icon={ArrowUpRightIcon}
        isHovered={isHovered}
        sizeVar="--services-content-arrow-size"
        sizeFallback={40}
        className="size-(--services-content-arrow-size)"
      />
    </span>
  );
}