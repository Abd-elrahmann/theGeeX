"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { useMediaQuery } from "@/hooks/use-media-query";
import { POINTER_FINE_MEDIA_QUERY } from "@/lib/breakpoints";
import { setExploreCursorZone } from "@/lib/explore-cursor-state";
import { formatIndex } from "@/lib/format-index";

import { services } from "@/features/services/constants/services";
import { ServiceContent } from "@/features/services/components/service-content";
import { ServiceImage } from "@/features/services/components/service-image";
import { ServicesSectionCursor } from "@/features/services/components/services-section-cursor";

const servicesPageDescription =
  "Everything you need to launch, grow, and scale digitally-from strategy and design to engineering and growth-creating solutions that drive lasting business impact.";

function ServicesPageCardHeader({
  index,
  title,
  eyebrow,
}: {
  index: number;
  title: string;
  eyebrow: string;
}) {
  return (
    <div className="flex w-full flex-col gap-(--services-page-card-header-gap)">
      <p className="m-0 h-auto w-auto min-w-0 whitespace-pre font-poppins text-(length:--services-page-service-eyebrow-size) leading-(--services-page-service-eyebrow-line-height) font-medium tracking-normal text-(--color-services-page-eyebrow) font-features-normal">
        {eyebrow}
      </p>

      <div className="flex w-full min-w-0 items-baseline gap-(--services-page-service-title-row-gap)">
        <span className="h-auto w-auto shrink-0 whitespace-pre font-cal-sans text-(length:--services-page-service-index-size) leading-(--services-page-service-index-line-height) font-semibold tracking-normal text-(--color-services-page-index) font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_off]">
          {formatIndex(index)}
        </span>
        <h2 className="m-0 min-w-0 max-w-(--services-page-service-title-max-width) flex-1 whitespace-normal break-words font-cal-sans text-(length:--services-page-service-title-size) leading-(--services-page-service-title-line-height) font-semibold tracking-normal text-(--color-services-page-card-title)">
          {title}
        </h2>
      </div>
    </div>
  );
}

export function ServicesPage() {
  const isDesktop = useDesktopBreakpoint();
  const isPointerFine = useMediaQuery(POINTER_FINE_MEDIA_QUERY);
  const [isPageHovered, setIsPageHovered] = useState(false);
  const [isScrollArrowActive, setIsScrollArrowActive] = useState(false);
  const isServicesCursorActive = isDesktop && isPointerFine && isPageHovered;
  const isArrowActive = isServicesCursorActive || isScrollArrowActive;

  useEffect(() => {
    setExploreCursorZone(isServicesCursorActive ? "services" : "none");

    return () => {
      setExploreCursorZone("none");
    };
  }, [isServicesCursorActive]);

  useEffect(() => {
    let timeoutId = 0;

    const handleScroll = () => {
      setIsScrollArrowActive(true);
      window.clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        setIsScrollArrowActive(false);
      }, 360);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main
      className="relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--services-page-top-padding)"
      onMouseEnter={() => {
        setIsPageHovered(true);
      }}
      onMouseLeave={() => {
        setIsPageHovered(false);
      }}
    >
      <section
        aria-labelledby="services-page-title"
        className="mx-auto box-border flex h-min w-full max-w-(--services-page-container-max-width) flex-col content-center items-center justify-center gap-(--services-page-section-gap) overflow-clip rounded-none px-(--services-page-padding-x) pt-(--services-page-padding-top) pb-(--services-page-padding-bottom)"
      >
        <header className="flex w-full flex-col items-center gap-(--services-page-hero-gap) text-center">
          <h1
            id="services-page-title"
            className="m-0 h-auto w-auto max-w-(--services-page-hero-max-width) whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--services-page-title-size) leading-(--services-page-title-line-height) font-semibold tracking-normal text-(--color-services-page-text) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]"
          >
            Our Services
          </h1>

          <p className="m-0 h-auto w-full max-w-(--services-page-hero-max-width) whitespace-pre-wrap wrap-break-word font-poppins text-(length:--services-page-description-size) leading-(--services-page-description-line-height) font-normal tracking-normal text-(--color-services-page-text) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
            {servicesPageDescription}
          </p>
        </header>

        <div className="flex w-full flex-col gap-(--services-page-cards-gap)">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              aria-label={`Open ${service.navTitle} service page`}
              className="grid w-full grid-cols-1 gap-x-(--services-page-card-gap) gap-y-(--services-page-mobile-card-row-gap) overflow-visible rounded-(--services-page-card-radius) bg-transparent md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-y-(--services-page-card-gap)"
            >
              <div className="box-border flex h-auto min-h-(--services-page-image-height) w-full flex-1 flex-col content-start items-start justify-between overflow-visible rounded-none p-0 md:h-(--services-page-image-height) md:min-h-0 md:overflow-hidden">
                <ServiceContent
                  service={service}
                  variant="standalone"
                  isGridHovered={isArrowActive}
                  showContentTitle={false}
                  headerContent={
                    <ServicesPageCardHeader
                      index={index}
                      title={service.navTitle}
                      eyebrow={service.contentTitle}
                    />
                  }
                />
              </div>

              <div className="box-border flex h-(--services-page-image-height) min-h-0 w-full flex-1 flex-col content-start items-start justify-between overflow-hidden rounded-none p-0">
                <div className="relative h-(--services-page-image-height) w-full overflow-hidden rounded-(--services-image-radius)">
                  <ServiceImage service={service} variant="desktop" eager={index === 0} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ServicesSectionCursor />
    </main>
  );
}
