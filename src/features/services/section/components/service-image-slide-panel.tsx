"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

import { cn } from "@/lib/cn";

import { type Service, servicesImageSlideTransition } from "@/features/services/constants/services";
import {
  servicesImageContainerClassName,
  servicesImageSlideLayerClassName,
} from "@/features/services/constants/services-layout";
import { ServiceImage } from "@/features/services/shared/components/service-image";

interface ServiceImageSlidePanelProps {
  services: Service[];
  activeIndex: number;
  previousActiveIndex: number;
  className?: string;
  animate?: boolean;
  imageVariant?: "desktop" | "tablet" | "mobile";
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
  const activeService = services[activeIndex];

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const preloaders = services.map((service) => {
      const image = new window.Image();

      image.src = service.image;

      return image;
    });

    void Promise.allSettled(
      preloaders.map((image) =>
        typeof image.decode === "function" ? image.decode() : Promise.resolve(),
      ),
    );
  }, [services]);

  if (!activeService) {
    return null;
  }

  if (!animate) {
    return (
      <div className={cn(servicesImageContainerClassName, className)}>
        <ServiceImage service={activeService} variant={imageVariant} eager />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate h-full w-full overflow-hidden rounded-(--services-image-radius) transform-gpu backface-hidden contain-[paint]",
        className,
      )}
    >
      {services.map((service, index) => {
        const isActive = index === activeIndex;
        const isTransitioning = index === previousActiveIndex && previousActiveIndex !== activeIndex;

        return (
          <motion.div
            key={service.id}
            aria-hidden={!isActive}
            className={cn("transform-gpu will-change-transform backface-hidden", servicesImageSlideLayerClassName)}
            initial={false}
            animate={{ y: getPanelOffset(index, activeIndex) }}
            transition={servicesImageSlideTransition}
            style={{
              zIndex: isActive ? 2 : isTransitioning ? 1 : 0,
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <ServiceImage
              service={service}
              variant={imageVariant}
              eager
            />
          </motion.div>
        );
      })}
    </div>
  );
}