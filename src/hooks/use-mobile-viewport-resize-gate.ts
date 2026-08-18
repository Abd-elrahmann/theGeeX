"use client";

import { useCallback, useRef } from "react";

const MOBILE_VIEWPORT_WIDTH_RESIZE_EPSILON_PX = 1;

interface MobileViewportResizeGateOptions {
  ignoreHeightOnlyResize: boolean;
}

export function useMobileViewportResizeGate({
  ignoreHeightOnlyResize,
}: MobileViewportResizeGateOptions) {
  const viewportWidthRef = useRef(0);

  return useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }

    if (!ignoreHeightOnlyResize) {
      return true;
    }

    const nextViewportWidth = window.innerWidth;
    const previousViewportWidth = viewportWidthRef.current;

    viewportWidthRef.current = nextViewportWidth;

    return (
      previousViewportWidth === 0 ||
      Math.abs(nextViewportWidth - previousViewportWidth) > MOBILE_VIEWPORT_WIDTH_RESIZE_EPSILON_PX
    );
  }, [ignoreHeightOnlyResize]);
}