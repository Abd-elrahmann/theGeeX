export interface PathDefinition {
  d: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fillRule?: "evenodd" | "nonzero";
  clipRule?: "evenodd" | "nonzero";
}

export function parsePathSvg(svgContent: string): PathDefinition[] {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
  const pathElements = Array.from(svgDoc.querySelectorAll("path"));

  const paths: PathDefinition[] = [];

  for (const pathElement of pathElements) {
    const d = pathElement.getAttribute("d");

    if (!d) {
      continue;
    }

    const strokeWidth = pathElement.getAttribute("stroke-width");

    paths.push({
      d,
      fill: pathElement.getAttribute("fill") ?? undefined,
      stroke: pathElement.getAttribute("stroke") ?? undefined,
      strokeWidth: strokeWidth ? Number(strokeWidth) : undefined,
      fillRule: (pathElement.getAttribute("fill-rule") as "evenodd" | "nonzero" | null) ?? undefined,
      clipRule: (pathElement.getAttribute("clip-rule") as "evenodd" | "nonzero" | null) ?? undefined,
    });
  }

  return paths;
}
