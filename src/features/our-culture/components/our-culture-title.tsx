import { cn } from "@/lib/cn";

import { ourCultureSectionTitle } from "@/features/our-culture/constants/our-culture";

const ourCultureTitleHeadingClassName = cn(
  "relative m-0 mx-auto flex w-full justify-center p-0",
  "max-w-[var(--culture-container-max-width)]",
);

const ourCultureTitleTextClassName = cn(
  "culture-title-text font-cal-sans not-italic",
  "font-[var(--culture-title-font-weight)]",
  "text-[length:var(--culture-title-size)] leading-[var(--culture-title-line-height)]",
  "max-w-full tracking-[0px] text-center whitespace-nowrap",
  "[font-feature-settings:normal]",
);

export function OurCultureTitle() {
  return (
    <div className="pointer-events-none relative z-[var(--culture-title-z-index)] w-full overflow-visible">
      <h2 className={ourCultureTitleHeadingClassName}>
        <span className="culture-title-box">
          <span className={ourCultureTitleTextClassName}>{ourCultureSectionTitle}</span>
        </span>
      </h2>
    </div>
  );
}