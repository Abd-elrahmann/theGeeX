"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { AnimatedArrowSwap } from "@/components/shared/animations/animated-arrow-swap";
import { ArrowUpRightIcon } from "@/components/shared/icons/arrow-up-right";
import { SiteFooter } from "@/features/footer";

const notFoundButtonTransition = {
  type: "spring" as const,
  stiffness: 110,
  damping: 15,
  mass: 0.9,
  delay: 0,
};

export default function NotFoundPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <main className="relative z-(--page-main-z-index) min-h-svh bg-background pt-(--not-found-page-top-padding)">
        <section className="flex min-h-(--not-found-container-min-height) w-full items-center justify-center px-(--not-found-page-padding-x) pb-(--not-found-page-padding-bottom)">
          <div className="flex w-full max-w-(--not-found-content-max-width) flex-col items-center gap-(--not-found-content-gap) text-center">
            <h1 className="m-0 whitespace-nowrap font-poppins text-(length:--not-found-title-size) leading-(--not-found-title-line-height) font-bold tracking-(--not-found-title-letter-spacing) text-(--color-not-found-text)">
              404
            </h1>

            <p className="m-0 whitespace-pre-wrap wrap-break-word font-poppins text-(length:--not-found-description-size) leading-(--not-found-description-line-height) font-normal tracking-normal text-(--color-not-found-text)">
              This page doesn&apos;t exist... yet.
            </p>

            <motion.div initial="rest" animate={isHovered ? "hover" : "rest"} className="relative">
              <Link
                href="/"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="box-border relative flex h-(--not-found-button-height) w-(--not-found-button-width) flex-row flex-nowrap content-center items-center justify-center gap-(--not-found-button-gap) overflow-hidden rounded-(--not-found-button-radius) bg-(--color-not-found-button-bg) px-(--not-found-button-padding-x) pt-(--not-found-button-padding-top) pb-(--not-found-button-padding-bottom) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <motion.span
                  aria-hidden="true"
                  variants={{
                    rest: { y: 0, scale: 0.94 },
                    hover: { y: -240, scale: 1 },
                  }}
                  transition={notFoundButtonTransition}
                  className="absolute left-1/2 top-full h-(--not-found-button-orb-height) w-(--not-found-button-orb-width) -translate-x-1/2 rounded-full bg-(--color-not-found-button-hover-bg)"
                />

                <span className="relative z-1 flex items-center justify-center gap-(--not-found-button-gap)">
                  <span className="relative block h-(--not-found-button-text-frame-height) overflow-hidden">
                    <span
                      aria-hidden="true"
                      className="invisible block whitespace-nowrap font-poppins text-(length:--not-found-button-text-size) leading-(--not-found-button-text-line-height) font-medium"
                    >
                      Go to homepage
                    </span>

                    <motion.span
                      variants={{
                        rest: { y: "0%", opacity: 1 },
                        hover: { y: "-120%", opacity: 0 },
                      }}
                      transition={notFoundButtonTransition}
                      className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-poppins text-(length:--not-found-button-text-size) leading-(--not-found-button-text-line-height) font-medium text-(--color-not-found-button-text)"
                    >
                      Go to homepage
                    </motion.span>

                    <motion.span
                      variants={{
                        rest: { y: "120%", opacity: 0 },
                        hover: { y: "0%", opacity: 1 },
                      }}
                      transition={notFoundButtonTransition}
                      className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-poppins text-(length:--not-found-button-text-size) leading-(--not-found-button-text-line-height) font-medium text-(--color-not-found-button-text-hover)"
                    >
                      Go to homepage
                    </motion.span>
                  </span>

                  <AnimatedArrowSwap
                    icon={ArrowUpRightIcon}
                    isHovered={isHovered}
                    sizeVar="--not-found-button-icon-size"
                    sizeFallback={24}
                    primaryClassName="text-(--color-not-found-button-text)"
                    hoverClassName="text-(--color-not-found-button-text-hover)"
                    className="block"
                  />
                </span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter compactSpacing />
    </>
  );
}