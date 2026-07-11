import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import type { Service } from "@/features/services/constants/services";
import { ServiceDetailDeliverImagePanel } from "@/features/services/single/components/service-detail-deliver-image-panel";
import { ServiceDetailDeliverList } from "@/features/services/single/components/service-detail-deliver-list";
import { ServiceDetailSectionHeading } from "@/features/services/single/shared/components/service-detail-section-heading";


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
        <ServiceDetailSectionHeading
          label={service.page.deliverTitle}
          title={service.page.deliverMainTitle}
          labelClassName="font-semibold"
          containerClassName="px-(--service-detail-padding-x)"
        />

        <div ref={mobilePinRegionRef} className="relative min-h-(--service-detail-deliver-scroll-height) w-full">
          <div className="sticky top-(--service-detail-deliver-sticky-top) z-10 flex w-full flex-col gap-(--service-detail-deliver-grid-gap)">
            <div className="w-full px-(--service-detail-padding-x)">
              <ServiceDetailDeliverImagePanel deliverables={service.page.deliverables} activeIndex={activeIndex} previousActiveIndex={previousActiveIndex} />
            </div>

            <ServiceDetailDeliverList deliverables={service.page.deliverables} activeIndex={activeIndex} className="flex w-full flex-col gap-(--service-detail-deliver-items-gap) px-(--service-detail-padding-x)" />
          </div>
        </div>
      </div>

      <div className="sticky top-(--service-detail-deliver-sticky-top) mx-auto hidden w-full max-w-(--service-detail-container-max-width) grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center gap-(--service-detail-deliver-grid-gap) lg:grid lg:min-h-(--service-detail-deliver-stage-height) lg:items-stretch">
        <ServiceDetailSectionHeading
          label={service.page.deliverTitle}
          title={service.page.deliverMainTitle}
          labelClassName="font-semibold"
          containerClassName="col-start-1 row-start-1"
        />

        <div className="col-start-2 row-span-2 row-start-1 h-full w-full self-stretch">
          <ServiceDetailDeliverImagePanel deliverables={service.page.deliverables} activeIndex={activeIndex} previousActiveIndex={previousActiveIndex} />
        </div>

        <ServiceDetailDeliverList deliverables={service.page.deliverables} activeIndex={activeIndex} className="col-start-1 row-start-2 flex w-full flex-col gap-(--service-detail-deliver-items-gap)" />
      </div>
    </section>
  );
}