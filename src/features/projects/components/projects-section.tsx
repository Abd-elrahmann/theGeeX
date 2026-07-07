"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { useScroll, useTransform } from "framer-motion";

import { ExploreSectionCursor } from "@/components/shared/cursor";
import { exploreCursorTransition } from "@/components/shared/cursor/constants/cursor.config";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { useMediaQuery } from "@/hooks/use-media-query";
import { POINTER_FINE_MEDIA_QUERY } from "@/lib/breakpoints";
import { cn } from "@/lib/cn";
import { setExploreCursorZone } from "@/lib/explore-cursor-state";
import { readRootCssNumber } from "@/lib/read-css-var";

import { ProjectCard } from "@/features/projects/components/project-card";
import { ProjectsTitle } from "@/features/projects/components/projects-title";
import {
  projects,
  projectsCursorLabel,
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

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardStackRef = useRef<HTMLDivElement>(null);
  const lastPointerRef = useRef({ x: -1, y: -1 });
  const hoverScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLenisScrollingRef = useRef(false);
  const lenis = useLenis();
  const isDesktop = useDesktopBreakpoint();
  const isPointerFine = useMediaQuery(POINTER_FINE_MEDIA_QUERY);
  const [mainAnimationEnd, setMainAnimationEnd] = useState(getMainAnimationEnd);
  const [isCardStackHovered, setIsCardStackHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const isExploreCursorActive = isDesktop && isPointerFine && isCardStackHovered;

  const animationProgress = useTransform(scrollYProgress, (progress) =>
    Math.min(progress / mainAnimationEnd, 1),
  );

  const exitProgress = useTransform(scrollYProgress, (progress) => {
    if (progress <= mainAnimationEnd) {
      return 0;
    }

    return (progress - mainAnimationEnd) / (1 - mainAnimationEnd);
  });

  useEffect(() => {
    const syncLayout = () => {
      setMainAnimationEnd(getMainAnimationEnd());
      lenis?.resize();
    };

    syncLayout();
    window.addEventListener("resize", syncLayout);

    return () => {
      window.removeEventListener("resize", syncLayout);
    };
  }, [lenis]);

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
        <div className="relative h-(--projects-section-scroll-height) w-full">
          <div
            className={cn(
              "sticky top-0 grid h-svh min-h-svh w-full overflow-visible",
              "grid-rows-[auto_minmax(0,1fr)] gap-(--projects-title-gap)",
            )}
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
          </div>
        </div>

        <div
          aria-hidden
          className="h-(--projects-section-exit-padding) w-full shrink-0"
        />
      </div>

      <ExploreSectionCursor
        isVisible={isExploreCursorActive}
        label={projectsCursorLabel}
        transition={exploreCursorTransition}
      />
    </section>
  );
}
