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
    <motion.article className="flex w-full flex-col gap-[10px] overflow-hidden md:gap-(--service-detail-deliver-row-gap)" transition={deliverTransition}>
      <div className="flex min-w-0 flex-1 flex-col gap-[10px] md:gap-(--service-detail-deliver-row-gap)">
        <div className="flex min-w-0 items-center gap-6 md:relative md:block md:pl-(--service-detail-deliver-number-column-width)">
          <motion.span className="h-auto w-auto shrink-0 whitespace-pre text-center font-cal-sans text-[14px] leading-[1.2] font-semibold tracking-[-0.04em] opacity-80 font-features-normal md:absolute md:left-0 md:top-(--service-detail-deliver-number-offset-y) md:text-(length:--service-detail-deliver-number-size) md:leading-(--service-detail-deliver-number-line-height) md:opacity-100" animate={{ color: isActive ? deliverNumberColor.active : deliverNumberColor.inactive }} transition={deliverTransition}>
            {formatIndex(index)}
          </motion.span>
          <motion.h3 className="m-0 min-w-0 flex-1 whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--service-detail-deliver-title-size) leading-[1.25] font-semibold tracking-normal md:leading-(--service-detail-deliver-title-line-height)" animate={{ color: isActive ? "var(--color-service-detail-text)" : "var(--color-service-detail-inactive)" }} transition={deliverTransition}>
            {item.title}
          </motion.h3>
        </div>

        <motion.div initial={false} animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }} transition={deliverTransition} className="relative overflow-hidden pl-[22px] md:pl-(--service-detail-deliver-number-column-width)">
          <p aria-hidden className="invisible m-0 w-full whitespace-pre-wrap [overflow-wrap:break-word] [word-break:break-word] font-poppins text-[14px] leading-[1.6] font-normal tracking-[0em] font-features-normal md:hidden">
            {item.description}
          </p>
          <p className="absolute inset-x-0 top-0 m-0 w-full whitespace-pre-wrap [overflow-wrap:break-word] [word-break:break-word] font-poppins text-[14px] leading-[1.6] font-normal tracking-[0em] text-(--color-service-detail-text) font-features-normal md:static md:text-(length:--service-detail-deliver-description-size) md:leading-(--service-detail-deliver-description-line-height)">
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.article>
  );
}