import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

import {
  processCards,
  processCardStickyTops,
  processSectionTitleLines,
} from "@/features/process/constants/process";
import { ProcessCard } from "@/features/process/components/process-card";
import { ProcessSectionTitle } from "@/features/process/components/process-section-title";

function getCardStickyTop(index: number): string {
  const stickyTop = processCardStickyTops[index];

  if (stickyTop === undefined) {
    return "var(--process-title-sticky-top)";
  }

  return `${stickyTop}px`;
}

export function ProcessSection() {
  const totalCards = processCards.length;
  const stackHeight = `calc(${totalCards} * var(--process-card-height) + ${Math.max(totalCards - 1, 0)} * var(--process-card-gap))`;
  const stackScrollHeight = `calc(${stackHeight} + var(--process-cards-bottom-padding))`;

  return (
    <section
      id="process"
      aria-label="A proven process. Measurable outcomes."
      className={cn(
        "relative w-full overflow-visible bg-background",
        "mt-(--process-margin-top) px-(--process-padding-x) pt-(--process-padding-y) pb-(--process-padding-y) lg:pb-10",
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-(--process-container-max-width) overflow-visible",
          "flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-(--process-column-gap)",
        )}
      >
        <div className="min-w-0 lg:flex lg:flex-1 lg:items-start lg:self-stretch">
          <h2
            className={cn(
              "w-full whitespace-pre-wrap wrap-break-word font-cal-sans",
              "text-(length:--process-title-size) leading-(--process-title-line-height)",
              "font-(--process-title-weight) tracking-normal",
              "font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_on]",
              "lg:self-start lg:sticky lg:max-w-(--process-title-max-width) lg:min-w-(--process-title-min-width)",
            )}
            style={{ top: "var(--process-title-sticky-top)" }}
          >
            <ProcessSectionTitle lines={processSectionTitleLines} />
          </h2>
        </div>

        <div
          className="min-w-0 lg:ml-auto lg:w-full lg:self-stretch"
          style={{ maxWidth: "var(--process-cards-column-max-width)" }}
        >
          <div
            className="relative flex flex-col items-stretch gap-(--process-card-gap) overflow-visible lg:items-end"
            style={{ minHeight: stackScrollHeight }}
          >
            {processCards.map((card, index) => {
              const stickyTop = getCardStickyTop(index);
              const zIndex = index === totalCards - 1 ? totalCards + 1 : index + 1;

              return (
                <div
                  key={card.id}
                  className="sticky w-full"
                  style={
                    {
                      width: "var(--process-card-width)",
                      top: stickyTop,
                      zIndex,
                    } as CSSProperties
                  }
                >
                  <ProcessCard card={card} index={index} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}