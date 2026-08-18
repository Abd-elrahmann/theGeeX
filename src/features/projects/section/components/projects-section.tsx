"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";

import { ExploreSectionCursor } from "@/components/shared/cursor";
import { exploreCursorTransition } from "@/components/shared/cursor/constants/cursor.config";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { useMobileViewportResizeGate } from "@/hooks/use-mobile-viewport-resize-gate";
import { useMobileScrollStepGuard } from "@/hooks/use-mobile-scroll-step-guard";
import { useMediaQuery } from "@/hooks/use-media-query";
import { POINTER_FINE_MEDIA_QUERY } from "@/lib/breakpoints";
import { cn } from "@/lib/cn";
import { setExploreCursorZone } from "@/lib/explore-cursor-state";
import { isIosSafari } from "@/lib/is-ios-safari";
import { readRootCssNumber } from "@/lib/read-css-var";

import { ProjectCard } from "./project-card";
import { ProjectsTitle } from "./projects-title";
import {
  projects,
  projectsCursorLabel,
  projectsFirstCardEnterProgress,
  projectsFirstCardLiftDistance,
} from "@/features/projects/constants/projects";

const projectCursorZoneSelector = "[data-project-cursor-zone]";

function getHoveredProjectCard(
  clientX: number,
  clientY: number,
  cardStackElement: HTMLElement,
): HTMLElement | null {
  const hoveredElement = document.elementFromPoint(clientX, clientY);

  if (!(hoveredElement instanceof HTMLElement)) {
    return null;
  }

  const hoveredProjectCard = hoveredElement.closest(projectCursorZoneSelector);

  if (!(hoveredProjectCard instanceof HTMLElement)) {
    return null;
  }

  return cardStackElement.contains(hoveredProjectCard) ? hoveredProjectCard : null;
}

function getMainAnimationEnd(): number {
  const scrollVh = readRootCssNumber("--projects-section-scroll-vh", 600);
  const exitVh = readRootCssNumber("--projects-section-exit-vh", 100);

  return scrollVh / (scrollVh + exitVh);
}

function getProjectsStickyTop(): number {
  return readRootCssNumber("--projects-section-sticky-top", 0);
}

function easeOutCubic(value: number): number {
  return 1 - Math.pow(1 - value, 3);
}

function getCardEnterRange(
  index: number,
  totalCards: number,
): { enterStart: number; enterEnd: number } {
  if (totalCards <= 1) {
    return { enterStart: 0, enterEnd: 1 };
  }

  const firstCardSpan = Math.min(projectsFirstCardEnterProgress, 1);

  if (index === 0) {
    return { enterStart: 0, enterEnd: firstCardSpan };
  }

  const remainingCards = totalCards - 1;
  const remainingSpan = Math.max(1 - firstCardSpan, 0) / remainingCards;
  const enterStart = firstCardSpan + (index - 1) * remainingSpan;

  return {
    enterStart,
    enterEnd: Math.min(enterStart + remainingSpan, 1),
  };
}

function getProjectStepProgressPoints(totalCards: number, mainAnimationEnd: number): number[] {
  const stepPoints = [0];

  for (let index = 0; index < totalCards; index += 1) {
    const rawProgress = Math.min(getCardEnterRange(index, totalCards).enterEnd * mainAnimationEnd, mainAnimationEnd);

    if (rawProgress - stepPoints[stepPoints.length - 1] > 0.001) {
      stepPoints.push(rawProgress);
    }
  }

  return stepPoints;
}

function resolveProjectStepPointIndex(progress: number, stepPoints: number[]): number {
  let resolvedIndex = 0;

  for (let index = 0; index < stepPoints.length; index += 1) {
    if (progress + 0.001 >= stepPoints[index]) {
      resolvedIndex = index;
      continue;
    }

    break;
  }

  return resolvedIndex;
}

function getProjectScrollTarget(sectionElement: HTMLElement, progress: number): number {
  const sectionTop = sectionElement.getBoundingClientRect().top + window.scrollY;
  const scrollDistance = Math.max(sectionElement.offsetHeight - window.innerHeight, 0);

  return sectionTop + progress * scrollDistance;
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardStackRef = useRef<HTMLDivElement>(null);
  const lastPointerRef = useRef({ x: -1, y: -1 });
  const hoverScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLenisScrollingRef = useRef(false);
  const lenis = useLenis();
  const isDesktop = useDesktopBreakpoint();
  const isPointerFine = useMediaQuery(POINTER_FINE_MEDIA_QUERY);
  const [isIosSafariDevice, setIsIosSafariDevice] = useState(false);
  const [mainAnimationEnd, setMainAnimationEnd] = useState(getMainAnimationEnd);
  const [stickyTopOffset, setStickyTopOffset] = useState(getProjectsStickyTop);
  const [isCardStackHovered, setIsCardStackHovered] = useState(false);
  const projectStepPointIndexRef = useRef(0);
  const shouldHandleViewportResize = useMobileViewportResizeGate({
    ignoreHeightOnlyResize: !isDesktop,
  });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const isExploreCursorActive = isDesktop && isPointerFine && isCardStackHovered;

  const animationProgress = useTransform(scrollYProgress, (progress) =>
    Math.min(progress / mainAnimationEnd, 1),
  );

  const sectionLiftY = useTransform(animationProgress, (progress) => {
    const firstCardLiftProgress = Math.max(projectsFirstCardEnterProgress, Number.EPSILON);
    const liftProgress = Math.min(progress / firstCardLiftProgress, 1);
    const liftDistance = isDesktop
      ? projectsFirstCardLiftDistance
      : projectsFirstCardLiftDistance * 0.28;

    return -easeOutCubic(liftProgress) * liftDistance;
  });

  const exitProgress = useTransform(scrollYProgress, (progress) => {
    if (progress <= mainAnimationEnd) {
      return 0;
    }

    return (progress - mainAnimationEnd) / (1 - mainAnimationEnd);
  });

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setIsIosSafariDevice(isIosSafari());
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  const {
    isGestureLockedRef: mobileGestureLockedRef,
    isStepHandledRef: mobileStepHandledRef,
    releaseGestureLock: releaseMobileGestureLock,
  } = useMobileScrollStepGuard({
    enabled: !isDesktop && isIosSafariDevice,
    elementRef: sectionRef,
    canHandleStep: (direction) => {
      const stepPoints = getProjectStepProgressPoints(projects.length, mainAnimationEnd);
      const currentStepPointIndex = projectStepPointIndexRef.current;
      const nextStepPointIndex = Math.max(
        0,
        Math.min(stepPoints.length - 1, currentStepPointIndex + direction),
      );

      return nextStepPointIndex !== currentStepPointIndex;
    },
    onStep: (direction) => {
      const stepPoints = getProjectStepProgressPoints(projects.length, mainAnimationEnd);
      const currentStepPointIndex = projectStepPointIndexRef.current;
      const nextStepPointIndex = Math.max(
        0,
        Math.min(stepPoints.length - 1, currentStepPointIndex + direction),
      );

      if (nextStepPointIndex === currentStepPointIndex) {
        return null;
      }

      const sectionElement = sectionRef.current;

      if (!sectionElement) {
        return null;
      }

      projectStepPointIndexRef.current = nextStepPointIndex;
      return getProjectScrollTarget(sectionElement, stepPoints[nextStepPointIndex] ?? 0);
    },
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (isDesktop || !isIosSafariDevice || mobileGestureLockedRef.current || mobileStepHandledRef.current) {
      return;
    }

    projectStepPointIndexRef.current = resolveProjectStepPointIndex(
      progress,
      getProjectStepProgressPoints(projects.length, mainAnimationEnd),
    );
  });

  useEffect(() => {
    const syncLayout = () => {
      if (!shouldHandleViewportResize()) {
        return;
      }

      setMainAnimationEnd(getMainAnimationEnd());
      setStickyTopOffset(getProjectsStickyTop());
      lenis?.resize();
    };

    syncLayout();
    window.addEventListener("resize", syncLayout);

    return () => {
      window.removeEventListener("resize", syncLayout);
    };
  }, [isDesktop, lenis, shouldHandleViewportResize]);

  useEffect(() => {
    return () => {
      releaseMobileGestureLock();
    };
  }, [releaseMobileGestureLock]);

  const syncCardStackHoverFromPointer = useCallback((clientX: number, clientY: number) => {
    const cardStackElement = cardStackRef.current;

    if (!cardStackElement) {
      setIsCardStackHovered(false);
      return;
    }

    setIsCardStackHovered(getHoveredProjectCard(clientX, clientY, cardStackElement) !== null);
  }, []);

  useEffect(() => {
    if (!lenis) {
      return;
    }

    const handleLenisScroll = () => {
      isLenisScrollingRef.current = true;
      setIsCardStackHovered(false);

      if (hoverScrollTimeoutRef.current) {
        clearTimeout(hoverScrollTimeoutRef.current);
      }

      hoverScrollTimeoutRef.current = setTimeout(() => {
        isLenisScrollingRef.current = false;
        hoverScrollTimeoutRef.current = null;

        const { x, y } = lastPointerRef.current;

        if (x >= 0 && y >= 0) {
          syncCardStackHoverFromPointer(x, y);
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
    };
  }, [lenis, syncCardStackHoverFromPointer]);

  useEffect(() => {
    if (!isDesktop || !isPointerFine) {
      setExploreCursorZone("none");
      return;
    }

    setExploreCursorZone(isExploreCursorActive ? "projects" : "none");

    return () => {
      setExploreCursorZone("none");
    };
  }, [isDesktop, isExploreCursorActive, isPointerFine]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Projects"
      className={cn(
        "relative isolate z-(--projects-section-z-index) mx-auto w-full overflow-visible",
        "mt-(--projects-margin-top)",
        "perspective-(--projects-section-perspective)",
        isDesktop && isPointerFine && "cursor-none",
      )}
      style={
        isDesktop
          ? stickyTopOffset > 0
            ? { marginTop: `calc(var(--projects-margin-top) + ${stickyTopOffset}px)` }
            : undefined
          : { touchAction: "pan-y" }
      }
      onMouseLeave={() => {
        setIsCardStackHovered(false);
      }}
      onMouseMove={(event) => {
        lastPointerRef.current = { x: event.clientX, y: event.clientY };

        if (isLenisScrollingRef.current) {
          return;
        }

        syncCardStackHoverFromPointer(event.clientX, event.clientY);
      }}
    >
      <div className="relative w-full">
        <>
          <div className="relative h-(--projects-section-scroll-height) w-full">
            <motion.div
              className={cn(
                "sticky top-(--projects-section-sticky-top) grid h-svh min-h-svh w-full overflow-visible",
                "grid-rows-[auto_minmax(0,1fr)] gap-(--projects-title-gap)",
              )}
              style={{ y: sectionLiftY }}
            >
              <ProjectsTitle />

              <div className="relative z-(--projects-card-stack-z-index) min-h-0 overflow-visible p-(--projects-card-outer-padding)">
                <div
                  ref={cardStackRef}
                  className="pointer-events-none relative mx-auto h-(--projects-card-height) w-full"
                >
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      totalCards={projects.length}
                      scrollProgress={animationProgress}
                      exitProgress={exitProgress}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div
            aria-hidden
            className="h-(--projects-section-exit-padding) w-full shrink-0"
          />
        </>
      </div>

      <ExploreSectionCursor
        isVisible={isExploreCursorActive}
        label={projectsCursorLabel}
        transition={exploreCursorTransition}
      />
    </section>
  );
}
