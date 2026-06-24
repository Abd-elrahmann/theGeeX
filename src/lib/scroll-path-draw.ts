import { gsap } from "@/lib/gsap";
import { readCssNumber } from "@/lib/read-css-var";

export interface PathDrawCache {
  path: SVGPathElement;
  hiddenOffset: number;
  setDashoffset: ReturnType<typeof gsap.quickSetter>;
}

function setPathHidden(
  path: SVGPathElement,
  drawableLength: number,
  gapLength: number,
  hiddenOffset: number,
): void {
  gsap.set(path, {
    strokeDasharray: `${drawableLength} ${gapLength}`,
    strokeDashoffset: hiddenOffset,
    opacity: 1,
    visibility: "visible",
  });
}

interface MeasureScrollPathsOptions {
  strokeWidthVar: string;
  hidePaddingVar: string;
  strokeWidthFallback: number;
  hidePaddingFallback: number;
  progressStart: number;
  progressEnd: number;
  pathSelector?: string;
  pathDataAttribute?: string;
}

export function measureScrollPaths(
  svg: SVGSVGElement,
  options: MeasureScrollPathsOptions,
): PathDrawCache[] {
  const {
    strokeWidthVar,
    hidePaddingVar,
    strokeWidthFallback,
    hidePaddingFallback,
    progressStart,
    progressEnd,
    pathSelector = "path[data-scroll-stroke]",
    pathDataAttribute,
  } = options;

  const strokeWidth = readCssNumber(svg, strokeWidthVar, strokeWidthFallback);
  const extraPadding = readCssNumber(svg, hidePaddingVar, hidePaddingFallback);
  const gapPadding = strokeWidth + extraPadding;

  const strokePaths = pathDataAttribute
    ? Array.from(svg.querySelectorAll<SVGPathElement>(`path[${pathDataAttribute}]`))
    : Array.from(svg.querySelectorAll<SVGPathElement>(pathSelector));

  return strokePaths.map((path) => {
    const length = path.getTotalLength();
    const drawableLength = length * (progressEnd - progressStart);
    const gapLength = length + gapPadding;
    const hiddenOffset = drawableLength + gapPadding;

    setPathHidden(path, drawableLength, gapLength, hiddenOffset);

    return {
      path,
      hiddenOffset,
      setDashoffset: gsap.quickSetter(path, "strokeDashoffset"),
    };
  });
}

const DRAW_PROGRESS_SNAP = 0.002;

export function snapDrawProgress(progress: number): number {
  if (progress <= DRAW_PROGRESS_SNAP) {
    return 0;
  }

  if (progress >= 1 - DRAW_PROGRESS_SNAP) {
    return 1;
  }

  return progress;
}

export function updatePathDrawProgress(
  pathCaches: PathDrawCache[],
  progress: number,
  reverse = false,
): void {
  const snappedProgress = snapDrawProgress(progress);

  for (const cache of pathCaches) {
    const direction = reverse ? -1 : 1;
    const dashoffset =
      Math.round(cache.hiddenOffset * (1 - snappedProgress) * direction * 100) / 100;
    cache.setDashoffset(dashoffset);
  }
}
