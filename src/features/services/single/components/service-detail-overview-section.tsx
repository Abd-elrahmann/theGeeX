import Image from "next/image";
import { motion } from "framer-motion";

import type { Service } from "@/features/services/constants/services";
import { ServiceDetailSectionHeading } from "@/features/services/single/shared/components/service-detail-section-heading";

interface ServiceDetailOverviewSectionProps {
  service: Service;
}

export function ServiceDetailOverviewSection({
  service,
}: ServiceDetailOverviewSectionProps) {
  return (
    <section className="mx-auto grid w-full max-w-(--service-detail-container-max-width) grid-cols-1 gap-(--service-detail-section-gap) px-(--service-detail-padding-x) py-(--service-detail-section-padding-y)">
      <ServiceDetailSectionHeading label="Overview" title={service.page.overviewTitle} />

      <div className="grid w-full grid-cols-1 gap-(--service-detail-overview-grid-gap) md:grid-cols-2 md:items-start">
        <div className="grid w-full grid-cols-3 gap-(--service-detail-overview-images-gap)">
          {service.page.overviewImages.map((image, index) => (
            <motion.div
              key={`${image}-${index}`}
              className="relative h-(--service-detail-overview-image-height) w-full flex-1 overflow-hidden rounded-(--service-detail-overview-image-radius) bg-surface"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.65, delay: index * 0.12, ease: "easeInOut" }}
            >
              <Image
                src={image}
                alt={`${service.navTitle} overview ${index + 1}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 180px, 33vw"
              />
            </motion.div>
          ))}
        </div>

        <div className="relative min-h-(--service-detail-description-min-height) w-full md:min-h-0 md:max-w-(--service-detail-overview-description-max-width)">
          <p className="absolute inset-x-0 top-0 m-0 h-auto w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-description-size) leading-(--service-detail-description-line-height) font-light tracking-normal text-(--color-service-detail-text) font-features-normal md:static">
            {service.page.overviewDescription}
          </p>
        </div>
      </div>
    </section>
  );
}