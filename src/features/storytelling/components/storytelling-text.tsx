"use client";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/cn";

import {
  contentVerticalSlideVariants,
  slideSpringTransition,
} from "@/components/shared/motion/slide-transitions";

import {
  storytellingLineActiveScale,
  storytellingLineActiveTransition,
  storytellingLines,
  type StorytellingItem,
} from "@/features/storytelling/constants/storytelling";

interface StorytellingCaptionPanelProps {
  items: StorytellingItem[];
  activeIndex: number;
  direction: 1 | -1;
  className?: string;
}

const storytellingCaptionClassName = cn(
  "absolute inset-0 w-full font-poppins font-normal not-italic",
  "h-(--storytelling-caption-height) min-h-(--storytelling-caption-height)",
  "text-center text-[length:var(--storytelling-caption-size)]",
  "leading-(--storytelling-caption-line-height) tracking-[0em]",
  "whitespace-pre-wrap break-words text-(--color-storytelling-caption)",
);

export function StorytellingCaptionPanel({
  items,
  activeIndex,
  direction,
  className,
}: StorytellingCaptionPanelProps) {
  const activeItem = items[activeIndex] ?? items[0];

  return (
    <div
      className={cn(
        "relative h-(--storytelling-caption-height) w-full shrink-0 overflow-hidden",
        "mt-(--storytelling-caption-margin-top)",
        className,
      )}
    >
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.p
          key={activeItem.id}
          custom={direction}
          variants={contentVerticalSlideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideSpringTransition}
          className={storytellingCaptionClassName}
        >
          {activeItem.caption}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

interface StorytellingLinesProps {
  activeIndex: number;
  variant?: "desktop" | "mobile";
  className?: string;
  onSelectIndex?: (index: number) => void;
}

const storytellingLineClassName = cn(
  "m-0 w-max max-w-none origin-center will-change-transform max-[1023px]:w-full max-[1023px]:max-w-full",
  "font-[family-name:var(--font-cal-sans)] font-semibold not-italic",
  "text-[length:var(--storytelling-line-size)] leading-(--storytelling-line-line-height)",
  "tracking-(--storytelling-line-letter-spacing)",
  "max-[1023px]:whitespace-normal lg:whitespace-nowrap",
);

export function StorytellingLines({
  activeIndex,
  variant = "desktop",
  className,
  onSelectIndex,
}: StorytellingLinesProps) {
  const isDesktop = variant === "desktop";

  return (
    <section
      aria-labelledby="storytelling-lines-heading"
      className={cn(
        "box-border flex h-min w-(--storytelling-lines-width) max-w-none shrink-0 flex-col flex-nowrap max-[1023px]:min-w-0",
        "content-center items-center justify-center overflow-visible",
        "gap-(--storytelling-line-gap)",
        isDesktop && "pl-(--storytelling-lines-padding-left)",
        !isDesktop && "w-full pl-0",
        className,
      )}
    >
      <h2 id="storytelling-lines-heading" className="sr-only">
        Story highlights
      </h2>
      {!isDesktop ? (
        <div role="tablist" aria-label="Storytelling topics" className="contents">
          {storytellingLines.map((line, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={line}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={cn(
                  storytellingLineClassName,
                  isActive
                    ? "text-storytelling-text-active"
                    : "text-storytelling-text-inactive",
                  "w-full border-0 bg-transparent p-0 text-center whitespace-nowrap",
                  isActive ? "scale-100" : "scale-[0.96]",
                )}
                onClick={() => {
                  onSelectIndex?.(index);
                }}
              >
                {line}
              </button>
            );
          })}
        </div>
      ) : (
        storytellingLines.map((line, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.p
              key={line}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                storytellingLineClassName,
                isActive
                  ? "text-storytelling-text-active"
                  : "text-storytelling-text-inactive",
              )}
              animate={{
                scale: isActive
                  ? storytellingLineActiveScale.active
                  : storytellingLineActiveScale.inactive,
              }}
              transition={storytellingLineActiveTransition}
            >
              {line}
            </motion.p>
          );
        })
      )}
    </section>
  );
}
