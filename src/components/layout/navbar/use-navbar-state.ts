import { useEffect, useRef, useState } from "react";
import {
  getHeroNavbarVariant,
  HERO_SCROLL_STATE_EVENT,
  isHeroPinned,
  isUpwardNavbarSession,
} from "@/lib/hero-scroll-state";

import type { NavbarVariant } from "@/components/layout/navbar/navbar.types";

export type { NavbarVariant };

interface NavbarState {
  variant: NavbarVariant;
  isVisible: boolean;
}

type NavbarScrollDirection = "up" | "down";

const NAVBAR_HIDE_SCROLL_THRESHOLD = 40;
const NAVBAR_DIRECTION_THRESHOLD = 24;
const NAVBAR_SCROLL_READY_DELAY_MS = 500;

const INITIAL_NAVBAR_STATE: NavbarState = {
  variant: "primary",
  isVisible: true,
};

function resolveNavbarState(
  currentState: NavbarState,
  isAtTop: boolean,
  scrollY: number,
): NavbarState {
  if (isUpwardNavbarSession()) {
    return {
      variant: getHeroNavbarVariant(),
      isVisible: true,
    };
  }

  if (isAtTop) {
    return { variant: "primary", isVisible: true };
  }

  if (isHeroPinned()) {
    return { variant: "primary", isVisible: false };
  }

  if (scrollY < NAVBAR_HIDE_SCROLL_THRESHOLD) {
    return { variant: "primary", isVisible: true };
  }

  return currentState;
}

export function useNavbarState(): NavbarState {
  const [isScrollReady, setIsScrollReady] = useState(false);
  const [navbarState, setNavbarState] = useState<NavbarState>(INITIAL_NAVBAR_STATE);
  const navbarStateRef = useRef<NavbarState>(INITIAL_NAVBAR_STATE);
  const lastScrollYRef = useRef(0);
  const accumulatedDirectionDeltaRef = useRef(0);
  const lastDirectionRef = useRef<NavbarScrollDirection | null>(null);

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

    const updateNavbarState = (nextState: NavbarState) => {
      if (
        navbarStateRef.current.isVisible === nextState.isVisible &&
        navbarStateRef.current.variant === nextState.variant
      ) {
        return;
      }

      navbarStateRef.current = nextState;
      setNavbarState(nextState);
    };

    const handleScrollStateChange = () => {
      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY <= NAVBAR_DIRECTION_THRESHOLD;

      const scrollDelta = currentScrollY - lastScrollYRef.current;
      const isScrollingUp = scrollDelta < 0;
      const isScrollingDown = scrollDelta > 0;
      const nextDirection: NavbarScrollDirection | null = isScrollingUp
        ? "up"
        : isScrollingDown
          ? "down"
          : null;

      const resetDirectionTracking = () => {
        accumulatedDirectionDeltaRef.current = 0;
        lastDirectionRef.current = null;
      };

      if (isAtTop) {
        resetDirectionTracking();
      }

      if (isHeroPinned() || isUpwardNavbarSession()) {
        resetDirectionTracking();
      }

      let nextState = resolveNavbarState(
        navbarStateRef.current,
        isAtTop,
        currentScrollY,
      );

      if (!isAtTop && !isHeroPinned() && !isUpwardNavbarSession() && nextDirection) {
        if (lastDirectionRef.current !== nextDirection) {
          lastDirectionRef.current = nextDirection;
          accumulatedDirectionDeltaRef.current = 0;
        }

        accumulatedDirectionDeltaRef.current += Math.abs(scrollDelta);

        if (nextDirection === "up") {
          if (accumulatedDirectionDeltaRef.current >= NAVBAR_DIRECTION_THRESHOLD) {
            nextState = { variant: "rounded", isVisible: true };
          }
        } else if (
          accumulatedDirectionDeltaRef.current >= NAVBAR_DIRECTION_THRESHOLD &&
          currentScrollY >= NAVBAR_HIDE_SCROLL_THRESHOLD
        ) {
          nextState = { variant: "primary", isVisible: false };
        }
      }

      updateNavbarState(nextState);

      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    handleScrollStateChange();

    window.addEventListener("scroll", handleScrollStateChange, { passive: true });
    window.addEventListener(HERO_SCROLL_STATE_EVENT, handleScrollStateChange);

    return () => {
      window.removeEventListener("scroll", handleScrollStateChange);
      window.removeEventListener(HERO_SCROLL_STATE_EVENT, handleScrollStateChange);
    };
  }, [isScrollReady]);

  if (!isScrollReady) {
    return INITIAL_NAVBAR_STATE;
  }

  return navbarState;
}
