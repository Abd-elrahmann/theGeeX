"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

import { awardsSectionTitleLines } from "@/features/awards/constants/awards";

const awardsTitleReveal = {
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

export function AwardsTitle() {
  return (
    <h2
      className={cn(
        "z-(--awards-title-z-index) w-full self-start whitespace-pre-wrap wrap-break-word bg-background text-left font-cal-sans text-(--color-awards-title-muted) md:text-center lg:text-left",
        "text-(length:--awards-title-size) leading-(--awards-title-line-height)",
        "font-(--awards-title-font-weight) tracking-normal",
        "font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_on]",
        "lg:max-w-(--awards-title-max-width) lg:min-w-(--awards-title-min-width)",
      )}
    >
      {awardsSectionTitleLines.map((line, index) => (
        <div key={line} className="overflow-hidden px-[0.15em]">
          <motion.div
            className={cn(
              "block whitespace-nowrap",
              index === 1 && "text-(--color-awards-title-accent)",
            )}
            initial={awardsTitleReveal.initial}
            whileInView={awardsTitleReveal.animate}
            viewport={awardsTitleReveal.viewport}
            transition={{
              ...awardsTitleReveal.transition,
              delay: index * awardsTitleReveal.stagger,
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </h2>
  );
}
