"use client";

import { useEffect, useLayoutEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type { LenisOptions } from "lenis";

import { useMediaQuery } from "@/hooks/use-media-query";
import { SUB_DESKTOP_MEDIA_QUERY } from "@/lib/breakpoints";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { isIosSafari } from "@/lib/is-ios-safari";
import { bindLenisScrollTrigger, scrollToPosition } from "@/lib/lenis-scroll-trigger";
import {
  prepareFreshPageScrollSession,
  syncScrollTriggersAfterReset,
} from "@/lib/scroll-session";

const LENIS_WHEEL_DELTA_LIMIT = 120;
const LENIS_TOUCH_DELTA_LIMIT = 120;
const SUB_DESKTOP_NORMALIZED_SCROLL_MOMENTUM = 0.46;
const SUB_DESKTOP_LERP = 0.05;
const DESKTOP_LERP = 0.08;
const SUB_DESKTOP_WHEEL_MULTIPLIER = 0.9;
const SUB_DESKTOP_TOUCH_MULTIPLIER = 1;
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

function LenisScrollTriggerSync() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) {
      return;
    }

    syncScrollTriggersAfterReset();
  }, [lenis, pathname]);

  useEffect(() => {
    if (!lenis) {
      return;
    }

    const unbindScrollerProxy = bindLenisScrollTrigger(lenis);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      unbindScrollerProxy();
      gsap.ticker.remove(tickerCallback);
    };
  }, [lenis]);

  return null;
}

interface ScrollInputNormalizerProps {
  enabled: boolean;
}

function ScrollInputNormalizer({ enabled }: ScrollInputNormalizerProps) {
  useEffect(() => {
    if (!enabled || isIosSafari()) {
      ScrollTrigger.normalizeScroll(false);
      return;
    }

    const normalizer = ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      lockAxis: true,
      momentum: SUB_DESKTOP_NORMALIZED_SCROLL_MOMENTUM,
      type: "touch",
    });

    return () => {
      normalizer?.kill();
      ScrollTrigger.normalizeScroll(false);
    };
  }, [enabled]);

  return null;
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const isSubDesktop = useMediaQuery(SUB_DESKTOP_MEDIA_QUERY);
  const scrollMode = isSubDesktop ? "sub-desktop" : "desktop";
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const shouldDisableSmoothScroll = pathname === "/book-a-meeting" || isSubDesktop;
  const shouldEnableSubDesktopStepScroll = isHomePage && isSubDesktop;

  const normalizeLenisInput: NonNullable<LenisOptions["virtualScroll"]> = (data) => {
    const isTouchEvent = isTouchLikeEvent(data.event);
    const deltaLimit = isTouchEvent ? LENIS_TOUCH_DELTA_LIMIT : LENIS_WHEEL_DELTA_LIMIT;

    data.deltaX = clampGestureDelta(data.deltaX, deltaLimit);
    data.deltaY = clampGestureDelta(data.deltaY, deltaLimit);

    return true;
  };

  useLayoutEffect(() => {
    prepareFreshPageScrollSession();

    scrollToPosition(0, { immediate: true });
  }, [pathname]);

  const lenisOptions: LenisOptions = {
    autoRaf: false,
    syncTouch: false,
    lerp: isSubDesktop ? SUB_DESKTOP_LERP : DESKTOP_LERP,
    touchMultiplier: isSubDesktop ? SUB_DESKTOP_TOUCH_MULTIPLIER : DESKTOP_TOUCH_MULTIPLIER,
    wheelMultiplier: isSubDesktop ? SUB_DESKTOP_WHEEL_MULTIPLIER : DESKTOP_WHEEL_MULTIPLIER,
    virtualScroll: normalizeLenisInput,
  };

  if (shouldDisableSmoothScroll) {
    return (
      <>
        <ScrollInputNormalizer enabled={shouldEnableSubDesktopStepScroll} />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      key={scrollMode}
      root
      options={lenisOptions}
    >
      <ScrollInputNormalizer enabled={false} />
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
