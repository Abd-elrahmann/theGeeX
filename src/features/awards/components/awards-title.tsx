import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

import { awardsSectionTitle } from "@/features/awards/constants/awards";

const awardsTitleHeadingClassName = cn(
  "relative m-0 mx-auto flex w-full justify-center p-0",
  "max-w-(--services-container-max-width)",
);

const awardsTitleTextClassName = cn(
  "services-title-text font-[family-name:var(--font-cal-sans)] not-italic",
  "font-(--services-title-font-weight)",
  "text-[length:var(--services-title-size)] leading-(--services-title-line-height)",
  "tracking-[0px] text-center whitespace-nowrap",
  "[font-feature-settings:normal]",
);

const awardsTitleStyle = {
  "--services-container-max-width": "var(--awards-title-max-width)",
  "--services-title-size": "var(--awards-title-size)",
  "--services-title-line-height": "var(--awards-title-line-height)",
  "--services-title-box-height": "var(--awards-title-box-height)",
} as CSSProperties;

export function AwardsTitle() {
  return (
    <div
      className="pointer-events-none relative z-(--awards-title-z-index) w-full overflow-visible"
      style={awardsTitleStyle}
    >
      <h2 className={awardsTitleHeadingClassName}>
        <span className="services-title-box">
          <span className={awardsTitleTextClassName}>{awardsSectionTitle}</span>
        </span>
      </h2>
    </div>
  );
}
