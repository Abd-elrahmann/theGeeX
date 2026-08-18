"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { useMobileViewportResizeGate } from "@/hooks/use-mobile-viewport-resize-gate";
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
  const isDesktop = useDesktopBreakpoint();
  const shouldHandleViewportResize = useMobileViewportResizeGate({
    ignoreHeightOnlyResize: !isDesktop,
  });
  const isFinalCard = card.variant === "final";
  const shouldAnimateTitle = isFinalCard && Boolean(card.transitionTitle);
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isScrollActivated, setIsScrollActivated] = useState(false);
  const shouldCollapseDescription = isCollapsed && !isFinalCard;

  const finalCardTitleTransition = {
    type: "spring" as const,
    duration: 0.25,
    bounce: 0.16,
    delay: 0,
  };

  useEffect(() => {
    const updateCardState = () => {
      const cardElement = cardRef.current;

      if (!cardElement) {
        return;
      }

      const cardTop = cardElement.getBoundingClientRect().top;
      const collapseTriggerOffset = 12;
      const cardStickyTop = processCardStickyTops[index] ?? processCardStickyTops[processCardStickyTops.length - 1] ?? 0;
      const hasCollapsed = cardTop <= cardStickyTop + collapseTriggerOffset;

      setIsCollapsed(hasCollapsed);

      if (!shouldAnimateTitle) {
        return;
      }

      const stickyTitleTop = processCardStickyTops[1] ?? 270;
      setIsScrollActivated(cardTop <= stickyTitleTop + collapseTriggerOffset);
    };

    updateCardState();

    const handleViewportResize = () => {
      if (!shouldHandleViewportResize()) {
        return;
      }

      updateCardState();
    };

    window.addEventListener("scroll", updateCardState, { passive: true });
    window.addEventListener("resize", handleViewportResize);

    return () => {
      window.removeEventListener("scroll", updateCardState);
      window.removeEventListener("resize", handleViewportResize);
    };
  }, [index, shouldAnimateTitle, shouldHandleViewportResize]);

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
        "flex h-(--process-card-height) w-full overflow-hidden rounded-(--process-card-radius)",
        "border border-(--color-process-card-border)",
        isFinalCard
          ? "border-transparent bg-(--color-process-card-final-bg)"
          : "bg-(--color-process-card-bg)",
      )}
    >
      <div
        className={cn(
          "flex h-full w-full items-stretch md:h-auto lg:h-full",
          isFinalCard ? "flex-col md:flex-row" : "flex-row",
        )}
      >
        <div
          className="box-border relative flex h-auto w-auto flex-none items-start justify-start self-stretch overflow-hidden md:h-auto lg:h-full lg:min-w-px"
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

          <motion.p
            className={cn(
              "mt-(--process-card-description-margin-top) w-full whitespace-pre-wrap wrap-break-word overflow-hidden font-cal-sans",
              "text-(length:--process-card-description-size) leading-(--process-card-description-line-height)",
              "font-(--process-card-description-weight) tracking-normal",
              "font-features-['blwf'_on,'cv11'_on,'case'_on]",
              isFinalCard
                ? "text-(--color-process-card-final-description)"
                : "text-(--color-process-card-description)",
            )}
            initial={false}
            animate={{
              opacity: shouldCollapseDescription ? 0 : 1,
              y: shouldCollapseDescription ? -8 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {card.description}
          </motion.p>
        </div>
      </div>
    </motion.article>
  );
}