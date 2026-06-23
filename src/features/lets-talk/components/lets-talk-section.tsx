"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AnimatedArrowSwap } from "@/components/shared/animations/animated-arrow-swap";
import { ArrowUpRightIcon } from "@/components/shared/icons/arrow-up-right";
import { siteConfig } from "@/config/site.config";
import { letsTalkContent } from "@/features/lets-talk/constants/lets-talk";
import { cn } from "@/lib/cn";

const letsTalkButtonTransition = {
  type: "spring" as const,
  stiffness: 110,
  damping: 15,
  mass: 0.9,
  delay: 0,
};

type LetsTalkSectionProps = {
  revealFooterOnScroll?: boolean;
};

export function LetsTalkSection({ revealFooterOnScroll = false }: LetsTalkSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="contact-us"
      aria-label="Let's Talk"
      className={cn(
        "relative w-full overflow-visible bg-background",
        revealFooterOnScroll ? "mt-0" : "mt-(--lets-talk-margin-top)",
        "px-(--lets-talk-padding-x) py-(--lets-talk-padding-y)",
      )}
    >
      <div className="mx-auto w-full max-w-(--lets-talk-container-max-width)">
          <div className="relative min-h-(--lets-talk-card-min-height) w-full overflow-hidden rounded-(--lets-talk-card-radius)">
          <div className="absolute inset-0 z-0">
            <Image
              src={letsTalkContent.backgroundImageSrc}
              alt="Let's Talk background"
              fill
              className="object-cover"
              sizes="(min-width: 1440px) 1440px, 100vw"
            />
          </div>

          <div className="absolute inset-0 z-1 bg-(--color-lets-talk-overlay)" />

          <div
            className={cn(
              "relative z-2 flex min-h-(--lets-talk-card-min-height) w-full flex-col items-center justify-center",
              "gap-(--lets-talk-content-gap) px-(--lets-talk-card-padding-x) py-(--lets-talk-card-padding-y)",
              "text-center",
            )}
          >
            <div className="flex w-full max-w-(--lets-talk-content-max-width) flex-col items-center gap-(--lets-talk-copy-gap)">
              <h2
                className={cn(
                  "w-full whitespace-normal font-cal-sans min-[1024px]:whitespace-nowrap",
                  "text-(length:--lets-talk-title-size) leading-(--lets-talk-title-line-height)",
                  "font-semibold tracking-normal text-(--color-lets-talk-title)",
                )}
              >
                {letsTalkContent.title}
              </h2>

              <p
                className={cn(
                  "w-full whitespace-pre-wrap wrap-break-word font-poppins",
                  "text-(length:--lets-talk-subtitle-size) leading-(--lets-talk-subtitle-line-height)",
                  "font-medium tracking-normal text-(--color-lets-talk-subtitle)",
                )}
              >
                {letsTalkContent.subtitle}
              </p>
            </div>

            <motion.div initial="rest" animate={isHovered ? "hover" : "rest"} className="relative">
              <Link
                href={siteConfig.cta.href}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={cn(
                  "relative flex h-(--lets-talk-button-height) w-(--lets-talk-button-width) items-center justify-center overflow-hidden rounded-(--lets-talk-button-radius)",
                  "bg-(--color-lets-talk-button-bg) px-(--lets-talk-button-padding-x) py-(--lets-talk-button-padding-y)",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                )}
              >
                <motion.span
                  aria-hidden="true"
                  variants={{
                    rest: { y: 0, scale: 0.94 },
                    hover: { y: -240, scale: 1 },
                  }}
                  transition={letsTalkButtonTransition}
                  className={cn(
                    "absolute left-1/2 top-full -translate-x-1/2",
                    "h-(--lets-talk-button-orb-height) w-(--lets-talk-button-orb-width)",
                    "rounded-full bg-(--color-lets-talk-button-hover-bg)",
                  )}
                />

                <span className="relative z-1 flex items-center justify-center gap-(--lets-talk-button-gap)">
                  <span className="relative block h-(--lets-talk-button-text-frame-height) overflow-hidden">
                    <span
                      aria-hidden="true"
                      className="invisible block whitespace-nowrap font-poppins text-(length:--lets-talk-button-text-size) leading-(--lets-talk-button-text-line-height) font-medium"
                    >
                      {letsTalkContent.ctaLabel}
                    </span>

                    <motion.span
                      variants={{
                        rest: { y: "0%", opacity: 1 },
                        hover: { y: "-120%", opacity: 0 },
                      }}
                      transition={letsTalkButtonTransition}
                      className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-poppins text-(length:--lets-talk-button-text-size) leading-(--lets-talk-button-text-line-height) font-medium text-(--color-lets-talk-button-text)"
                    >
                      {letsTalkContent.ctaLabel}
                    </motion.span>

                    <motion.span
                      variants={{
                        rest: { y: "120%", opacity: 0 },
                        hover: { y: "0%", opacity: 1 },
                      }}
                      transition={letsTalkButtonTransition}
                      className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-poppins text-(length:--lets-talk-button-text-size) leading-(--lets-talk-button-text-line-height) font-medium text-(--color-lets-talk-button-text-hover)"
                    >
                      {letsTalkContent.ctaLabel}
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
      </div>
    </section>
  );
}