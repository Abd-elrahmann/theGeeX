import { useEffect, useRef, useState } from "react";

import type { NavbarVariant } from "@/components/layout/navbar/navbar.types";

export type { NavbarVariant };

interface NavbarState {
  variant: NavbarVariant;
  isVisible: boolean;
}

const NAVBAR_SCROLL_DELTA_EPSILON = 2;
const NAVBAR_AT_TOP_THRESHOLD = 8;
const NAVBAR_HIDE_MIN_SCROLL_Y = 80;
const NAVBAR_SCROLL_READY_DELAY_MS = 500;

const INITIAL_NAVBAR_STATE: NavbarState = {
  variant: "primary",
  isVisible: true,
};

export function useNavbarState(): NavbarState {
  const [isScrollReady, setIsScrollReady] = useState(false);
  const [variant, setVariant] = useState<NavbarVariant>(INITIAL_NAVBAR_STATE.variant);
  const [isVisible, setIsVisible] = useState(INITIAL_NAVBAR_STATE.isVisible);
  const variantRef = useRef<NavbarVariant>(INITIAL_NAVBAR_STATE.variant);
  const isVisibleRef = useRef(INITIAL_NAVBAR_STATE.isVisible);
  const lastScrollYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsScrollReady(true);
    }, NAVBAR_SCROLL_READY_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!isScrollReady) {
      return;
    }

    const updateNavbarState = (nextVariant: NavbarVariant, nextIsVisible: boolean) => {
      if (variantRef.current !== nextVariant) {
        variantRef.current = nextVariant;
        setVariant(nextVariant);
      }

      if (isVisibleRef.current !== nextIsVisible) {
        isVisibleRef.current = nextIsVisible;
        setIsVisible(nextIsVisible);
      }
    };

    const handleScrollStateChange = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;
      const isScrollingUp = scrollDelta < -NAVBAR_SCROLL_DELTA_EPSILON;
      const isScrollingDown = scrollDelta > NAVBAR_SCROLL_DELTA_EPSILON;

      if (currentScrollY <= NAVBAR_AT_TOP_THRESHOLD) {
        lastScrollYRef.current = currentScrollY;
        updateNavbarState("primary", true);
        return;
      }

      if (!isScrollingUp && !isScrollingDown) {
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (isScrollingUp) {
        lastScrollYRef.current = currentScrollY;
        updateNavbarState("rounded", true);
        return;
      }

      if (isScrollingDown && currentScrollY >= NAVBAR_HIDE_MIN_SCROLL_Y) {
        lastScrollYRef.current = currentScrollY;
        updateNavbarState(variantRef.current, false);
        return;
      }

      lastScrollYRef.current = currentScrollY;
    };

    const scheduleScrollStateChange = () => {
      if (rafIdRef.current !== null) {
        return;
      }

      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        handleScrollStateChange();
      });
    };

    lastScrollYRef.current = window.scrollY;
    handleScrollStateChange();

    window.addEventListener("scroll", scheduleScrollStateChange, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleScrollStateChange);

      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isScrollReady]);

  if (!isScrollReady) {
    return INITIAL_NAVBAR_STATE;
  }

  return { variant, isVisible };
}
