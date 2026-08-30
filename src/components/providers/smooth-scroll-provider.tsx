"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type { LenisOptions } from "lenis";

import { useMediaQuery } from "@/hooks/use-media-query";
import { SUB_DESKTOP_MEDIA_QUERY } from "@/lib/breakpoints";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { isIOSDevice } from "@/lib/is-ios-safari";
import { bindLenisScrollTrigger, scrollToPosition } from "@/lib/lenis-scroll-trigger";
import {
  prepareFreshPageScrollSession,
  syncScrollTriggersAfterReset,
} from "@/lib/scroll-session";

const LENIS_WHEEL_DELTA_LIMIT = 120;
const LENIS_TOUCH_DELTA_LIMIT = 120;
const SUB_DESKTOP_NORMALIZED_SCROLL_MOMENTUM = 0.46;
const DESKTOP_WHEEL_MULTIPLIER = 0.45;
const DESKTOP_TOUCH_MULTIPLIER = 0.55;
const LOW_POWER_DEVICE_MEMORY_GB = 4;
const LOW_POWER_CPU_THREADS = 4;
const IOS_TOUCH_DELTA_LIMIT = 80;
const IOS_WHEEL_DELTA_LIMIT = 80;
const IOS_TOUCH_MULTIPLIER = 0.08;
const IOS_LERP = 0.035;
const IOS_SCROLL_UPDATE_INTERVAL_MS = 100;
const IOS_SCROLL_UPDATE_VELOCITY = 2;
const IOS_SCROLL_SKIP_VELOCITY = 3;

function isLowPowerMobileDevice(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const nav = window.navigator as Navigator & {
    deviceMemory?: number;
  };

  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= LOW_POWER_DEVICE_MEMORY_GB) {
    return true;
  }

  return typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= LOW_POWER_CPU_THREADS;
}

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
  isSubDesktop: boolean;
}

function ScrollInputNormalizer({ enabled, isSubDesktop }: ScrollInputNormalizerProps) {
  useEffect(() => {
    if (!enabled) {
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
  }, [enabled, isSubDesktop]);

  return null;
}

function LenisScrollTriggerSync() {
  const lenis = useLenis();
  const pathname = usePathname();
  const iosScrollVelocityRef = useRef(0);
  const iosLastScrollTimeRef = useRef(0);
  const isIOSWebKit = isIOSDevice();

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

    const handleScroll = ({ velocity }: { velocity: number }) => {
      if (!isIOSWebKit) {
        ScrollTrigger.update();
        return;
      }

      const now = Date.now();
      const nextVelocity = Math.abs(velocity);

      if (
        nextVelocity <= IOS_SCROLL_UPDATE_VELOCITY ||
        now - iosLastScrollTimeRef.current >= IOS_SCROLL_UPDATE_INTERVAL_MS
      ) {
        ScrollTrigger.update();
        iosLastScrollTimeRef.current = now;
      }

      iosScrollVelocityRef.current = nextVelocity;
    };

    lenis.on("scroll", handleScroll);

    const unbindScrollerProxy = bindLenisScrollTrigger(lenis);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);

      if (isIOSWebKit && iosScrollVelocityRef.current > IOS_SCROLL_SKIP_VELOCITY) {
        return;
      }

      ScrollTrigger.update();
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
  }, [isIOSWebKit, lenis]);

  return null;
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const isSubDesktop = useMediaQuery(SUB_DESKTOP_MEDIA_QUERY);
  const scrollMode = isSubDesktop ? "sub-desktop" : "desktop";
  const pathname = usePathname();
  const isIOSWebKit = isIOSDevice();
  const shouldDisableSmoothScroll = pathname === "/book-a-meeting" || (isSubDesktop && !isIOSWebKit);
  const shouldAvoidMobileInputNormalization =
    isSubDesktop &&
    typeof window !== "undefined" &&
    (isLowPowerMobileDevice() ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const shouldEnableInputNormalization =
    pathname !== "/book-a-meeting" &&
    isSubDesktop &&
    (isIOSWebKit || !shouldAvoidMobileInputNormalization);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    return () => {
      ScrollTrigger.config({ ignoreMobileResize: false });
    };
  }, []);

  const normalizeLenisInput: NonNullable<LenisOptions["virtualScroll"]> = (data) => {
    const isTouchEvent = isTouchLikeEvent(data.event);
    const deltaLimit = isTouchEvent
      ? isIOSWebKit
        ? IOS_TOUCH_DELTA_LIMIT
        : LENIS_TOUCH_DELTA_LIMIT
      : isIOSWebKit
        ? IOS_WHEEL_DELTA_LIMIT
        : LENIS_WHEEL_DELTA_LIMIT;

    data.deltaX = clampGestureDelta(data.deltaX, deltaLimit);
    data.deltaY = clampGestureDelta(data.deltaY, deltaLimit);

    if (isIOSWebKit) {
      const velocity = Math.abs(data.deltaY);

      if (velocity > 50) {
        const reductionFactor = Math.max(0.5, 1 - (velocity - 50) / 200);

        data.deltaX *= reductionFactor;
        data.deltaY *= reductionFactor;
      }
    }

    return true;
  };

  useLayoutEffect(() => {
    prepareFreshPageScrollSession();

    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const lenisOptions: LenisOptions = isIOSWebKit && isSubDesktop
    ? {
        autoRaf: false,
        syncTouch: false,
        lerp: IOS_LERP,
        touchMultiplier: IOS_TOUCH_MULTIPLIER,
        wheelMultiplier: IOS_TOUCH_MULTIPLIER,
        virtualScroll: normalizeLenisInput,
        duration: 1.2,
        easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      }
    : {
        autoRaf: false,
        syncTouch: false,
        lerp: isSubDesktop ? 0.02 : 0.08,
        touchMultiplier: isSubDesktop ? 0.12 : DESKTOP_TOUCH_MULTIPLIER,
        wheelMultiplier: DESKTOP_WHEEL_MULTIPLIER,
        virtualScroll: normalizeLenisInput,
      };

  if (shouldDisableSmoothScroll) {
    return (
      <>
        <ScrollInputNormalizer
          enabled={shouldEnableInputNormalization}
          isSubDesktop={isSubDesktop}
        />
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
      <ScrollInputNormalizer
        enabled={shouldEnableInputNormalization}
        isSubDesktop={isSubDesktop}
      />
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
