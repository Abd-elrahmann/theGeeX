import Image from "next/image";

import { DetailBreadcrumb } from "@/components/shared/detail-breadcrumb";
import type { PackageItem } from "@/features/packages/constants/packages";
import { packageFeatureTitleClassName } from "@/features/packages/shared/utils/package-styles";
import { cn } from "@/lib/cn";

interface PackageDetailHeroSectionProps {
  item: PackageItem;
}

export function PackageDetailHeroSection({ item }: PackageDetailHeroSectionProps) {
  const primaryChip = item.chips[0]?.label ?? "Package";

  return (
    <div className="flex w-full flex-col gap-(--packages-detail-hero-gap)">
      <DetailBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Packages", href: "/packages" },
          { label: item.name.trim() },
        ]}
        className="flex w-min flex-row flex-nowrap items-center gap-(--packages-detail-breadcrumb-gap) whitespace-nowrap font-poppins text-(length:--packages-detail-breadcrumb-size) leading-(--packages-detail-breadcrumb-line-height) font-normal text-(--color-packages-detail-text)"
        linkClassName="transition-colors duration-200 hover:text-(--color-packages-detail-text)"
        currentClassName="text-(--color-packages-detail-text)"
      />

      <header className="mx-auto flex w-full max-w-(--packages-detail-title-max-width) flex-col items-center gap-4 text-center">
        <p className={cn("m-0 max-w-(--packages-detail-chip-max-width) whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--packages-detail-chip-size) leading-(--packages-detail-chip-line-height) font-semibold tracking-normal text-(--color-packages-detail-accent)", packageFeatureTitleClassName)}>
          {primaryChip}
        </p>

        <h1 className={cn("m-0 max-w-(--packages-detail-title-max-width) whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--packages-detail-title-size) leading-(--packages-detail-title-line-height) font-semibold tracking-normal text-(--color-packages-detail-text)", packageFeatureTitleClassName)}>
          {item.name.trim()}
        </h1>

        <p className={cn("m-0 w-full max-w-(--packages-detail-description-max-width) whitespace-pre-wrap wrap-break-word font-poppins text-(length:--packages-detail-description-size) leading-(--packages-detail-description-line-height) font-normal tracking-normal text-(--color-packages-detail-text)", packageFeatureTitleClassName)}>
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
  );
}