import type { PackageChip } from "@/features/packages/constants/packages";
import { cn } from "@/lib/cn";

interface PackageCardChipsProps {
  chips: PackageChip[];
}

export function PackageCardChips({ chips }: PackageCardChipsProps) {
  return (
    <div className="mb-(--packages-card-chips-margin-bottom) flex w-full flex-nowrap items-center justify-start gap-(--packages-card-chips-gap) overflow-(--overflow-clip-fallback)">
      {chips.map((chip) => {
        const isAccent = chip.variant === "accent";

        return (
          <span
            key={chip.label}
            className={cn(
              "box-border inline-flex h-min w-min shrink-0 flex-nowrap content-center items-center justify-center gap-(--packages-card-chip-gap) overflow-(--overflow-clip-fallback) whitespace-nowrap rounded-(--packages-card-chip-radius)",
              "px-(--packages-card-chip-padding-x) py-(--packages-card-chip-padding-y)",
              "font-cal-sans text-(length:--packages-card-chip-size) leading-(--packages-card-chip-line-height) font-semibold tracking-normal",
              isAccent
                ? "bg-(--color-packages-card-chip-accent-bg) text-(--color-packages-card-chip-accent-text)"
                : "border border-(--color-packages-card-chip-border) bg-(--color-packages-card-chip-bg) text-(--color-packages-card-chip-text)",
            )}
          >
            {chip.label}
          </span>
        );
      })}
    </div>
  );
}