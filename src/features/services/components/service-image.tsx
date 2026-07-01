"use client";

import Image from "next/image";

import { cn } from "@/lib/cn";

import { type Service, servicesImagePlaceholder } from "@/features/services/constants/services";
import { servicesImageContainerVisualClassName } from "@/features/services/constants/services-layout";

interface ServiceImageProps {
  service: Service;
  variant?: "desktop" | "tablet" | "mobile";
  eager?: boolean;
}

export function ServiceImage({
  service,
  variant = "desktop",
  eager = false,
}: ServiceImageProps) {
  const isDesktop = variant === "desktop";
  const isPlaceholder = service.image === servicesImagePlaceholder;
  const imageClassName = cn("object-cover", isPlaceholder && "object-contain p-8");
  const loading = eager ? "eager" : undefined;

  const image = (
    <Image
      src={service.image}
      alt={service.imageAlt}
      fill
      loading={loading}
      sizes={
        isDesktop ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 768px) 50vw, 100vw"
      }
      className={imageClassName}
      priority={eager || service.id === 1}
    />
  );

  if (variant === "mobile") {
    return (
      <div className="relative h-full min-h-[var(--services-image-min-height)] w-full min-w-0">
        <div
          className={cn(
            "relative aspect-[4/5] min-h-[var(--services-image-min-height)] w-full min-w-0",
            servicesImageContainerVisualClassName,
          )}
        >
          {image}
        </div>
      </div>
    );
  }

  return <div className="relative h-full min-h-[var(--services-image-min-height)] w-full">{image}</div>;
}
