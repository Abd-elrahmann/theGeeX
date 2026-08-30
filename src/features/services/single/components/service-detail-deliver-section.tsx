import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import type { Service } from "@/features/services/constants/services";
import { ServiceDetailDeliverImagePanel } from "@/features/services/single/components/service-detail-deliver-image-panel";
import { ServiceDetailDeliverList } from "@/features/services/single/components/service-detail-deliver-list";
import { ServiceDetailSectionHeading } from "@/features/services/single/shared/components/service-detail-section-heading";
import { deliverTextReveal } from "@/features/services/single/utils/service-detail";


interface ServiceDetailDeliverSectionProps {
  service: Service;
}

export function ServiceDetailDeliverSection({
  service,
}: ServiceDetailDeliverSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobilePinRegionRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useDesktopBreakpoint();
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousActiveIndex, setPreviousActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: isDesktop ? sectionRef : mobilePinRegionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!Number.isFinite(progress)) {
      return;
    }

    const maxIndex = Math.max(service.page.deliverables.length - 1, 0);
    const nextIndex = Math.min(Math.max(Math.round(progress * maxIndex), 0), maxIndex);

    setActiveIndex((currentIndex) => {
      if (currentIndex !== nextIndex) {
        setPreviousActiveIndex(currentIndex);
      }

      return nextIndex;
    });
  });

  return (
    <section ref={sectionRef} className="relative min-h-(--service-detail-deliver-scroll-height) w-full px-0 py-(--service-detail-section-padding-y) lg:px-(--service-detail-padding-x)">
      <div className="mx-auto flex w-full max-w-(--service-detail-container-max-width) flex-col gap-(--service-detail-deliver-grid-gap) lg:hidden">
        <motion.div
          initial={deliverTextReveal.initial}
          whileInView={deliverTextReveal.whileInView}
          viewport={deliverTextReveal.viewport}
          transition={deliverTextReveal.transition}
        >
          <div className="relative min-h-[92px] px-(--service-detail-padding-x)">
            <p className="absolute left-(--service-detail-padding-x) top-0 m-0 h-auto w-auto whitespace-pre font-poppins text-[15px] leading-[1.4] font-semibold tracking-[-0.02em] text-(--color-service-detail-accent) [font-feature-settings:'blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
              {service.page.deliverTitle}
            </p>
            <h2 className="absolute left-(--service-detail-padding-x) right-(--service-detail-padding-x) top-[29px] m-0 h-auto w-auto max-w-[calc(100%-var(--service-detail-padding-x)*2)] whitespace-pre-wrap [overflow-wrap:break-word] [word-break:break-word] text-left font-poppins text-[24px] leading-[1.3] font-semibold tracking-[0em] text-(--color-service-detail-text) [font-feature-settings:'blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
              {service.page.deliverMainTitle}
            </h2>
          </div>
        </motion.div>

        <div ref={mobilePinRegionRef} className="relative min-h-(--service-detail-deliver-scroll-height) w-full">
          <div className="sticky top-(--service-detail-deliver-sticky-top) z-10 flex w-full flex-col gap-(--service-detail-deliver-grid-gap)">
            <div className="w-full px-(--service-detail-padding-x)">
              <ServiceDetailDeliverImagePanel deliverables={service.page.deliverables} activeIndex={activeIndex} previousActiveIndex={previousActiveIndex} />
            </div>

            <motion.div
              initial={deliverTextReveal.initial}
              whileInView={deliverTextReveal.whileInView}
              viewport={deliverTextReveal.viewport}
              transition={{ ...deliverTextReveal.transition, delay: 0.12 }}
            >
              <ServiceDetailDeliverList deliverables={service.page.deliverables} activeIndex={activeIndex} className="flex w-full flex-col gap-(--service-detail-deliver-items-gap) px-(--service-detail-padding-x)" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="sticky top-(--service-detail-deliver-sticky-top) mx-auto hidden w-full max-w-(--service-detail-container-max-width) grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center gap-(--service-detail-deliver-grid-gap) lg:grid lg:min-h-(--service-detail-deliver-stage-height) lg:items-stretch">
        <motion.div
          initial={deliverTextReveal.initial}
          whileInView={deliverTextReveal.whileInView}
          viewport={deliverTextReveal.viewport}
          transition={deliverTextReveal.transition}
          className="col-start-1 row-start-1"
        >
          <ServiceDetailSectionHeading
            label={service.page.deliverTitle}
            title={service.page.deliverMainTitle}
            labelClassName="font-semibold"
            titleClassName="lg:h-auto lg:w-full lg:max-w-full lg:whitespace-pre-wrap lg:wrap-break-word lg:break-words lg:font-poppins lg:text-[38px] lg:leading-[1.3] lg:font-semibold lg:text-(--color-service-detail-text)"
            containerClassName="col-start-1 row-start-1"
          />
        </motion.div>

        <div className="col-start-2 row-span-2 row-start-1 h-full w-full self-stretch">
          <ServiceDetailDeliverImagePanel deliverables={service.page.deliverables} activeIndex={activeIndex} previousActiveIndex={previousActiveIndex} />
        </div>

        <motion.div
          initial={deliverTextReveal.initial}
          whileInView={deliverTextReveal.whileInView}
          viewport={deliverTextReveal.viewport}
          transition={{ ...deliverTextReveal.transition, delay: 0.12 }}
          className="col-start-1 row-start-2"
        >
          <ServiceDetailDeliverList deliverables={service.page.deliverables} activeIndex={activeIndex} className="flex w-full flex-col gap-(--service-detail-deliver-items-gap)" />
        </motion.div>
      </div>
    </section>
  );
}