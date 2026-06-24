import { cn } from "@/lib/cn";

import { AwardCard } from "@/features/awards/components/award-card";
import { AwardsTitle } from "@/features/awards/components/awards-title";
import { awardItems } from "@/features/awards/constants/awards";

export function AwardsSection() {
  return (
    <section
      id="awards"
      aria-label="Our Awards"
      className={cn(
        "relative w-full overflow-visible bg-background",
        "mt-(--awards-margin-top) px-(--awards-padding-x) py-(--awards-padding-y)",
      )}
    >
      <div className="mx-auto flex w-full max-w-(--awards-container-max-width) flex-col gap-(--awards-section-gap)">
        <AwardsTitle />

        <div className="grid w-full grid-cols-1 justify-items-center gap-(--awards-cards-gap) lg:grid-cols-2">
          {awardItems.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>
      </div>
    </section>
  );
}
