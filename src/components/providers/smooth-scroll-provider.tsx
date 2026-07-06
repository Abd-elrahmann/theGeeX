"use client";

import { useEffect, useLayoutEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

import { useMediaQuery } from "@/hooks/use-media-query";
import { SUB_DESKTOP_MEDIA_QUERY } from "@/lib/breakpoints";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { bindLenisScrollTrigger, scrollToPosition } from "@/lib/lenis-scroll-trigger";
import {
  prepareFreshPageScrollSession,
  syncScrollTriggersAfterReset,
} from "@/lib/scroll-session";

function LenisScrollTriggerSync() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) {
      return;
    }

    scrollToPosition(0);
    syncScrollTriggersAfterReset();
  }, [lenis, pathname]);

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
  const isSubDesktop = useMediaQuery(SUB_DESKTOP_MEDIA_QUERY);
  const scrollMode = isSubDesktop ? "sub-desktop" : "desktop";
  const pathname = usePathname();

  useLayoutEffect(() => {
    prepareFreshPageScrollSession();

    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <ReactLenis
      key={scrollMode}
      root
      options={{
        autoRaf: false,
        lerp: isSubDesktop ? 0.02 : 0.08,
        touchMultiplier: isSubDesktop ? 0.12 : 0.85,
        wheelMultiplier: 0.62,
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
