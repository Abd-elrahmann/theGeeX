"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { setExploreCursorZone } from "@/lib/explore-cursor-state";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { POINTER_FINE_MEDIA_QUERY, TABLET_MEDIA_QUERY } from "@/lib/breakpoints";
import { useMediaQuery } from "@/hooks/use-media-query";
import { isPointInsideElement } from "@/features/services/lib/services-cursor-zone";

import { storytellingItems } from "@/features/storytelling/constants/storytelling";
import { usePreloadStorytellingImages } from "@/features/storytelling/hooks/use-preload-storytelling-images";
import { useStorytellingScroll } from "@/features/storytelling/hooks/use-storytelling-scroll";
import { StorytellingBackground } from "./storytelling-background";
import { StorytellingContent } from "./storytelling-content";
import { StorytellingPath } from "./storytelling-path";

export function StorytellingSection() {
  const isDesktop = useDesktopBreakpoint();
  const isTablet = useMediaQuery(TABLET_MEDIA_QUERY);
  const isMobile = !isDesktop && !isTablet;
  const isPointerFine = useMediaQuery(POINTER_FINE_MEDIA_QUERY);
  const usesDesktopVisualLayout = isDesktop || isTablet;
  const layoutMode = isDesktop ? "desktop" : isTablet ? "tablet" : "mobile";
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const isDesktopBackgroundActiveRef = useRef(false);
  const lastPointerRef = useRef({ x: -1, y: -1 });
  usePreloadStorytellingImages(storytellingItems);
  const {
    containerRef,
    stageRef,
    pinStartRef,
    activeIndex,
    previousActiveIndex,
    drawProgress,
    transitionDirection,
    backgroundRef,
    setActiveIndex,
  } =
    useStorytellingScroll({
      itemCount: storytellingItems.length,
      layoutMode,
      pinEnabled: isLayoutReady,
      backgroundEnabled: isMobile,
      mobileBackgroundEnabled: !isMobile,
    });

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setIsLayoutReady(true);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!isLayoutReady || !isDesktop) {
      return;
    }

    let frameId = 0;
    const backgroundElement = backgroundRef.current;

    const applyDesktopBackgroundState = (isActive: boolean) => {
      if (isDesktopBackgroundActiveRef.current === isActive) {
        return;
      }

      isDesktopBackgroundActiveRef.current = isActive;

      if (backgroundElement) {
        backgroundElement.style.opacity = isActive ? "1" : "0";
      }
    };

    const syncDesktopBackgroundState = () => {
      frameId = 0;

      const triggerElement = stageRef.current ?? containerRef.current;

      if (!triggerElement) {
        applyDesktopBackgroundState(false);
        return;
      }

      const rect = triggerElement.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const isActive = rect.top <= viewportCenter && rect.bottom >= viewportCenter;

      applyDesktopBackgroundState(isActive);
    };

    const requestSync = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(syncDesktopBackgroundState);
    };

    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      isDesktopBackgroundActiveRef.current = false;

      if (backgroundElement) {
        backgroundElement.style.opacity = "0";
      }

      document.documentElement.style.setProperty(
        "--storytelling-page-background-opacity",
        "0",
      );
    };
  }, [backgroundRef, containerRef, isDesktop, isLayoutReady, stageRef]);

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    document.documentElement.style.setProperty(
      "--storytelling-page-background-opacity",
      "0",
    );

    return () => {
      document.documentElement.style.setProperty(
        "--storytelling-page-background-opacity",
        "0",
      );
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isDesktop || !isPointerFine) {
      return;
    }

    const sectionElement = containerRef.current;

    if (!sectionElement) {
      return;
    }

    const deactivateExploreCursor = () => {
      const { x, y } = lastPointerRef.current;

      if (x < 0) {
        return;
      }

      if (isPointInsideElement(x, y, sectionElement)) {
        setExploreCursorZone("none");
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      deactivateExploreCursor();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", deactivateExploreCursor, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", deactivateExploreCursor);
    };
  }, [containerRef, isDesktop, isPointerFine, isLayoutReady]);

  return (
    <section
      ref={containerRef}
      id="storytelling"
      className={cn(
        "relative isolate z-(--storytelling-section-z-index) w-full overflow-x-clip",
        usesDesktopVisualLayout ? "overflow-y-visible lg:overflow-x-visible" : "overflow-y-visible",
        "px-(--storytelling-section-padding-x)",
        "mt-(--storytelling-margin-top)",
        isDesktop && isPointerFine && "cursor-none",
      )}
      aria-label="Storytelling"
    >
      {isDesktop || isMobile ? <StorytellingBackground ref={backgroundRef} /> : null}

      {isDesktop ? (
        <div
          ref={stageRef}
          className={cn(
            "relative z-(--storytelling-stage-z-index) mx-auto flex w-full",
            "max-w-(--storytelling-content-max-width)",
            "min-h-(--storytelling-stage-min-height) items-center justify-center",
            "py-(--storytelling-section-padding-y)",
          )}
        >
          <StorytellingPath drawProgress={drawProgress} />
          <StorytellingContent
            items={storytellingItems}
            activeIndex={activeIndex}
            previousActiveIndex={previousActiveIndex}
            transitionDirection={transitionDirection}
          />
        </div>
      ) : (
        <div
          className="relative mx-auto w-full max-w-(--storytelling-content-max-width)"
          style={{
            minHeight: isTablet
              ? "calc(100svh + var(--storytelling-mobile-scroll-distance, 2800px) + var(--storytelling-mobile-scroll-offset, 700px))"
              : "calc(100svh + var(--storytelling-mobile-scroll-distance, 2800px) + var(--storytelling-mobile-scroll-offset, 700px) + var(--storytelling-mobile-background-extension, 0px))",
          }}
        >
          <div
            ref={pinStartRef}
            id="storytelling-pin-start"
            aria-hidden
            className="pointer-events-none h-px w-full shrink-0"
          />

          <div
            ref={stageRef}
            className={cn(
              "relative h-svh overflow-x-clip overflow-y-visible py-(--storytelling-section-padding-y)",
              isMobile && "sticky top-0",
            )}
          >
            <div
              className={cn(
                "relative z-(--storytelling-stage-z-index) mx-auto flex h-full w-full",
                "max-w-(--storytelling-content-max-width) flex-col items-center justify-center",
              )}
            >
              {isTablet ? (
                <StorytellingPath drawProgress={drawProgress} reverseDraw className="origin-center -scale-y-100" />
              ) : (
                <StorytellingPath
                  drawProgress={drawProgress}
                  useDefaultTopOffset={false}
                  className="top-8.75 left-1/2 h-151.5 w-197.5 max-w-none origin-center -translate-x-1/2 rotate-91"
                />
              )}
              <StorytellingContent
                items={storytellingItems}
                activeIndex={activeIndex}
                previousActiveIndex={previousActiveIndex}
                transitionDirection={transitionDirection}
                variant={isTablet ? "desktop" : "mobile"}
                onSelectIndex={isTablet ? undefined : setActiveIndex}
              />
            </div>
          </div>
        </div>
      )}

      {isDesktop ? (
        <>
          <div
            ref={pinStartRef}
            id="storytelling-pin-start"
            aria-hidden
            className="pointer-events-none h-px w-full shrink-0"
          />

          <div
            aria-hidden
            className="h-(--storytelling-stage-bottom-padding) w-full shrink-0"
          />
        </>
      ) : null}
    </section>
  );
}
