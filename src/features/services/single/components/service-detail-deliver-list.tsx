import { Fragment } from "react";

import type { ServiceDeliverable } from "@/features/services/constants/services";
import { ServiceDetailDeliverRow } from "@/features/services/single/components/service-detail-deliver-row";

interface ServiceDetailDeliverListProps {
  deliverables: ServiceDeliverable[];
  activeIndex: number;
  className: string;
}

export function ServiceDetailDeliverList({
  deliverables,
  activeIndex,
  className,
}: ServiceDetailDeliverListProps) {
  return (
    <div className={className}>
      {deliverables.map((item, index) => (
        <Fragment key={item.title}>
          <ServiceDetailDeliverRow item={item} index={index} isActive={index === activeIndex} />
          {index < deliverables.length - 1 ? <div aria-hidden className="h-px w-full bg-(--color-service-detail-border)" /> : null}
        </Fragment>
      ))}
    </div>
  );
}