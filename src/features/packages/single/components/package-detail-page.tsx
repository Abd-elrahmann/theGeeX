"use client";

import { type PackageItem } from "@/features/packages/constants/packages";
import { PackageDetailCtaSection } from "@/features/packages/single/components/package-detail-cta-section";
import { PackageDetailHeroSection } from "@/features/packages/single/components/package-detail-hero-section";
import { PackageDetailIncludedSection } from "@/features/packages/single/components/package-detail-included-section";

interface PackageDetailPageProps {
  item: PackageItem;
}

export function PackageDetailPage({ item }: PackageDetailPageProps) {
  return (
    <main className="relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--packages-page-top-padding)">
      <section className="mx-auto flex w-full max-w-(--packages-detail-container-max-width) flex-col gap-(--packages-detail-section-gap) px-(--packages-detail-padding-x) pt-(--packages-detail-padding-top) pb-(--packages-detail-padding-bottom)">
        <PackageDetailHeroSection item={item} />
        <PackageDetailIncludedSection includedItems={item.includedItems} />
        <PackageDetailCtaSection item={item} />
      </section>
    </main>
  );
}