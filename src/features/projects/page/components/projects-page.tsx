"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

import { ExploreSectionCursor } from "@/components/shared/cursor";
import { exploreCursorTransition } from "@/components/shared/cursor/constants/cursor.config";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { useMediaQuery } from "@/hooks/use-media-query";
import { POINTER_FINE_MEDIA_QUERY } from "@/lib/breakpoints";
import { cn } from "@/lib/cn";
import { setExploreCursorZone } from "@/lib/explore-cursor-state";

import { ProjectPageCard } from "./project-page-card";
import {
  projects,
  projectsCursorLabel,
  projectsPageDescription,
  projectsPageTitle,
} from "@/features/projects/constants/projects";

const projectCursorZoneSelector = "[data-project-cursor-zone]";

function isPointerOverProjectCard(
  clientX: number,
  clientY: number,
  cardStackElement: HTMLElement,
): boolean {
  const hoveredElement = document.elementFromPoint(clientX, clientY);

  if (!(hoveredElement instanceof HTMLElement)) {
    return false;
  }

  const hoveredProjectCard = hoveredElement.closest(projectCursorZoneSelector);

  return hoveredProjectCard instanceof HTMLElement && cardStackElement.contains(hoveredProjectCard);
}

export function ProjectsPage() {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useDesktopBreakpoint();
  const isPointerFine = useMediaQuery(POINTER_FINE_MEDIA_QUERY);
  const [isCardStackHovered, setIsCardStackHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: cardStackRef,
    offset: ["start end", "end start"],
  });
  const isExploreCursorActive = isDesktop && isPointerFine && isCardStackHovered;

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
    <main
      className={cn(
        "relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--projects-page-top-padding)",
        isDesktop && isPointerFine && "cursor-none",
      )}
      onMouseLeave={() => {
        setIsCardStackHovered(false);
      }}
    >
      <section
        aria-labelledby="projects-page-title"
        className="box-border flex h-min w-full flex-col content-center items-center justify-center gap-8 overflow-visible rounded-none pt-(--projects-page-padding-top) pb-(--projects-page-padding-bottom) md:gap-(--projects-page-section-gap)"
      >
        <header
          className="relative mx-auto flex min-h-0 w-full max-w-(--projects-page-container-max-width) flex-col items-center justify-start gap-(--projects-page-hero-gap)"
          style={{ paddingInline: "var(--projects-page-padding-x)" }}
        >
          <h1
            id="projects-page-title"
            className="m-0 h-auto w-full max-w-(--projects-page-title-max-width) whitespace-pre-wrap wrap-break-word text-center font-cal-sans text-(length:--projects-page-title-size) leading-(--projects-page-title-line-height) font-semibold tracking-normal text-(--projects-page-hero-text-color) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]"
          >
            {projectsPageTitle}
          </h1>

          <p className="m-0 h-auto w-full max-w-(--projects-page-description-max-width) whitespace-pre-wrap wrap-break-word text-center font-poppins text-(length:--projects-page-description-size) leading-(--projects-page-description-line-height) font-normal tracking-normal text-(--projects-page-hero-text-color) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
            {projectsPageDescription}
          </p>
        </header>

        <div
          ref={cardStackRef}
          className="mx-auto flex w-full max-w-(--projects-page-container-max-width) flex-col gap-(--projects-page-cards-gap)"
          style={{ paddingInline: "var(--projects-page-padding-x)" }}
          onMouseMove={(event) => {
            const cardStackElement = cardStackRef.current;

            if (!cardStackElement) {
              setIsCardStackHovered(false);
              return;
            }

            setIsCardStackHovered(isPointerOverProjectCard(event.clientX, event.clientY, cardStackElement));
          }}
          onMouseLeave={() => {
            setIsCardStackHovered(false);
          }}
        >
          {projects.map((project, index) => (
            <ProjectPageCard
              key={project.id}
              project={project}
              index={index}
              totalCards={projects.length}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </section>

      <ExploreSectionCursor
        isVisible={isExploreCursorActive}
        label={projectsCursorLabel}
        transition={exploreCursorTransition}
      />
    </main>
  );
}