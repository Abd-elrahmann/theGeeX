export function readCssNumber(
  element: Element,
  variable: string,
  fallback: number,
): number {
  const raw = getComputedStyle(element).getPropertyValue(variable).trim();
  return parseFloat(raw) || fallback;
}

export function readCssString(
  element: Element,
  variable: string,
  fallback: string,
): string {
  const raw = getComputedStyle(element).getPropertyValue(variable).trim();
  return raw || fallback;
}

export function readRootCssNumber(variable: string, fallback: number): number {
  if (typeof document === "undefined") {
    return fallback;
  }

  return readCssNumber(document.documentElement, variable, fallback);
}
