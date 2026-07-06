import { resetNavbarScrollMemory } from "@/lib/navbar-scroll-memory";

import { resetHeroScrollState } from "@/lib/hero-scroll-state";
import { scrollToPosition } from "@/lib/lenis-scroll-trigger";
import { ScrollTrigger } from "@/lib/gsap";

export function disableScrollRestoration(): void {
  if (typeof window === "undefined") {
    return;
  }

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}

export function prepareFreshPageScrollSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  disableScrollRestoration();
  resetHeroScrollState();
  resetNavbarScrollMemory();
  scrollToPosition(0);
  window.scrollTo({ top: 0, behavior: "auto" });
}

export function syncScrollTriggersAfterReset(): void {
  ScrollTrigger.refresh();
}
