"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/cn";
import { POINTER_FINE_MEDIA_QUERY } from "@/lib/breakpoints";
import { setExploreCursorZone } from "@/lib/explore-cursor-state";
import { formatIndex } from "@/lib/format-index";
import { ScrollTrigger } from "@/lib/gsap";

import { services } from "@/features/services/constants/services";
import { ServiceContent } from "@/features/services/shared/components/service-content";
import { ServiceImage } from "@/features/services/shared/components/service-image";
import { ServicesSectionCursor } from "@/features/services/shared/components/services-section-cursor";

const servicesPageDescription =
  "Everything you need to launch, grow, and scale digitally-from strategy and design to engineering and growth-creating solutions that drive lasting business impact.";

function ServicesPageCardHeader({
  index,
  title,
  eyebrow,
  allowWrap,
}: {
  index: number;
  title: string;
  eyebrow: string;
  allowWrap: boolean;
}) {
  return (
    <div className="flex w-full flex-col gap-(--services-page-card-header-gap)">
      <p className="m-0 h-auto w-full min-w-0 whitespace-normal wrap-break-word font-poppins text-[12px] leading-[1.3] font-medium tracking-normal text-(--color-services-page-eyebrow) font-features-normal sm:text-(length:--services-page-service-eyebrow-size) sm:leading-(--services-page-service-eyebrow-line-height)">
        {eyebrow}
      </p>

      <div className="flex w-full min-w-0 items-baseline gap-2 sm:gap-(--services-page-service-title-row-gap)">
        <span className="h-[24px] w-[18px] shrink-0 whitespace-pre font-cal-sans text-[20px] leading-[24px] font-semibold tracking-normal text-(--color-services-page-index) font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_off] sm:h-[31px] sm:w-[24px] sm:text-[26px] sm:leading-[31px]">
          {formatIndex(index)}
        </span>
        <h2
          className={cn(
            "m-0 min-w-0 max-w-none flex-1 font-cal-sans text-[20px] leading-[1.1] font-semibold tracking-normal text-(--color-services-page-card-title) sm:text-[28px] sm:leading-[1.2]",
            "whitespace-normal wrap-break-word sm:break-normal",
            allowWrap ? "sm:whitespace-normal" : "sm:whitespace-nowrap",
          )}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

export function ServicesPage() {
  const servicesPageRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isDesktop = useDesktopBreakpoint();
  const isPointerFine = useMediaQuery(POINTER_FINE_MEDIA_QUERY);
  const [isGridHovered, setIsGridHovered] = useState(false);
  const [hoveredServiceId, setHoveredServiceId] = useState<number | null>(null);
  const [isScrollArrowActive, setIsScrollArrowActive] = useState(false);
  const isServicesCursorActive = isDesktop && isPointerFine && isGridHovered;

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

  useEffect(() => {
    const container = servicesPageRef.current;

    if (!container) {
      return;
    }

    let timeoutId = 0;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main
      ref={servicesPageRef}
      className="relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--services-page-top-padding)"
    >
      <section
        aria-labelledby="services-page-title"
        className="mx-auto box-border flex h-min w-full max-w-(--services-page-container-max-width) flex-col content-center items-center justify-center gap-(--services-page-section-gap) overflow-visible rounded-none px-(--services-page-padding-x) pt-(--services-page-padding-top) pb-(--services-page-padding-bottom)"
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

        <div
          ref={gridRef}
          className="mt-(--services-page-grid-offset) flex w-full flex-col gap-(--services-page-cards-gap)"
          onMouseEnter={() => {
            setIsGridHovered(true);
          }}
          onMouseLeave={() => {
            setIsGridHovered(false);
          }}
        >
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              aria-label={`Open ${service.navTitle} service page`}
              className="grid w-full grid-cols-1 gap-x-(--services-page-card-gap) gap-y-(--services-page-mobile-card-row-gap) overflow-visible rounded-(--services-page-card-radius) bg-transparent md:mx-auto md:h-(--services-page-grid-min-height) md:max-w-(--services-page-card-width) md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-y-(--services-page-card-gap)"
              onMouseEnter={() => {
                setHoveredServiceId(service.id);
              }}
              onMouseLeave={() => {
                setHoveredServiceId((currentHoveredServiceId) =>
                  currentHoveredServiceId === service.id ? null : currentHoveredServiceId,
                );
              }}
            >
              <div className="order-2 box-border flex h-auto min-h-0 w-full flex-1 flex-col content-start items-start justify-between overflow-visible rounded-none p-0 md:order-1 md:h-(--services-page-grid-min-height) md:min-h-0 md:overflow-hidden">
                <ServiceContent
                  service={service}
                  variant="page"
                  isGridHovered={hoveredServiceId === service.id || isScrollArrowActive}
                  showContentTitle={false}
                  descriptionItems={service.pageDescription ?? service.description}
                  headerContent={
                    <ServicesPageCardHeader
                      index={index}
                      title={service.navTitle}
                      eyebrow={service.contentTitle}
                      allowWrap={service.id === 4 || service.id === 5}
                    />
                  }
                />
              </div>

              <div className="order-1 box-border flex h-(--services-page-image-height) min-h-0 w-full flex-1 flex-col content-start items-start justify-between overflow-hidden rounded-none p-0 md:order-2 md:h-(--services-page-grid-min-height)">
                <div className="relative h-(--services-page-image-height) w-full overflow-hidden rounded-(--services-image-radius) md:rounded-l-none md:h-(--services-page-grid-min-height)">
                  <ServiceImage
                    service={service}
                    variant="page"
                    eager={index === 0}
                    imageSrc={service.pageImage}
                  />
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