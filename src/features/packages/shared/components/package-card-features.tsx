import type { PackageFeature } from "@/features/packages/constants/packages";
import { renderPackageFeatureText } from "@/features/packages/shared/utils/package-card";
import { cn } from "@/lib/cn";

interface PackageCardFeaturesProps {
  features: PackageFeature[];
  itemId: number;
}

export function PackageCardFeatures({
  features,
  itemId,
}: PackageCardFeaturesProps) {
  return (
    <div
      className={cn(
        "mt-(--packages-card-features-margin-top) flex min-h-(--packages-card-features-min-height) w-full flex-col justify-start",
        "min-[1440px]:items-center",
        "gap-(--packages-card-features-gap) px-(--packages-card-features-padding-x) pt-(--packages-card-features-padding-top) pb-(--packages-card-features-padding-bottom)",
      )}
    >
      {[...features].reverse().map((feature) => (
        <div
          key={`${itemId}-${feature.text}`}
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
            {renderPackageFeatureText(feature)}
          </p>
        </div>
      ))}
    </div>
  );
}