"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

const processTitleReveal = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.6,
    type: "spring" as const,
    stiffness: 120,
    damping: 18,
  },
  stagger: 0.075,
  viewport: {
    once: true,
    amount: 0.5,
  },
} as const;

interface ProcessSectionTitleProps {
  lines: readonly string[];
}

const titleColors = [
  "var(--color-process-title-muted)",
  "var(--color-process-title-accent)",
  "var(--color-process-title-accent)",
] as const;

export function ProcessSectionTitle({ lines }: ProcessSectionTitleProps) {
  return (
    <>
      {lines.map((line, index) => (
        <div
          key={line}
          className={cn(
            "overflow-hidden px-[0.15em]",
            index > 0 && "md:inline-block lg:block",
            index === 2 && "md:ml-[-0.24em] lg:ml-0",
          )}
        >
          <motion.div
            className="block whitespace-nowrap"
            style={{ color: titleColors[index] }}
            initial={processTitleReveal.initial}
            whileInView={processTitleReveal.animate}
            viewport={processTitleReveal.viewport}
            transition={{
              ...processTitleReveal.transition,
              delay: index * processTitleReveal.stagger,
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </>
  );
}