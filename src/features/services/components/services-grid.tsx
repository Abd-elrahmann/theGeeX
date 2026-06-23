"use client";

import { type RefObject } from "react";

import { cn } from "@/lib/cn";

import { type Service } from "@/features/services/constants/services";
import { usePreloadServiceImages } from "@/features/services/hooks/use-preload-service-images";
import { ServiceContent } from "./service-content";
import { ServiceImageSlidePanel } from "./service-image-slide-panel";
import { ServiceNavigation } from "./service-navigation";
import { ServiceSlidePanel } from "./service-slide-panel";

interface ServicesGridProps {
  services: Service[];
  activeIndex: number;
  previousActiveIndex: number;
  activeService: Service;
  animate?: boolean;
  gridRef?: RefObject<HTMLDivElement | null>;
  isGridHovered?: boolean;
}

export function ServicesGrid({
  services,
  activeIndex,
  previousActiveIndex,
  activeService,
  animate = true,
  gridRef,
  isGridHovered = false,
}: ServicesGridProps) {
  usePreloadServiceImages(services);

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid min-w-0 items-stretch overflow-visible",
        "min-h-(--services-grid-min-height) h-(--services-grid-height) w-(--services-grid-width)",
        "max-w-full",
        "grid-cols-(--services-grid-template-columns)",
        "gap-x-(--services-columns-gap)",
      )}
      aria-label="Services content"
    >
      <div className="relative h-(--services-grid-height) min-h-(--services-grid-height) min-w-0 self-stretch">
        <ServiceNavigation services={services} activeIndex={activeIndex} />
      </div>

      <div
        className="relative h-(--services-grid-height) min-h-(--services-grid-height) min-w-0 self-stretch"
        aria-live="polite"
      >
        <ServiceSlidePanel
          panelKey={activeService.id}
          activeIndex={activeIndex}
          previousActiveIndex={previousActiveIndex}
          animate={animate}
          slideVariant="content"
          className="h-full"
        >
          <ServiceContent service={activeService} isGridHovered={isGridHovered} />
        </ServiceSlidePanel>
      </div>

      <div className="relative h-(--services-grid-height) min-h-(--services-grid-height) min-w-0 self-stretch">
        <ServiceImageSlidePanel
          services={services}
          activeIndex={activeIndex}
          previousActiveIndex={previousActiveIndex}
          animate={animate}
          className="h-full"
        />
      </div>
    </div>
  );
}
