import { gsap, ScrollTrigger } from "@/lib/gsap";
import { readCssNumber } from "@/lib/read-css-var";
import { scrollToPosition } from "@/lib/lenis-scroll-trigger";
import { prepareFreshPageScrollSession, syncScrollTriggersAfterReset } from "@/lib/scroll-session";
import {
  isUpwardNavbarSession,
  lockUpwardNavbarSession,
  maybeReleaseUpwardNavbarSession,
  releaseUpwardNavbarSession,
  resetHeroScrollState,
  setHeroScrollState,
} from "@/lib/hero-scroll-state";

import { heroConfig } from "@/features/hero/constants/hero.config";

interface PathDrawCache {
  path: SVGPathElement;
  hiddenOffset: number;
  setDashoffset: ReturnType<typeof gsap.quickSetter>;
}

interface HeroPathScrollDraw {
  scrollTrigger: ScrollTrigger;
  timeline: gsap.core.Timeline;
}

export interface HeroPathScrollDrawOptions {
  pin?: boolean;
  holdDistance?: number;
}

const AMBITION_SECTION_ID = "ambition";
const DRAW_PROGRESS_SNAP = 0.002;

function getStrokeGapPadding(svg: SVGSVGElement): number {
  const strokeWidth = readCssNumber(svg, "--hero-path-stroke-width", 32);
  const extraPadding = readCssNumber(svg, "--hero-path-hide-padding", 4);

  return strokeWidth + extraPadding;
}

function getAmbitionSection(): HTMLElement | null {
  return document.getElementById(AMBITION_SECTION_ID);
}

function setAmbitionSectionVisible(isVisible: boolean): void {
  const ambitionSection = getAmbitionSection();

  if (!ambitionSection) {
    return;
  }

  gsap.set(ambitionSection, {
    autoAlpha: isVisible ? 1 : 0,
    pointerEvents: isVisible ? "auto" : "none",
  });
}

function snapDrawProgress(progress: number): number {
  if (progress <= DRAW_PROGRESS_SNAP) {
    return 0;
  }

  if (progress >= 1 - DRAW_PROGRESS_SNAP) {
    return 1;
  }

  return progress;
}

function setPathHidden(
  path: SVGPathElement,
  drawableLength: number,
  gapLength: number,
  hiddenOffset: number,
): void {
  gsap.set(path, {
    strokeDasharray: `${drawableLength} ${gapLength}`,
    strokeDashoffset: hiddenOffset,
    opacity: 1,
    visibility: "visible",
  });
}

function measureStrokePaths(svg: SVGSVGElement): PathDrawCache[] {
  const strokePaths = Array.from(svg.querySelectorAll<SVGPathElement>("path[data-hero-stroke]"));
  const { progressStart, progressEnd } = heroConfig.path.scroll;
  const gapPadding = getStrokeGapPadding(svg);

  return strokePaths.map((path) => {
    const length = path.getTotalLength();
    const drawableLength = length * (progressEnd - progressStart);
    const gapLength = length + gapPadding;
    const hiddenOffset = drawableLength + gapPadding;

    setPathHidden(path, drawableLength, gapLength, hiddenOffset);

    return {
      path,
      hiddenOffset,
      setDashoffset: gsap.quickSetter(path, "strokeDashoffset"),
    };
  });
}

export function createHeroPathScrollDraw(
  trigger: HTMLElement,
  svg: SVGSVGElement,
  options: HeroPathScrollDrawOptions = {},
): HeroPathScrollDraw {
  const { pin = true, holdDistance: holdDistanceOverride } = options;
  prepareFreshPageScrollSession();
  setAmbitionSectionVisible(true);

  const { scroll } = heroConfig.path;
  const pathCaches = measureStrokePaths(svg);

  if (pathCaches.length === 0) {
    throw new Error("No hero stroke paths found to animate.");
  }

  const distance = readCssNumber(trigger, "--hero-path-scroll-distance", scroll.distance);
  const holdDistance =
    holdDistanceOverride ??
    readCssNumber(trigger, "--hero-path-scroll-hold-distance", scroll.holdDistance);
  const totalDistance = distance + holdDistance;
  const drawDuration = distance / totalDistance;
  const holdDuration = holdDistance / totalDistance;
  const offset = readCssNumber(trigger, "--hero-path-scroll-offset", scroll.offset);
  const scrub = readCssNumber(trigger, "--hero-path-scroll-scrub", scroll.scrub);
  const start = `top ${scroll.startAlign}+=${offset}`;

  const drawProgress = { value: 0 };
  let hasCompletedDraw = false;
  let isHoldSkipArmed = false;
  let hasConsumedHoldSkip = false;
  let lastObservedScroll = 0;

  const updatePathDraw = (progress: number): void => {
    const snappedProgress = snapDrawProgress(progress);

    for (const cache of pathCaches) {
      const dashoffset = Math.round(cache.hiddenOffset * (1 - snappedProgress) * 100) / 100;
      cache.setDashoffset(dashoffset);
    }
  };

  const markDrawComplete = (): void => {
    hasCompletedDraw = true;
    drawProgress.value = 1;
    updatePathDraw(1);
  };

  const syncPathDraw = (scrollTrigger: ScrollTrigger | null | undefined): void => {
    if (drawProgress.value >= 1 - DRAW_PROGRESS_SNAP) {
      hasCompletedDraw = true;
    }

    if (hasCompletedDraw && scrollTrigger && !scrollTrigger.isActive) {
      updatePathDraw(1);
      return;
    }

    if (
      hasCompletedDraw &&
      scrollTrigger?.isActive &&
      scrollTrigger.progress >= drawDuration - 0.01
    ) {
      drawProgress.value = 1;
      updatePathDraw(1);
      return;
    }

    updatePathDraw(drawProgress.value);
  };

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger,
      start,
      end: `+=${totalDistance}`,
      scrub,
      pin,
      pinType: "fixed",
      pinSpacing: true,
      anticipatePin: 1,
      fastScrollEnd: false,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const currentDrawProgress = drawProgress.value;
        const currentScroll = self.scroll();
        const drawCompletePosition = self.start + distance;
        const isInHoldZone = currentScroll > drawCompletePosition + 2;

        if (!isInHoldZone) {
          hasConsumedHoldSkip = false;
        } else if (currentScroll > lastObservedScroll + 8) {
          isHoldSkipArmed = true;
          hasConsumedHoldSkip = false;
        }

        lastObservedScroll = currentScroll;

        if (self.direction === -1 && self.isActive && !isUpwardNavbarSession()) {
          lockUpwardNavbarSession(currentDrawProgress);
        } else {
          maybeReleaseUpwardNavbarSession(currentDrawProgress);

          setHeroScrollState({
            isScrollTriggerActive: self.isActive,
            drawProgress: currentDrawProgress,
          });
        }

        if (
          self.direction === -1 &&
          isHoldSkipArmed &&
          !hasConsumedHoldSkip &&
          isInHoldZone
        ) {
          isHoldSkipArmed = false;
          hasConsumedHoldSkip = true;
          scrollToPosition(drawCompletePosition);
        }
      },
      onEnter: () => {
        isHoldSkipArmed = false;
        hasConsumedHoldSkip = false;
        releaseUpwardNavbarSession();
        setAmbitionSectionVisible(false);
      },
      onEnterBack: () => {
        isHoldSkipArmed = true;
        hasConsumedHoldSkip = false;
        lockUpwardNavbarSession(drawProgress.value);
        setAmbitionSectionVisible(false);
      },
      onLeave: () => {
        isHoldSkipArmed = false;
        hasConsumedHoldSkip = false;
        markDrawComplete();
        resetHeroScrollState();
        setAmbitionSectionVisible(true);
      },
      onLeaveBack: () => {
        isHoldSkipArmed = false;
        hasConsumedHoldSkip = false;
        hasCompletedDraw = false;
        drawProgress.value = 0;
        updatePathDraw(0);
        resetHeroScrollState();
        setAmbitionSectionVisible(true);
      },
      onRefresh: (self) => {
        if (hasCompletedDraw && !self.isActive) {
          updatePathDraw(1);
          return;
        }

        if (hasCompletedDraw && self.isActive && self.progress >= drawDuration - 0.01) {
          drawProgress.value = 1;
          updatePathDraw(1);
        }
      },
    },
    onUpdate: () => {
      syncPathDraw(timeline.scrollTrigger);
    },
  });

  timeline.to(drawProgress, { value: 1, duration: drawDuration });
  timeline.to({}, { duration: holdDuration });

  const scrollTrigger = timeline.scrollTrigger;

  if (!scrollTrigger) {
    throw new Error("Hero path scroll trigger was not created.");
  }

  drawProgress.value = 0;
  updatePathDraw(0);
  setAmbitionSectionVisible(!scrollTrigger.isActive);
  syncScrollTriggersAfterReset();

  return { scrollTrigger, timeline };
}
