"use client";

import { useCallback, useRef, useState } from "react";

import { DESKTOP_MEDIA_QUERY } from "@/lib/breakpoints";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { readRootCssNumber } from "@/lib/read-css-var";
import { syncScrollTriggersAfterReset } from "@/lib/scroll-session";
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

function getPinCoverDistance(serviceCount: number): number {
  return getPinScrollDistance(serviceCount) + readRootCssNumber("--services-ai-cover-buffer", 0);
}

export function useActiveService({
  serviceCount,
  enabled = true,
}: UseActiveServiceOptions) {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pinStartRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousActiveIndex, setPreviousActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const setActiveIndexSafe = useCallback(
    (index: number) => {
      const nextIndex = clampActiveIndex(index, serviceCount);

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
    setActiveIndex(0);
  }, []);

  useGSAP(
    () => {
      if (
        !enabled ||
        serviceCount === 0 ||
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
        if (!stageElement.isConnected || !stageElement.parentNode || !pinStartElement.isConnected) {
          return;
        }

        let isDisposed = false;
        const pinStartOffset = readRootCssNumber("--services-pin-start-offset", 0);
        const syncServiceProgress = (self: ScrollTrigger) => {
          const baseDistance = Math.max(getPinScrollDistance(serviceCount), 1);
          const coverDistance = Math.max(getPinCoverDistance(serviceCount), baseDistance);
          const progress = Math.min((self.progress * coverDistance) / baseDistance, 1);

          syncActiveIndexFromProgress(progress, serviceCount, setActiveIndexSafe);
        };

        const pinTrigger = ScrollTrigger.create({
          trigger: stageElement,
          pin: stageElement,
          pinSpacing: false,
          anticipatePin: 1,
          fastScrollEnd: false,
          refreshPriority: -1,
          start: `top top+=${pinStartOffset}`,
          end: () => `+=${getPinCoverDistance(serviceCount)}`,
          invalidateOnRefresh: true,
          onEnter: (self) => {
            syncServiceProgress(self);
          },
          onEnterBack: (self) => {
            syncServiceProgress(self);
          },
          onLeaveBack: resetToFirstService,
          onToggle: (self) => {
            if (!self.isActive) {
              return;
            }

            syncServiceProgress(self);
          },
          onUpdate: (self) => {
            syncServiceProgress(self);
          },
        });

        const syncPinTrigger = () => {
          if (isDisposed || !stageElement.isConnected) {
            return;
          }

          pinTrigger.refresh();
          ScrollTrigger.refresh();

          if (pinTrigger.isActive) {
            syncServiceProgress(pinTrigger);
          }
        };

        const handleWindowLoad = () => {
          syncPinTrigger();
          syncScrollTriggersAfterReset();
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
        syncScrollTriggersAfterReset();

        if (document.readyState === "complete") {
          requestAnimationFrame(syncPinTrigger);
          syncScrollTriggersAfterReset();
        } else {
          window.addEventListener("load", handleWindowLoad, { once: true });
        }

        return () => {
          isDisposed = true;
          window.removeEventListener("load", handleWindowLoad);
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
      dependencies: [enabled, serviceCount, setActiveIndexSafe, resetToFirstService],
      revertOnUpdate: false,
    },
  );

  return {
    containerRef,
    stageRef,
    pinStartRef,
    activeIndex,
    previousActiveIndex,
    setActiveIndex: setActiveIndexSafe,
  };
}
