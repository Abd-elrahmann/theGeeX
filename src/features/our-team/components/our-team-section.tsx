"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { cn } from "@/lib/cn";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { useMediaQuery } from "@/hooks/use-media-query";

import { OurTeamGallery } from "@/features/our-team/components/our-team-gallery";
import { OurTeamTitle } from "@/features/our-team/components/our-team-title";

const TEAM_TABLET_MEDIA_QUERY = "(min-width: 800px) and (max-width: 1023.98px)";

export function OurTeamSection() {
  const isDesktop = useDesktopBreakpoint();
  const isTablet = useMediaQuery(TEAM_TABLET_MEDIA_QUERY);
  const usesScatteredLayout = isDesktop || isTablet;
  const sectionRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 35%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (usesScatteredLayout) {
      setIsExpanded(progress >= 0.18 && progress <= 0.98);
      return;
    }

    setIsExpanded((currentIsExpanded) => {
      if (currentIsExpanded) {
        return progress > 0.04;
      }

      return progress >= 0.18 && progress <= 0.94;
    });
  });

  if (!usesScatteredLayout) {
    return (
      <section
        ref={sectionRef}
        id="our-team"
        aria-label="Our Team"
        className="relative mx-auto mt-(--team-margin-top) flex min-h-svh w-full items-start px-(--team-padding-x) pt-(--team-section-padding-y)"
      >
        <div className="mx-auto flex w-full max-w-(--team-container-max-width) flex-col items-center gap-(--team-section-gap)">
          <OurTeamTitle />
          <OurTeamGallery isExpanded={isExpanded} usesScatteredLayout={false} />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="our-team"
      aria-label="Our Team"
      className="relative mx-auto mt-(--team-margin-top) w-full px-(--team-padding-x)"
    >
      <div className="relative flex min-h-svh w-full items-center justify-center py-(--team-section-padding-y)">
        <div className="mx-auto flex w-full max-w-(--team-container-max-width) flex-col items-center gap-(--team-section-gap)">
            <OurTeamTitle />

            <div
              className={cn(
                "relative flex w-full justify-center overflow-visible",
                "pb-(--team-gallery-bottom-bleed)",
              )}
            >
              <OurTeamGallery isExpanded={isExpanded} usesScatteredLayout />
            </div>
          </div>
      </div>

      <div aria-hidden className="h-(--team-section-exit-padding) w-full shrink-0" />
    </section>
  );
}