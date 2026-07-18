"use client";

import { useEffect, useLayoutEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type { LenisOptions } from "lenis";

import { useMediaQuery } from "@/hooks/use-media-query";
import { SUB_DESKTOP_MEDIA_QUERY } from "@/lib/breakpoints";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { bindLenisScrollTrigger, scrollToPosition } from "@/lib/lenis-scroll-trigger";
import {
  prepareFreshPageScrollSession,
  syncScrollTriggersAfterReset,
} from "@/lib/scroll-session";

const LENIS_WHEEL_DELTA_LIMIT = 120;
const LENIS_TOUCH_DELTA_LIMIT = 80;
const NORMALIZED_SCROLL_MOMENTUM = 0.35;
const DESKTOP_WHEEL_MULTIPLIER = 0.45;
const DESKTOP_TOUCH_MULTIPLIER = 0.55;

function clampGestureDelta(value: number, maxDelta: number): number {
  if (value === 0) {
    return 0;
  }

  return Math.sign(value) * Math.min(Math.abs(value), maxDelta);
}

function isTouchLikeEvent(event: Event): boolean {
  if (event.type.startsWith("touch")) {
    return true;
  }

  return event instanceof PointerEvent && event.pointerType === "touch";
}

interface ScrollInputNormalizerProps {
  enabled: boolean;
}

function ScrollInputNormalizer({ enabled }: ScrollInputNormalizerProps) {
  useEffect(() => {
    if (!enabled) {
      ScrollTrigger.normalizeScroll(false);
      return;
    }

    const normalizer = ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      lockAxis: true,
      momentum: NORMALIZED_SCROLL_MOMENTUM,
      type: "touch,wheel,pointer",
    });

    return () => {
      normalizer?.kill();
      ScrollTrigger.normalizeScroll(false);
    };
  }, [enabled]);

  return null;
}

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
  const shouldDisableSmoothScroll = pathname === "/book-a-meeting" || isSubDesktop;

  const normalizeLenisInput: NonNullable<LenisOptions["virtualScroll"]> = (data) => {
    const isTouchEvent = isTouchLikeEvent(data.event);
    const deltaLimit = isTouchEvent ? LENIS_TOUCH_DELTA_LIMIT : LENIS_WHEEL_DELTA_LIMIT;

    data.deltaX = clampGestureDelta(data.deltaX, deltaLimit);
    data.deltaY = clampGestureDelta(data.deltaY, deltaLimit);

    return true;
  };

  useLayoutEffect(() => {
    prepareFreshPageScrollSession();

    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  if (shouldDisableSmoothScroll) {
    return (
      <>
        <ScrollInputNormalizer enabled={false} />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      key={scrollMode}
      root
      options={{
        autoRaf: false,
        syncTouch: false,
        lerp: isSubDesktop ? 0.02 : 0.08,
        touchMultiplier: isSubDesktop ? 0.12 : DESKTOP_TOUCH_MULTIPLIER,
        wheelMultiplier: DESKTOP_WHEEL_MULTIPLIER,
        virtualScroll: normalizeLenisInput,
      }}
    >
      <ScrollInputNormalizer enabled />
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
