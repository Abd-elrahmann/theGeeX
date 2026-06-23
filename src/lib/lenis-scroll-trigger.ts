import type Lenis from "lenis";

import { ScrollTrigger } from "@/lib/gsap";

let activeLenis: Lenis | null = null;

export function bindLenisScrollTrigger(lenis: Lenis): () => void {
  activeLenis = lenis;

  const rootElement = document.documentElement;

  ScrollTrigger.scrollerProxy(rootElement, {
    scrollTop(value) {
      if (arguments.length && typeof value === "number") {
        lenis.scrollTo(value, { immediate: true });
      }

      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  const handleRefresh = () => {
    lenis.resize();
  };

  ScrollTrigger.addEventListener("refresh", handleRefresh);

  return () => {
    ScrollTrigger.removeEventListener("refresh", handleRefresh);
    ScrollTrigger.scrollerProxy(rootElement, {});
    activeLenis = null;
  };
}

export function scrollToPosition(position: number): void {
  if (activeLenis) {
    activeLenis.scrollTo(position, { immediate: true });
    return;
  }

  window.scrollTo({ top: position, behavior: "auto" });
}
