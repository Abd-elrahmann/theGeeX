"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { POINTER_FINE_MEDIA_QUERY } from "@/lib/breakpoints";
import { cn } from "@/lib/cn";
import { setExploreCursorZone } from "@/lib/explore-cursor-state";
import { formatIndex } from "@/lib/format-index";
import { scrollToPosition } from "@/lib/lenis-scroll-trigger";
import { readRootCssNumber } from "@/lib/read-css-var";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { useMediaQuery } from "@/hooks/use-media-query";

import { services } from "@/features/services/constants/services";
import { useActiveService } from "@/features/services/hooks/use-active-service";
import { isPointInsideElement } from "@/features/services/lib/services-cursor-zone";
import { ServiceContent } from "@/features/services/shared/components/service-content";
import { ServiceImage } from "@/features/services/shared/components/service-image";
import { ServicesSectionCursor } from "@/features/services/shared/components/services-section-cursor";
import { syncActiveIndexFromProgress } from "@/lib/sync-active-index-from-progress";
import { ServicesGrid } from "./services-grid";
import { ServiceImageSlidePanel } from "./service-image-slide-panel";
import { ServiceSlidePanel } from "./service-slide-panel";
import { ServicesTitle } from "./services-title";

const SERVICES_TABLET_MEDIA_QUERY = "(min-width: 768px) and (max-width: 1023.98px)";
const SERVICES_TABLET_STAGE_HEIGHT_PX = 780;
const SERVICES_TABLET_PANEL_HEIGHT_PX = 540;
const servicesTabletPanelHeightClassName = "md:max-lg:!h-[540px]";
const SERVICES_WHEEL_MIN_DELTA = 4;
const SERVICES_WHEEL_STEP_GUARD_MS = 180;

export function ServicesSection() {
  const lenis = useLenis();
  const router = useRouter();
  const isDesktop = useDesktopBreakpoint();
  const isTablet = useMediaQuery(SERVICES_TABLET_MEDIA_QUERY);
  const isPointerFine = useMediaQuery(POINTER_FINE_MEDIA_QUERY);
  const [hasHydrated, setHasHydrated] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const mobileMeasureRef = useRef<HTMLDivElement>(null);
  const mobileTitleRef = useRef<HTMLDivElement>(null);
  const mobileContentMeasureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileImageMeasureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lastPointerRef = useRef({ x: -1, y: -1 });
  const lastWheelStepTimeRef = useRef(0);
  const hoverScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLenisScrollingRef = useRef(false);
  const [isGridHovered, setIsGridHovered] = useState(false);
  const [mobileStageMetrics, setMobileStageMetrics] = useState({
    stageHeight: 0,
    contentHeight: 0,
    imageHeight: 0,
    scrollHeight: 0,
  });
  const {
    containerRef,
    stageRef,
    activeIndex,
    previousActiveIndex,
    setActiveIndex,
  } = useActiveService({
    serviceCount: services.length,
    enabled: false,
  });
  const [canSyncMobileServices, setCanSyncMobileServices] = useState(false);
  const shouldTrackMobileScroll = hasHydrated && !isDesktop;
  const { scrollYProgress } = useScroll({
    target: shouldTrackMobileScroll ? mobileScrollRef : undefined,
    offset: ["start start", "end end"],
  });

  const activeService = services[activeIndex] ?? services[0];
  const isExploreCursorActive = isDesktop && isPointerFine && isGridHovered;

  const getDesktopScrollStepMetrics = useCallback(() => {
    const sectionElement = containerRef.current;

    if (!sectionElement) {
      return null;
    }

    const scrollStepVh = readRootCssNumber(
      "--services-scroll-step-vh",
      services.length > 1 ? 100 : 0,
    );
    const stepDistance = (scrollStepVh * window.innerHeight) / 100;
    const sectionTop = sectionElement.getBoundingClientRect().top + window.scrollY;

    return {
      stepDistance,
      sectionTop,
    };
  }, [containerRef]);

  const scrollDesktopToIndex = useCallback(
    (index: number) => {
      const metrics = getDesktopScrollStepMetrics();

      if (!metrics) {
        return;
      }

      const nextPosition = metrics.sectionTop + index * metrics.stepDistance;
      scrollToPosition(nextPosition);
    },
    [getDesktopScrollStepMetrics],
  );

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setHasHydrated(true);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (isDesktop) {
      return;
    }

    const sectionElement = containerRef.current;

    if (!sectionElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCanSyncMobileServices(entry.isIntersecting);
      },
      {
        rootMargin: "-20% 0px -20% 0px",
        threshold: 0,
      },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, [containerRef, isDesktop]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!shouldTrackMobileScroll || isDesktop || !canSyncMobileServices) {
      return;
    }

    syncActiveIndexFromProgress(progress, services.length, setActiveIndex);
  });

  useEffect(() => {
    if (!isDesktop) {
      lastWheelStepTimeRef.current = 0;
      return;
    }

    const sectionElement = containerRef.current;

    if (!sectionElement) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      const sectionRect = sectionElement.getBoundingClientRect();

      if (sectionRect.top > 0 || sectionRect.bottom < window.innerHeight) {
        return;
      }

      if (Math.abs(event.deltaY) < SERVICES_WHEEL_MIN_DELTA) {
        return;
      }

      const now = performance.now();

      if (now - lastWheelStepTimeRef.current < SERVICES_WHEEL_STEP_GUARD_MS) {
        event.preventDefault();
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(services.length - 1, activeIndex + direction));

      if (nextIndex === activeIndex) {
        return;
      }

      event.preventDefault();
      lastWheelStepTimeRef.current = now;
      setActiveIndex(nextIndex);
      scrollDesktopToIndex(nextIndex);
    };

    sectionElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      sectionElement.removeEventListener("wheel", handleWheel);
    };
  }, [activeIndex, containerRef, isDesktop, scrollDesktopToIndex, setActiveIndex]);

  const syncGridHoverFromPointer = useCallback((clientX: number, clientY: number) => {
    const gridElement = gridRef.current;

    if (!gridElement) {
      setIsGridHovered(false);
      return;
    }

    setIsGridHovered(isPointInsideElement(clientX, clientY, gridElement));
  }, []);

  useEffect(() => {
    if (!isDesktop || !isPointerFine) {
      setExploreCursorZone("none");
      return;
    }

    setExploreCursorZone(isExploreCursorActive ? "services" : "none");

    return () => {
      setExploreCursorZone("none");
    };
  }, [isDesktop, isPointerFine, isExploreCursorActive]);

  useEffect(() => {
    if (!lenis || !isDesktop || !isPointerFine) {
      return;
    }

    const handleLenisScroll = () => {
      isLenisScrollingRef.current = true;
      setIsGridHovered(false);

      if (hoverScrollTimeoutRef.current) {
        clearTimeout(hoverScrollTimeoutRef.current);
      }

      hoverScrollTimeoutRef.current = setTimeout(() => {
        isLenisScrollingRef.current = false;
        hoverScrollTimeoutRef.current = null;

        const { x, y } = lastPointerRef.current;

        if (x >= 0 && y >= 0) {
          syncGridHoverFromPointer(x, y);
        }
      }, 100);
    };

    lenis.on("scroll", handleLenisScroll);

    return () => {
      lenis.off("scroll", handleLenisScroll);

      if (hoverScrollTimeoutRef.current) {
        clearTimeout(hoverScrollTimeoutRef.current);
        hoverScrollTimeoutRef.current = null;
      }

      isLenisScrollingRef.current = false;
    };
  }, [lenis, isDesktop, isPointerFine, syncGridHoverFromPointer]);

  useEffect(() => {
    if (isDesktop) {
      return;
    }

    const measureMobileStage = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const columnsGap = parseFloat(rootStyles.getPropertyValue("--services-columns-gap")) || 24;
      const stageBottomPadding =
        parseFloat(rootStyles.getPropertyValue("--services-stage-bottom-padding")) || 32;
      const pinClearance =
        parseFloat(rootStyles.getPropertyValue("--services-mobile-pin-clearance")) || 0;
      const scrollStepVh = parseFloat(rootStyles.getPropertyValue("--services-scroll-step-vh")) || 100;
      const mobileScrollTailVh =
        parseFloat(rootStyles.getPropertyValue("--services-mobile-scroll-tail-vh")) || 0;
      const viewportHeight = window.innerHeight;
      const titleHeight = mobileTitleRef.current?.offsetHeight ?? 0;
      const contentHeight = Math.max(
        0,
        ...mobileContentMeasureRefs.current.map((element) => element?.offsetHeight ?? 0),
      );
      const imageHeight = Math.max(
        0,
        ...mobileImageMeasureRefs.current.map((element) => element?.offsetHeight ?? 0),
      );
      const stageHeight = isTablet
        ? Math.max(viewportHeight, SERVICES_TABLET_STAGE_HEIGHT_PX)
        : Math.max(
            viewportHeight,
            titleHeight + contentHeight + imageHeight + columnsGap + stageBottomPadding + pinClearance,
          );

      setMobileStageMetrics({
        stageHeight,
        contentHeight,
        imageHeight,
        scrollHeight:
          stageHeight +
          Math.max(services.length - 1, 0) * viewportHeight * (scrollStepVh / 100) +
          viewportHeight * (mobileScrollTailVh / 100),
      });
    };

    measureMobileStage();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" && mobileMeasureRef.current
        ? new ResizeObserver(() => {
            measureMobileStage();
          })
        : null;

    if (mobileMeasureRef.current && resizeObserver) {
      resizeObserver.observe(mobileMeasureRef.current);
    }

    window.addEventListener("resize", measureMobileStage);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureMobileStage);
    };
  }, [isDesktop, isTablet]);

  const tabletPanelHeight = SERVICES_TABLET_PANEL_HEIGHT_PX;
  const desktopScrollStepCount = Math.max(services.length, 1);

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
        "relative z-20 w-full overflow-x-clip bg-background",
        "mt-(--services-margin-top)",
        isDesktop && isPointerFine && "cursor-none",
      )}
      style={
        isDesktop
          ? {
              minHeight: `calc(100svh + ${desktopScrollStepCount} * var(--services-scroll-step-vh) * 1svh)`,
            }
          : undefined
      }
      aria-label="Services"
      onMouseLeave={() => {
        setIsGridHovered(false);
      }}
      onMouseMove={(event) => {
        lastPointerRef.current = { x: event.clientX, y: event.clientY };

        if (isLenisScrollingRef.current) {
          return;
        }

        syncGridHoverFromPointer(event.clientX, event.clientY);
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
                height:
                  mobileStageMetrics.stageHeight > 0
                    ? `${mobileStageMetrics.stageHeight}px`
                    : "100svh",
              }}
            >
              <div
                className={cn(
                  "relative z-(--services-content-z-index) flex h-full w-full overflow-visible",
                  isTablet
                    ? "flex-col items-start justify-start pt-(--services-padding-y)"
                    : "flex-col items-start justify-start pt-(--services-padding-y)",
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
                    "pb-(--services-stage-bottom-padding)",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                  )}
                  style={{
                    gridTemplateRows:
                      !isTablet && mobileStageMetrics.contentHeight > 0 && mobileStageMetrics.imageHeight > 0
                        ? `${mobileStageMetrics.contentHeight}px ${mobileStageMetrics.imageHeight}px`
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
                          : mobileStageMetrics.contentHeight > 0
                          ? `${mobileStageMetrics.contentHeight}px`
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
                          : mobileStageMetrics.imageHeight > 0
                          ? `${mobileStageMetrics.imageHeight}px`
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
            <div className="grid w-full content-start gap-(--services-columns-gap) py-(--services-stage-bottom-padding)">
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
