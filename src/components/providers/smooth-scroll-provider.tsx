"use client";

import { useEffect, useLayoutEffect } from "react";
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

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useLayoutEffect(() => {
    prepareFreshPageScrollSession();

    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }}>
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
