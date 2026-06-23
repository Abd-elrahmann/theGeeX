"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

import { cn } from "@/lib/cn";
import { DESKTOP_MEDIA_QUERY, SUB_DESKTOP_MEDIA_QUERY } from "@/lib/breakpoints";
import { resetHeroScrollState } from "@/lib/hero-scroll-state";
import { gsap, useGSAP } from "@/lib/gsap";

import { createHeroPathScrollDraw } from "@/features/hero/animations/hero-path-draw";
import type { HeroPathDefinition } from "@/features/hero/lib/parse-hero-path-svg";
import { parseHeroPathSvg } from "@/features/hero/lib/parse-hero-path-svg";

const HERO_PATH_SRC = "/images/hero-path.svg";

interface HeroPathProps {
  triggerRef: RefObject<HTMLElement | null>;
}

export function HeroPath({ triggerRef }: HeroPathProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [strokePaths, setStrokePaths] = useState<HeroPathDefinition[]>([]);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const isPathVisible = isAnimationReady;

  useEffect(() => {
    let cancelled = false;

    fetch(HERO_PATH_SRC)
      .then((response) => response.text())
      .then((svgContent) => {
        if (cancelled) {
          return;
        }

        const paths = parseHeroPathSvg(svgContent).filter((path) => Boolean(path.stroke));
        setStrokePaths(paths);
      })
      .catch(() => {
        if (!cancelled) {
          setStrokePaths([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (strokePaths.length === 0) {
      return;
    }

    const frameId = requestAnimationFrame(() => {
      setIsLayoutReady(true);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [strokePaths]);

  useGSAP(
    () => {
      const svg = svgRef.current;
      const trigger = triggerRef.current;

      if (!svg || !trigger || !isLayoutReady || strokePaths.length === 0) {
        return;
      }

      const matchMedia = gsap.matchMedia();

      const mountScrollDraw = () => {
        const { timeline } = createHeroPathScrollDraw(trigger, svg, { pin: true });
        setIsAnimationReady(true);

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
          resetHeroScrollState();
        };
      };

      matchMedia.add(DESKTOP_MEDIA_QUERY, mountScrollDraw);
      matchMedia.add(SUB_DESKTOP_MEDIA_QUERY, mountScrollDraw);

      return () => {
        matchMedia.revert();
        resetHeroScrollState();
      };
    },
    { dependencies: [strokePaths, isLayoutReady, triggerRef], scope: svgRef },
  );

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-(--hero-path-width) translate-y-(--hero-path-offset-y)",
        "lg:w-(--hero-path-width) lg:max-w-none lg:shrink-0",
        !isPathVisible && "opacity-0",
      )}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 666 706"
        overflow="visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        shapeRendering="geometricPrecision"
        className="mx-auto block h-auto w-full overflow-visible lg:w-(--hero-path-width)"
      >
        {strokePaths.map((path, index) => (
          <path
            key={`hero-stroke-${index}`}
            d={path.d}
            data-hero-stroke=""
            fill="none"
            stroke="var(--color-hero-path-stroke)"
            strokeWidth="var(--hero-path-stroke-width)"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: "0 1",
              strokeDashoffset: 1,
            }}
            fillRule={path.fillRule}
            clipRule={path.clipRule}
          />
        ))}
      </svg>
    </div>
  );
}
