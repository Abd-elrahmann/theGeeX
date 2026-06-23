"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { setExploreCursorZone } from "@/lib/explore-cursor-state";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { POINTER_FINE_MEDIA_QUERY } from "@/lib/breakpoints";
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
  const isPointerFine = useMediaQuery(POINTER_FINE_MEDIA_QUERY);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const lastPointerRef = useRef({ x: -1, y: -1 });
  usePreloadStorytellingImages(storytellingItems);
  const {
    containerRef,
    stageRef,
    pinStartRef,
    activeIndex,
    previousActiveIndex,
    drawProgress,
    isDark,
    transitionDirection,
    setActiveIndex,
  } =
    useStorytellingScroll({
      itemCount: storytellingItems.length,
      pinEnabled: isLayoutReady,
      backgroundEnabled: isLayoutReady,
      mobileBackgroundEnabled: true,
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
        "relative isolate w-full overflow-x-clip transition-colors",
        isDesktop ? "overflow-y-visible lg:overflow-x-visible" : "overflow-y-clip",
        "px-(--storytelling-section-padding-x)",
        isDesktop ? "mt-(--storytelling-margin-top)" : "pt-(--storytelling-margin-top)",
        !isDesktop && "z-[20]",
        !isDesktop && isDark && "bg-(--color-storytelling-background-dark)",
        isDesktop && isPointerFine && "cursor-none",
      )}
      aria-label="Storytelling"
    >
      <StorytellingBackground isDark={isDark} />

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
            minHeight:
              "calc(100svh + var(--storytelling-mobile-scroll-distance, 2800px) + var(--storytelling-mobile-scroll-offset, 700px))",
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
            className="relative h-svh overflow-visible py-(--storytelling-section-padding-y)"
          >
            <div
              className={cn(
                "relative z-(--storytelling-stage-z-index) mx-auto flex h-full w-full",
                "max-w-(--storytelling-content-max-width) flex-col items-center justify-center",
              )}
            >
              <StorytellingPath
                drawProgress={drawProgress}
                className="top-[calc(-1*var(--storytelling-path-inset-y))] left-1/2 h-[calc(100%+2*var(--storytelling-path-inset-y))] w-auto max-w-none -translate-x-1/2 rotate-[91deg]"
              />
              <StorytellingContent
                items={storytellingItems}
                activeIndex={activeIndex}
                previousActiveIndex={previousActiveIndex}
                transitionDirection={transitionDirection}
                variant="mobile"
                onSelectIndex={setActiveIndex}
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
