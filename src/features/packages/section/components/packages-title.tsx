import { cn } from "@/lib/cn";

import { packagesSectionTitle } from "@/features/packages/constants/packages";
import { packageFeatureTitleClassName } from "@/features/packages/shared/utils/package-styles";

const packagesTitleHeadingClassName = cn(
  "relative m-0 mx-auto flex w-full justify-center p-0",
  "max-w-(--packages-container-max-width)",
);

const packagesTitleTextClassName = cn(
  "packages-title-text font-cal-sans not-italic",
  "font-(--packages-title-font-weight)",
  "text-[length:var(--packages-title-size)] leading-(--packages-title-line-height)",
  "tracking-[0px] text-center whitespace-nowrap",
  packageFeatureTitleClassName,
);

export function PackagesTitle() {
  return (
    <div className="pointer-events-none relative z-(--packages-title-z-index) w-full overflow-visible">
      <h2 className={packagesTitleHeadingClassName}>
        <span className="packages-title-box">
          <span className={packagesTitleTextClassName}>{packagesSectionTitle}</span>
        </span>
      </h2>
    </div>
  );
}