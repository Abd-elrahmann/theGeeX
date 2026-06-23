"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import { useMediaQuery } from "@/hooks/use-media-query";
import { usePointerSpringPosition } from "@/hooks/use-pointer-spring-position";
import { useHasActiveExploreCursor } from "@/lib/explore-cursor-state";
import { readRootCssNumber } from "@/lib/read-css-var";

import { cursorConfig } from "./constants/cursor.config";

function syncCursorHtmlClass(isEnabled: boolean): void {
  document.documentElement.classList.toggle("custom-cursor-enabled", isEnabled);
}

export function Cursor() {
  const isEnabled = useMediaQuery(cursorConfig.pointerMediaQuery);
  const cursorOffset = (() => {
    if (typeof window === "undefined") {
      return 8;
    }

    return readRootCssNumber("--cursor-offset", 8);
  })();
  const hasActiveExploreCursor = useHasActiveExploreCursor();
  const { x, y } = usePointerSpringPosition({
    enabled: isEnabled && !hasActiveExploreCursor,
    offsetX: -cursorOffset,
    offsetY: -cursorOffset,
    spring: cursorConfig.spring,
  });

  useEffect(() => {
    syncCursorHtmlClass(isEnabled);
  }, [isEnabled]);

  useEffect(() => {
    return () => {
      syncCursorHtmlClass(false);
    };
  }, []);

  if (typeof document === "undefined" || !isEnabled || hasActiveExploreCursor) {
    return null;
  }

  return createPortal(
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-(--cursor-z-index) block mix-blend-difference"
      data-site-cursor=""
      style={{
        width: "var(--cursor-size)",
        height: "var(--cursor-size)",
        borderRadius: "var(--cursor-radius)",
        backgroundColor: "var(--color-cursor)",
        x,
        y,
      }}
    />,
    document.body,
  );
}
