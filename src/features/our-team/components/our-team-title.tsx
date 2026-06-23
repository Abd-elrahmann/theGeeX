import { cn } from "@/lib/cn";

import { ourTeamSectionTitle } from "@/features/our-team/constants/our-team";

const ourTeamTitleHeadingClassName = cn(
  "relative m-0 mx-auto flex w-full justify-center p-0",
  "max-w-(--team-container-max-width)",
);

const ourTeamTitleTextClassName = cn(
  "team-title-text font-[family-name:var(--font-cal-sans)] not-italic",
  "font-(--team-title-font-weight)",
  "text-[length:var(--team-title-size)] leading-(--team-title-line-height)",
  "tracking-[0px] text-center whitespace-nowrap",
  "[font-feature-settings:normal]",
);

export function OurTeamTitle() {
  return (
    <div className="pointer-events-none relative z-(--team-title-z-index) w-full overflow-visible">
      <h2 className={ourTeamTitleHeadingClassName}>
        <span className="team-title-box">
          <span className={ourTeamTitleTextClassName}>{ourTeamSectionTitle}</span>
        </span>
      </h2>
    </div>
  );
}