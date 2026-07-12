import Image from "next/image";

import type { ServiceExtraSection } from "@/features/services/constants/services";

interface ServiceDetailExtraSectionsProps {
  sections?: ServiceExtraSection[];
}

export function ServiceDetailExtraSections({
  sections,
}: ServiceDetailExtraSectionsProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return sections.map((section) => (
    <section
      key={section.id}
      className="mx-auto grid w-full max-w-(--service-detail-container-max-width) grid-cols-1 gap-(--service-detail-section-gap) px-(--service-detail-padding-x) py-(--service-detail-section-padding-y)"
    >
      <div className="flex w-full flex-col gap-(--service-detail-section-label-gap)">
        {section.label ? (
          <p className="m-0 w-auto whitespace-pre font-poppins text-(length:--service-detail-label-size) leading-(--service-detail-label-line-height) font-semibold tracking-[-0.02em] text-(--color-service-detail-accent)">
            {section.label}
          </p>
        ) : null}
        <h2 className="m-0 w-full max-w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-section-title-size) leading-(--service-detail-section-title-line-height) font-medium tracking-normal text-(--color-service-detail-text)">
          {section.title}
        </h2>
        {section.description ? (
          <p className="m-0 h-auto w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-description-size) leading-(--service-detail-description-line-height) font-light tracking-normal text-(--color-service-detail-text) font-features-normal">
            {section.description}
          </p>
        ) : null}
      </div>

      {section.items && section.items.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-(--service-detail-overview-grid-gap) md:grid-cols-3">
          {section.items.map((item) => (
            <article key={item.title} className="flex w-full flex-col gap-(--service-detail-deliver-row-gap)">
              <h3 className="m-0 font-cal-sans text-(length:--service-detail-deliver-title-size) leading-(--service-detail-deliver-title-line-height) font-semibold text-(--color-service-detail-text)">
                {item.title}
              </h3>
              <p className="m-0 font-poppins text-(length:--service-detail-deliver-description-size) leading-(--service-detail-deliver-description-line-height) font-normal text-(--color-service-detail-text)">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      ) : null}

      {section.images && section.images.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-(--service-detail-overview-images-gap) sm:grid-cols-3">
          {section.images.map((image, index) => (
            <div key={image} className="relative h-(--service-detail-overview-image-height) w-full overflow-hidden rounded-(--service-detail-overview-image-radius) bg-surface">
                <Image src={image} alt={`${section.title} ${index + 1}`} fill className="object-cover object-center" sizes="(min-width: 1440px) 390px, (min-width: 1024px) 350px, 100vw" />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  ));
}