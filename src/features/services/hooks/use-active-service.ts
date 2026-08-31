"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { DESKTOP_MEDIA_QUERY } from "@/lib/breakpoints";
import { getScrollPosition } from "@/lib/lenis-scroll-trigger";
import { readRootCssNumber } from "@/lib/read-css-var";
import {
  clampActiveIndex,
  syncActiveIndexFromProgress,
} from "@/lib/sync-active-index-from-progress";

import { servicesScrollHeightPerService } from "@/features/services/constants/services";

interface UseActiveServiceOptions {
  serviceCount: number;
  enabled?: boolean;
}

function getPinScrollDistance(serviceCount: number): number {
  const stepRaw = getComputedStyle(document.documentElement)
    .getPropertyValue("--services-scroll-step-vh")
    .trim();

  const stepVh = parseFloat(stepRaw) || servicesScrollHeightPerService;
  const steps = Math.max(serviceCount - 1, 0);

  return (steps * stepVh * window.innerHeight) / 100;
}

export function useActiveService({
  serviceCount,
  enabled = true,
}: UseActiveServiceOptions) {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousActiveIndex, setPreviousActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const hasResolvedInitialIndexRef = useRef(false);
  const isDesktopRef = useRef(false);

  const applyInitialActiveIndex = useCallback(
    (index: number) => {
      const nextIndex = clampActiveIndex(index, serviceCount);

      hasResolvedInitialIndexRef.current = true;
      activeIndexRef.current = nextIndex;
      setPreviousActiveIndex(nextIndex);
      setActiveIndex(nextIndex);
    },
    [serviceCount],
  );

  const setActiveIndexSafe = useCallback(
    (index: number) => {
      const nextIndex = clampActiveIndex(index, serviceCount);

      hasResolvedInitialIndexRef.current = true;

      if (nextIndex === activeIndexRef.current) {
        return;
      }

      setPreviousActiveIndex(activeIndexRef.current);
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    },
    [serviceCount],
  );

  const resetToFirstService = useCallback(() => {
    setPreviousActiveIndex(0);
    activeIndexRef.current = 0;
    hasResolvedInitialIndexRef.current = true;
    setActiveIndex(0);
  }, []);

  const syncDesktopProgress = useCallback(() => {
    if (
      !enabled ||
      serviceCount === 0 ||
      typeof window === "undefined" ||
      !containerRef.current ||
      !stageRef.current ||
      !isDesktopRef.current
    ) {
      return;
    }

    const sectionElement = containerRef.current;
    const pinStartOffset = readRootCssNumber("--services-pin-start-offset", 0);
    const stickyTop = readRootCssNumber("--services-sticky-top", 0) + pinStartOffset;
    const scrollPosition = getScrollPosition();
    const sectionTop = sectionElement.getBoundingClientRect().top + scrollPosition;
    const baseDistance = Math.max(getPinScrollDistance(serviceCount), 1);
    const distance = scrollPosition - (sectionTop - stickyTop);

    if (distance <= 0) {
      if (hasResolvedInitialIndexRef.current && activeIndexRef.current !== 0) {
        resetToFirstService();
      }

      return;
    }

    const progress = Math.min(distance / baseDistance, 1);

    if (!hasResolvedInitialIndexRef.current) {
      applyInitialActiveIndex(Math.round(progress * (serviceCount - 1)));
      return;
    }

    syncActiveIndexFromProgress(progress, serviceCount, setActiveIndexSafe);
  }, [applyInitialActiveIndex, enabled, resetToFirstService, serviceCount, setActiveIndexSafe]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    const updateDesktopState = () => {
      isDesktopRef.current = mediaQuery.matches;

      if (!mediaQuery.matches) {
        return;
      }

      syncDesktopProgress();
    };

    updateDesktopState();
    mediaQuery.addEventListener("change", updateDesktopState);

    return () => {
      mediaQuery.removeEventListener("change", updateDesktopState);
    };
  }, [syncDesktopProgress]);

  useMotionValueEvent(scrollY, "change", () => {
    syncDesktopProgress();
  });

  useEffect(() => {
    if (typeof window === "undefined" || !enabled || serviceCount === 0) {
      return;
    }

    const handleRefresh = () => {
      syncDesktopProgress();
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined" && containerRef.current
        ? new ResizeObserver(() => {
            syncDesktopProgress();
          })
        : null;

    if (containerRef.current && resizeObserver) {
      resizeObserver.observe(containerRef.current);
    }

    if (stageRef.current && resizeObserver) {
      resizeObserver.observe(stageRef.current);
    }

    window.addEventListener("resize", handleRefresh);
    window.addEventListener("load", handleRefresh);
    requestAnimationFrame(handleRefresh);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleRefresh);
      window.removeEventListener("load", handleRefresh);
    };
  }, [enabled, serviceCount, syncDesktopProgress]);

  return {
    containerRef,
    stageRef,
    activeIndex,
    previousActiveIndex,
    setActiveIndex: setActiveIndexSafe,
  };
}
