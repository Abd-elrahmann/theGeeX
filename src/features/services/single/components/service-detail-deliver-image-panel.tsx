import { motion } from "framer-motion";
import Image from "next/image";

import type { ServiceDeliverable } from "@/features/services/constants/services";
import { servicesImageSlideTransition } from "@/features/services/constants/services";
import { getDeliverableImageOffset } from "@/features/services/single/utils/service-detail";

interface ServiceDetailDeliverImagePanelProps {
  deliverables: ServiceDeliverable[];
  activeIndex: number;
  previousActiveIndex: number;
}

export function ServiceDetailDeliverImagePanel({
  deliverables,
  activeIndex,
  previousActiveIndex,
}: ServiceDetailDeliverImagePanelProps) {
  const fallbackDeliverable = deliverables[0];

  return (
    <div className="isolate relative z-10 h-(--service-detail-deliver-image-height) w-full overflow-hidden rounded-3xl bg-surface lg:h-full">
      {fallbackDeliverable ? (
        <Image
          src={fallbackDeliverable.image}
          alt=""
          fill
          aria-hidden="true"
          className={fallbackDeliverable.image.endsWith(".svg") ? "rounded-3xl object-contain p-4 lg:p-10" : "rounded-3xl object-cover"}
          sizes="(min-width: 1024px) 50vw, calc(100vw - (2 * var(--service-detail-padding-x)))"
          priority
        />
      ) : null}
      {deliverables.map((item, index) => {
        const isActive = index === activeIndex;
        const isTransitioning = index === previousActiveIndex && previousActiveIndex !== activeIndex;

        return (
          <motion.div
            key={item.title}
            aria-hidden={!isActive}
            className="absolute inset-0 h-full w-full min-w-0 overflow-hidden rounded-3xl bg-surface will-change-transform"
            initial={false}
            animate={{ y: getDeliverableImageOffset(index, activeIndex) }}
            transition={servicesImageSlideTransition}
            style={{ zIndex: isActive ? 3 : isTransitioning ? 2 : 1 }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className={item.image.endsWith(".svg") ? "rounded-3xl object-contain p-4 lg:p-10" : "rounded-3xl object-cover"}
              sizes="(min-width: 1024px) 50vw, calc(100vw - (2 * var(--service-detail-padding-x)))"
              priority={index === 0}
              loading={index === 0 ? "eager" : undefined}
            />
          </motion.div>
        );
      })}
    </div>
  );
}