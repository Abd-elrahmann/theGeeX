import { cn } from "@/lib/cn";

import { servicesSectionTitle } from "@/features/services/constants/services";

interface ServicesTitleProps {
  variant?: "background" | "inline";
}

const servicesTitleHeadingClassName = cn(
  "relative m-0 mx-auto flex w-full justify-center p-0",
  "max-w-(--services-container-max-width)",
);

const servicesTitleTextClassName = cn(
  "services-title-text font-[family-name:var(--font-cal-sans)] not-italic",
  "font-(--services-title-font-weight)",
  "text-[length:var(--services-title-size)] leading-(--services-title-line-height)",
  "tracking-[0px] text-center whitespace-nowrap",
  "[font-feature-settings:normal]",
);

function ServicesTitleContent() {
  return (
    <span className="services-title-box">
      <span className={servicesTitleTextClassName}>{servicesSectionTitle}</span>
    </span>
  );
}

export function ServicesTitle({ variant = "background" }: ServicesTitleProps) {
  const isBackground = variant === "background";

  if (!isBackground) {
    return (
      <div className="relative mb-4 w-full overflow-visible lg:mb-8">
        <h2 className={servicesTitleHeadingClassName}>
          <ServicesTitleContent />
        </h2>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-(--services-title-heading-z-index)",
        "flex w-full justify-center pt-(--services-title-top)",
      )}
    >
      <h2
        className={cn(
          servicesTitleHeadingClassName,
          "z-(--services-title-text-z-index)",
        )}
      >
        <ServicesTitleContent />
      </h2>
    </div>
  );
}
