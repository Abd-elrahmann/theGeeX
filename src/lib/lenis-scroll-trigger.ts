import type Lenis from "lenis";

import { ScrollTrigger } from "@/lib/gsap";
import { isIosSafari } from "@/lib/is-ios-safari";

let activeLenis: Lenis | null = null;

export function resolveScrollTriggerPinType(element?: Element | null): "fixed" | "transform" {
  if (typeof window === "undefined") {
    return "fixed";
  }

  if (isIosSafari()) {
    return "transform";
  }

  if (!element) {
    return "fixed";
  }

  const { transform, willChange } = window.getComputedStyle(element);

  if (transform !== "none" || willChange.includes("transform")) {
    return "transform";
  }

  return "fixed";
}

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
    pinType: resolveScrollTriggerPinType(rootElement),
  });

  return () => {
    ScrollTrigger.scrollerProxy(rootElement, {});

    if (activeLenis === lenis) {
      activeLenis = null;
    }
  };
}

export function resizeActiveLenis(): void {
  activeLenis?.resize();
}

export function getScrollPosition(): number {
  return activeLenis?.scroll ?? window.scrollY;
}

interface ScrollToPositionOptions {
  immediate?: boolean;
}

export function scrollToPosition(position: number, options: ScrollToPositionOptions = {}): void {
  const { immediate = false } = options;

  if (activeLenis) {
    activeLenis.scrollTo(position, { immediate });
    return;
  }

  window.scrollTo({ top: position, behavior: "auto" });
}
