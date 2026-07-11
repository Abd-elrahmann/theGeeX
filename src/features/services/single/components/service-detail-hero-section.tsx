import Image from "next/image";

import { DetailBreadcrumb } from "@/components/shared/detail-breadcrumb";
import type { Service } from "@/features/services/constants/services";
import { ServiceDetailTitle } from "@/features/services/single/shared/components/service-detail-title";

interface ServiceDetailHeroSectionProps {
  service: Service;
}

export function ServiceDetailHeroSection({
  service,
}: ServiceDetailHeroSectionProps) {
  return (
    <section className="mx-auto flex w-full max-w-(--service-detail-container-max-width) flex-col items-start gap-(--service-detail-hero-gap) px-(--service-detail-padding-x) pt-(--service-detail-hero-padding-top)">
      <DetailBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.navTitle },
        ]}
        className="flex h-4.75 w-min flex-row flex-nowrap content-center items-center justify-center gap-(--service-detail-breadcrumb-gap) overflow-(--overflow-clip-fallback) p-0 whitespace-nowrap font-poppins text-(length:--service-detail-breadcrumb-size) leading-(--service-detail-breadcrumb-line-height) font-normal text-(--color-service-detail-text)"
        linkClassName="whitespace-nowrap transition-colors duration-200 hover:text-(--color-service-detail-text)"
        currentClassName="text-(--color-service-detail-text)"
      />

      <div className="mx-auto flex w-full max-w-(--service-detail-title-max-width) flex-col items-center gap-(--service-detail-title-types-gap) text-center">
        <div className="flex w-full flex-col items-center gap-(--service-detail-title-stack-gap)">
          <p className="m-0 w-full whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--service-detail-small-title-size) leading-(--service-detail-small-title-line-height) font-semibold tracking-normal text-(--color-service-detail-accent) font-features-normal">
            {service.page.smallTitle}
          </p>
          {service.page.mobileMainTitle ? (
            <>
              <ServiceDetailTitle title={service.page.mobileMainTitle} className="md:hidden" />
              <ServiceDetailTitle title={service.page.mainTitle} className="hidden md:block" />
            </>
          ) : (
            <ServiceDetailTitle title={service.page.mainTitle} />
          )}
        </div>
        <ul className="m-0 flex list-none flex-row flex-wrap items-center justify-center gap-x-(--service-detail-types-gap) gap-y-(--service-detail-types-row-gap) p-0 font-poppins text-(length:--service-detail-type-size) leading-(--service-detail-type-line-height) font-normal tracking-normal text-(--color-service-detail-text)">
          {service.page.categories.map((category, index) => (
            <li key={category} className="flex flex-row flex-nowrap items-center gap-(--service-detail-type-separator-gap) whitespace-nowrap">
              {index > 0 ? <span aria-hidden="true">|</span> : null}
              <span>{category}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="box-border flex h-min w-full self-stretch flex-row flex-nowrap items-center justify-start gap-0 overflow-hidden px-(--service-detail-image-container-padding-x) py-(--service-detail-image-container-padding-y)">
        <div className="relative block h-(--service-detail-hero-image-height) w-full max-w-none overflow-hidden rounded-(--service-detail-image-radius)">
          <Image
            src={service.pageImage}
            alt={service.imageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width: 1440px) calc(100vw - 160px), (min-width: 1024px) calc(100vw - 80px), 100vw"
          />
        </div>
      </div>
    </section>
  );
}