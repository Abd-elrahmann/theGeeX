"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { TABLET_MEDIA_QUERY } from "@/lib/breakpoints";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMobileViewportResizeGate } from "@/hooks/use-mobile-viewport-resize-gate";
import { clampActiveIndex } from "@/lib/sync-active-index-from-progress";

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

const aiGrowthActiveTriggerDelay = 0.18;
const AI_GROWTH_MOBILE_STEP_GUARD_MS = 220;
const AI_GROWTH_ROW_SWITCH_THRESHOLD = 0.72;

function splitFirstWord(text: string): { firstWord: string; rest: string } {
  const [firstWord = "", ...restWords] = text.split(" ");

  return {
    firstWord,
    rest: restWords.length > 0 ? ` ${restWords.join(" ")}` : "",
  };
}

function resolveAiGrowthActiveIndex(
  progress: number,
  currentIndex: number,
  itemCount: number,
): number {
  const clampedProgress = Math.max(0, Math.min(progress, 1));
  const lastIndex = Math.max(itemCount - 1, 0);

  if (lastIndex === 0) {
    return 0;
  }

  const segmentSize = 1 / lastIndex;
  const clampedCurrentIndex = clampActiveIndex(currentIndex, itemCount);
  const directionalProgress = clampedProgress / segmentSize;
  const forwardThreshold = clampedCurrentIndex + AI_GROWTH_ROW_SWITCH_THRESHOLD;
  const backwardThreshold = clampedCurrentIndex - AI_GROWTH_ROW_SWITCH_THRESHOLD;

  if (directionalProgress >= forwardThreshold) {
    return clampActiveIndex(Math.floor(directionalProgress), itemCount);
  }

  if (directionalProgress <= backwardThreshold) {
    return clampActiveIndex(Math.ceil(directionalProgress), itemCount);
  }

  return clampedCurrentIndex;
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
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);
  const mobileStageContentRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const queuedTargetIndexRef = useRef(0);
  const mobileStepFrameRef = useRef<number | null>(null);
  const lastMobileStepTimeRef = useRef(0);
  const [canSyncActiveRow, setCanSyncActiveRow] = useState(false);
  const [mobileStageMetrics, setMobileStageMetrics] = useState({
    stageHeight: 0,
    scrollHeight: 0,
  });
  const isDesktop = useDesktopBreakpoint();
  const isTablet = useMediaQuery(TABLET_MEDIA_QUERY);
  const shouldHandleViewportResize = useMobileViewportResizeGate({
    ignoreHeightOnlyResize: !isDesktop,
  });
  const { scrollYProgress } = useScroll({
    target: isDesktop ? sectionRef : mobileScrollRef,
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

  useEffect(() => {
    if (isDesktop) {
      return;
    }

    const measureMobileStage = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const basePinScrollDistance =
        parseFloat(rootStyles.getPropertyValue("--ai-growth-pin-scroll-distance")) || 0;
      const contentHeight = mobileStageContentRef.current?.offsetHeight ?? 0;
      const stageHeight = isTablet ? contentHeight : Math.max(window.innerHeight, contentHeight);
      const pinScrollDistance = isTablet
        ? basePinScrollDistance * Math.max((aiGrowthRows.length - 1) / 2, 1)
        : basePinScrollDistance;
      const stickyOffset = isTablet ? Math.max((window.innerHeight - stageHeight) / 2, 0) : 0;

      setMobileStageMetrics({
        stageHeight,
        scrollHeight: stageHeight + pinScrollDistance + stickyOffset,
      });
    };

    measureMobileStage();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" && mobileStageContentRef.current
        ? new ResizeObserver(() => {
            measureMobileStage();
          })
        : null;

    if (mobileStageContentRef.current && resizeObserver) {
      resizeObserver.observe(mobileStageContentRef.current);
    }

    const handleViewportResize = () => {
      if (!shouldHandleViewportResize()) {
        return;
      }

      measureMobileStage();
    };

    window.addEventListener("resize", handleViewportResize);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleViewportResize);
    };
  }, [isDesktop, isTablet, shouldHandleViewportResize]);

  const tabletStickyTop =
    isTablet && mobileStageMetrics.stageHeight > 0
      ? `max(0px, calc((100svh - ${mobileStageMetrics.stageHeight}px) / 2))`
      : undefined;
  const mobileStickyTop = !isTablet ? "var(--ai-growth-mobile-rows-sticky-top)" : undefined;
  const mobileSectionPaddingTop =
    !isDesktop && !isTablet
      ? "calc(var(--ai-growth-padding-y) + var(--ai-growth-mobile-rows-sticky-top))"
      : undefined;
  const mobileRowsOffset = !isDesktop && !isTablet ? "-6px" : undefined;

  const setActiveIndexSequentially = useCallback(
    (index: number) => {
      const targetIndex = clampActiveIndex(index, aiGrowthRows.length);
      const currentIndex = activeIndexRef.current;

      if (targetIndex === currentIndex) {
        return;
      }

      const nextIndex = currentIndex + Math.sign(targetIndex - currentIndex);
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    },
    [],
  );

  const syncMobileIndexSequentially = useCallback(
    (index: number) => {
      queuedTargetIndexRef.current = clampActiveIndex(index, aiGrowthRows.length);

      if (mobileStepFrameRef.current !== null) {
        return;
      }

      const stepTowardTarget = (timestamp: number) => {
        const currentIndex = activeIndexRef.current;
        const targetIndex = queuedTargetIndexRef.current;

        if (targetIndex === currentIndex) {
          mobileStepFrameRef.current = null;
          return;
        }

        if (timestamp - lastMobileStepTimeRef.current < AI_GROWTH_MOBILE_STEP_GUARD_MS) {
          mobileStepFrameRef.current = window.requestAnimationFrame(stepTowardTarget);
          return;
        }

        const nextIndex = currentIndex + Math.sign(targetIndex - currentIndex);
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
        lastMobileStepTimeRef.current = timestamp;

        if (nextIndex === targetIndex) {
          mobileStepFrameRef.current = null;
          return;
        }

        mobileStepFrameRef.current = window.requestAnimationFrame(stepTowardTarget);
      };

      mobileStepFrameRef.current = window.requestAnimationFrame(stepTowardTarget);
    },
    [],
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!canSyncActiveRow) {
      return;
    }

    const delayedProgress = Math.max(0, progress - aiGrowthActiveTriggerDelay);
    const normalizedProgress = delayedProgress / (1 - aiGrowthActiveTriggerDelay);
    const clampedProgress = Math.max(0, Math.min(normalizedProgress, 1));

    const nextIndex = resolveAiGrowthActiveIndex(
      clampedProgress,
      activeIndexRef.current,
      aiGrowthRows.length,
    );

    (isDesktop ? setActiveIndexSequentially : syncMobileIndexSequentially)(nextIndex);
  });

  useEffect(() => {
    return () => {
      if (mobileStepFrameRef.current !== null) {
        window.cancelAnimationFrame(mobileStepFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ai-growth"
      aria-label="AI for real growth"
      className="relative z-10 mt-(--ai-growth-margin-top) min-h-(--ai-growth-scroll-height) w-full bg-background px-(--ai-growth-padding-x) pt-(--ai-growth-padding-y) pb-(--ai-growth-padding-y) lg:pb-0"
      style={mobileSectionPaddingTop ? { paddingTop: mobileSectionPaddingTop } : undefined}
    >
      <div
        ref={mobileScrollRef}
        className="mx-auto min-h-(--ai-growth-mobile-rows-track-height) w-full max-w-(--ai-growth-container-max-width) lg:min-h-(--ai-growth-scroll-height)"
        style={
          !isDesktop && mobileStageMetrics.scrollHeight > 0
            ? {
                minHeight: `${mobileStageMetrics.scrollHeight}px`,
              }
            : undefined
        }
      >
        <div
          className="sticky top-0 h-(--ai-growth-stage-height) overflow-hidden lg:top-(--ai-growth-sticky-top) lg:h-(--ai-growth-stage-height)"
          style={
            !isDesktop && mobileStageMetrics.stageHeight > 0
              ? {
                  top: isTablet ? tabletStickyTop : mobileStickyTop,
                  height: `${mobileStageMetrics.stageHeight}px`,
                }
              : undefined
          }
        >
          <div
            ref={mobileStageContentRef}
            className={cn(
              "grid w-full grid-cols-1 gap-(--ai-growth-grid-gap) lg:h-full lg:grid-cols-[minmax(var(--ai-growth-grid-one-min-width),1fr)_minmax(var(--ai-growth-grid-two-min-width),1fr)]",
              isTablet
                ? "content-center items-center"
                : "min-h-(--ai-growth-stage-min-height) items-start",
            )}
          >
            <div className={cn(
              "flex h-min w-full min-w-0 flex-1 flex-col content-start justify-center gap-(--ai-growth-intro-gap) overflow-clip rounded-none p-0 lg:min-w-(--ai-growth-grid-one-min-width)",
              isTablet ? "items-center text-center" : "items-start",
            )}>
              <h2 className={cn(
                "m-0 hidden w-full whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--ai-growth-title-size) leading-(--ai-growth-title-line-height) font-semibold tracking-normal font-features-normal lg:block",
                isTablet && "text-center",
              )}>
                <span className="text-(--color-ai-growth-title-muted)">{aiGrowthTitlePrefix} </span>
                <span className="text-(--color-ai-growth-accent)">{aiGrowthTitleAccent}</span>
              </h2>

              <h2 className={cn(
                "m-0 block w-full whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--ai-growth-title-size) leading-(--ai-growth-title-line-height) font-semibold tracking-normal font-features-normal lg:hidden",
                isTablet && "whitespace-nowrap text-center",
              )}>
                <span className="text-(--color-ai-growth-title-muted)">{aiGrowthCompactTitlePrefix}</span>
                <span className="text-(--color-ai-growth-accent)">{isTablet ? ` ${aiGrowthCompactTitleAccent}` : `\n${aiGrowthCompactTitleAccent}`}</span>
              </h2>

              <p className={cn(
                "m-0 w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--ai-growth-description-size) leading-(--ai-growth-description-line-height) font-normal tracking-normal text-(--color-ai-growth-text) font-features-normal",
                isTablet && "mx-auto max-w-(--ai-growth-tablet-intro-max-width) whitespace-nowrap text-center",
              )}>
                {isTablet ? aiGrowthDescription.replace(/\n/g, " ") : aiGrowthDescription}
              </p>
            </div>

            <div
              className="box-border flex h-min w-full min-w-0 flex-1 flex-col content-start items-start justify-center gap-(--ai-growth-rows-gap) overflow-clip rounded-none pt-(--ai-growth-grid-two-padding-top) lg:min-w-(--ai-growth-grid-two-min-width)"
              style={mobileRowsOffset ? { marginTop: mobileRowsOffset } : undefined}
            >
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
      </div>
    </section>
  );
}
