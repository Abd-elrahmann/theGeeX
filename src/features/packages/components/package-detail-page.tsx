"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AnimatedArrowSwap } from "@/components/shared/animations/animated-arrow-swap";
import { ArrowUpRightIcon } from "@/components/shared/icons/arrow-up-right";
import { siteConfig } from "@/config/site.config";
import { letsTalkContent } from "@/features/lets-talk/constants/lets-talk";
import { type PackageItem } from "@/features/packages/constants/packages";
import { cn } from "@/lib/cn";

interface PackageDetailPageProps {
  item: PackageItem;
}

const packageDetailButtonTransition = {
  type: "spring" as const,
  stiffness: 110,
  damping: 15,
  mass: 0.9,
  delay: 0,
};

export function PackageDetailPage({ item }: PackageDetailPageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const primaryChip = item.chips[0]?.label ?? "Package";
  const packagePrice = item.detailPrice ?? (item.billingCycle ? `${item.price} EGP` : item.price);
  const packagePriceLabel = item.detailPriceLabel ?? "Package Price";

  return (
    <main className="relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--packages-page-top-padding)">
      <section className="mx-auto flex w-full max-w-(--packages-detail-container-max-width) flex-col gap-(--packages-detail-section-gap) px-(--packages-detail-padding-x) pt-(--packages-detail-padding-top) pb-(--packages-detail-padding-bottom)">
        <div className="flex w-full flex-col gap-(--packages-detail-hero-gap)">
          <nav
            aria-label="Breadcrumb"
            className="flex w-min flex-row flex-nowrap items-center gap-(--packages-detail-breadcrumb-gap) whitespace-nowrap font-poppins text-(length:--packages-detail-breadcrumb-size) leading-(--packages-detail-breadcrumb-line-height) font-normal text-(--color-packages-detail-text)"
          >
            <Link href="/" className="transition-colors duration-200 hover:text-(--color-packages-detail-text)">
              Home
            </Link>
            <span aria-hidden="true">&gt;</span>
            <Link href="/packages" className="transition-colors duration-200 hover:text-(--color-packages-detail-text)">
              Packages
            </Link>
            <span aria-hidden="true">&gt;</span>
            <span className="font-medium text-(--color-packages-detail-text)">{item.name.trim()}</span>
          </nav>

          <header className="mx-auto flex w-full max-w-(--packages-detail-title-max-width) flex-col items-center gap-4 text-center">
            <p className="m-0 max-w-(--packages-detail-chip-max-width) whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--packages-detail-chip-size) leading-(--packages-detail-chip-line-height) font-semibold tracking-normal text-(--color-packages-detail-accent) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
              {primaryChip}
            </p>

            <h1 className="m-0 max-w-(--packages-detail-title-max-width) whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--packages-detail-title-size) leading-(--packages-detail-title-line-height) font-semibold tracking-normal text-(--color-packages-detail-text) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
              {item.name.trim()}
            </h1>

            <p className="m-0 w-full max-w-(--packages-detail-description-max-width) whitespace-pre-wrap wrap-break-word font-poppins text-(length:--packages-detail-description-size) leading-(--packages-detail-description-line-height) font-normal tracking-normal text-(--color-packages-detail-text) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
              {item.description}
            </p>
          </header>

          <div className="relative w-full overflow-hidden rounded-(--packages-detail-image-radius) bg-(--color-packages-detail-surface) shadow-(--packages-card-shadow)">
            <div className="absolute inset-0 z-1 bg-(image:--packages-detail-image-overlay)" />
            <div className="relative h-(--packages-detail-image-height) w-full">
              <Image
                src={item.detailImage}
                alt={item.detailImageAlt}
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <section className="flex w-full flex-col gap-(--packages-detail-included-gap)">
          <h2 className="m-0 whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--packages-detail-included-title-size) leading-(--packages-detail-title-line-height) font-semibold tracking-normal text-(--color-packages-detail-text) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
            What's Included
          </h2>

          <div
            aria-hidden="true"
            className="mt-(--packages-detail-included-title-divider-gap) h-px w-full bg-(--packages-detail-included-row-border-color)"
          />

          <div className="flex w-full flex-col gap-(--packages-detail-included-rows-gap)">
            {item.includedItems.map((includedItem) => (
              <div
                key={includedItem.title}
                className="flex w-full flex-col gap-(--packages-detail-included-row-gap) border-b border-(--packages-detail-included-row-border-color) pt-(--packages-detail-included-first-row-padding-top) pb-(--packages-detail-included-row-padding-y) first:pt-(--packages-detail-included-row-padding-y) md:w-[98%] md:flex-row md:items-start md:flex-nowrap"
              >
                <h3 className="m-0 w-full max-w-175 shrink-0 whitespace-pre-wrap wrap-break-word font-poppins text-(length:--packages-detail-included-item-title-size) leading-(--packages-detail-included-item-title-line-height) font-medium tracking-normal text-left text-(--color-packages-detail-text) [font-synthesis:weight] [-webkit-text-stroke:0.1px_currentColor] [text-shadow:0_0_0.15px_currentColor] md:w-(--packages-detail-included-title-column-width)">
                  {includedItem.title}
                </h3>

                <p className="m-0 min-w-0 flex-1 whitespace-pre-wrap wrap-break-word font-poppins text-(length:--packages-detail-included-item-description-size) leading-(--packages-detail-included-item-description-line-height) font-normal tracking-normal text-left text-(--color-packages-detail-text)">
                  {includedItem.description}
                </p>
              </div>
            ))}
          </div>
        </section>

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
                  href={siteConfig.cta.href}
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
      </section>
    </main>
  );
}
