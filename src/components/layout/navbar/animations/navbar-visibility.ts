import { CustomEase } from "gsap/CustomEase";

import { gsap } from "@/lib/gsap";
import { readCssNumber, readCssString } from "@/lib/read-css-var";

import type { NavbarElements } from "@/components/layout/navbar/navbar.types";

gsap.registerPlugin(CustomEase);

const NAVBAR_TRANSFORM_PROPS = "opacity,transform";

let navbarScrollEase: gsap.EaseFunction | null = null;

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
  gsap.set(target, {
    clearProps: NAVBAR_TRANSFORM_PROPS,
    opacity: 1,
    y: 0,
    scaleY: 1,
    transformOrigin: "top center",
    pointerEvents: "auto",
  });
}

export function setHiddenNavbarTarget(target: HTMLElement, hideOffsetY: number): void {
  gsap.set(target, {
    opacity: 0,
    y: hideOffsetY,
    scaleY: 0,
    transformOrigin: "top center",
    pointerEvents: "none",
  });
}

export function createNavbarHideTimeline(
  target: HTMLElement,
  hideOffsetY: number,
): gsap.core.Timeline {
  const scrollTweenDefaults = getNavbarScrollTweenDefaults(target);

  return gsap.timeline({ overwrite: true }).to(
    target,
    {
      opacity: 0,
      y: hideOffsetY,
      scaleY: 0,
      transformOrigin: "top center",
      pointerEvents: "none",
      ...scrollTweenDefaults,
    },
    0,
  );
}

export function createNavbarShowTimeline(target: HTMLElement, hideOffsetY: number): gsap.core.Timeline {
  const scrollTweenDefaults = getNavbarScrollTweenDefaults(target);

  setHiddenNavbarTarget(target, hideOffsetY);

  return gsap.timeline({ overwrite: true }).to(
    target,
    {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transformOrigin: "top center",
      pointerEvents: "auto",
      ...scrollTweenDefaults,
    },
    0,
  );
}

export function getNavbarHideOffsetY(target: HTMLElement): number {
  return getHideOffsetY(target, getNavbarHeight(target));
}
