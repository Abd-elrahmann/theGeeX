"use client";

import { useCallback, useRef, useState } from "react";

import { DESKTOP_MEDIA_QUERY, SUB_DESKTOP_MEDIA_QUERY } from "@/lib/breakpoints";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { readRootCssNumber } from "@/lib/read-css-var";
import { syncScrollTriggersAfterReset } from "@/lib/scroll-session";
import {
  clampActiveIndex,
  syncActiveIndexFromProgress,
} from "@/lib/sync-active-index-from-progress";

import { storytellingConfig } from "@/features/storytelling/constants/storytelling.config";

interface UseStorytellingScrollOptions {
  itemCount: number;
  layoutMode: "desktop" | "tablet" | "mobile";
  pinEnabled?: boolean;
  backgroundEnabled?: boolean;
  mobileBackgroundEnabled?: boolean;
  onDrawProgress?: (progress: number) => void;
}

export function useStorytellingScroll({
  itemCount,
  layoutMode,
  pinEnabled = true,
  backgroundEnabled = true,
  mobileBackgroundEnabled = true,
  onDrawProgress,
}: UseStorytellingScrollOptions) {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pinStartRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousActiveIndex, setPreviousActiveIndex] = useState(0);
  const [drawProgress, setDrawProgress] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<1 | -1>(1);
  const activeIndexRef = useRef(0);
  const backgroundDarkRef = useRef(false);

  const setActiveIndexSafe = useCallback(
    (index: number) => {
      const nextIndex = clampActiveIndex(index, itemCount);
      const currentIndex = activeIndexRef.current;

      if (nextIndex === currentIndex) {
        return;
      }

      setPreviousActiveIndex(currentIndex);
      setTransitionDirection(nextIndex > currentIndex ? 1 : -1);
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    },
    [itemCount],
  );

  const resetToFirstItem = useCallback(() => {
    activeIndexRef.current = 0;
    setPreviousActiveIndex(0);
    setTransitionDirection(-1);
    setActiveIndex(0);
    setDrawProgress(0);
    onDrawProgress?.(0);
  }, [onDrawProgress]);

  const syncProgress = useCallback(
    (progress: number) => {
      setDrawProgress(progress);
      onDrawProgress?.(progress);
      syncActiveIndexFromProgress(progress, itemCount, setActiveIndexSafe);
    },
    [itemCount, onDrawProgress, setActiveIndexSafe],
  );

  const setBackgroundDark = useCallback((isActive: boolean) => {
    const backgroundElement = backgroundRef.current;

    if (!backgroundElement) {
      return;
    }

    if (backgroundDarkRef.current === isActive) {
      return;
    }

    backgroundDarkRef.current = isActive;

    gsap.set(backgroundElement, {
      opacity: isActive ? 1 : 0,
      overwrite: "auto",
    });
  }, []);

  const setPageBackgroundOpacity = useCallback((opacity: number) => {
    const clampedOpacity = Math.max(0, Math.min(opacity, 1));

    backgroundDarkRef.current = clampedOpacity > 0;
    document.documentElement.style.setProperty(
      "--storytelling-page-background-opacity",
      clampedOpacity.toString(),
    );
  }, []);

  useGSAP(
    () => {
      if (
        itemCount === 0 ||
        !containerRef.current ||
        !stageRef.current ||
        !pinStartRef.current
      ) {
        return;
      }

      const stageElement = stageRef.current;
      const pinStartElement = pinStartRef.current;
      const containerElement = containerRef.current;
      const { scroll } = storytellingConfig;
      const matchMedia = gsap.matchMedia();

      matchMedia.add(SUB_DESKTOP_MEDIA_QUERY, () => {
        if (!pinEnabled) {
          return undefined;
        }

        const mobileScrollElement = pinStartElement.parentElement ?? stageElement;
        const mobileBackgroundStartTrigger = containerElement.previousElementSibling ?? containerElement;
        const usesNativeStickyMobileStage = layoutMode === "mobile";
        const getMobileProgressDistance = () => {
          const distance = readRootCssNumber(
            "--storytelling-mobile-scroll-distance",
            2800,
          );
          const offset = readRootCssNumber(
            "--storytelling-mobile-scroll-offset",
            700,
          );

          return distance + offset;
        };
        const getMobileBackgroundExtension = () =>
          mobileBackgroundEnabled
            ? readRootCssNumber("--storytelling-mobile-background-extension", 0)
            : 0;
        const getMobileProgressStartOffset = () =>
          readRootCssNumber("--storytelling-mobile-progress-start-offset", 0);
        const getMobileBackgroundStartOffset = () =>
          readRootCssNumber("--storytelling-mobile-background-start-offset", 0);
        const getMobileBackgroundViewportDelayRatio = () =>
          readRootCssNumber("--storytelling-mobile-background-viewport-delay-ratio", 0);
        const getMobileBackgroundFadeDistance = () =>
          Math.max(
            readRootCssNumber("--storytelling-mobile-background-fade-distance", 240),
            1,
          );
        const syncMobileProgress = (self: ScrollTrigger) => {
          const progressDistance = getMobileProgressDistance();
          const totalDistance = progressDistance + getMobileBackgroundExtension();
          const progressEnd = totalDistance > 0 ? progressDistance / totalDistance : 1;

          syncProgress(progressEnd < 1 ? Math.min(self.progress / progressEnd, 1) : self.progress);
        };
        const syncMobileBackground = (self: ScrollTrigger) => {
          const scrollDistance = Math.max(self.end - self.start, 1);
          const fadeProgress = Math.min(getMobileBackgroundFadeDistance() / scrollDistance, 0.5);
          const progress = self.progress;

          if (progress <= fadeProgress) {
            setPageBackgroundOpacity(progress / fadeProgress);
            return;
          }

          if (progress >= 1 - fadeProgress) {
            setPageBackgroundOpacity((1 - progress) / fadeProgress);
            return;
          }

          setPageBackgroundOpacity(1);
        };

        const mobileBackgroundTrigger = mobileBackgroundEnabled
          ? ScrollTrigger.create({
              trigger: mobileScrollElement,
              start: storytellingConfig.background.mobileTriggerStart,
              end: storytellingConfig.background.mobileTriggerEnd,
              invalidateOnRefresh: true,
              onEnter: syncMobileBackground,
              onEnterBack: syncMobileBackground,
              onToggle: (self) => {
                if (self.isActive) {
                  syncMobileBackground(self);
                }
              },
              onUpdate: syncMobileBackground,
              onLeave: () => setPageBackgroundOpacity(0),
              onLeaveBack: () => setPageBackgroundOpacity(0),
            })
          : null;

        const mobileSectionBackgroundTrigger =
          !mobileBackgroundEnabled && backgroundEnabled
            ? ScrollTrigger.create({
                trigger: mobileBackgroundStartTrigger,
                start: () => {
                  const viewportDelay = window.innerHeight * getMobileBackgroundViewportDelayRatio();
                  return `bottom bottom-=${getMobileBackgroundStartOffset() + viewportDelay}`;
                },
                endTrigger: containerElement,
                end: "bottom top",
                invalidateOnRefresh: true,
                onEnter: () => setBackgroundDark(true),
                onEnterBack: () => setBackgroundDark(true),
                onLeave: () => setBackgroundDark(false),
                onLeaveBack: () => setBackgroundDark(false),
              })
            : null;

        const mobilePinTrigger = ScrollTrigger.create({
          trigger: pinStartElement,
          ...(usesNativeStickyMobileStage
            ? {}
            : {
                pin: stageElement,
                pinSpacing: false,
                anticipatePin: 1,
                fastScrollEnd: false,
                refreshPriority: -1,
              }),
          start: () => `top top+=${getMobileProgressStartOffset()}`,
          end: () => {
            return `+=${getMobileProgressDistance() + getMobileBackgroundExtension()}`;
          },
          invalidateOnRefresh: true,
          onEnter: (self) => {
            if (!mobileBackgroundEnabled && backgroundEnabled && !mobileSectionBackgroundTrigger) {
              setBackgroundDark(true);
            }

            syncMobileProgress(self);
          },
          onEnterBack: (self) => {
            if (!mobileBackgroundEnabled && backgroundEnabled && !mobileSectionBackgroundTrigger) {
              setBackgroundDark(true);
            }

            syncMobileProgress(self);
          },
          onLeave: () => {
            if (!mobileBackgroundEnabled && backgroundEnabled && !mobileSectionBackgroundTrigger) {
              setBackgroundDark(false);
            }
          },
          onLeaveBack: () => {
            if (!mobileBackgroundEnabled && backgroundEnabled && !mobileSectionBackgroundTrigger) {
              setBackgroundDark(false);
            }

            resetToFirstItem();
          },
          onToggle: (self) => {
            if (!self.isActive) {
              return;
            }

            syncMobileProgress(self);
          },
          onUpdate: (self) => {
            syncMobileProgress(self);
          },
        });

        if (mobileBackgroundEnabled) {
          if (mobileBackgroundTrigger?.isActive) {
            syncMobileBackground(mobileBackgroundTrigger);
          } else {
            setPageBackgroundOpacity(0);
          }
        } else if (backgroundEnabled) {
          setBackgroundDark(
            mobileSectionBackgroundTrigger?.isActive ?? mobilePinTrigger.isActive,
          );
        }

        const syncMobilePinTrigger = () => {
          if (mobileBackgroundEnabled) {
            if (mobileBackgroundTrigger?.isActive) {
              syncMobileBackground(mobileBackgroundTrigger);
            } else {
              setPageBackgroundOpacity(0);
            }
          } else if (backgroundEnabled) {
            setBackgroundDark(
              mobileSectionBackgroundTrigger?.isActive ?? mobilePinTrigger.isActive,
            );
          }

          if (mobilePinTrigger.isActive) {
            syncMobileProgress(mobilePinTrigger);
          }
        };

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          syncMobilePinTrigger();
        });
        syncScrollTriggersAfterReset();

        return () => {
          mobileBackgroundTrigger?.kill();
          mobileSectionBackgroundTrigger?.kill();
          mobilePinTrigger.kill();

          if (mobileBackgroundEnabled || backgroundEnabled) {
            if (mobileBackgroundEnabled) {
              setPageBackgroundOpacity(0);
            } else {
              setBackgroundDark(false);
            }
          }
        };
      });

      matchMedia.add(DESKTOP_MEDIA_QUERY, () => {
        if (!pinEnabled) {
          return undefined;
        }

        const scrollDistance = readRootCssNumber(
          "--storytelling-scroll-distance",
          scroll.distance,
        );
        const getDesktopBackgroundDistance = () => {
          const stageBottomPadding = readRootCssNumber(
            "--storytelling-stage-bottom-padding",
            48,
          );
          const sectionGap = readRootCssNumber("--storytelling-margin-top", 32);

          return scrollDistance + stageBottomPadding + sectionGap;
        };

        const backgroundTrigger = backgroundEnabled
          ? ScrollTrigger.create({
              trigger: containerElement,
              start: "center center",
              end: () => `+=${getDesktopBackgroundDistance()}`,
              invalidateOnRefresh: true,
              onEnter: () => setBackgroundDark(true),
              onEnterBack: () => setBackgroundDark(true),
              onLeave: () => setBackgroundDark(false),
              onLeaveBack: () => setBackgroundDark(false),
            })
          : null;

        const pinTrigger = ScrollTrigger.create({
          trigger: stageElement,
          pin: stageElement,
          pinSpacing: true,
          anticipatePin: 1,
          fastScrollEnd: false,
          refreshPriority: -1,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          onEnter: (self) => {
            syncProgress(self.progress);
          },
          onEnterBack: (self) => {
            syncProgress(self.progress);
          },
          onLeaveBack: () => {
            resetToFirstItem();
          },
          onToggle: (self) => {
            if (!self.isActive) {
              return;
            }

            syncProgress(self.progress);
          },
          onUpdate: (self) => {
            syncProgress(self.progress);
          },
        });

        if (backgroundEnabled) {
          setBackgroundDark(backgroundTrigger?.isActive ?? false);
        }

        const syncPinTrigger = () => {
          if (backgroundEnabled) {
            setBackgroundDark(backgroundTrigger?.isActive ?? false);
          }

          if (pinTrigger.isActive) {
            syncProgress(pinTrigger.progress);
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
          backgroundTrigger?.kill();
          pinTrigger.kill();

          if (backgroundEnabled) {
            setBackgroundDark(false);
          }
        };
      });

      return () => {
        matchMedia.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [
        layoutMode,
        pinEnabled,
        backgroundEnabled,
        mobileBackgroundEnabled,
        itemCount,
        resetToFirstItem,
        syncProgress,
        setBackgroundDark,
        setPageBackgroundOpacity,
      ],
      revertOnUpdate: true,
    },
  );

  return {
    containerRef,
    stageRef,
    pinStartRef,
    activeIndex,
    previousActiveIndex,
    drawProgress,
    transitionDirection,
    backgroundRef,
    setActiveIndex: setActiveIndexSafe,
    syncProgress,
  };
}
