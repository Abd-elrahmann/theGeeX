"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { POINTER_FINE_MEDIA_QUERY } from "@/lib/breakpoints";
import { cn } from "@/lib/cn";
import { setExploreCursorZone } from "@/lib/explore-cursor-state";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { useMediaQuery } from "@/hooks/use-media-query";

import { BlogsSectionCards } from "@/features/blogs/section/components/blogs-section-cards";
import { getHoveredBlogCard } from "@/features/blogs/section/utils/blogs-section";
import { BlogsSectionCursor } from "@/features/blogs/shared/components/blogs-section-cursor";
import { BlogsTitle } from "./blogs-title";

const blogCursorZoneSelector = "[data-blog-cursor-zone]";


export function BlogsSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const lastPointerRef = useRef({ x: -1, y: -1 });
  const isDesktop = useDesktopBreakpoint();
  const isPointerFine = useMediaQuery(POINTER_FINE_MEDIA_QUERY);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const isExploreCursorActive = isDesktop && isPointerFine && isCardHovered;

  const syncHoveredCardFromPointer = useCallback((clientX: number, clientY: number) => {
    const cardsElement = cardsRef.current;

    if (!cardsElement) {
      setIsCardHovered(false);
      return;
    }

    setIsCardHovered(getHoveredBlogCard(clientX, clientY, cardsElement) !== null);
  }, []);

  useEffect(() => {
    if (!isDesktop || !isPointerFine) {
      setExploreCursorZone("none");
      return;
    }

    setExploreCursorZone(isExploreCursorActive ? "blogs" : "none");

    return () => {
      setExploreCursorZone("none");
    };
  }, [isDesktop, isExploreCursorActive, isPointerFine]);

  useEffect(() => {
    if (!isDesktop || !isPointerFine) {
      return;
    }

    const handleScroll = () => {
      const { x, y } = lastPointerRef.current;

      if (x < 0) {
        return;
      }

      syncHoveredCardFromPointer(x, y);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDesktop, isPointerFine, syncHoveredCardFromPointer]);

  return (
    <section
      id="blogs"
      aria-label="Blogs"
      className={cn(
        "relative w-full overflow-visible bg-background",
        "mt-(--blogs-margin-top) px-(--blogs-padding-x) py-(--blogs-padding-y)",
        isDesktop && isPointerFine && "cursor-none",
      )}
      onMouseLeave={() => {
        setIsCardHovered(false);
      }}
      onMouseMove={(event) => {
        lastPointerRef.current = { x: event.clientX, y: event.clientY };
        syncHoveredCardFromPointer(event.clientX, event.clientY);
      }}
    >
      <div
        className={cn(
          "relative mx-auto grid w-full max-w-(--blogs-container-max-width)",
          "grid-cols-1 gap-(--blogs-section-gap) overflow-visible",
          "md:grid-cols-[var(--blogs-title-column-width)_minmax(0,1fr)] md:items-start",
        )}
      >
        <aside className="min-w-0 md:self-stretch">
          <div
            className={cn(
              "relative flex w-full flex-col items-center justify-start",
              "gap-(--blogs-title-column-gap) md:sticky md:self-start md:overflow-hidden",
            )}
            style={{
              top: "var(--blogs-title-sticky-top)",
            }}
          >
            <BlogsTitle />
          </div>
        </aside>

        <div className="min-w-0">
          <BlogsSectionCards ref={cardsRef} />
        </div>
      </div>

      <BlogsSectionCursor />
    </section>
  );
}