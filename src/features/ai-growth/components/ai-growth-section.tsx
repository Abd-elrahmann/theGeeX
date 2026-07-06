"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";

import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { syncActiveIndexFromProgress } from "@/lib/sync-active-index-from-progress";

import {
  aiGrowthCompactTitleAccent,
  aiGrowthCompactTitlePrefix,
  aiGrowthDescription,
  aiGrowthRows,
  aiGrowthTitleAccent,
  aiGrowthTitlePrefix,
  type AiGrowthRow,
} from "@/features/ai-growth/constants/ai-growth";

const aiGrowthRowTransition = {
  type: "spring",
  duration: 0.4,
  bounce: 0.2,
  delay: 0,
} as const;

function splitFirstWord(text: string): { firstWord: string; rest: string } {
  const [firstWord = "", ...restWords] = text.split(" ");

  return {
    firstWord,
    rest: restWords.length > 0 ? ` ${restWords.join(" ")}` : "",
  };
}

function AiGrowthRowItem({ row, isActive }: { row: AiGrowthRow; isActive: boolean }) {
  const { firstWord, rest } = splitFirstWord(row.title);

  return (
    <motion.article
      className="grid w-full grid-cols-1 gap-(--ai-growth-row-mobile-gap) md:grid-cols-[var(--ai-growth-row-title-width)_minmax(0,1fr)] md:gap-(--ai-growth-row-column-gap)"
      animate={{ opacity: isActive ? 1 : 0.34 }}
      transition={aiGrowthRowTransition}
    >
      <h3 className="m-0 w-auto whitespace-nowrap font-cal-sans text-(length:--ai-growth-row-title-size) leading-(--ai-growth-row-line-height) font-semibold tracking-normal text-(--color-ai-growth-row-title) font-features-normal">
        <motion.span
          animate={{ color: isActive ? "var(--color-ai-growth-accent)" : "var(--color-ai-growth-text)" }}
          transition={aiGrowthRowTransition}
        >
          {firstWord}
        </motion.span>
        <motion.span
          animate={{ color: "var(--color-ai-growth-text)" }}
          transition={aiGrowthRowTransition}
        >
          {rest}
        </motion.span>
      </h3>

      <motion.p
        className="m-0 min-w-0 flex-1 whitespace-pre-wrap wrap-break-word font-poppins text-(length:--ai-growth-row-description-size) leading-(--ai-growth-row-line-height) font-normal tracking-normal text-(--color-ai-growth-text) font-features-normal"
        animate={{ color: "var(--color-ai-growth-text)" }}
        transition={aiGrowthRowTransition}
      >
        {row.description}
      </motion.p>
    </motion.article>
  );
}

export function AiGrowthSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileRowsTrackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canSyncActiveRow, setCanSyncActiveRow] = useState(false);
  const isDesktop = useDesktopBreakpoint();
  const { scrollYProgress } = useScroll({
    target: isDesktop ? sectionRef : mobileRowsTrackRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCanSyncActiveRow(entry.isIntersecting);
      },
      {
        rootMargin: "-20% 0px -20% 0px",
        threshold: 0,
      },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!canSyncActiveRow) {
      return;
    }

    const clampedProgress = Math.max(0, Math.min(progress, 1));

    syncActiveIndexFromProgress(clampedProgress, aiGrowthRows.length, setActiveIndex);
  });

  return (
    <section
      ref={sectionRef}
      id="ai-growth"
      aria-label="AI for real growth"
      className="relative z-10 mt-(--ai-growth-margin-top) min-h-(--ai-growth-scroll-height) w-full bg-background px-(--ai-growth-padding-x) py-(--ai-growth-padding-y)"
    >
      <div
        className="mx-auto grid min-h-(--ai-growth-mobile-stage-height) w-full max-w-(--ai-growth-container-max-width) grid-cols-1 items-start gap-(--ai-growth-grid-gap) lg:sticky lg:top-(--ai-growth-sticky-top) lg:min-h-0 lg:grid-cols-[minmax(var(--ai-growth-grid-one-min-width),1fr)_minmax(var(--ai-growth-grid-two-min-width),1fr)]"
      >
        <div className="flex h-min w-full min-w-0 flex-1 flex-col content-start items-start justify-center gap-(--ai-growth-intro-gap) overflow-clip rounded-none p-0 lg:min-w-(--ai-growth-grid-one-min-width)">
          <h2 className="m-0 hidden w-full whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--ai-growth-title-size) leading-(--ai-growth-title-line-height) font-semibold tracking-normal font-features-normal lg:block">
            <span className="text-(--color-ai-growth-title-muted)">{aiGrowthTitlePrefix} </span>
            <span className="text-(--color-ai-growth-accent)">{aiGrowthTitleAccent}</span>
          </h2>

          <h2 className="m-0 block w-full whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--ai-growth-title-size) leading-(--ai-growth-title-line-height) font-semibold tracking-normal font-features-normal lg:hidden">
            <span className="text-(--color-ai-growth-title-muted)">{aiGrowthCompactTitlePrefix}</span>
            <span className="text-(--color-ai-growth-accent)">{`\n${aiGrowthCompactTitleAccent}`}</span>
          </h2>

          <p className="m-0 w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--ai-growth-description-size) leading-(--ai-growth-description-line-height) font-normal tracking-normal text-(--color-ai-growth-text) font-features-normal">
            {aiGrowthDescription}
          </p>
        </div>

        <div ref={mobileRowsTrackRef} className="min-h-(--ai-growth-mobile-rows-track-height) w-full lg:min-h-0">
          <div className="sticky top-(--ai-growth-mobile-rows-sticky-top) box-border flex h-min w-full min-w-0 flex-1 flex-col content-start items-start justify-center gap-(--ai-growth-rows-gap) overflow-clip rounded-none pt-(--ai-growth-grid-two-padding-top) lg:static lg:min-w-(--ai-growth-grid-two-min-width)">
            {aiGrowthRows.map((row, index) => (
              <Fragment key={row.id}>
                <AiGrowthRowItem row={row} isActive={index === activeIndex} />
                {index < aiGrowthRows.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="flex h-px w-full flex-row content-start items-start justify-start gap-(--ai-growth-row-divider-gap) overflow-clip rounded-(--ai-growth-row-divider-radius) bg-(--color-ai-growth-row-divider) p-0"
                  />
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
