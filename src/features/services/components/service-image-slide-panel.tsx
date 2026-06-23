"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

import { type Service, servicesImageSlideTransition } from "@/features/services/constants/services";
import {
  servicesImageContainerClassName,
  servicesImageSlideLayerClassName,
} from "@/features/services/constants/services-layout";
import { ServiceImage } from "./service-image";

interface ServiceImageSlidePanelProps {
  services: Service[];
  activeIndex: number;
  previousActiveIndex: number;
  className?: string;
  animate?: boolean;
  imageVariant?: "desktop" | "mobile";
}

function getPanelOffset(index: number, activeIndex: number): string {
  if (index === activeIndex) {
    return "0%";
  }

  if (index < activeIndex) {
    return "100%";
  }

  return "-100%";
}

export function ServiceImageSlidePanel({
  services,
  activeIndex,
  previousActiveIndex,
  className,
  animate = true,
  imageVariant = "desktop",
}: ServiceImageSlidePanelProps) {
  if (!animate) {
    return (
      <div className={cn(servicesImageContainerClassName, className)}>
        <ServiceImage service={services[activeIndex]} variant={imageVariant} eager />
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {services.map((service, index) => {
        const isActive = index === activeIndex;
        const isTransitioning = index === previousActiveIndex && previousActiveIndex !== activeIndex;

        return (
          <motion.div
            key={service.id}
            aria-hidden={!isActive}
            className={servicesImageSlideLayerClassName}
            initial={false}
            animate={{ y: getPanelOffset(index, activeIndex) }}
            transition={servicesImageSlideTransition}
            style={{
              zIndex: isActive ? 2 : isTransitioning ? 1 : 0,
            }}
          >
            <ServiceImage service={service} variant={imageVariant} eager />
          </motion.div>
        );
      })}
    </div>
  );
}
