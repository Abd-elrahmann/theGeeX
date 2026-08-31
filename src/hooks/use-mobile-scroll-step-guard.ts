"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

import { getScrollPosition, scrollToPosition } from "@/lib/lenis-scroll-trigger";

interface UseMobileScrollStepGuardOptions {
  enabled: boolean;
  elementRef: RefObject<HTMLElement | null>;
  canHandleStep?: (direction: 1 | -1) => boolean;
  onStep: (direction: 1 | -1) => number | null;
  swipeThresholdPx?: number;
  settleEpsilonPx?: number;
  settledFrameCount?: number;
}

interface UseMobileScrollStepGuardResult {
  isGestureLockedRef: React.MutableRefObject<boolean>;
  isStepHandledRef: React.MutableRefObject<boolean>;
  isTouchActiveRef: React.MutableRefObject<boolean>;
  releaseGestureLock: () => void;
}

const DEFAULT_SWIPE_THRESHOLD_PX = 24;
const DEFAULT_SETTLE_EPSILON_PX = 2;
const DEFAULT_SETTLED_FRAME_COUNT = 2;

export function useMobileScrollStepGuard({
  enabled,
  elementRef,
  canHandleStep,
  onStep,
  swipeThresholdPx = DEFAULT_SWIPE_THRESHOLD_PX,
  settleEpsilonPx = DEFAULT_SETTLE_EPSILON_PX,
  settledFrameCount = DEFAULT_SETTLED_FRAME_COUNT,
}: UseMobileScrollStepGuardOptions): UseMobileScrollStepGuardResult {
  const touchStartYRef = useRef<number | null>(null);
  const isStepHandledRef = useRef(false);
  const isGestureLockedRef = useRef(false);
  const isTouchActiveRef = useRef(false);
  const isScrollSettledRef = useRef(false);
  const targetScrollYRef = useRef<number | null>(null);
  const unlockFrameRef = useRef<number | null>(null);
  const settledFramesRef = useRef(0);

  const releaseGestureLock = useCallback(() => {
    isGestureLockedRef.current = false;
    isTouchActiveRef.current = false;
    isScrollSettledRef.current = false;
    targetScrollYRef.current = null;
    settledFramesRef.current = 0;

    if (unlockFrameRef.current !== null) {
      window.cancelAnimationFrame(unlockFrameRef.current);
      unlockFrameRef.current = null;
    }
  }, []);

  const lockUntilScrollSettles = useCallback(
    (targetScrollY: number) => {
      isGestureLockedRef.current = true;
      isScrollSettledRef.current = false;
      targetScrollYRef.current = targetScrollY;
      settledFramesRef.current = 0;

      if (unlockFrameRef.current !== null) {
        window.cancelAnimationFrame(unlockFrameRef.current);
      }

      const waitForScrollToSettle = () => {
        const lockedTargetScrollY = targetScrollYRef.current;

        if (lockedTargetScrollY === null) {
          releaseGestureLock();
          return;
        }

        if (Math.abs(getScrollPosition() - lockedTargetScrollY) <= settleEpsilonPx) {
          settledFramesRef.current += 1;
        } else {
          settledFramesRef.current = 0;
        }

        if (settledFramesRef.current >= settledFrameCount) {
          isScrollSettledRef.current = true;

          if (!isTouchActiveRef.current) {
            releaseGestureLock();
          }

          return;
        }

        unlockFrameRef.current = window.requestAnimationFrame(waitForScrollToSettle);
      };

      unlockFrameRef.current = window.requestAnimationFrame(waitForScrollToSettle);
    },
    [releaseGestureLock, settleEpsilonPx, settledFrameCount],
  );

  useEffect(() => {
    const element = elementRef.current;

    if (!enabled || !element) {
      touchStartYRef.current = null;
      isStepHandledRef.current = false;
      releaseGestureLock();
      return;
    }

    const handleTouchStart = (event: TouchEvent) => {
      isTouchActiveRef.current = true;

      if (event.touches.length !== 1) {
        touchStartYRef.current = null;
        isStepHandledRef.current = false;
        return;
      }

      touchStartYRef.current = event.touches[0]?.clientY ?? null;
      isStepHandledRef.current = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touchStartY = touchStartYRef.current;

      if (
        touchStartY === null ||
        isGestureLockedRef.current ||
        isStepHandledRef.current ||
        event.touches.length !== 1
      ) {
        return;
      }

      const currentY = event.touches[0]?.clientY;

      if (typeof currentY !== "number") {
        return;
      }

      const deltaY = touchStartY - currentY;

      if (deltaY === 0) {
        return;
      }

      const direction = deltaY > 0 ? 1 : -1;
      const shouldHandleStep = canHandleStep?.(direction) ?? true;

      if (!shouldHandleStep) {
        return;
      }

      if (Math.abs(deltaY) < swipeThresholdPx) {
        return;
      }

      if (event.cancelable) {
        event.preventDefault();
      }

      const targetScrollY = onStep(direction);

      if (targetScrollY === null) {
        return;
      }

      isStepHandledRef.current = true;

      scrollToPosition(targetScrollY);
      lockUntilScrollSettles(targetScrollY);
    };

    const handleTouchEnd = () => {
      isTouchActiveRef.current = false;
      touchStartYRef.current = null;
      isStepHandledRef.current = false;

      if (isGestureLockedRef.current && isScrollSettledRef.current) {
        releaseGestureLock();
      }
    };

    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd);
    element.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("touchcancel", handleTouchEnd);
      releaseGestureLock();
    };
  }, [canHandleStep, elementRef, enabled, lockUntilScrollSettles, onStep, releaseGestureLock, swipeThresholdPx]);

  return {
    isGestureLockedRef,
    isStepHandledRef,
    isTouchActiveRef,
    releaseGestureLock,
  };
}