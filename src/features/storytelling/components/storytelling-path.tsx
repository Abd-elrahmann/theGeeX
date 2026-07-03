"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

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
  milestoneProgresses?: readonly number[];
  style?: CSSProperties;
}

interface MilestoneCache {
  circle: SVGCircleElement;
  progress: number;
}

const MILESTONE_REVEAL_LEAD = 0.035;

function updateMilestoneProgress(
  milestoneCaches: MilestoneCache[],
  drawProgress: number,
): void {
  for (const milestone of milestoneCaches) {
    const revealProgress = Math.max(
      0,
      Math.min((drawProgress - milestone.progress + MILESTONE_REVEAL_LEAD) / MILESTONE_REVEAL_LEAD, 1),
    );
    const isCurrent = Math.abs(drawProgress - milestone.progress) <= 0.12;

    milestone.circle.style.opacity = revealProgress.toString();
    milestone.circle.style.transform = `scale(${isCurrent ? 1.18 : 1})`;
  }
}

export function StorytellingPath({
  drawProgress,
  className,
  useDefaultTopOffset = true,
  preserveAspectRatio = "xMinYMin slice",
  reverseDraw = false,
  milestoneProgresses = [],
  style,
}: StorytellingPathProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathCachesRef = useRef<PathDrawCache[]>([]);
  const milestoneCachesRef = useRef<MilestoneCache[]>([]);
  const milestoneRefs = useRef<SVGCircleElement[]>([]);
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

      const primaryPath = pathCachesRef.current[0]?.path;

      milestoneCachesRef.current = primaryPath
        ? milestoneProgresses.flatMap((progress, index) => {
            const circle = milestoneRefs.current[index];

            if (!circle) {
              return [];
            }

            const pathLength = primaryPath.getTotalLength();
            const clampedProgress = Math.max(0, Math.min(progress, 1));
            const pointProgress = reverseDraw ? 1 - clampedProgress : clampedProgress;
            const point = primaryPath.getPointAtLength(pathLength * pointProgress);

            circle.setAttribute("cx", point.x.toString());
            circle.setAttribute("cy", point.y.toString());

            return [{ circle, progress: clampedProgress }];
          })
        : [];

      updatePathDrawProgress(pathCachesRef.current, drawProgress, reverseDraw);
      updateMilestoneProgress(milestoneCachesRef.current, drawProgress);
    },
    { dependencies: [strokePaths, reverseDraw, milestoneProgresses], scope: svgRef },
  );

  useEffect(() => {
    if (pathCachesRef.current.length === 0) {
      return;
    }

    updatePathDrawProgress(pathCachesRef.current, drawProgress, reverseDraw);
    updateMilestoneProgress(milestoneCachesRef.current, drawProgress);
  }, [drawProgress, reverseDraw]);

  return (
    <div
      style={style}
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
        {milestoneProgresses.map((progress, index) => (
          <circle
            key={`storytelling-path-milestone-${progress}`}
            ref={(circle) => {
              if (circle) {
                milestoneRefs.current[index] = circle;
              }
            }}
            r="var(--storytelling-path-dot-size, 14)"
            fill="var(--color-storytelling-path-dot, rgb(115 115 115 / 0.96))"
            stroke="var(--color-storytelling-path-dot-ring, rgb(255 255 255 / 0.16))"
            strokeWidth="var(--storytelling-path-dot-ring-width, 2)"
            opacity="0"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              transition: "opacity 220ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
