export function isPointInsideElement(
  clientX: number,
  clientY: number,
  element: HTMLElement,
): boolean {
  const rect = element.getBoundingClientRect();

  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
}
