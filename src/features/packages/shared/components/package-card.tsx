"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { cn } from "@/lib/cn";

import { PackageCardButton } from "@/features/packages/shared/components/package-card-button";
import { PackageCardChips } from "@/features/packages/shared/components/package-card-chips";
import { PackageCardFeatures } from "@/features/packages/shared/components/package-card-features";
import { PackageCardPrice } from "@/features/packages/shared/components/package-card-price";
import {
  type PackageItem,
} from "@/features/packages/constants/packages";
import { packageFeatureTitleClassName } from "@/features/packages/shared/utils/package-styles";

interface PackageCardProps {
  item: PackageItem;
  index: number;
}

const packageEnterTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function PackageCard({ item, index }: PackageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const canAnimateButtonHover = useDesktopBreakpoint();
  const isContactSalesPackage = !item.billingCycle;
  const cardChips = item.cardChips ?? item.chips;
  const cardDescription = item.cardDescription ?? item.description;

  return (
    <motion.article
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...packageEnterTransition, delay: index * 0.1 }}
      className={cn(
        "box-border flex h-full min-h-(--packages-card-min-height) w-full max-w-(--packages-card-max-width) flex-col items-start overflow-hidden",
        "min-[1440px]:mx-auto",
        "rounded-(--packages-card-radius) bg-(--color-packages-card-bg) md:bg-transparent",
        item.featured
          ? "shadow-(--packages-card-featured-shadow)"
          : "shadow-(--packages-card-shadow)",
        "backdrop-blur-(--packages-card-blur) md:backdrop-blur-none",
        "p-0",
      )}
    >
      <div className="flex h-(--packages-card-top-height) w-full flex-col px-(--packages-card-padding-x) pt-(--packages-card-padding-top)">
        <div className="w-full text-left">
          <PackageCardChips chips={cardChips} />

          <h3
            className={cn(
              "w-full min-h-(--packages-card-title-min-height) whitespace-pre-wrap wrap-break-word font-cal-sans",
              "text-(length:--packages-card-title-size) leading-(--packages-card-title-line-height)",
              "font-semibold tracking-normal text-(--color-packages-card-title)",
              packageFeatureTitleClassName,
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
            {cardDescription}
          </p>
        </div>

        <PackageCardPrice price={item.price} billingCycle={item.billingCycle} isContactSalesPackage={isContactSalesPackage} />

        <PackageCardButton
          slug={item.slug}
          isHovered={isHovered}
          canAnimateButtonHover={canAnimateButtonHover}
          onHoverStart={() => {
            if (canAnimateButtonHover) {
              setIsHovered(true);
            }
          }}
          onHoverEnd={() => setIsHovered(false)}
        />
      </div>

      <div
        aria-hidden="true"
        className="mt-(--packages-card-divider-margin-top) h-px w-full bg-(--color-packages-card-divider)"
      />

      <PackageCardFeatures features={item.features} itemId={item.id} />
    </motion.article>
  );
}