"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowRightIcon } from "@/components/shared/icons/arrow-right";
import { cn } from "@/lib/cn";

import {
  testimonialItems,
} from "@/features/testimonials/constants/testimonials";
import { TestimonialCard } from "@/features/testimonials/components/testimonial-card";
import { TestimonialsTitle } from "@/features/testimonials/components/testimonials-title";

const tickerItems = [...testimonialItems, ...testimonialItems];
type TickerDirection = "left" | "right";
const TICKER_SPEED_PX_PER_SECOND = 36;
const TICKER_INTERACTION_PAUSE_MS = 1200;

export function TestimonialsSection() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const directionRef = useRef<TickerDirection>("left");
  const pauseUntilRef = useRef(0);
  const [tickerDirection, setTickerDirection] = useState<TickerDirection>("left");

  const handleTickerDirectionChange = (direction: TickerDirection) => {
    directionRef.current = direction;
    pauseUntilRef.current = Date.now() + TICKER_INTERACTION_PAUSE_MS;
    setTickerDirection(direction);
  };

  const scrollTestimonials = (direction: TickerDirection) => {
    const viewportElement = viewportRef.current;

    if (!viewportElement) {
      return;
    }

    handleTickerDirectionChange(direction);
    viewportElement.scrollBy({
      left: direction === "left" ? viewportElement.clientWidth * 0.8 : -viewportElement.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const viewportElement = viewportRef.current;

    if (!viewportElement) {
      return;
    }

    let previousTime = performance.now();
    let frameId = 0;

    const normalizeScroll = () => {
      const firstDuplicateElement = trackRef.current?.children[testimonialItems.length] as HTMLElement | undefined;
      const loopWidth = firstDuplicateElement?.offsetLeft ?? viewportElement.scrollWidth / 2;

      if (loopWidth <= 0) {
        return;
      }

      if (viewportElement.scrollLeft >= loopWidth) {
        viewportElement.scrollLeft -= loopWidth;
      }

      if (viewportElement.scrollLeft <= 0 && directionRef.current === "right") {
        viewportElement.scrollLeft += loopWidth;
      }
    };

    const handleManualScroll = () => {
      normalizeScroll();
    };

    const tick = (time: number) => {
      const deltaSeconds = (time - previousTime) / 1000;
      previousTime = time;

      if (Date.now() >= pauseUntilRef.current) {
        const directionMultiplier = directionRef.current === "left" ? 1 : -1;
        viewportElement.scrollLeft += directionMultiplier * TICKER_SPEED_PX_PER_SECOND * deltaSeconds;
        normalizeScroll();
      }

      frameId = requestAnimationFrame(tick);
    };

    normalizeScroll();
    viewportElement.addEventListener("scroll", handleManualScroll, { passive: true });
    frameId = requestAnimationFrame(tick);

    return () => {
      viewportElement.removeEventListener("scroll", handleManualScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className={cn(
        "relative w-full overflow-visible bg-background",
        "mt-(--testimonials-margin-top) px-(--testimonials-padding-x) py-(--testimonials-padding-y)",
      )}
    >
      <div className="mx-auto flex w-full max-w-(--testimonials-container-max-width) flex-col gap-(--testimonials-section-gap)">
        <TestimonialsTitle />

        <div className="relative w-full overflow-hidden">
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
            className="w-full touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain pb-2 select-none scrollbar-none [&::-webkit-scrollbar]:hidden"
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
              className="flex w-max gap-(--testimonials-carousel-gap)"
            >
              {tickerItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  aria-hidden={index >= testimonialItems.length}
                  className="shrink-0 snap-start"
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