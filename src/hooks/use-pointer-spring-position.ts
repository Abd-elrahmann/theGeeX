"use client";

import { useMotionValue, useSpring, type SpringOptions } from "framer-motion";
import { useEffect } from "react";

interface UsePointerSpringPositionOptions {
  enabled?: boolean;
  offsetX?: number;
  offsetY?: number;
  spring?: SpringOptions;
}

export function usePointerSpringPosition({
  enabled = true,
  offsetX = 0,
  offsetY = 0,
  spring,
}: UsePointerSpringPositionOptions = {}) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX + offsetX);
      mouseY.set(event.clientY + offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enabled, mouseX, mouseY, offsetX, offsetY]);

  return {
    x,
    y,
  };
}
