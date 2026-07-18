import { useEffect, useState } from "react";

import { useScrollDirection } from "@/hooks/use-scroll-direction";
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

const NAVBAR_HIDE_SCROLL_THRESHOLD = 40;
const NAVBAR_DIRECTION_THRESHOLD = 24;
const NAVBAR_SCROLL_READY_DELAY_MS = 500;

const INITIAL_NAVBAR_STATE: NavbarState = {
  variant: "primary",
  isVisible: true,
};

function resolveNavbarState(
  scrollDirection: ReturnType<typeof useScrollDirection>["scrollDirection"],
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

  if (scrollDirection === "down") {
    if (scrollY >= NAVBAR_HIDE_SCROLL_THRESHOLD) {
      return { variant: "primary", isVisible: false };
    }

    return { variant: "primary", isVisible: true };
  }

  if (scrollDirection === "up") {
    return { variant: "rounded", isVisible: true };
  }

  return { variant: "primary", isVisible: true };
}

export function useNavbarState(): NavbarState {
  const { scrollDirection, isAtTop, scrollY } = useScrollDirection({
    threshold: NAVBAR_DIRECTION_THRESHOLD,
  });
  const [isScrollReady, setIsScrollReady] = useState(false);
  const [heroScrollRevision, setHeroScrollRevision] = useState(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsScrollReady(true);
    }, NAVBAR_SCROLL_READY_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const handleHeroScrollStateChange = () => {
      setHeroScrollRevision((revision) => revision + 1);
    };

    window.addEventListener(HERO_SCROLL_STATE_EVENT, handleHeroScrollStateChange);

    return () => {
      window.removeEventListener(HERO_SCROLL_STATE_EVENT, handleHeroScrollStateChange);
    };
  }, []);

  useEffect(() => {
    if (!isScrollReady) {
      return;
    }
  }, [isScrollReady, scrollDirection, isAtTop, scrollY, heroScrollRevision]);

  if (!isScrollReady) {
    return INITIAL_NAVBAR_STATE;
  }

  return resolveNavbarState(scrollDirection, isAtTop, scrollY);
}
