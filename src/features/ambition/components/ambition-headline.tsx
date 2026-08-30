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
        "relative mx-auto h-(--ambition-text-height) w-full min-w-0 max-w-(--ambition-text-width) text-center",
        "lg:h-auto lg:w-fit lg:max-w-(--ambition-text-width) lg:shrink-0 lg:items-start lg:text-left",
      )}
    >
      <p
        className={cn(
          ambitionTextClassName,
          "text-(--color-ambition-primary)",
          "absolute left-1/2 top-0 h-auto w-auto -translate-x-1/2 whitespace-pre text-center not-italic",
          "overflow-visible",
          "lg:static lg:mx-auto lg:w-full lg:max-w-full lg:min-w-0 lg:translate-x-0 lg:whitespace-nowrap lg:text-left",
          "lg:overflow-visible",
        )}
      >
        {primaryLine}
      </p>
      <p
        className={cn(
          ambitionTextClassName,
          "absolute bottom-0 left-1/2 flex h-auto w-auto -translate-x-1/2 items-start whitespace-pre text-center text-brand",
          "overflow-visible italic",
          "lg:static lg:mx-auto lg:w-auto lg:translate-x-0 lg:whitespace-nowrap lg:text-left",
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
        <span>{accentLine}</span>
      </p>
    </div>
  );
}
