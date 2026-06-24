"use client";

import { useRef, useState } from "react";
import {
  LayoutGroup,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import { cn } from "@/lib/cn";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { useMediaQuery } from "@/hooks/use-media-query";

import { OurCultureCard } from "@/features/our-culture/components/our-culture-card";
import { OurCultureTitle } from "@/features/our-culture/components/our-culture-title";
import {
  cultureAnimationTransition,
  cultureCards,
  cultureFirstStageTrigger,
  cultureSecondStageTrigger,
} from "@/features/our-culture/constants/our-culture";

type CultureStage = 0 | 1 | 2;
const CULTURE_TABLET_MEDIA_QUERY = "(min-width: 767px) and (max-width: 1023px)";
const cultureTabletFirstStageTrigger = 0.22;
const cultureTabletSecondStageTrigger = 0.82;

export function OurCultureSection() {
  const isDesktop = useDesktopBreakpoint();
  const isTablet = useMediaQuery(CULTURE_TABLET_MEDIA_QUERY);
  const usesRowLayout = isDesktop || isTablet;
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState<CultureStage>(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const firstStageTrigger = isTablet ? cultureTabletFirstStageTrigger : cultureFirstStageTrigger;
  const secondStageTrigger = isTablet ? cultureTabletSecondStageTrigger : cultureSecondStageTrigger;

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress >= secondStageTrigger) {
      setActiveStage(2);
      return;
    }

    if (progress >= firstStageTrigger) {
      setActiveStage(1);
      return;
    }

    setActiveStage(0);
  });

  const [leadCard, secondCard, thirdCard] = cultureCards;

  if (!leadCard || !secondCard || !thirdCard) {
    return null;
  }

  const stackedCardWidth = "calc((100% - var(--culture-lead-card-width) - 2 * var(--culture-grid-gap)) / 2)";
  const isFirstStageActive = activeStage >= 1;
  const isSecondStageActive = activeStage >= 2;

  if (!usesRowLayout) {
    return (
      <section
        ref={sectionRef}
        id="our-culture"
        aria-label="Our Culture"
        className="relative mx-auto mt-(--culture-margin-top) w-full px-(--culture-padding-x)"
      >
        <MotionConfig transition={cultureAnimationTransition}>
          <div className="relative h-(--culture-section-scroll-height) w-full">
            <div className="sticky top-0 grid h-svh min-h-svh w-full grid-rows-[auto_minmax(0,1fr)] overflow-visible">
              <div className="mx-auto flex w-full max-w-(--culture-container-max-width) flex-col gap-(--culture-section-gap)">
                <OurCultureTitle />

                <LayoutGroup>
                  <div className="flex w-full flex-col gap-(--culture-grid-gap)">
                    {cultureCards.map((card, index) => (
                      <motion.div key={card.id} layout="position">
                        <OurCultureCard
                          card={card}
                          mode={index === activeStage ? "mobile-lead" : "mobile-stacked"}
                        />
                      </motion.div>
                    ))}
                  </div>
                </LayoutGroup>
              </div>
            </div>
          </div>
          <div aria-hidden className="h-(--culture-section-exit-padding) w-full shrink-0" />
        </MotionConfig>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="our-culture" aria-label="Our Culture" className="relative mx-auto mt-(--culture-margin-top) w-full px-(--culture-padding-x)">
      <MotionConfig transition={cultureAnimationTransition}>
        <div className="relative h-(--culture-section-scroll-height) w-full">
          <div className="sticky top-0 grid h-svh min-h-svh w-full grid-rows-[auto_minmax(0,1fr)] overflow-visible">
            <div className="mx-auto flex w-full max-w-(--culture-container-max-width) flex-col gap-(--culture-section-gap)">
              <OurCultureTitle />

              <LayoutGroup>
                <div className={cn("flex w-full items-start gap-(--culture-grid-gap)")}> 
                  <OurCultureCard
                    card={leadCard}
                    mode={isFirstStageActive ? "lead-collapsed" : "lead-default"}
                    imageLayoutId={activeStage === 0 ? "culture-stage-shared-image" : undefined}
                    width={isFirstStageActive ? stackedCardWidth : "var(--culture-lead-card-width)"}
                    enablePositionLayout={!isSecondStageActive}
                  />
                  <OurCultureCard
                    card={secondCard}
                    mode={
                      isSecondStageActive
                        ? "lead-collapsed"
                        : isFirstStageActive
                          ? "stacked-expanded"
                          : "stacked-default"
                    }
                    sharedImage={secondCard.image ?? leadCard.image}
                    imageLayoutId={activeStage === 1 ? "culture-stage-shared-image" : undefined}
                    width={
                      isSecondStageActive
                        ? stackedCardWidth
                        : isFirstStageActive
                          ? "var(--culture-lead-card-width)"
                          : stackedCardWidth
                    }
                          enablePositionLayout={!isSecondStageActive}
                  />
                  <OurCultureCard
                    card={thirdCard}
                    mode={isSecondStageActive ? "stacked-expanded" : "stacked-default"}
                    sharedImage={thirdCard.image ?? secondCard.image}
                    imageLayoutId={activeStage === 2 ? "culture-stage-shared-image" : undefined}
                    width={isSecondStageActive ? "var(--culture-lead-card-width)" : stackedCardWidth}
                  />
                </div>
              </LayoutGroup>
            </div>
          </div>
        </div>
        <div aria-hidden className="h-(--culture-section-exit-padding) w-full shrink-0" />
      </MotionConfig>
    </section>
  );
}