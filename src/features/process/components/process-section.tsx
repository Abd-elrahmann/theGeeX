import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

import {
  processCards,
  processSectionTitleLines,
} from "@/features/process/constants/process";
import { ProcessCard } from "@/features/process/components/process-card";
import { ProcessSectionTitle } from "@/features/process/components/process-section-title";

function getCardStickyTop(index: number): string {
  return `var(--process-card-sticky-top-${index + 1}, var(--process-title-sticky-top))`;
}

export function ProcessSection() {
  const totalCards = processCards.length;
  const stackHeight = `calc(${totalCards} * var(--process-card-height) + ${Math.max(totalCards - 1, 0)} * var(--process-card-gap))`;
  const stackScrollHeight = `calc(${stackHeight} + var(--process-cards-bottom-padding) + var(--process-cards-tail-height))`;

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
        <div className="contents lg:flex lg:min-w-0 lg:flex-1 lg:items-start lg:self-stretch">
          <h2
            className={cn(
              "z-(--process-title-z-index) w-full self-start whitespace-pre-wrap wrap-break-word bg-background text-left font-cal-sans min-[767px]:text-center lg:sticky lg:text-left",
              "before:hidden",
              "text-(length:--process-title-size) leading-(--process-title-line-height)",
              "font-(--process-title-weight) tracking-normal",
              "font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_on]",
              "lg:max-w-(--process-title-max-width) lg:min-w-(--process-title-min-width)",
            )}
            style={{ top: "var(--process-title-sticky-top)" }}
          >
            <ProcessSectionTitle lines={processSectionTitleLines} />
          </h2>
        </div>

        <div
          className="mx-auto w-full min-w-0 lg:ml-auto lg:mr-0 lg:w-full lg:self-stretch"
          style={{ maxWidth: "var(--process-cards-column-max-width)" }}
        >
          <div
            className="relative flex flex-col items-stretch gap-(--process-card-gap) overflow-visible lg:items-end"
            style={{ minHeight: stackScrollHeight }}
          >
            {processCards.map((card, index) => (
              <div
                key={card.id}
                className="sticky h-fit w-full"
                style={
                  {
                    width: "var(--process-card-width)",
                    top: getCardStickyTop(index),
                    zIndex: index + 1,
                  } as CSSProperties
                }
              >
                <ProcessCard card={card} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}