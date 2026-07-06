"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/cn";

import { heroConfig } from "@/features/hero/constants/hero.config";

interface QuotedHeadlineProps {
  lines: readonly string[];
  keyPrefix: string;
  isInView: boolean;
}

function QuotedHeadline({ lines, keyPrefix, isInView }: QuotedHeadlineProps) {
  const { quoteOpen, quoteClose } = heroConfig.headline;
  const { initial, animate, transition, stagger } = heroConfig.reveal;
  const lastLineIndex = lines.length - 1;

  return (
    <>
      {lines.map((line, index) => {
        const isFirstLine = index === 0;
        const isLastLine = index === lastLineIndex;
        const isAccentLine = isLastLine;

        return (
          <div
            key={`${keyPrefix}-${index}`}
            className="overflow-hidden px-[0.15em] pb-(--hero-headline-line-padding-bottom)"
          >
            <motion.div
              className={cn(
                isAccentLine
                  ? "text-(--color-hero-headline-accent)"
                  : "text-primary",
              )}
              initial={initial}
              animate={isInView ? animate : initial}
              transition={{
                ...transition,
                delay: index * stagger,
              }}
            >
              {isFirstLine ? <span aria-hidden="true">{quoteOpen}</span> : null}
              {line}
              {isLastLine ? <span aria-hidden="true">{quoteClose}</span> : null}
            </motion.div>
          </div>
        );
      })}
    </>
  );
}

export function HeroHeadline() {
  const { lines } = heroConfig.headline;
  const { viewport } = heroConfig.reveal;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headingRef, viewport);

  const headingClassName = cn(
    "h-auto w-full max-w-(--hero-headline-max-width) font-poppins text-center font-bold not-italic tracking-normal",
    "whitespace-pre-wrap break-words [word-break:break-word]",
    "text-[length:var(--hero-headline-size)] leading-(--hero-headline-line-height)",
    "text-primary [font-feature-settings:normal]",
    "lg:translate-y-(--hero-headline-offset-y)",
  );

  return (
    <div
      className={cn(
        "mx-auto flex h-auto w-full max-w-(--hero-headline-max-width) justify-center",
        "max-lg:absolute max-lg:top-1/2 max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2",
        "lg:relative lg:translate-x-0 lg:translate-y-0",
      )}
    >
      <h1 ref={headingRef} className={headingClassName}>
        <span className="lg:hidden">
          <QuotedHeadline lines={lines} keyPrefix="compact" isInView={isInView} />
        </span>
        <span className="hidden lg:block">
          <QuotedHeadline lines={lines} keyPrefix="desktop" isInView={isInView} />
        </span>
      </h1>
    </div>
  );
}
