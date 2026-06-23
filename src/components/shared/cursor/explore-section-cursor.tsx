"use client";

import { motion, type Transition } from "framer-motion";
import { createPortal } from "react-dom";

import { ArrowRightIcon } from "@/components/shared/icons/arrow-right";
import { usePointerSpringPosition } from "@/hooks/use-pointer-spring-position";
import { cn } from "@/lib/cn";

interface ExploreSectionCursorProps {
  isVisible: boolean;
  label: string;
  transition: Transition;
}

export function ExploreSectionCursor({
  isVisible,
  label,
  transition,
}: ExploreSectionCursorProps) {
  const { x, y } = usePointerSpringPosition({
    enabled: isVisible,
    offsetX: 0,
    offsetY: 0,
    spring: transition,
  });

  if (!isVisible) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-(--services-section-cursor-z-index)",
        "box-border flex flex-row flex-nowrap content-center items-center justify-center",
        "gap-(--services-section-cursor-gap) overflow-clip",
        "rounded-(--services-section-cursor-radius)",
        "bg-(--color-services-section-cursor-bg)",
        "mix-blend-difference",
        "h-(--services-section-cursor-height) w-(--services-section-cursor-width)",
      )}
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
    >
      <span
        className={cn(
          "font-poppins text-(length:--services-section-cursor-font-size)",
          "font-medium leading-none tracking-normal whitespace-nowrap",
          "text-(--color-services-section-cursor-text)",
        )}
      >
        {label}
      </span>

      <ArrowRightIcon
        className={cn(
          "size-(--services-section-cursor-arrow-size) shrink-0",
          "text-(--color-services-section-cursor-text)",
        )}
      />
    </motion.div>,
    document.body,
  );
}