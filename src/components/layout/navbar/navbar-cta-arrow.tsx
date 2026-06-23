"use client";

import { AnimatedArrowSwap } from "@/components/shared/animations/animated-arrow-swap";
import { ArrowUpRightIcon } from "@/components/shared/icons/arrow-up-right";

interface NavbarCtaArrowProps {
  isHovered: boolean;
}

export function NavbarCtaArrow({ isHovered }: NavbarCtaArrowProps) {
  return (
    <AnimatedArrowSwap
      icon={ArrowUpRightIcon}
      isHovered={isHovered}
      sizeVar="--navbar-cta-icon-size"
      sizeFallback={24}
      primaryClassName="text-cta-text"
      hoverClassName="text-brand"
    />
  );
}
