"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { useGSAP } from "@/lib/gsap";
import {
  measureScrollPaths,
  updatePathDrawProgress,
  type PathDrawCache,
} from "@/lib/scroll-path-draw";
import { parsePathSvg, type PathDefinition } from "@/lib/parse-path-svg";

import { storytellingConfig } from "@/features/storytelling/constants/storytelling.config";

interface StorytellingPathProps {
  drawProgress: number;
  className?: string;
  useDefaultTopOffset?: boolean;
  preserveAspectRatio?: string;
  reverseDraw?: boolean;
}

export function StorytellingPath({
  drawProgress,
  className,
  useDefaultTopOffset = true,
  preserveAspectRatio = "xMinYMin slice",
  reverseDraw = false,
}: StorytellingPathProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathCachesRef = useRef<PathDrawCache[]>([]);
  const [strokePaths, setStrokePaths] = useState<PathDefinition[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch(storytellingConfig.path.src)
      .then((response) => response.text())
      .then((svgContent) => {
        if (cancelled) {
          return;
        }

        const paths = parsePathSvg(svgContent).filter((path) => Boolean(path.stroke));
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

  useGSAP(
    () => {
      const svg = svgRef.current;

      if (!svg || strokePaths.length === 0) {
        return;
      }

      const { path, scroll } = storytellingConfig;

      pathCachesRef.current = measureScrollPaths(svg, {
        strokeWidthVar: "--storytelling-path-stroke-width",
        hidePaddingVar: "--storytelling-path-hide-padding",
        strokeWidthFallback: path.strokeWidth,
        hidePaddingFallback: path.hidePadding,
        progressStart: scroll.progressStart,
        progressEnd: scroll.progressEnd,
        pathDataAttribute: "data-storytelling-stroke",
      });

      updatePathDrawProgress(pathCachesRef.current, drawProgress, reverseDraw);
    },
    { dependencies: [strokePaths, reverseDraw], scope: svgRef },
  );

  useEffect(() => {
    if (pathCachesRef.current.length === 0) {
      return;
    }

    updatePathDrawProgress(pathCachesRef.current, drawProgress, reverseDraw);
  }, [drawProgress, reverseDraw]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-(--storytelling-path-z-index) overflow-visible",
        useDefaultTopOffset && "-top-(--storytelling-path-inset-y)",
        "left-[calc(50%-50vw)]",
        "w-(--storytelling-path-width)",
        "aspect-1946/1290 h-(--storytelling-path-height)",
        className,
      )}
    >
      <svg
        ref={svgRef}
        viewBox={storytellingConfig.path.viewBox}
        preserveAspectRatio={preserveAspectRatio}
        overflow="visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        shapeRendering="geometricPrecision"
        className={cn(
          "block h-full w-full overflow-visible",
          "translate-x-(--storytelling-path-offset-x) translate-y-(--storytelling-path-offset-y)",
        )}
      >
        {strokePaths.map((path, index) => (
          <path
            key={`storytelling-stroke-${index}`}
            d={path.d}
            data-storytelling-stroke=""
            fill="none"
            stroke="var(--color-storytelling-path-stroke)"
            strokeWidth="var(--storytelling-path-stroke-width)"
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
