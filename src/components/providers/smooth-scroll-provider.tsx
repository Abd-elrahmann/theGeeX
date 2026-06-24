"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import type { LenisOptions } from "lenis";
import { ReactLenis, useLenis } from "lenis/react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { bindLenisScrollTrigger, scrollToPosition } from "@/lib/lenis-scroll-trigger";
import {
  prepareFreshPageScrollSession,
  syncScrollTriggersAfterReset,
} from "@/lib/scroll-session";

function LenisScrollTriggerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      return;
    }

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    const unbindScrollerProxy = bindLenisScrollTrigger(lenis);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    scrollToPosition(0);
    syncScrollTriggersAfterReset();

    return () => {
      lenis.off("scroll", handleScroll);
      unbindScrollerProxy();
      gsap.ticker.remove(tickerCallback);
    };
  }, [lenis]);

  return null;
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

const desktopLenisOptions: LenisOptions = {
  autoRaf: false,
  wheelMultiplier: 1,
  touchMultiplier: 1,
  lerp: 0.1,
};

const mobileLenisOptions: LenisOptions = {
  autoRaf: false,
  wheelMultiplier: 0.55,
  touchMultiplier: 0.42,
  lerp: 0.075,
  syncTouchLerp: 0.045,
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [isMobileScroll, setIsMobileScroll] = useState(false);

  useLayoutEffect(() => {
    prepareFreshPageScrollSession();

    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncMobileScrollMode = () => {
      setIsMobileScroll(mediaQuery.matches);
    };

    syncMobileScrollMode();
    mediaQuery.addEventListener("change", syncMobileScrollMode);

    return () => {
      mediaQuery.removeEventListener("change", syncMobileScrollMode);
    };
  }, []);

  const lenisOptions = useMemo(
    () => (isMobileScroll ? mobileLenisOptions : desktopLenisOptions),
    [isMobileScroll],
  );

  return (
    <ReactLenis key={isMobileScroll ? "mobile-scroll" : "desktop-scroll"} root options={lenisOptions}>
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
