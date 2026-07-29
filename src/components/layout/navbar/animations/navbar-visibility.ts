import { CustomEase } from "gsap/CustomEase";

import { gsap } from "@/lib/gsap";
import { isIosSafari } from "@/lib/is-ios-safari";
import { readCssNumber, readCssString } from "@/lib/read-css-var";

import type { NavbarElements } from "@/components/layout/navbar/navbar.types";

gsap.registerPlugin(CustomEase);

const NAVBAR_TRANSFORM_PROPS = "opacity,transform";

let navbarScrollEase: gsap.EaseFunction | null = null;
let isIosSafariResult: boolean | null = null;

function getIosSafariValue(): boolean {
  if (isIosSafariResult === null) {
    isIosSafariResult = isIosSafari();
  }

  return isIosSafariResult;
}

function getNavbarScrollEase(element: HTMLElement): gsap.EaseFunction {
  if (!navbarScrollEase) {
    const bezier = readCssString(element, "--navbar-scroll-bezier", "0.12,0.23,0.5,1");
    navbarScrollEase = CustomEase.create("navbarScrollEase", bezier);
  }

  return navbarScrollEase;
}

function getNavbarScrollTweenDefaults(element: HTMLElement): gsap.TweenVars {
  return {
    duration: readCssNumber(element, "--navbar-scroll-duration", 0.4),
    delay: readCssNumber(element, "--navbar-scroll-delay", 0),
    ease: getNavbarScrollEase(element),
  };
}

function getNavbarHeight(element: HTMLElement): number {
  return readCssNumber(element, "--navbar-height", 96);
}

function getHideOffsetY(element: HTMLElement, navbarHeight: number): number {
  const offset = readCssNumber(element, "--navbar-hide-offset-y", -150);
  return offset < 0 ? offset : -navbarHeight;
}

export function killNavbarTweens({ header, target }: NavbarElements): void {
  gsap.killTweensOf([header, target]);
}

export function setVisibleNavbarTarget(target: HTMLElement): void {
  const useOpacityOnly = getIosSafariValue();

  gsap.set(target, {
    opacity: 1,
    pointerEvents: "auto",
    ...(useOpacityOnly
      ? {
          clearProps: NAVBAR_TRANSFORM_PROPS,
        }
      : {
          y: 0,
          scaleY: 1,
          transformOrigin: "top center",
        }),
  });
}

export function setHiddenNavbarTarget(target: HTMLElement, hideOffsetY: number): void {
  const useOpacityOnly = getIosSafariValue();

  gsap.set(target, {
    opacity: 0,
    pointerEvents: "none",
    ...(useOpacityOnly
      ? {
          clearProps: NAVBAR_TRANSFORM_PROPS,
        }
      : {
          y: hideOffsetY,
          scaleY: 0,
          transformOrigin: "top center",
        }),
  });
}

export function createNavbarHideTimeline(
  target: HTMLElement,
  hideOffsetY: number,
): gsap.core.Timeline {
  const scrollTweenDefaults = getNavbarScrollTweenDefaults(target);
  const useOpacityOnly = getIosSafariValue();

  return gsap.timeline({ overwrite: true }).to(
    target,
    {
      opacity: 0,
      pointerEvents: "none",
      ...(useOpacityOnly
        ? {
            clearProps: "transform",
          }
        : {
            y: hideOffsetY,
            scaleY: 0,
            transformOrigin: "top center",
          }),
      ...scrollTweenDefaults,
    },
    0,
  );
}

export function createNavbarShowTimeline(target: HTMLElement, hideOffsetY: number): gsap.core.Timeline {
  const scrollTweenDefaults = getNavbarScrollTweenDefaults(target);
  const useOpacityOnly = getIosSafariValue();

  setHiddenNavbarTarget(target, hideOffsetY);

  return gsap.timeline({ overwrite: true }).to(
    target,
    {
      opacity: 1,
      pointerEvents: "auto",
      ...(useOpacityOnly
        ? {
            clearProps: "transform",
          }
        : {
            y: 0,
            scaleY: 1,
            transformOrigin: "top center",
          }),
      ...scrollTweenDefaults,
    },
    0,
  );
}

export function getNavbarHideOffsetY(target: HTMLElement): number {
  return getHideOffsetY(target, getNavbarHeight(target));
}
