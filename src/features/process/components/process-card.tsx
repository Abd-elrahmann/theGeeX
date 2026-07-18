"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { formatIndex } from "@/lib/format-index";

import {
  processCardStickyTops,
  type ProcessCardItem,
} from "@/features/process/constants/process";

interface ProcessCardProps {
  card: ProcessCardItem;
  index: number;
}

export function ProcessCard({ card, index }: ProcessCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const isFinalCard = card.variant === "final";
  const shouldAnimateTitle = isFinalCard && Boolean(card.transitionTitle);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrollActivated, setIsScrollActivated] = useState(false);

  const finalCardTitleTransition = {
    type: "spring" as const,
    duration: 0.25,
    bounce: 0.16,
    delay: 0,
  };

  useEffect(() => {
    if (!shouldAnimateTitle) {
      return;
    }

    const activateTitleTransition = () => {
      const cardElement = cardRef.current;

      if (!cardElement) {
        return;
      }

      const cardTop = cardElement.getBoundingClientRect().top;
      const stickyTitleTop = processCardStickyTops[1] ?? 270;
      const triggerOffset = 12;

      setIsScrollActivated(cardTop <= stickyTitleTop + triggerOffset);
    };

    activateTitleTransition();

    window.addEventListener("scroll", activateTitleTransition, { passive: true });
    window.addEventListener("resize", activateTitleTransition);

    return () => {
      window.removeEventListener("scroll", activateTitleTransition);
      window.removeEventListener("resize", activateTitleTransition);
    };
  }, [shouldAnimateTitle]);

  const isTitleTransitionActive = isHovered || isScrollActivated;

  return (
    <motion.article
      ref={cardRef}
      onHoverStart={() => {
        if (shouldAnimateTitle) {
          setIsHovered(true);
        }
      }}
      onHoverEnd={() => {
        if (shouldAnimateTitle) {
          setIsHovered(false);
        }
      }}
      className={cn(
        "flex min-h-(--process-card-height) w-full overflow-hidden rounded-(--process-card-radius)",
        "border border-(--color-process-card-border)",
        isFinalCard
          ? "border-transparent bg-(--color-process-card-final-bg)"
          : "bg-(--color-process-card-bg)",
      )}
    >
      <div className="flex h-full w-full flex-col items-start md:h-auto lg:h-full lg:flex-row">
        <div
          className="box-border relative flex w-full flex-none items-start justify-start overflow-hidden md:h-auto lg:h-full lg:min-w-px lg:flex-1"
          style={{
            maxWidth: "var(--process-card-index-max-width)",
            padding: "var(--process-card-index-padding-y) var(--process-card-index-padding-x)",
            gap: "var(--process-card-index-gap)",
          }}
        >
          {isFinalCard ? (
            <Image
              src="/images/processLogo.webp"
              alt="GeeX logo"
              width={104}
              height={53}
              className="block overflow-visible object-cover object-center"
              priority={false}
            />
          ) : (
            <span
              className={cn(
                "block whitespace-pre font-cal-sans text-(length:--process-card-index-size) leading-(--process-card-index-line-height)",
                "font-(--process-card-index-weight) tracking-(--process-card-index-letter-spacing)",
                "font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on]",
                "text-(--color-process-card-index)",
              )}
            >
              {formatIndex(index)}
            </span>
          )}
        </div>

        <div
          className="box-border flex w-full min-w-0 flex-1 flex-col items-start md:h-auto lg:h-full"
          style={{
            padding: "var(--process-card-content-padding-y) var(--process-card-content-padding-x)",
          }}
        >
          {shouldAnimateTitle ? (
            <div className="grid w-full overflow-hidden">
              <motion.h3
                className={cn(
                  "col-start-1 row-start-1 w-full whitespace-pre-wrap wrap-break-word font-cal-sans",
                  "text-(length:--process-card-title-size) leading-(--process-card-title-line-height)",
                  "font-(--process-card-title-weight) tracking-(--process-card-title-letter-spacing)",
                  "font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_on]",
                  isFinalCard
                    ? "text-(--color-process-card-final-title)"
                    : "text-(--color-process-card-title)",
                )}
                initial={false}
                animate={{
                  y: isTitleTransitionActive ? -24 : 0,
                  opacity: isTitleTransitionActive ? 0 : 1,
                }}
                transition={finalCardTitleTransition}
              >
                {card.title}
              </motion.h3>

              <motion.h3
                className={cn(
                  "col-start-1 row-start-1 w-full whitespace-pre-wrap wrap-break-word font-cal-sans",
                  "text-(length:--process-card-title-size) leading-(--process-card-title-line-height)",
                  "font-(--process-card-title-weight) tracking-(--process-card-title-letter-spacing)",
                  "font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_on]",
                  isFinalCard
                    ? "text-(--color-process-card-final-title)"
                    : "text-(--color-process-card-title)",
                )}
                initial={false}
                animate={{
                  y: isTitleTransitionActive ? 0 : 24,
                  opacity: isTitleTransitionActive ? 1 : 0,
                }}
                transition={finalCardTitleTransition}
              >
                {card.transitionTitle}
              </motion.h3>
            </div>
          ) : (
            <h3
              className={cn(
                "w-full whitespace-pre-wrap wrap-break-word font-cal-sans",
                "text-(length:--process-card-title-size) leading-(--process-card-title-line-height)",
                "font-(--process-card-title-weight) tracking-(--process-card-title-letter-spacing)",
                "font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_on]",
                isFinalCard
                  ? "text-(--color-process-card-final-title)"
                  : "text-(--color-process-card-title)",
              )}
            >
              {card.title}
            </h3>
          )}

          <p
            className={cn(
              "mt-(--process-card-description-margin-top) w-full whitespace-pre-wrap wrap-break-word font-cal-sans",
              "text-(length:--process-card-description-size) leading-(--process-card-description-line-height)",
              "font-(--process-card-description-weight) tracking-normal",
              "font-features-['blwf'_on,'cv11'_on,'case'_on]",
              isFinalCard
                ? "text-(--color-process-card-final-description)"
                : "text-(--color-process-card-description)",
            )}
          >
            {card.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}