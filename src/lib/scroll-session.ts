import { resetNavbarScrollMemory } from "@/lib/navbar-scroll-memory";

import { resetHeroScrollState } from "@/lib/hero-scroll-state";
import { ScrollTrigger } from "@/lib/gsap";
import { resizeActiveLenis } from "@/lib/lenis-scroll-trigger";

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
}

export function syncScrollTriggersAfterReset(): void {
  if (typeof window === "undefined") {
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      resizeActiveLenis();
      ScrollTrigger.refresh();
    });
  });
}
