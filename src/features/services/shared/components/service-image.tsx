"use client";

import Image from "next/image";

import { cn } from "@/lib/cn";

import { type Service, servicesImagePlaceholder } from "@/features/services/constants/services";
import { servicesImageContainerVisualClassName } from "@/features/services/constants/services-layout";

interface ServiceImageProps {
  service: Service;
  variant?: "desktop" | "tablet" | "mobile" | "page";
  eager?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

export function ServiceImage({
  service,
  variant = "desktop",
  eager = false,
  imageSrc,
  imageAlt,
}: ServiceImageProps) {
  const isMobile = variant === "mobile";
  const isPage = variant === "page";
  const imageSizes =
    variant === "desktop"
      ? "(min-width: 1024px) 347px, (min-width: 800px) 50vw, calc(100vw - 32px)"
      : variant === "tablet"
        ? "(min-width: 800px) calc((100vw - 64px - 12px) / 2), calc(100vw - 32px)"
        : variant === "page"
          ? "(min-width: 800px) 50vw, calc(100vw - 32px)"
          : "calc(100vw - 32px)";
  const resolvedImageSrc = imageSrc ?? service.image;
  const resolvedImageAlt = imageAlt ?? service.imageAlt;
  const isPlaceholder = resolvedImageSrc === servicesImagePlaceholder;
  const imageClassName = cn(
    isMobile ? "object-contain object-center" : "object-cover object-center",
    "rounded-(--services-image-radius)",
    isPage && "md:rounded-l-none",
    isPlaceholder && "object-contain p-8",
  );
  const loading = eager ? "eager" : undefined;

  const image = (
    <Image
      src={resolvedImageSrc}
      alt={resolvedImageAlt}
      fill
      loading={loading}
      sizes={imageSizes}
      className={imageClassName}
      priority={eager || service.id === 1}
    />
  );

  if (isMobile) {
    return (
      <div className="relative h-full min-h-(--services-mobile-image-height) w-full min-w-0 overflow-hidden rounded-(--services-image-radius)">
        <div
          className={cn(
            "relative h-full min-h-(--services-mobile-image-height) w-full min-w-0",
            servicesImageContainerVisualClassName,
          )}
        >
          <Image
            src={resolvedImageSrc}
            alt={resolvedImageAlt}
            fill
            loading={loading}
            sizes={imageSizes}
            className={cn(
              "object-cover object-center rounded-(--services-image-radius)",
              isPlaceholder && "object-contain p-8",
            )}
            priority={eager || service.id === 1}
          />
        </div>
      </div>
    );
  }

  if (isPage) {
    return (
      <div className="relative h-full min-h-full w-full min-w-0 overflow-hidden rounded-(--services-image-radius) md:rounded-l-none">
        <div
          className={cn(
            "relative h-full min-h-full w-full min-w-0 md:rounded-l-none",
            servicesImageContainerVisualClassName,
          )}
        >
          {image}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-full w-full max-w-full overflow-hidden rounded-(--services-image-radius)">
      <div
        className={cn(
          "relative h-full min-h-full w-full min-w-0",
          servicesImageContainerVisualClassName,
        )}
      >
        {image}
      </div>
    </div>
  );
}