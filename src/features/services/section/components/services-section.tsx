"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { POINTER_FINE_MEDIA_QUERY, TABLET_MEDIA_QUERY } from "@/lib/breakpoints";
import { cn } from "@/lib/cn";
import { formatIndex } from "@/lib/format-index";
import { isIosSafari } from "@/lib/is-ios-safari";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { useMediaQuery } from "@/hooks/use-media-query";

import { services } from "@/features/services/constants/services";
import { useActiveService } from "@/features/services/hooks/use-active-service";
import { useServicesDesktopInteractions } from "@/features/services/hooks/use-services-desktop-interactions";
import { useServicesMobileState } from "@/features/services/hooks/use-services-mobile-state";
import { ServiceContent } from "@/features/services/shared/components/service-content";
import { ServiceImage } from "@/features/services/shared/components/service-image";
import { ServicesSectionCursor } from "@/features/services/shared/components/services-section-cursor";
import { ServicesGrid } from "./services-grid";
import { ServiceImageSlidePanel } from "./service-image-slide-panel";
import { ServiceSlidePanel } from "./service-slide-panel";
import { ServicesTitle } from "./services-title";

const servicesTabletPanelHeightClassName = "md:max-lg:!h-[346px]";

export function ServicesSection() {
  const lenis = useLenis();
  const router = useRouter();
  const isDesktop = useDesktopBreakpoint();
  const isTablet = useMediaQuery(TABLET_MEDIA_QUERY);
  const isPointerFine = useMediaQuery(POINTER_FINE_MEDIA_QUERY);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isIosSafariDevice, setIsIosSafariDevice] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const {
    containerRef,
    stageRef,
    activeIndex,
    previousActiveIndex,
    setActiveIndex,
  } = useActiveService({
    serviceCount: services.length,
    enabled: true,
  });
  const {
    mobileScrollRef,
    mobileMeasureRef,
    mobileTitleRef,
    mobileContentMeasureRefs,
    mobileImageMeasureRefs,
    mobileStageMetrics,
    mobileContentHeight,
    mobileImageHeight,
    tabletPanelHeight,
  } = useServicesMobileState({
    activeIndex,
    isDesktop,
    isTablet,
    hasHydrated,
    isIosSafariDevice,
    serviceCount: services.length,
    containerRef,
    setActiveIndex,
  });
  const { isGridHovered, handleMouseLeave, handleMouseMove } = useServicesDesktopInteractions({
    lenis,
    isDesktop,
    isPointerFine,
    containerRef,
    gridRef,
    activeIndex,
    serviceCount: services.length,
  });

  const activeService = services[activeIndex] ?? services[0];

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setHasHydrated(true);
      setIsIosSafariDevice(isIosSafari());
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  const desktopScrollStepCount = Math.max(services.length - 1, 1);

  const renderMobileServiceHeader = (serviceIndex: number) => (
    <div
      className={cn(
        "mb-(--services-content-header-gap) flex w-full items-center gap-(--services-nav-item-gap)",
        "font-cal-sans font-semibold not-italic",
      )}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center whitespace-nowrap",
          "text-(length:--services-nav-index-size) leading-(--services-nav-index-line-height)",
          "tracking-(--services-nav-index-letter-spacing) text-(--color-services-nav-index)",
          "font-features-(--services-nav-index-font-features)",
        )}
      >
        {formatIndex(serviceIndex)}
      </span>
      <span
        className={cn(
          "min-w-0 whitespace-nowrap text-brand",
          "text-[14px] leading-[1.1]",
          "tracking-(--services-nav-index-letter-spacing)",
          "font-features-(--services-nav-index-font-features)",
        )}
      >
        {services[serviceIndex]?.navTitle}
      </span>
    </div>
  );

  const navigateToActiveService = useCallback(() => {
    router.push(`/services/${activeService.slug}`);
  }, [activeService.slug, router]);

  const handleDesktopCardClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if ((event.target as HTMLElement).closest("a, button")) {
        return;
      }

      navigateToActiveService();
    },
    [navigateToActiveService],
  );

  const handleDesktopCardKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      navigateToActiveService();
    },
    [navigateToActiveService],
  );

  return (
    <section
      ref={containerRef}
      id="services"
      className={cn(
        "relative z-20 w-full bg-background",
        isIosSafariDevice ? "overflow-x-visible" : "safari-overflow-x-clip",
        "mt-(--services-margin-top)",
        isDesktop && isPointerFine && "cursor-none",
      )}
      style={
        isDesktop
          ? {
              minHeight: `calc(100svh - var(--services-sticky-top) + ${desktopScrollStepCount} * var(--services-scroll-step-vh) * 1svh)`,
            }
          : undefined
      }
      aria-label="Services"
      onMouseLeave={handleMouseLeave}
      onMouseMove={(event) => {
        handleMouseMove(event.clientX, event.clientY);
      }}
    >
      {isDesktop ? (
        <>
          <div
            ref={stageRef}
            className={cn(
              "sticky top-(--services-sticky-top) mx-auto w-full max-w-(--services-container-max-width)",
              "bg-background px-(--services-padding-x)",
            )}
          >
            <div className="relative h-(--services-grid-top) w-full shrink-0 overflow-visible">
              <ServicesTitle />
            </div>

            <div
              className={cn(
                "relative z-(--services-content-z-index) flex w-full justify-center",
              )}
            >
              <div
                role="link"
                tabIndex={0}
                aria-label={`Open ${activeService.navTitle} service page`}
                className="block w-(--services-grid-width) max-w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                onClick={handleDesktopCardClick}
                onKeyDown={handleDesktopCardKeyDown}
              >
                <ServicesGrid
                  gridRef={gridRef}
                  services={services}
                  activeIndex={activeIndex}
                  previousActiveIndex={previousActiveIndex}
                  activeService={activeService}
                  isGridHovered={isGridHovered}
                />
              </div>
            </div>

            <div
              aria-hidden
              className="h-(--services-stage-bottom-padding) w-full shrink-0"
            />
          </div>
        </>
      ) : (
        <div className="mx-auto w-full max-w-(--services-container-max-width) bg-background px-(--services-padding-x)">
          <div
            ref={mobileScrollRef}
            className="relative"
            style={{
              minHeight:
                mobileStageMetrics.scrollHeight > 0
                  ? `${mobileStageMetrics.scrollHeight}px`
                  : `calc(100svh + ${Math.max(services.length - 1, 0) * 100}svh)`,
            }}
          >
            <div
              className="sticky top-0 overflow-visible"
              style={{
                top:
                  mobileStageMetrics.stickyTop > 0
                    ? `${mobileStageMetrics.stickyTop}px`
                    : "var(--navbar-height)",
                height:
                  mobileStageMetrics.stageHeight > 0
                    ? `${mobileStageMetrics.stageHeight}px`
                    : "auto",
              }}
            >
              <div
                className={cn(
                  "relative z-(--services-content-z-index) flex h-full w-full overflow-visible",
                  isTablet
                    ? "flex-col items-start justify-start gap-(--services-columns-gap)"
                    : "flex-col items-start justify-start gap-(--services-columns-gap)",
                )}
              >
                <div ref={mobileTitleRef} className="w-full shrink-0">
                  <ServicesTitle variant="inline" />
                </div>

                <Link
                  href={`/services/${activeService.slug}`}
                  aria-label={`Open ${activeService.navTitle} service page`}
                  className={cn(
                    "grid w-full content-start gap-(--services-columns-gap) md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-stretch",
                    "pb-0 md:pb-(--services-stage-bottom-padding)",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                  )}
                  style={{
                    gridTemplateRows:
                      !isTablet && mobileContentHeight > 0 && mobileImageHeight > 0
                        ? `${mobileContentHeight}px ${mobileImageHeight}px`
                        : undefined,
                  }}
                >
                  <div
                    aria-live="polite"
                    className={cn("min-h-0 overflow-hidden", servicesTabletPanelHeightClassName)}
                    style={{
                      height:
                        isTablet && tabletPanelHeight > 0
                          ? `${tabletPanelHeight}px`
                          : mobileContentHeight > 0
                          ? `${mobileContentHeight}px`
                          : undefined,
                    }}
                  >
                    <ServiceSlidePanel
                      panelKey={activeService.id}
                      activeIndex={activeIndex}
                      previousActiveIndex={previousActiveIndex}
                      slideVariant="content"
                      motionVariant={isTablet ? "content" : "image"}
                      className="h-full"
                    >
                      <ServiceContent
                        service={activeService}
                        layoutMode="flow"
                        headerContent={renderMobileServiceHeader(activeIndex)}
                      />
                    </ServiceSlidePanel>
                  </div>

                  <div
                    className={cn(
                      "min-h-0 overflow-hidden rounded-(--services-content-radius)",
                      servicesTabletPanelHeightClassName,
                    )}
                    style={{
                      height:
                        isTablet && tabletPanelHeight > 0
                          ? `${tabletPanelHeight}px`
                          : mobileImageHeight > 0
                          ? `${mobileImageHeight}px`
                          : undefined,
                    }}
                  >
                    <ServiceImageSlidePanel
                      services={services}
                      activeIndex={activeIndex}
                      previousActiveIndex={previousActiveIndex}
                      className="h-full"
                      imageVariant={isTablet ? "tablet" : "mobile"}
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div
            ref={mobileMeasureRef}
            aria-hidden
            className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10"
          >
            <div className="grid w-full content-start gap-(--services-columns-gap) py-0 md:py-(--services-stage-bottom-padding)">
              {services.map((service, index) => (
                <div key={service.id} className="grid w-full content-start gap-(--services-columns-gap)">
                  <div
                    ref={(element) => {
                      mobileContentMeasureRefs.current[index] = element;
                    }}
                  >
                    <ServiceContent
                      service={service}
                      variant="standalone"
                      layoutMode="flow"
                      headerContent={renderMobileServiceHeader(index)}
                    />
                  </div>
                  <div
                    ref={(element) => {
                      mobileImageMeasureRefs.current[index] = element;
                    }}
                  >
                    <div className="overflow-hidden rounded-(--services-content-radius)">
                      <ServiceImage service={service} variant="mobile" eager />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ServicesSectionCursor />
    </section>
  );
}
