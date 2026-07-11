import type { PackageIncludedItem } from "@/features/packages/constants/packages";
import { packageFeatureTitleClassName } from "@/features/packages/shared/utils/package-styles";
import { cn } from "@/lib/cn";

interface PackageDetailIncludedSectionProps {
  includedItems: PackageIncludedItem[];
}

function PackageDetailIncludedRow({ includedItem }: { includedItem: PackageIncludedItem }) {
  return (
    <div className="flex w-full flex-col gap-(--packages-detail-included-row-gap) border-b border-(--packages-detail-included-row-border-color) pt-(--packages-detail-included-first-row-padding-top) pb-(--packages-detail-included-row-padding-y) first:pt-(--packages-detail-included-row-padding-y) md:w-[98%] md:flex-row md:items-start md:flex-nowrap">
      <h3 className="m-0 w-full max-w-175 shrink-0 whitespace-pre-wrap wrap-break-word font-poppins text-(length:--packages-detail-included-item-title-size) leading-(--packages-detail-included-item-title-line-height) font-medium tracking-normal text-left text-(--color-packages-detail-text) [font-synthesis:weight] [-webkit-text-stroke:0.1px_currentColor] [text-shadow:0_0_0.15px_currentColor] md:w-(--packages-detail-included-title-column-width)">
        {includedItem.title}
      </h3>

      <p className="m-0 min-w-0 flex-1 whitespace-pre-wrap wrap-break-word font-poppins text-(length:--packages-detail-included-item-description-size) leading-(--packages-detail-included-item-description-line-height) font-normal tracking-normal text-left text-(--color-packages-detail-text)">
        {includedItem.description}
      </p>
    </div>
  );
}

export function PackageDetailIncludedSection({
  includedItems,
}: PackageDetailIncludedSectionProps) {
  return (
    <section className="flex w-full flex-col gap-(--packages-detail-included-gap)">
      <h2 className={cn("m-0 whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--packages-detail-included-title-size) leading-(--packages-detail-title-line-height) font-semibold tracking-normal text-(--color-packages-detail-text)", packageFeatureTitleClassName)}>
        What&apos;s Included
      </h2>

      <div
        aria-hidden="true"
        className="mt-(--packages-detail-included-title-divider-gap) h-px w-full bg-(--packages-detail-included-row-border-color)"
      />

      <div className="flex w-full flex-col gap-(--packages-detail-included-rows-gap)">
        {includedItems.map((includedItem) => (
          <PackageDetailIncludedRow key={includedItem.title} includedItem={includedItem} />
        ))}
      </div>
    </section>
  );
}