import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import type { ServiceOutcome, ServiceOutcomesSection } from "@/features/services/constants/services";
import { ServiceDetailStickyIntro } from "@/features/services/single/shared/components/service-detail-sticky-intro";
import { deliverTransition } from "@/features/services/single/utils/service-detail";

function OutcomeCard({ outcome, isActive }: { outcome: ServiceOutcome; isActive: boolean }) {
  return (
    <motion.article
      className="box-border flex h-min w-full max-w-(--service-detail-outcome-card-width) flex-col items-start justify-center gap-(--service-detail-outcome-card-gap) overflow-clip rounded-(--service-detail-outcome-card-radius) p-(--service-detail-outcome-card-padding)"
      animate={{
        backgroundColor: isActive
          ? "var(--color-service-detail-outcome-active-bg)"
          : "var(--color-service-detail-outcome-bg)",
      }}
      transition={deliverTransition}
    >
      <motion.h3
        className="m-0 w-full whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--service-detail-outcome-card-title-size) leading-(--service-detail-outcome-card-title-line-height) font-semibold tracking-normal font-features-normal"
        animate={{
          color: isActive
            ? "var(--color-service-detail-outcome-active-text)"
            : "var(--color-service-detail-text)",
        }}
        transition={deliverTransition}
      >
        {outcome.title}
      </motion.h3>
      <motion.p
        className="m-0 w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-outcome-card-description-size) leading-(--service-detail-outcome-card-description-line-height) font-normal tracking-normal font-features-normal"
        animate={{
          color: isActive
            ? "var(--color-service-detail-outcome-active-text)"
            : "var(--color-service-detail-outcome-description)",
        }}
        transition={deliverTransition}
      >
        {outcome.description}
      </motion.p>
    </motion.article>
  );
}

interface ServiceDetailOutcomesSectionProps {
  outcomes?: ServiceOutcomesSection;
}

export function ServiceDetailOutcomesSection({
  outcomes,
}: ServiceDetailOutcomesSectionProps) {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!outcomes) {
      return;
    }

    const updateActiveIndex = () => {
      const cards = cardRefs.current.filter(
        (card): card is HTMLElement => card !== null,
      );

      if (cards.length === 0) {
        return;
      }

      const viewportAnchor = window.innerHeight * 0.45;
      const switchThreshold = window.innerHeight * 0.08;
      let nextIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportAnchor);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex((currentActiveIndex) => {
        const currentCard = cards[currentActiveIndex];

        if (!currentCard || currentActiveIndex === nextIndex) {
          return nextIndex;
        }

        const currentRect = currentCard.getBoundingClientRect();
        const currentDistance = Math.abs(
          currentRect.top + currentRect.height / 2 - viewportAnchor,
        );

        return smallestDistance + switchThreshold < currentDistance
          ? nextIndex
          : currentActiveIndex;
      });
    };

    updateActiveIndex();
    window.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      window.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [outcomes]);

  if (!outcomes) {
    return null;
  }

  return (
    <section
      className="relative min-h-(--service-detail-outcomes-scroll-height) w-full overflow-visible bg-background px-(--service-detail-padding-x) pt-(--service-detail-outcomes-padding-top) pb-(--service-detail-outcomes-padding-bottom)"
      aria-labelledby="service-outcomes-title"
    >
      <div className="relative mx-auto grid w-full max-w-(--service-detail-container-max-width) grid-cols-1 gap-(--service-detail-outcomes-section-gap) overflow-visible md:grid-cols-[var(--service-detail-outcomes-title-column-width)_minmax(0,1fr)] md:items-start">
        <ServiceDetailStickyIntro
          titleId="service-outcomes-title"
          label={outcomes.label}
          title={outcomes.title}
          containerClassName="relative z-1 flex h-(--service-detail-outcomes-title-box-height) w-full flex-col flex-nowrap content-start items-start justify-center gap-(--service-detail-outcomes-title-gap) overflow-clip rounded-none p-0 md:sticky md:top-(--service-detail-outcomes-title-sticky-top)"
          labelClassName="m-0 w-auto whitespace-pre font-poppins text-(length:--service-detail-outcomes-label-size) leading-(--service-detail-outcomes-label-line-height) font-medium tracking-[-0.02em] text-(--color-service-detail-accent)"
          titleClassName="m-0 w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-outcomes-title-size) leading-(--service-detail-outcomes-title-line-height) font-semibold tracking-normal text-(--color-service-detail-text) [font-synthesis:weight] [-webkit-text-stroke:0.1px_currentColor] [text-shadow:0_0_0.15px_currentColor] font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]"
        />

        <div className="min-w-0">
          <div className="flex h-min w-full flex-1 flex-col flex-nowrap content-center items-stretch justify-center gap-(--service-detail-outcomes-cards-gap) overflow-clip rounded-none p-0">
            {outcomes.outcomes.map((outcome, index) => (
              <div
                key={outcome.title}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
              >
                <OutcomeCard outcome={outcome} isActive={index === activeIndex} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}