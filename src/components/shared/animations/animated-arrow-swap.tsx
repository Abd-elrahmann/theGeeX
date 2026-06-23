"use client";

import { motion } from "framer-motion";
import { type ComponentType } from "react";

import {
  arrowSwapSpringTransition,
  getArrowSwapMotion,
} from "@/components/shared/motion/arrow-swap";
import { cn } from "@/lib/cn";

interface AnimatedArrowSwapProps {
  icon: ComponentType<{ className?: string }>;
  isHovered: boolean;
  sizeVar: string;
  sizeFallback: number;
  primaryClassName?: string;
  hoverClassName?: string;
  className?: string;
}

export function AnimatedArrowSwap({
  icon: Icon,
  isHovered,
  sizeVar,
  sizeFallback,
  primaryClassName,
  hoverClassName,
  className,
}: AnimatedArrowSwapProps) {
  const iconSize = sizeFallback;
  const idleMotion = getArrowSwapMotion(iconSize, false);
  const arrowMotion = getArrowSwapMotion(iconSize, isHovered);
  const iconSizeStyle = {
    ["--animated-arrow-size" as string]: `var(${sizeVar})`,
    width: `var(${sizeVar})`,
    height: `var(${sizeVar})`,
  };

  return (
    <span
      className={cn("relative shrink-0 overflow-hidden", className)}
      style={iconSizeStyle}
    >
      <motion.span
        className={cn("absolute inset-0 will-change-transform", primaryClassName)}
        initial={idleMotion.primary}
        animate={arrowMotion.primary}
        transition={arrowSwapSpringTransition}
      >
        <Icon className="size-full" />
      </motion.span>
      <motion.span
        className={cn("absolute inset-0 will-change-transform", hoverClassName)}
        initial={idleMotion.hover}
        animate={arrowMotion.hover}
        transition={arrowSwapSpringTransition}
      >
        <Icon className="size-full" />
      </motion.span>
    </span>
  );
}
