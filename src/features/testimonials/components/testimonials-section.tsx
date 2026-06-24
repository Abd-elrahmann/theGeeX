"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { ArrowRightIcon } from "@/components/shared/icons/arrow-right";
import { cn } from "@/lib/cn";

import {
  testimonialItems,
} from "@/features/testimonials/constants/testimonials";
import { TestimonialCard } from "@/features/testimonials/components/testimonial-card";
import { TestimonialsTitle } from "@/features/testimonials/components/testimonials-title";

const AUTO_PLAY_INTERVAL_MS = 2000;
const MANUAL_INTERACTION_PAUSE_MS = 1800;
const DRAG_DIRECTION_THRESHOLD_PX = 8;

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const interactionUntilRef = useRef(0);
  const currentIndexRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartTranslateXRef = useRef(0);
  const dragTranslateXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardOffsets, setCardOffsets] = useState<number[]>([]);
  const [dragTranslateX, setDragTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSectionInView, setIsSectionInView] = useState(false);

  const handleManualInteraction = () => {
    interactionUntilRef.current = Date.now() + MANUAL_INTERACTION_PAUSE_MS;
  };

  const measureCardOffsets = useCallback(() => {
    const viewportElement = viewportRef.current;
    const trackElement = trackRef.current;

    if (!viewportElement || !trackElement) {
      return;
    }

    const nextOffsets = cardRefs.current.map((cardElement) => {
      if (!cardElement) {
        return 0;
      }

      return cardElement.offsetLeft;
    });

    setCardOffsets(nextOffsets);
  }, []);

  const goToCard = (index: number) => {
    const normalizedIndex =
      index < 0
        ? testimonialItems.length - 1
        : index >= testimonialItems.length
          ? 0
          : index;

    currentIndexRef.current = normalizedIndex;
    setCurrentIndex(normalizedIndex);
  };

  const maxTrackOffset = cardOffsets.at(-1) ?? 0;
  const activeTrackOffset = -(cardOffsets[currentIndex] ?? 0);
  const currentTrackX = isDragging ? dragTranslateX : activeTrackOffset;

  useEffect(() => {
    const viewportElement = viewportRef.current;

    if (!viewportElement) {
      return;
    }

    measureCardOffsets();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            measureCardOffsets();
          })
        : null;

    resizeObserver?.observe(viewportElement);
    cardRefs.current.forEach((cardElement) => {
      if (cardElement) {
        resizeObserver?.observe(cardElement);
      }
    });

    window.addEventListener("resize", measureCardOffsets);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureCardOffsets);
    };
  }, [measureCardOffsets]);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isSectionInView) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (isDraggingRef.current || Date.now() < interactionUntilRef.current) {
        return;
      }

      goToCard((currentIndexRef.current + 1) % testimonialItems.length);
    }, AUTO_PLAY_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isSectionInView]);

  return (
    <section
      ref={sectionRef}
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
          {currentIndex > 0 ? (
            <button
              type="button"
              aria-label="Previous testimonial"
              className={cn(
                "absolute top-1/2 left-2 z-2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-text lg:flex",
                "transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border",
              )}
              onClick={() => {
                handleManualInteraction();
                goToCard(currentIndex - 1);
              }}
            >
              <ArrowRightIcon className="h-5 w-5 rotate-180" />
            </button>
          ) : null}

          {currentIndex < testimonialItems.length - 1 ? (
            <button
              type="button"
              aria-label="Next testimonial"
              className={cn(
                "absolute top-1/2 right-2 z-2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-text lg:flex",
                "transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border",
              )}
              onClick={() => {
                handleManualInteraction();
                goToCard(currentIndex + 1);
              }}
            >
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          ) : null}

          <div
            ref={viewportRef}
            className={cn(
              "w-full touch-pan-y overflow-hidden select-none",
              isDragging ? "cursor-grabbing" : "lg:cursor-grab",
            )}
            onPointerDown={(event) => {
              const viewportElement = viewportRef.current;

              if (!viewportElement) {
                return;
              }

              pointerIdRef.current = event.pointerId;
              dragStartXRef.current = event.clientX;
              dragStartYRef.current = event.clientY;
              dragStartTranslateXRef.current = activeTrackOffset;
              dragTranslateXRef.current = activeTrackOffset;
              isDraggingRef.current = false;
            }}
            onPointerMove={(event) => {
              if (pointerIdRef.current !== event.pointerId) {
                return;
              }

              const deltaX = event.clientX - dragStartXRef.current;
              const deltaY = event.clientY - dragStartYRef.current;

              if (!isDraggingRef.current) {
                const absDeltaX = Math.abs(deltaX);
                const absDeltaY = Math.abs(deltaY);

                if (absDeltaX < DRAG_DIRECTION_THRESHOLD_PX && absDeltaY < DRAG_DIRECTION_THRESHOLD_PX) {
                  return;
                }

                if (absDeltaY >= absDeltaX) {
                  pointerIdRef.current = null;
                  setIsDragging(false);
                  return;
                }

                handleManualInteraction();
                isDraggingRef.current = true;
                setDragTranslateX(activeTrackOffset);
                setIsDragging(true);
                event.currentTarget.setPointerCapture(event.pointerId);
              }

              const nextTranslateX = Math.min(
                Math.max(dragStartTranslateXRef.current + deltaX, -maxTrackOffset),
                0,
              );

              dragTranslateXRef.current = nextTranslateX;
              setDragTranslateX(nextTranslateX);
            }}
            onPointerUp={(event) => {
              const viewportElement = viewportRef.current;

              if (viewportElement && pointerIdRef.current === event.pointerId) {
                viewportElement.releasePointerCapture(event.pointerId);
              }

              if (pointerIdRef.current !== event.pointerId) {
                return;
              }

              pointerIdRef.current = null;

              if (!isDraggingRef.current) {
                return;
              }

              const nearestIndex = cardOffsets.reduce((bestIndex, offset, index) => {
                const bestDistance = Math.abs(cardOffsets[bestIndex] + dragTranslateXRef.current);
                const currentDistance = Math.abs(offset + dragTranslateXRef.current);

                return currentDistance < bestDistance ? index : bestIndex;
              }, 0);

              isDraggingRef.current = false;
              setIsDragging(false);
              goToCard(nearestIndex);
            }}
            onPointerCancel={(event) => {
              const viewportElement = viewportRef.current;

              if (viewportElement && pointerIdRef.current === event.pointerId) {
                viewportElement.releasePointerCapture(event.pointerId);
              }

              pointerIdRef.current = null;
              isDraggingRef.current = false;
              setIsDragging(false);
            }}
          >
            <motion.div
              ref={trackRef}
              animate={{ x: currentTrackX }}
              transition={
                isDragging
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      duration: 0.4,
                      bounce: 0.2,
                      delay: 0,
                    }
              }
              className="flex gap-(--testimonials-carousel-gap) pb-2"
            >
              {testimonialItems.map((item, index) => (
                <div
                  key={item.id}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className="shrink-0"
                >
                  <TestimonialCard item={item} isActive={currentIndex === index} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}