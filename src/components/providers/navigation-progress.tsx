"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const START_PROGRESS = 8;
const MAX_TRICKLE_PROGRESS = 88;
const TRICKLE_INTERVAL_MS = 180;
const FINISH_DELAY_MS = 260;

function stripHash(url: URL): string {
  return `${url.origin}${url.pathname}${url.search}`;
}

function isModifiedClick(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function findAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest("a[href]");
}

export function NavigationProgress() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const trickleIntervalRef = useRef(0);
  const finishTimeoutRef = useRef(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const clearTimers = () => {
      window.clearInterval(trickleIntervalRef.current);
      window.clearTimeout(finishTimeoutRef.current);
    };

    const startProgress = () => {
      clearTimers();
      hasStartedRef.current = true;
      setIsVisible(true);
      setProgress(START_PROGRESS);

      trickleIntervalRef.current = window.setInterval(() => {
        setProgress((currentProgress) => {
          if (currentProgress >= MAX_TRICKLE_PROGRESS) {
            return currentProgress;
          }

          return currentProgress + (MAX_TRICKLE_PROGRESS - currentProgress) * 0.18;
        });
      }, TRICKLE_INTERVAL_MS);
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) {
        return;
      }

      const anchor = findAnchor(event.target);

      if (!anchor || anchor.target || anchor.hasAttribute("download")) {
        return;
      }

      const nextUrl = new URL(anchor.href, window.location.href);

      if (nextUrl.origin !== window.location.origin) {
        return;
      }

      const currentUrl = new URL(window.location.href);

      if (stripHash(nextUrl) === stripHash(currentUrl)) {
        return;
      }

      startProgress();
    };

    window.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("popstate", startProgress);

    return () => {
      clearTimers();
      window.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("popstate", startProgress);
    };
  }, []);

  useEffect(() => {
    if (!hasStartedRef.current) {
      return;
    }

    window.clearInterval(trickleIntervalRef.current);
    setProgress(100);

    finishTimeoutRef.current = window.setTimeout(() => {
      hasStartedRef.current = false;
      setIsVisible(false);
      setProgress(0);
    }, FINISH_DELAY_MS);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-(--navigation-progress-z-index) h-(--navigation-progress-height) overflow-hidden"
    >
      <div
        className="h-full origin-left bg-brand opacity-0 transition-[transform,opacity] duration-300 ease-out data-[visible=true]:opacity-100"
        data-visible={isVisible}
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}