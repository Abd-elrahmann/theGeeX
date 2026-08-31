"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { useMobileScrollStepGuard } from "@/hooks/use-mobile-scroll-step-guard";
import { getScrollPosition } from "@/lib/lenis-scroll-trigger";
import { readRootCssNumber } from "@/lib/read-css-var";
import { clampActiveIndex } from "@/lib/sync-active-index-from-progress";

const SERVICES_TABLET_STAGE_HEIGHT_PX = 560;
const SERVICES_TABLET_PANEL_HEIGHT_PX = 346;
const SERVICES_MOBILE_SWIPE_STEP_THRESHOLD_PX = 24;
const SERVICES_MOBILE_SCROLL_SETTLE_EPSILON_PX = 2;
const SERVICES_MOBILE_SCROLL_SETTLE_FRAME_COUNT = 2;
const MOBILE_VIEWPORT_WIDTH_RESIZE_EPSILON_PX = 1;
const MOBILE_PANEL_GAP_PX = 12;
const MOBILE_CONTENT_MIN_HEIGHT_PX = 220;

interface MobileStageMetrics {
  stageHeight: number;
  titleHeight: number;
  contentHeight: number;
  imageHeight: number;
  scrollHeight: number;
  stickyTop: number;
  activationProgressEnd: number;
}

interface UseServicesMobileStateOptions {
  activeIndex: number;
  isDesktop: boolean;
  isTablet: boolean;
  hasHydrated: boolean;
  isIosSafariDevice: boolean;
  serviceCount: number;
  containerRef: React.RefObject<HTMLElement | null>;
  setActiveIndex: (index: number) => void;
}

interface UseServicesMobileStateResult {
  mobileScrollRef: React.RefObject<HTMLDivElement | null>;
  mobileMeasureRef: React.RefObject<HTMLDivElement | null>;
  mobileTitleRef: React.RefObject<HTMLDivElement | null>;
  mobileContentMeasureRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
  mobileImageMeasureRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
  mobileStageMetrics: MobileStageMetrics;
  mobileContentHeight: number;
  mobileImageHeight: number;
  tabletPanelHeight: number;
}

const initialMobileStageMetrics: MobileStageMetrics = {
  stageHeight: 0,
  titleHeight: 0,
  contentHeight: 0,
  imageHeight: 0,
  scrollHeight: 0,
  stickyTop: 0,
  activationProgressEnd: 1,
};

export function useServicesMobileState({
  activeIndex,
  isDesktop,
  isTablet,
  hasHydrated,
  isIosSafariDevice,
  serviceCount,
  containerRef,
  setActiveIndex,
}: UseServicesMobileStateOptions): UseServicesMobileStateResult {
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const mobileMeasureRef = useRef<HTMLDivElement>(null);
  const mobileTitleRef = useRef<HTMLDivElement>(null);
  const mobileContentMeasureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileImageMeasureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileViewportWidthRef = useRef(0);
  const activeIndexRef = useRef(activeIndex);
  const mobileQueuedTargetIndexRef = useRef<number | null>(null);
  const mobileStepFrameRef = useRef<number | null>(null);
  const [canSyncMobileServices, setCanSyncMobileServices] = useState(false);
  const [mobileStageMetrics, setMobileStageMetrics] = useState(initialMobileStageMetrics);
  const shouldTrackMobileScroll = hasHydrated && !isDesktop;
  const { scrollYProgress } = useScroll({
    target: shouldTrackMobileScroll ? mobileScrollRef : undefined,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const getMobileScrollStepMetrics = useCallback(() => {
    const sectionElement = mobileScrollRef.current;

    if (!sectionElement) {
      return null;
    }

    const scrollStepVh = readRootCssNumber(
      "--services-scroll-step-vh",
      serviceCount > 1 ? 100 : 0,
    );
    const stepDistance = (scrollStepVh * window.innerHeight) / 100;
    const sectionTop = sectionElement.getBoundingClientRect().top + getScrollPosition();

    return {
      stepDistance,
      sectionTop,
      stickyTop: mobileStageMetrics.stickyTop,
    };
  }, [mobileStageMetrics.stickyTop, serviceCount]);

  const scrollMobileToIndex = useCallback(
    (index: number) => {
      const metrics = getMobileScrollStepMetrics();

      if (!metrics) {
        return null;
      }

      return metrics.sectionTop - metrics.stickyTop + index * metrics.stepDistance;
    },
    [getMobileScrollStepMetrics],
  );

  const syncMobileServiceProgress = useCallback(
    (progress: number) => {
      const targetIndex = clampActiveIndex(
        Math.round(progress * Math.max(serviceCount - 1, 0)),
        serviceCount,
      );
      const currentIndex = activeIndexRef.current;
      const queuedTargetIndex =
        targetIndex !== currentIndex
          ? clampActiveIndex(currentIndex + Math.sign(targetIndex - currentIndex), serviceCount)
          : targetIndex;

      mobileQueuedTargetIndexRef.current = queuedTargetIndex;

      if (mobileStepFrameRef.current !== null) {
        return;
      }

      const stepTowardTarget = () => {
        mobileStepFrameRef.current = null;

        const nextQueuedTargetIndex = mobileQueuedTargetIndexRef.current;
        const nextCurrentIndex = activeIndexRef.current;

        if (nextQueuedTargetIndex === null || nextQueuedTargetIndex === nextCurrentIndex) {
          return;
        }

        activeIndexRef.current = nextQueuedTargetIndex;
        setActiveIndex(nextQueuedTargetIndex);
      };

      mobileStepFrameRef.current = window.requestAnimationFrame(stepTowardTarget);
    },
    [serviceCount, setActiveIndex],
  );

  const {
    isGestureLockedRef: mobileGestureLockedRef,
    isStepHandledRef: mobileTouchStepHandledRef,
    isTouchActiveRef: mobileTouchActiveRef,
    releaseGestureLock: releaseMobileGestureLock,
  } = useMobileScrollStepGuard({
    enabled: hasHydrated && !isDesktop && !isTablet && isIosSafariDevice && canSyncMobileServices,
    elementRef: mobileScrollRef,
    canHandleStep: (direction) => {
      const currentIndex = activeIndexRef.current;
      const nextIndex = clampActiveIndex(currentIndex + direction, serviceCount);

      return nextIndex !== currentIndex;
    },
    onStep: (direction) => {
      const currentIndex = activeIndexRef.current;
      const nextIndex = clampActiveIndex(currentIndex + direction, serviceCount);

      if (nextIndex === currentIndex) {
        return null;
      }

      mobileQueuedTargetIndexRef.current = nextIndex;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      return scrollMobileToIndex(nextIndex);
    },
    swipeThresholdPx: SERVICES_MOBILE_SWIPE_STEP_THRESHOLD_PX,
    settleEpsilonPx: SERVICES_MOBILE_SCROLL_SETTLE_EPSILON_PX,
    settledFrameCount: SERVICES_MOBILE_SCROLL_SETTLE_FRAME_COUNT,
  });

  useEffect(() => {
    if (isDesktop) {
      return;
    }

    const sectionElement = containerRef.current;

    if (!sectionElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCanSyncMobileServices(entry.isIntersecting);
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
  }, [containerRef, isDesktop]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!shouldTrackMobileScroll || isDesktop || !canSyncMobileServices) {
      return;
    }

    if (
      mobileTouchActiveRef.current ||
      mobileTouchStepHandledRef.current ||
      mobileGestureLockedRef.current
    ) {
      return;
    }

    const normalizedProgress =
      mobileStageMetrics.activationProgressEnd < 1
        ? Math.min(progress / mobileStageMetrics.activationProgressEnd, 1)
        : progress;

    syncMobileServiceProgress(normalizedProgress);
  });

  useEffect(() => {
    if (shouldTrackMobileScroll || isDesktop) {
      return;
    }

    mobileQueuedTargetIndexRef.current = 0;
    activeIndexRef.current = 0;
    releaseMobileGestureLock();

    if (mobileStepFrameRef.current !== null) {
      window.cancelAnimationFrame(mobileStepFrameRef.current);
      mobileStepFrameRef.current = null;
    }

    setActiveIndex(0);
  }, [isDesktop, releaseMobileGestureLock, setActiveIndex, shouldTrackMobileScroll]);

  useEffect(() => {
    return () => {
      if (mobileStepFrameRef.current !== null) {
        window.cancelAnimationFrame(mobileStepFrameRef.current);
      }

      releaseMobileGestureLock();
    };
  }, [releaseMobileGestureLock]);

  useEffect(() => {
    if (isDesktop) {
      return;
    }

    const measureMobileStage = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const columnsGap = parseFloat(rootStyles.getPropertyValue("--services-columns-gap")) || 24;
      const stageBottomPadding =
        parseFloat(rootStyles.getPropertyValue("--services-stage-bottom-padding")) || 32;
      const pinClearance =
        parseFloat(rootStyles.getPropertyValue("--services-mobile-pin-clearance")) || 0;
      const navbarHeight = parseFloat(rootStyles.getPropertyValue("--navbar-height")) || 0;
      const scrollStepVh = parseFloat(rootStyles.getPropertyValue("--services-scroll-step-vh")) || 100;
      const mobileScrollTailVh =
        parseFloat(rootStyles.getPropertyValue("--services-mobile-scroll-tail-vh")) || 0;
      const viewportHeight = window.innerHeight;
      const titleHeight = mobileTitleRef.current?.offsetHeight ?? 0;
      const contentHeight = Math.max(
        0,
        ...mobileContentMeasureRefs.current.map((element) => element?.offsetHeight ?? 0),
      );
      const imageHeight = Math.max(
        0,
        ...mobileImageMeasureRefs.current.map((element) => element?.offsetHeight ?? 0),
      );
      const tabletStageHeight =
        titleHeight +
        SERVICES_TABLET_PANEL_HEIGHT_PX * 2 +
        columnsGap +
        stageBottomPadding +
        pinClearance;
      const stageHeight = isTablet
        ? Math.max(SERVICES_TABLET_STAGE_HEIGHT_PX, tabletStageHeight)
        : titleHeight + contentHeight + imageHeight + columnsGap + stageBottomPadding + pinClearance;
      const stickyTop = navbarHeight;
      const stepScrollDistance = Math.max(serviceCount - 1, 0) * viewportHeight * (scrollStepVh / 100);
      const tailScrollDistance = viewportHeight * (mobileScrollTailVh / 100);
      const stickyReleaseBuffer = Math.max(viewportHeight - stickyTop - stageHeight, 0);
      const totalScrollableDistance =
        stepScrollDistance + tailScrollDistance + stickyReleaseBuffer;
      const activationProgressEnd =
        totalScrollableDistance > 0
          ? Math.min(stepScrollDistance / totalScrollableDistance, 1)
          : 1;

      setMobileStageMetrics({
        stageHeight,
        titleHeight,
        contentHeight,
        imageHeight,
        stickyTop,
        activationProgressEnd,
        scrollHeight:
          stageHeight +
          stepScrollDistance +
          tailScrollDistance +
          stickyReleaseBuffer +
          stickyTop,
      });
    };

    const shouldHandleViewportResize = () => {
      const nextViewportWidth = window.innerWidth;
      const previousViewportWidth = mobileViewportWidthRef.current;

      mobileViewportWidthRef.current = nextViewportWidth;

      return (
        previousViewportWidth === 0 ||
        Math.abs(nextViewportWidth - previousViewportWidth) > MOBILE_VIEWPORT_WIDTH_RESIZE_EPSILON_PX
      );
    };

    const handleViewportResize = () => {
      if (!shouldHandleViewportResize()) {
        return;
      }

      measureMobileStage();
    };

    measureMobileStage();
    mobileViewportWidthRef.current = window.innerWidth;

    const resizeObserver =
      typeof ResizeObserver !== "undefined" && mobileMeasureRef.current
        ? new ResizeObserver(() => {
            measureMobileStage();
          })
        : null;

    if (mobileMeasureRef.current && resizeObserver) {
      resizeObserver.observe(mobileMeasureRef.current);
    }

    window.addEventListener("resize", handleViewportResize);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleViewportResize);
    };
  }, [isDesktop, isTablet, serviceCount]);

  const mobileAvailablePanelHeight = Math.max(
    mobileStageMetrics.stageHeight - mobileStageMetrics.titleHeight - mobileStageMetrics.stickyTop,
    0,
  );
  const mobileVisiblePanelBudget = Math.max(
    mobileAvailablePanelHeight - MOBILE_PANEL_GAP_PX - 12,
    0,
  );
  const mobileContentHeight =
    !isTablet && mobileStageMetrics.contentHeight > 0
      ? Math.min(
          mobileStageMetrics.contentHeight,
          Math.max(mobileVisiblePanelBudget * 0.48, MOBILE_CONTENT_MIN_HEIGHT_PX),
        )
      : mobileStageMetrics.contentHeight;
  const mobileImageHeight =
    !isTablet && mobileStageMetrics.imageHeight > 0
      ? Math.min(
          mobileStageMetrics.imageHeight,
          Math.max(mobileVisiblePanelBudget - mobileContentHeight, 0),
        )
      : mobileStageMetrics.imageHeight;

  return {
    mobileScrollRef,
    mobileMeasureRef,
    mobileTitleRef,
    mobileContentMeasureRefs,
    mobileImageMeasureRefs,
    mobileStageMetrics,
    mobileContentHeight,
    mobileImageHeight,
    tabletPanelHeight: SERVICES_TABLET_PANEL_HEIGHT_PX,
  };
}