"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { cn } from "@/lib/cn";

import {
  type PackageFeature,
  type PackageItem,
} from "@/features/packages/constants/packages";

interface PackageCardProps {
  item: PackageItem;
  index: number;
}

const packageEnterTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

const packageButtonTransition = {
  type: "spring" as const,
  stiffness: 110,
  damping: 15,
  mass: 0.9,
  delay: 0,
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderFeatureText(feature: PackageFeature) {
  if (!feature.highlightedWords?.length) {
    return feature.text;
  }

  const pattern = new RegExp(`(${feature.highlightedWords.map(escapeRegExp).join("|")})`, "gi");
  const segments = feature.text.split(pattern).filter(Boolean);

  return segments.map((segment, index) => {
    const isHighlighted = feature.highlightedWords?.some(
      (word) => word.toLowerCase() === segment.toLowerCase(),
    );

    return isHighlighted ? (
      <span
        key={`${feature.text}-${index}`}
        style={{ color: "var(--color-packages-feature-highlight)" }}
      >
        {segment}
      </span>
    ) : (
      <span key={`${feature.text}-${index}`}>{segment}</span>
    );
  });
}

export function PackageCard({ item, index }: PackageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const canAnimateButtonHover = useDesktopBreakpoint();
  const hasBillingCycle = Boolean(item.billingCycle);
  const isContactSalesPackage = !hasBillingCycle;

  return (
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...packageEnterTransition, delay: index * 0.1 }}
      className={cn(
        "box-border flex h-full min-h-(--packages-card-min-height) w-full max-w-(--packages-card-max-width) flex-col items-start overflow-hidden",
        "min-[1440px]:mx-auto",
        "rounded-(--packages-card-radius) bg-(--color-packages-card-bg)",
        item.featured
          ? "shadow-(--packages-card-featured-shadow)"
          : "shadow-(--packages-card-shadow)",
        "backdrop-blur-(--packages-card-blur)",
        "p-0",
        item.featured && "border border-(--color-packages-card-featured-border)",
      )}
    >
      <div className="flex h-(--packages-card-top-height) w-full flex-col px-(--packages-card-padding-x) pt-(--packages-card-padding-top)">
        <div className="w-full text-left">
          <div className="mb-(--packages-card-chips-margin-bottom) flex w-full flex-nowrap items-center justify-start gap-(--packages-card-chips-gap) overflow-(--overflow-clip-fallback)">
            {item.chips.map((chip) => {
              const isAccent = chip.variant === "accent";

              return (
                <span
                  key={chip.label}
                  className={cn(
                    "box-border inline-flex h-min w-min shrink-0 flex-nowrap content-center items-center justify-center gap-(--packages-card-chip-gap) overflow-(--overflow-clip-fallback) whitespace-nowrap rounded-(--packages-card-chip-radius)",
                    "px-(--packages-card-chip-padding-x) py-(--packages-card-chip-padding-y)",
                    "font-cal-sans text-(length:--packages-card-chip-size) leading-(--packages-card-chip-line-height) font-semibold tracking-normal",
                    isAccent
                      ? "bg-(--color-packages-card-chip-accent-bg) text-(--color-packages-card-chip-accent-text)"
                      : "border border-(--color-packages-card-chip-border) bg-(--color-packages-card-chip-bg) text-(--color-packages-card-chip-text)",
                  )}
                >
                  {chip.label}
                </span>
              );
            })}
          </div>

          <h3
            className={cn(
              "w-full min-h-(--packages-card-title-min-height) whitespace-pre-wrap wrap-break-word font-cal-sans",
              "text-(length:--packages-card-title-size) leading-(--packages-card-title-line-height)",
              "font-semibold tracking-normal text-(--color-packages-card-title)",
              "font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]",
              isContactSalesPackage && "whitespace-nowrap text-(length:--packages-card-enterprise-title-size)",
            )}
          >
            {item.name}
          </h3>

          <p
            className={cn(
              "mt-(--packages-card-description-margin-top) min-h-(--packages-card-description-min-height) whitespace-pre-wrap wrap-break-word font-poppins",
              "text-(length:--packages-card-description-size) leading-(--packages-card-description-line-height)",
              "font-normal tracking-normal text-(--color-packages-card-description)",
            )}
          >
            {item.description}
          </p>
        </div>

        <div
          className={cn(
            "mt-(--packages-card-price-margin-top) flex min-h-(--packages-card-price-row-min-height) items-end justify-start gap-(--packages-card-price-gap)",
            isContactSalesPackage && "w-full justify-center text-center",
          )}
        >
          <p
            className={cn(
              "whitespace-pre font-poppins text-(length:--packages-card-price-size)",
              "leading-(--packages-card-price-line-height) font-medium tracking-(--packages-card-price-letter-spacing)",
              "text-(--color-packages-card-price)",
              isContactSalesPackage && "text-(length:--packages-card-contact-sales-size)",
            )}
          >
            {item.price}
          </p>

          {hasBillingCycle && (
            <p
              className={cn(
                "pb-(--packages-card-billing-padding-bottom) whitespace-pre-wrap wrap-break-word font-poppins",
                "text-(length:--packages-card-billing-size) leading-(--packages-card-billing-line-height)",
                "font-medium tracking-normal text-(--color-packages-card-billing)",
              )}
            >
              {item.billingCycle}
            </p>
          )}
        </div>

        <motion.button
          type="button"
          initial="rest"
          animate={canAnimateButtonHover && isHovered ? "hover" : "rest"}
          whileTap={canAnimateButtonHover ? "hover" : "rest"}
          onHoverStart={() => {
            if (canAnimateButtonHover) {
              setIsHovered(true);
            }
          }}
          onHoverEnd={() => setIsHovered(false)}
          className={cn(
            "relative mt-(--packages-card-button-margin-top) flex h-(--packages-button-height) min-h-(--packages-button-height) w-(--packages-button-width) shrink-0 self-center",
            "items-center justify-center overflow-hidden rounded-(--packages-button-radius)",
            "bg-(--color-packages-button-bg) px-(--packages-button-padding-x) pt-(--packages-button-padding-top) pb-(--packages-button-padding-bottom)",
          )}
        >
          <motion.span
            aria-hidden="true"
            variants={{
              rest: { y: 0, scale: 0.94 },
              hover: { y: -240, scale: 1 },
            }}
            transition={packageButtonTransition}
            className={cn(
              "absolute left-1/2 top-full -translate-x-1/2",
              "h-(--packages-button-orb-height) w-(--packages-button-orb-width)",
              "rounded-full bg-(--color-packages-button-hover-bg)",
            )}
          />

          <span className="absolute inset-0 z-1 flex items-center justify-center overflow-hidden">
            <span
              aria-hidden="true"
              className="invisible block h-auto w-auto whitespace-pre font-poppins text-(length:--packages-button-text-size) leading-(--packages-button-text-line-height) font-medium tracking-(--packages-button-text-letter-spacing) text-(--color-packages-button-text) font-features-normal"
            >
              Learn More
            </span>

            <motion.span
              variants={{
                rest: { x: "-50%", y: "-50%", opacity: 1 },
                hover: { x: "-50%", y: "-190%", opacity: 0 },
              }}
              transition={packageButtonTransition}
              className="absolute left-1/2 top-1/2 h-auto w-auto whitespace-pre font-poppins text-(length:--packages-button-text-size) leading-(--packages-button-text-line-height) font-medium tracking-(--packages-button-text-letter-spacing) text-(--color-packages-button-text) font-features-normal"
            >
              Learn More
            </motion.span>

            <motion.span
              variants={{
                rest: { x: "-50%", y: "140%", opacity: 0 },
                hover: { x: "-50%", y: "-50%", opacity: 1 },
              }}
              transition={packageButtonTransition}
              className="absolute left-1/2 top-1/2 h-auto w-auto whitespace-pre font-poppins text-(length:--packages-button-text-size) leading-(--packages-button-text-line-height) font-medium tracking-(--packages-button-text-letter-spacing) text-(--color-packages-button-text) font-features-normal"
            >
              Learn More
            </motion.span>
          </span>
        </motion.button>
      </div>

      <div
        className={cn(
          "mt-(--packages-card-features-margin-top) flex min-h-(--packages-card-features-min-height) w-full flex-col justify-start",
          "min-[1440px]:items-center",
          "gap-(--packages-card-features-gap) px-(--packages-card-features-padding-x) pt-(--packages-card-features-padding-top) pb-(--packages-card-features-padding-bottom)",
        )}
      >
        {[...item.features].reverse().map((feature) => (
          <div
            key={`${item.id}-${feature.text}`}
            className="mx-auto grid w-full max-w-(--packages-card-feature-row-max-width) grid-cols-[auto_minmax(0,1fr)] items-start gap-x-(--packages-card-feature-dot-gap) min-[1440px]:w-fit min-[1440px]:max-w-none min-[1440px]:grid-cols-[var(--packages-card-feature-dot-size)_var(--packages-card-feature-text-width)]"
          >
            <span className="mt-(--packages-card-feature-dot-offset) h-(--packages-card-feature-dot-size) w-(--packages-card-feature-dot-size) shrink-0 rounded-full bg-(--color-packages-card-feature-dot)" />
            <p
              className={cn(
                "min-w-0 whitespace-pre-wrap wrap-break-word font-poppins",
                "text-(length:--packages-card-feature-size) leading-(--packages-card-feature-line-height)",
                "text-left min-[1440px]:text-left",
                "font-normal tracking-normal text-(--color-packages-card-feature-text)",
              )}
            >
              {renderFeatureText(feature)}
            </p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}