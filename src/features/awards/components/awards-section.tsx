"use client";

import { LayoutGroup, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

import { cn } from "@/lib/cn";

import { AwardCard } from "@/features/awards/components/award-card";
import { AwardsTitle } from "@/features/awards/components/awards-title";
import { awardItems } from "@/features/awards/constants/awards";

const awardsCardStates = {
  expanded: {
    flexGrow: 2,
    height: 494,
    opacity: 1,
  },
  collapsed: {
    flexGrow: 1,
    height: 247,
    opacity: 1,
  },
} as const;

const awardsCardTransition = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 1,
  delay: 0,
} as const;

export function AwardsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [hasSwappedCards, setHasSwappedCards] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 16%", "start -900px"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setHasSwappedCards(progress >= 0.12);
  });

  return (
    <section
      ref={sectionRef}
      id="awards"
      aria-label="Our Awards"
      className={cn(
        "relative w-full overflow-visible bg-background md:min-h-[calc(100svh+var(--awards-pin-scroll-distance))]",
        "mt-(--awards-margin-top) px-(--awards-padding-x) py-(--awards-padding-y)",
      )}
    >
      <div
        ref={stageRef}
        className={cn(
          "relative z-0 mx-auto flex w-full max-w-(--awards-container-max-width) overflow-visible bg-background md:sticky md:top-(--awards-sticky-top)",
          "flex-col gap-10 md:min-h-[calc(100svh-var(--awards-sticky-top))] lg:flex-row lg:items-center lg:gap-(--awards-column-gap)",
        )}
      >
        <div className="contents lg:flex lg:min-w-0 lg:flex-1 lg:items-start lg:self-stretch lg:pt-(--awards-title-offset-top)">
          <AwardsTitle />
        </div>

        <div
          className="mx-auto w-full min-w-0 lg:ml-auto lg:mr-0 lg:w-full lg:self-stretch"
          style={{ maxWidth: "var(--awards-cards-column-max-width)" }}
        >
          <LayoutGroup id="awards-cards">
            <div className="flex w-full flex-col items-center gap-(--awards-cards-gap) overflow-visible md:flex-row md:items-center md:justify-end">
            {awardItems.map((award, index) => {
              const isFirstCard = index === 0;
              const cardState = isFirstCard
                ? hasSwappedCards
                  ? awardsCardStates.collapsed
                  : awardsCardStates.expanded
                : hasSwappedCards
                  ? awardsCardStates.expanded
                  : awardsCardStates.collapsed;
              const isCollapsed = cardState === awardsCardStates.collapsed;

              return (
                <motion.div
                  key={award.id}
                  layout="size"
                  className="flex w-full min-w-0 items-center justify-center overflow-visible md:w-px md:basis-0"
                  initial={{ flexGrow: isFirstCard ? 2 : 1, height: isFirstCard ? 494 : 247 }}
                  animate={{ flexGrow: cardState.flexGrow, height: cardState.height }}
                  transition={awardsCardTransition}
                >
                  <AwardCard
                    award={award}
                    isCollapsed={isCollapsed}
                    transition={awardsCardTransition}
                  />
                </motion.div>
              );
            })}
            </div>
          </LayoutGroup>
        </div>
      </div>
    </section>
  );
}
