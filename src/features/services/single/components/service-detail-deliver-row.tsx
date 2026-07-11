import { motion } from "framer-motion";

import type { ServiceDeliverable } from "@/features/services/constants/services";
import {
  deliverNumberColor,
  deliverTransition,
} from "@/features/services/single/utils/service-detail";
import { formatIndex } from "@/lib/format-index";

interface ServiceDetailDeliverRowProps {
  item: ServiceDeliverable;
  index: number;
  isActive: boolean;
}

export function ServiceDetailDeliverRow({
  item,
  index,
  isActive,
}: ServiceDetailDeliverRowProps) {
  return (
    <motion.article className="flex w-full flex-col gap-(--service-detail-deliver-row-gap) overflow-hidden" transition={deliverTransition}>
      <div className="flex min-w-0 flex-1 flex-col gap-(--service-detail-deliver-row-gap)">
        <div className="relative min-w-0 pl-(--service-detail-deliver-number-column-width)">
          <motion.span className="absolute top-(--service-detail-deliver-number-offset-y) left-0 h-auto w-auto whitespace-pre text-center font-cal-sans text-(length:--service-detail-deliver-number-size) leading-(--service-detail-deliver-number-line-height) font-semibold tracking-[-0.04em] font-features-normal" animate={{ color: isActive ? deliverNumberColor.active : deliverNumberColor.inactive }} transition={deliverTransition}>
            {formatIndex(index)}
          </motion.span>
          <motion.h3 className="m-0 min-w-0 flex-1 whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--service-detail-deliver-title-size) leading-(--service-detail-deliver-title-line-height) font-semibold tracking-normal" animate={{ color: isActive ? "var(--color-service-detail-text)" : "var(--color-service-detail-inactive)" }} transition={deliverTransition}>
            {item.title}
          </motion.h3>
        </div>

        <motion.div initial={false} animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }} transition={deliverTransition} className="overflow-hidden pl-(--service-detail-deliver-number-column-width)">
          <p className="m-0 w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-deliver-description-size) leading-(--service-detail-deliver-description-line-height) font-normal tracking-normal text-(--color-service-detail-text) font-features-normal">
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.article>
  );
}