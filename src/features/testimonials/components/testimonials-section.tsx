"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowRightIcon } from "@/components/shared/icons/arrow-right";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { cn } from "@/lib/cn";

import {
  testimonialItems,
} from "@/features/testimonials/constants/testimonials";
import { TestimonialCard } from "@/features/testimonials/components/testimonial-card";
import { TestimonialsTitle } from "@/features/testimonials/components/testimonials-title";

type TickerDirection = "left" | "right";
const TICKER_SPEED_PX_PER_SECOND = 56;
const TICKER_INTERACTION_PAUSE_MS = 700;

export function TestimonialsSection() {
  const isDesktop = useDesktopBreakpoint();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const directionRef = useRef<TickerDirection>("left");
  const pauseUntilRef = useRef(0);
  const tickerOffsetRef = useRef(0);
  const [tickerDirection, setTickerDirection] = useState<TickerDirection>("left");
  const items = isDesktop ? [...testimonialItems, ...testimonialItems] : testimonialItems;

  const handleTickerDirectionChange = (direction: TickerDirection) => {
    directionRef.current = direction;
    pauseUntilRef.current = Date.now() + TICKER_INTERACTION_PAUSE_MS;
    setTickerDirection(direction);
  };

  const scrollTestimonials = (direction: TickerDirection) => {
    const viewportElement = viewportRef.current;
    const trackElement = trackRef.current;

    if (!viewportElement) {
      return;
    }

    handleTickerDirectionChange(direction);

    if (isDesktop && trackElement) {
      const firstDuplicateElement = trackElement.children[testimonialItems.length] as HTMLElement | undefined;
      const loopWidth = firstDuplicateElement?.offsetLeft ?? trackElement.scrollWidth / 2;

      if (loopWidth > 0) {
        const delta = viewportElement.clientWidth * 0.8;
        const directionMultiplier = direction === "left" ? 1 : -1;

        tickerOffsetRef.current += directionMultiplier * delta;

        while (tickerOffsetRef.current >= loopWidth) {
          tickerOffsetRef.current -= loopWidth;
        }

        while (tickerOffsetRef.current < 0) {
          tickerOffsetRef.current += loopWidth;
        }

        trackElement.style.transform = `translate3d(${-tickerOffsetRef.current}px, 0, 0)`;
      }

      return;
    }

    viewportElement.scrollBy({
      left: direction === "left" ? viewportElement.clientWidth * 0.8 : -viewportElement.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const viewportElement = viewportRef.current;
    const trackElement = trackRef.current;

    if (!viewportElement || !trackElement || !isDesktop) {
      if (trackElement) {
        trackElement.style.transform = "";
      }

      return;
    }

    let previousTime = performance.now();
    let frameId = 0;

    const getLoopWidth = () => {
      const firstDuplicateElement = trackElement.children[testimonialItems.length] as HTMLElement | undefined;

      return firstDuplicateElement?.offsetLeft ?? trackElement.scrollWidth / 2;
    };

    const applyOffset = () => {
      const loopWidth = getLoopWidth();

      if (loopWidth <= 0) {
        return;
      }

      while (tickerOffsetRef.current >= loopWidth) {
        tickerOffsetRef.current -= loopWidth;
      }

      while (tickerOffsetRef.current < 0) {
        tickerOffsetRef.current += loopWidth;
      }

      trackElement.style.transform = `translate3d(${-tickerOffsetRef.current}px, 0, 0)`;
    };

    const tick = (time: number) => {
      const deltaSeconds = (time - previousTime) / 1000;
      previousTime = time;

      if (Date.now() >= pauseUntilRef.current) {
        const directionMultiplier = directionRef.current === "left" ? 1 : -1;
        tickerOffsetRef.current += directionMultiplier * TICKER_SPEED_PX_PER_SECOND * deltaSeconds;
        applyOffset();
      }

      frameId = requestAnimationFrame(tick);
    };

    tickerOffsetRef.current = 0;
    applyOffset();
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      trackElement.style.transform = "";
    };
  }, [isDesktop]);

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className={cn(
        "relative w-full overflow-visible bg-transparent",
        "mt-(--testimonials-margin-top) px-(--testimonials-padding-x) py-(--testimonials-padding-y)",
      )}
    >
      <div className="flex w-full flex-col gap-(--testimonials-section-gap) bg-transparent">
        <TestimonialsTitle />

        <div className="relative -mx-(--testimonials-padding-x) w-[calc(100%+2*var(--testimonials-padding-x))] overflow-visible bg-transparent px-(--testimonials-padding-x)">
          <button
            type="button"
            aria-label="Move testimonials left"
            className={cn(
              "absolute top-1/2 left-2 z-2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-text lg:flex",
              "transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border",
            )}
            aria-pressed={tickerDirection === "right"}
            onClick={() => scrollTestimonials("right")}
          >
            <ArrowRightIcon className="h-5 w-5 rotate-180" />
          </button>

          <button
            type="button"
            aria-label="Move testimonials right"
            className={cn(
              "absolute top-1/2 right-2 z-2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-text lg:flex",
              "transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border",
            )}
            aria-pressed={tickerDirection === "left"}
            onClick={() => scrollTestimonials("left")}
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>

          <div
            ref={viewportRef}
            className={cn(
              "w-full overflow-y-hidden overscroll-x-contain bg-transparent pb-2 select-none scrollbar-none [&::-webkit-scrollbar]:hidden",
              isDesktop ? "overflow-x-hidden" : "scroll-smooth overflow-x-auto [touch-action:pan-x_pan-y] snap-x snap-mandatory",
            )}
            onPointerDown={() => {
              pauseUntilRef.current = Date.now() + TICKER_INTERACTION_PAUSE_MS;
            }}
            onTouchStart={() => {
              pauseUntilRef.current = Date.now() + TICKER_INTERACTION_PAUSE_MS;
            }}
            onWheel={() => {
              pauseUntilRef.current = Date.now() + TICKER_INTERACTION_PAUSE_MS;
            }}
          >
            <div
              ref={trackRef}
              className="flex w-max gap-(--testimonials-carousel-gap) bg-transparent"
            >
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  aria-hidden={isDesktop && index >= testimonialItems.length}
                  className="shrink-0 snap-start bg-transparent"
                >
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}