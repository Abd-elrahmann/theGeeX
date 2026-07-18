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
        <span
          className="packages-title-box"
          style={{
            WebkitMaskImage: "var(--packages-title-mask)",
            maskImage: "var(--packages-title-mask)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          <span
            className={packagesTitleTextClassName}
            style={{
              display: "inline-block",
              backgroundImage: "linear-gradient(180deg, rgb(0 0 0 / 36%) 0%, rgb(0 0 0 / 8%) 100%)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {packagesSectionTitle}
          </span>
        </span>
      </h2>
    </div>
  );
}