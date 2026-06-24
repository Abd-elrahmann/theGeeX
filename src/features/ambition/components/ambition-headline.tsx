import { cn } from "@/lib/cn";

import { ambitionConfig } from "@/features/ambition/constants/ambition.config";

const ambitionTextClassName = cn(
  "font-poppins font-bold tracking-normal",
  "text-[length:var(--ambition-font-size)] leading-(--ambition-line-height)",
);

export function AmbitionHeadline() {
  const { lines, accentAlignSpacer } = ambitionConfig;
  const [primaryLine, accentLine] = lines;

  return (
    <div
      className={cn(
        "mx-auto flex w-full min-w-0 max-w-(--ambition-text-width) flex-col flex-nowrap items-center text-center",
        "gap-(--ambition-text-gap)",
        "lg:h-auto lg:w-fit lg:max-w-(--ambition-text-width) lg:shrink-0 lg:items-start lg:text-left",
      )}
    >
      <p
        className={cn(
          ambitionTextClassName,
          "text-(--color-ambition-primary)",
          "mx-auto w-full max-w-full min-w-0 text-center whitespace-nowrap",
          "overflow-visible md:max-lg:overflow-hidden",
          "lg:w-auto lg:overflow-visible lg:whitespace-nowrap lg:text-left",
        )}
      >
        {primaryLine}
      </p>
      <p
        className={cn(
          ambitionTextClassName,
          "mx-auto w-full max-w-full min-w-0 text-center whitespace-nowrap text-brand",
          "overflow-visible md:max-lg:overflow-hidden",
          "lg:flex lg:w-auto lg:overflow-visible lg:items-start lg:text-left",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            ambitionTextClassName,
            "max-lg:hidden lg:invisible lg:shrink-0 lg:not-italic",
          )}
        >
          {accentAlignSpacer}
        </span>
        <span className="italic">{accentLine}</span>
      </p>
    </div>
  );
}
