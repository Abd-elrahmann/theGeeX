"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AnimatedArrowSwap } from "@/components/shared/animations/animated-arrow-swap";
import { ArrowUpRightIcon } from "@/components/shared/icons/arrow-up-right";
import { letsTalkContent } from "@/features/lets-talk/constants/lets-talk";
import { getPackageBookingPath, type PackageItem } from "@/features/packages/constants/packages";
import { packageDetailButtonTransition } from "@/features/packages/single/utils/package-detail";
import { cn } from "@/lib/cn";

interface PackageDetailCtaSectionProps {
  item: PackageItem;
}

export function PackageDetailCtaSection({ item }: PackageDetailCtaSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const packagePrice = item.detailPrice ?? (item.billingCycle ? `${item.price} EGP` : item.price);
  const packagePriceLabel = item.detailPriceLabel ?? "Package Price";
  const packageBookingPath = getPackageBookingPath(item.slug);

  return (
    <section className="relative min-h-(--packages-detail-cta-min-height) overflow-hidden rounded-(--packages-detail-cta-radius)">
      <div className="absolute inset-0 z-0">
        <Image
          src={letsTalkContent.backgroundImageSrc}
          alt="Package call to action background"
          fill
          className="object-cover"
          sizes="(min-width: 1200px) 1200px, 100vw"
        />
      </div>

      <div className="absolute inset-0 z-1 bg-(--packages-detail-cta-overlay)" />

      <div className="relative z-2 flex min-h-(--packages-detail-cta-min-height) w-full flex-col items-center justify-start gap-(--packages-detail-cta-gap) px-(--packages-detail-cta-padding-x) py-(--packages-detail-cta-padding-y) text-center">
        <h2 className="m-0 w-full max-w-(--packages-detail-cta-title-max-width) whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--packages-detail-cta-title-size) leading-[120%] font-bold tracking-normal text-white [font-synthesis:weight] [-webkit-text-stroke:0.8px_currentColor] [text-shadow:0_0_1px_currentColor] font-features-normal">
          {item.detailCtaTitle}
        </h2>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-(--packages-detail-cta-gap)">
          {packagePriceLabel ? (
            <p className="m-0 w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--packages-detail-cta-price-label-size) leading-[120%] font-light tracking-normal text-white font-features-normal">
              {packagePriceLabel}
            </p>
          ) : null}

          <h1 className="m-0 w-full whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--packages-detail-cta-price-size) leading-[120%] font-bold tracking-normal text-white [font-synthesis:weight] [-webkit-text-stroke:0.8px_currentColor] [text-shadow:0_0_1px_currentColor] font-features-normal">
            {packagePrice}
          </h1>

          <motion.div initial="rest" animate={isHovered ? "hover" : "rest"} className="relative mt-4">
            <Link
              href={packageBookingPath}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={cn(
                "relative flex h-(--packages-detail-cta-button-height) w-(--packages-detail-cta-button-width) items-center justify-center overflow-hidden rounded-(--lets-talk-button-radius)",
                "bg-(--color-lets-talk-button-bg) px-(--packages-detail-cta-button-padding-x) py-(--packages-detail-cta-button-padding-y)",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              )}
            >
              <motion.span
                aria-hidden="true"
                variants={{
                  rest: { y: 0, scale: 0.94 },
                  hover: { y: -240, scale: 1 },
                }}
                transition={packageDetailButtonTransition}
                className="absolute left-1/2 top-full h-(--lets-talk-button-orb-height) w-(--lets-talk-button-orb-width) -translate-x-1/2 rounded-full bg-(--color-lets-talk-button-hover-bg)"
              />

              <span className="relative z-1 flex items-center justify-center gap-(--lets-talk-button-gap)">
                <span className="relative block h-(--lets-talk-button-text-frame-height) overflow-hidden">
                  <span
                    aria-hidden="true"
                    className="invisible block whitespace-nowrap font-poppins text-(length:--lets-talk-button-text-size) leading-(--lets-talk-button-text-line-height) font-medium"
                  >
                    Book This Package
                  </span>

                  <motion.span
                    variants={{
                      rest: { y: "0%", opacity: 1 },
                      hover: { y: "-120%", opacity: 0 },
                    }}
                    transition={packageDetailButtonTransition}
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-poppins text-(length:--lets-talk-button-text-size) leading-(--lets-talk-button-text-line-height) font-medium text-(--color-lets-talk-button-text)"
                  >
                    Book This Package
                  </motion.span>

                  <motion.span
                    variants={{
                      rest: { y: "120%", opacity: 0 },
                      hover: { y: "0%", opacity: 1 },
                    }}
                    transition={packageDetailButtonTransition}
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-poppins text-(length:--lets-talk-button-text-size) leading-(--lets-talk-button-text-line-height) font-medium text-(--color-lets-talk-button-text-hover)"
                  >
                    Book This Package
                  </motion.span>
                </span>

                <AnimatedArrowSwap
                  icon={ArrowUpRightIcon}
                  isHovered={isHovered}
                  sizeVar="--lets-talk-button-icon-size"
                  sizeFallback={24}
                  primaryClassName="text-(--color-lets-talk-button-text)"
                  hoverClassName="text-(--color-lets-talk-button-text-hover)"
                />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}