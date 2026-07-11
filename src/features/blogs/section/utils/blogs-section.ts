const blogCursorZoneSelector = "[data-blog-cursor-zone]";

export function getHoveredBlogCard(
  clientX: number,
  clientY: number,
  cardsElement: HTMLElement,
): HTMLElement | null {
  const hoveredElement = document.elementFromPoint(clientX, clientY);

  if (!(hoveredElement instanceof HTMLElement)) {
    return null;
  }

  const hoveredBlogCard = hoveredElement.closest(blogCursorZoneSelector);

  if (!(hoveredBlogCard instanceof HTMLElement)) {
    return null;
  }

  return cardsElement.contains(hoveredBlogCard) ? hoveredBlogCard : null;
}