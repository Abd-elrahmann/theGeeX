"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...packageEnterTransition, delay: index * 0.1 }}
      className={cn(
        "box-border flex min-h-(--packages-card-min-height) w-full max-w-(--packages-card-max-width) flex-col items-start overflow-hidden",
        "min-[1440px]:mx-auto min-[1440px]:items-center",
        "rounded-(--packages-card-radius) bg-(--color-packages-card-bg)",
        "shadow-(--packages-card-shadow) backdrop-blur-(--packages-card-blur)",
        "px-(--packages-card-padding-x) pt-(--packages-card-padding-top) pb-(--packages-card-padding-bottom)",
        item.featured && "border border-(--color-packages-card-featured-border)",
      )}
    >
      <div className="flex h-(--packages-card-top-height) w-full flex-col min-[1440px]:items-center">
        <div className="w-full min-[1440px]:text-center">
          <h3
            className={cn(
              "w-full min-h-(--packages-card-title-min-height) whitespace-nowrap font-cal-sans",
              "text-(length:--packages-card-title-size) leading-(--packages-card-title-line-height)",
              "font-bold tracking-normal text-(--color-packages-card-title)",
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

        <div className="mt-(--packages-card-price-margin-top) flex min-h-(--packages-card-price-row-min-height) items-end gap-(--packages-card-price-gap) min-[1440px]:justify-center">
          <p
            className={cn(
              "whitespace-pre font-poppins text-(length:--packages-card-price-size)",
              "leading-(--packages-card-price-line-height) font-medium tracking-(--packages-card-price-letter-spacing)",
              "text-(--color-packages-card-price)",
            )}
          >
            {item.price}
          </p>

          <p
            className={cn(
              "pb-(--packages-card-billing-padding-bottom) whitespace-pre-wrap wrap-break-word font-poppins",
              "text-(length:--packages-card-billing-size) leading-(--packages-card-billing-line-height)",
              "font-medium tracking-normal text-(--color-packages-card-billing)",
            )}
          >
            {item.billingCycle}
          </p>
        </div>

        <motion.button
          type="button"
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
          whileTap="hover"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className={cn(
            "relative mt-(--packages-card-button-margin-top) flex h-(--packages-button-height) w-full max-w-(--packages-button-width)",
            "min-[1440px]:self-center",
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

          <span className="relative z-1 block h-(--packages-button-text-frame-height) overflow-hidden">
            <span
              aria-hidden="true"
              className="invisible block whitespace-nowrap font-poppins text-(length:--packages-button-text-size) leading-(--packages-button-text-line-height) font-medium"
            >
              Book this package
            </span>

            <motion.span
              variants={{
                rest: { y: "0%", opacity: 1 },
                hover: { y: "-120%", opacity: 0 },
              }}
              transition={packageButtonTransition}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-poppins text-(length:--packages-button-text-size) leading-(--packages-button-text-line-height) font-medium text-[#050505]"
            >
              Book this package
            </motion.span>

            <motion.span
              variants={{
                rest: { y: "120%", opacity: 0 },
                hover: { y: "0%", opacity: 1 },
              }}
              transition={packageButtonTransition}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-poppins text-(length:--packages-button-text-size) leading-(--packages-button-text-line-height) font-medium text-white"
            >
              Book this package
            </motion.span>
          </span>
        </motion.button>
      </div>

      <div
        className={cn(
          "mt-(--packages-card-features-margin-top) flex min-h-(--packages-card-features-min-height) w-full flex-col justify-start",
          "min-[1440px]:items-center",
          "gap-(--packages-card-features-gap) px-(--packages-card-features-padding-x) py-(--packages-card-features-padding-y)",
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