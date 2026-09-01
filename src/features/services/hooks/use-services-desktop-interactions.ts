"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type Lenis from "lenis";

import { setExploreCursorZone } from "@/lib/explore-cursor-state";
import { getScrollPosition, scrollToPosition } from "@/lib/lenis-scroll-trigger";
import { readRootCssNumber } from "@/lib/read-css-var";

import { isPointInsideElement } from "@/features/services/lib/services-cursor-zone";
import { getServicesStableViewportHeight } from "@/features/services/lib/services-viewport";

const SERVICES_WHEEL_MIN_DELTA = 4;
const SERVICES_WHEEL_STEP_DELTA = 140;
const SERVICES_WHEEL_STEP_GUARD_MS = 240;

interface UseServicesDesktopInteractionsOptions {
  lenis: Lenis | undefined;
  isDesktop: boolean;
  isPointerFine: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  gridRef: React.RefObject<HTMLDivElement | null>;
  activeIndex: number;
  serviceCount: number;
}

interface UseServicesDesktopInteractionsResult {
  isGridHovered: boolean;
  handleMouseLeave: () => void;
  handleMouseMove: (clientX: number, clientY: number) => void;
}

export function useServicesDesktopInteractions({
  lenis,
  isDesktop,
  isPointerFine,
  containerRef,
  gridRef,
  activeIndex,
  serviceCount,
}: UseServicesDesktopInteractionsOptions): UseServicesDesktopInteractionsResult {
  const [isGridHovered, setIsGridHovered] = useState(false);
  const lastPointerRef = useRef({ x: -1, y: -1 });
  const wheelDeltaAccumulatorRef = useRef(0);
  const lastWheelStepTimeRef = useRef(0);
  const hoverScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLenisScrollingRef = useRef(false);
  const isExploreCursorActive = isDesktop && isPointerFine && isGridHovered;

  const syncGridHoverFromPointer = useCallback((clientX: number, clientY: number) => {
    const gridElement = gridRef.current;

    if (!gridElement) {
      setIsGridHovered(false);
      return;
    }

    setIsGridHovered(isPointInsideElement(clientX, clientY, gridElement));
  }, [gridRef]);

  const getDesktopScrollStepMetrics = useCallback(() => {
    const sectionElement = containerRef.current;

    if (!sectionElement) {
      return null;
    }

    const scrollStepVh = readRootCssNumber(
      "--services-scroll-step-vh",
      serviceCount > 1 ? 100 : 0,
    );
    const stickyTop = readRootCssNumber("--services-sticky-top", 0);
    const viewportHeight = getServicesStableViewportHeight();
    const stepDistance = (scrollStepVh * viewportHeight) / 100;
    const sectionTop = sectionElement.getBoundingClientRect().top + getScrollPosition();

    return {
      stepDistance,
      sectionTop,
      stickyTop,
    };
  }, [containerRef, serviceCount]);

  const scrollDesktopToIndex = useCallback(
    (index: number) => {
      const metrics = getDesktopScrollStepMetrics();

      if (!metrics) {
        return;
      }

      const nextPosition = metrics.sectionTop - metrics.stickyTop + index * metrics.stepDistance;
      scrollToPosition(nextPosition);
    },
    [getDesktopScrollStepMetrics],
  );

  useEffect(() => {
    if (!isDesktop) {
      wheelDeltaAccumulatorRef.current = 0;
      lastWheelStepTimeRef.current = 0;
      return;
    }

    const sectionElement = containerRef.current;

    if (!sectionElement) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      const sectionRect = sectionElement.getBoundingClientRect();
      const viewportHeight = getServicesStableViewportHeight();

      if (sectionRect.top > 0 || sectionRect.bottom < viewportHeight) {
        return;
      }

      if (Math.abs(event.deltaY) < SERVICES_WHEEL_MIN_DELTA) {
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const accumulatedDelta = wheelDeltaAccumulatorRef.current + event.deltaY;

      if (accumulatedDelta === 0 || Math.sign(accumulatedDelta) !== direction) {
        wheelDeltaAccumulatorRef.current = event.deltaY;
      } else {
        wheelDeltaAccumulatorRef.current = accumulatedDelta;
      }

      if (Math.abs(wheelDeltaAccumulatorRef.current) < SERVICES_WHEEL_STEP_DELTA) {
        return;
      }

      const now = performance.now();

      if (now - lastWheelStepTimeRef.current < SERVICES_WHEEL_STEP_GUARD_MS) {
        event.preventDefault();
        return;
      }

      const nextIndex = Math.max(0, Math.min(serviceCount - 1, activeIndex + direction));

      if (nextIndex === activeIndex) {
        wheelDeltaAccumulatorRef.current = 0;
        return;
      }

      event.preventDefault();
      wheelDeltaAccumulatorRef.current = 0;
      lastWheelStepTimeRef.current = now;
      scrollDesktopToIndex(nextIndex);
    };

    sectionElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      sectionElement.removeEventListener("wheel", handleWheel);
    };
  }, [activeIndex, containerRef, isDesktop, scrollDesktopToIndex, serviceCount]);

  useEffect(() => {
    if (!isDesktop || !isPointerFine) {
      setExploreCursorZone("none");
      return;
    }

    setExploreCursorZone(isExploreCursorActive ? "services" : "none");

    return () => {
      setExploreCursorZone("none");
    };
  }, [isDesktop, isExploreCursorActive, isPointerFine]);

  useEffect(() => {
    if (!lenis || !isDesktop || !isPointerFine) {
      return;
    }

    const handleLenisScroll = () => {
      isLenisScrollingRef.current = true;
      setIsGridHovered(false);

      if (hoverScrollTimeoutRef.current) {
        clearTimeout(hoverScrollTimeoutRef.current);
      }

      hoverScrollTimeoutRef.current = setTimeout(() => {
        isLenisScrollingRef.current = false;
        hoverScrollTimeoutRef.current = null;

        const { x, y } = lastPointerRef.current;

        if (x >= 0 && y >= 0) {
          syncGridHoverFromPointer(x, y);
        }
      }, 100);
    };

    lenis.on("scroll", handleLenisScroll);

    return () => {
      lenis.off("scroll", handleLenisScroll);

      if (hoverScrollTimeoutRef.current) {
        clearTimeout(hoverScrollTimeoutRef.current);
        hoverScrollTimeoutRef.current = null;
      }

      isLenisScrollingRef.current = false;
    };
  }, [isDesktop, isPointerFine, lenis, syncGridHoverFromPointer]);

  const handleMouseLeave = useCallback(() => {
    setIsGridHovered(false);
  }, []);

  const handleMouseMove = useCallback((clientX: number, clientY: number) => {
    lastPointerRef.current = { x: clientX, y: clientY };

    if (isLenisScrollingRef.current) {
      return;
    }

    syncGridHoverFromPointer(clientX, clientY);
  }, [syncGridHoverFromPointer]);

  return {
    isGridHovered,
    handleMouseLeave,
    handleMouseMove,
  };
}