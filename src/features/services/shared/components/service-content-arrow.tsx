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
        "absolute right-0 bottom-0 block h-(--services-content-arrow-size) w-(--services-content-arrow-size)",
        "overflow-(--overflow-clip-fallback) rounded-none p-0 transition-colors duration-300",
        isHovered ? "text-(--color-services-content-accent)" : "text-(--color-services-content-arrow)",
      )}
      onMouseEnter={() => {
        setIsArrowHovered(true);
      }}
      onMouseLeave={() => {
        setIsArrowHovered(false);
      }}
    >
      <span className="flex h-full w-full items-center justify-center">
        <AnimatedArrowSwap
          icon={ArrowUpRightIcon}
          isHovered={isHovered}
          sizeVar="--services-content-arrow-size"
          sizeFallback={40}
          className="size-(--services-content-arrow-size)"
        />
      </span>
    </span>
  );
}