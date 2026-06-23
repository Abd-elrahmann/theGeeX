"use client";

import { useCallback, useRef, useState } from "react";

import { DESKTOP_MEDIA_QUERY } from "@/lib/breakpoints";
import { readRootCssNumber } from "@/lib/read-css-var";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import {
  clampActiveIndex,
  syncActiveIndexFromProgress,
} from "@/lib/sync-active-index-from-progress";

interface UseProcessScrollOptions {
  cardCount: number;
  enabled?: boolean;
}

function getPinScrollDistance(cardCount: number): number {
  const stepVh = readRootCssNumber("--process-scroll-step-vh", 85);
  const steps = Math.max(cardCount - 1, 0);

  return (steps * stepVh * window.innerHeight) / 100;
}

export function useProcessScroll({
  cardCount,
  enabled = true,
}: UseProcessScrollOptions) {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pinStartRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const setActiveIndexSafe = useCallback(
    (index: number) => {
      const nextIndex = clampActiveIndex(index, cardCount);

      if (nextIndex === activeIndexRef.current) {
        return;
      }

      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    },
    [cardCount],
  );

  const resetToFirstCard = useCallback(() => {
    activeIndexRef.current = 0;
    setActiveIndex(0);
  }, []);

  useGSAP(
    () => {
      if (
        !enabled ||
        cardCount === 0 ||
        !containerRef.current ||
        !stageRef.current ||
        !pinStartRef.current
      ) {
        return;
      }

      const stageElement = stageRef.current;
      const pinStartElement = pinStartRef.current;
      const matchMedia = gsap.matchMedia();

      matchMedia.add(DESKTOP_MEDIA_QUERY, () => {
        const pinStartOffset = readRootCssNumber("--process-pin-start-offset", 0);

        const pinTrigger = ScrollTrigger.create({
          trigger: stageElement,
          pin: stageElement,
          pinSpacing: true,
          anticipatePin: 1,
          refreshPriority: -1,
          start: `top top+=${pinStartOffset}`,
          end: () => `+=${getPinScrollDistance(cardCount)}`,
          invalidateOnRefresh: true,
          onEnter: (self) => {
            syncActiveIndexFromProgress(self.progress, cardCount, setActiveIndexSafe);
          },
          onEnterBack: (self) => {
            syncActiveIndexFromProgress(self.progress, cardCount, setActiveIndexSafe);
          },
          onLeaveBack: resetToFirstCard,
          onToggle: (self) => {
            if (!self.isActive) {
              return;
            }

            syncActiveIndexFromProgress(self.progress, cardCount, setActiveIndexSafe);
          },
          onUpdate: (self) => {
            syncActiveIndexFromProgress(self.progress, cardCount, setActiveIndexSafe);
          },
        });

        const syncPinTrigger = () => {
          pinTrigger.refresh();

          if (pinTrigger.isActive) {
            syncActiveIndexFromProgress(pinTrigger.progress, cardCount, setActiveIndexSafe);
          }
        };

        const resizeObserver =
          typeof ResizeObserver !== "undefined"
            ? new ResizeObserver(() => {
                syncPinTrigger();
              })
            : null;

        resizeObserver?.observe(stageElement);
  resizeObserver?.observe(pinStartElement);

        requestAnimationFrame(syncPinTrigger);

        return () => {
          resizeObserver?.disconnect();
          pinTrigger.kill();
        };
      });

      return () => {
        matchMedia.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [enabled, cardCount, setActiveIndexSafe, resetToFirstCard],
      revertOnUpdate: false,
    },
  );

  return {
    containerRef,
    stageRef,
    pinStartRef,
    activeIndex,
  };
}