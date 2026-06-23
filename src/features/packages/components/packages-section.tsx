import { cn } from "@/lib/cn";

import { packageItems } from "@/features/packages/constants/packages";
import { PackageCard } from "./package-card";
import { PackagesTitle } from "./packages-title";

export function PackagesSection() {
  return (
    <section
      id="packages"
      aria-label="Packages"
      className={cn(
        "relative w-full overflow-visible bg-background",
        "mt-(--packages-margin-top) px-(--packages-padding-x) py-(--packages-padding-y)",
      )}
    >
      <div className="mx-auto flex w-full max-w-(--packages-container-max-width) flex-col gap-(--packages-section-gap)">
        <PackagesTitle />

        <div
          className={cn(
            "grid w-full items-stretch justify-center gap-(--packages-cards-gap)",
            "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
          )}
        >
          {packageItems.map((item, index) => (
            <PackageCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}