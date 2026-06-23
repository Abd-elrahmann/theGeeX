export function syncActiveIndexFromProgress(
  progress: number,
  itemCount: number,
  setActiveIndex: (index: number) => void,
): void {
  const index = Math.round(progress * Math.max(itemCount - 1, 0));
  setActiveIndex(index);
}

export function clampActiveIndex(index: number, itemCount: number): number {
  return Math.max(0, Math.min(itemCount - 1, index));
}
