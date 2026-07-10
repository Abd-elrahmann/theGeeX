"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode } from "react";

import {
  contentVerticalSlideVariants,
  verticalSlideVariants,
} from "@/components/shared/motion/slide-transitions";

import { servicesContentSlideTransition } from "@/features/services/constants/services";
import { cn } from "@/lib/cn";

import {
  servicesContentContainerClassName,
  servicesImageContainerClassName,
  servicesImageSlideLayerClassName,
} from "@/features/services/constants/services-layout";

interface ServiceSlidePanelProps {
  panelKey: string | number;
  activeIndex: number;
  previousActiveIndex: number;
  className?: string;
  animate?: boolean;
  slideVariant?: "content" | "image";
  motionVariant?: "content" | "image";
  children: ReactNode;
}

function getContainerClassName(slideVariant: "content" | "image"): string {
  return slideVariant === "content"
    ? servicesContentContainerClassName
    : servicesImageContainerClassName;
}

function getSlideLayerClassName(slideVariant: "content" | "image"): string {
  return slideVariant === "content"
    ? cn("absolute inset-0 will-change-transform", servicesContentContainerClassName)
    : servicesImageSlideLayerClassName;
}

export function ServiceSlidePanel({
  panelKey,
  activeIndex,
  previousActiveIndex,
  className,
  animate = true,
  slideVariant = "image",
  motionVariant = slideVariant,
  children,
}: ServiceSlidePanelProps) {
  const direction = activeIndex >= previousActiveIndex ? 1 : -1;
  const variants =
    motionVariant === "content" ? contentVerticalSlideVariants : verticalSlideVariants;
  const containerClassName = getContainerClassName(slideVariant);
  const slideLayerClassName = getSlideLayerClassName(slideVariant);

  if (!animate) {
    return <div className={cn(containerClassName, className)}>{children}</div>;
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={panelKey}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={servicesContentSlideTransition}
          className={slideLayerClassName}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}