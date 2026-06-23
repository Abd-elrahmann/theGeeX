export function formatIndex(index: number, padLength = 2): string {
  return String(index + 1).padStart(padLength, "0");
}
