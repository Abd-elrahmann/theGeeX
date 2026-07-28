"use client";

import { useEffect, useRef, useState } from "react";

import { SiteFooter } from "@/features/footer";
import { LetsTalkSection } from "@/features/lets-talk";

type FooterRevealStackProps = {
  marginTop?: string;
};

function readRootNumber(variableName: string): number {
  if (typeof window === "undefined") {
    return 0;
  }

  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName);
  const parsedValue = Number.parseFloat(value);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export function FooterRevealStack({ marginTop }: FooterRevealStackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const letsTalkRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<string>("var(--lets-talk-footer-reveal-height)");

  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    const letsTalkElement = letsTalkRef.current;
    const footerElement = footerRef.current;

    if (!wrapperElement || !letsTalkElement || !footerElement) {
      return;
    }

    const measure = () => {
      const stickyTop = readRootNumber("--lets-talk-reveal-sticky-top");
      const footerGap = readRootNumber("--footer-reveal-gap");
      const footerBottomGap = readRootNumber("--footer-reveal-bottom-gap");
      const footerOverlapBleed = readRootNumber("--footer-overlap-bleed-height");
      const letsTalkHeight = letsTalkElement.offsetHeight;
      const footerHeight = footerElement.offsetHeight;

      const nextMinHeight = Math.max(
        letsTalkHeight + footerGap + footerHeight + footerBottomGap + footerOverlapBleed + stickyTop,
        letsTalkHeight + stickyTop,
      );

      setMinHeight(`${Math.ceil(nextMinHeight)}px`);
    };

    measure();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            measure();
          })
        : null;

    resizeObserver?.observe(letsTalkElement);
    resizeObserver?.observe(footerElement);
    window.addEventListener("resize", measure);

    void document.fonts?.ready.then(() => {
      measure();
    });

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={marginTop ? "relative" : "relative mt-(--lets-talk-margin-top) md:mt-0"}
      style={{
        marginTop,
        minHeight,
      }}
    >
      <div ref={letsTalkRef} className="sticky z-10" style={{ top: "var(--lets-talk-reveal-sticky-top)" }}>
        <LetsTalkSection revealFooterOnScroll />
      </div>

      <div ref={footerRef} className="sticky z-20 mt-(--footer-reveal-gap)" style={{ top: "var(--lets-talk-reveal-sticky-top)" }}>
        <SiteFooter revealFromPreviousSection />
      </div>
    </div>
  );
}