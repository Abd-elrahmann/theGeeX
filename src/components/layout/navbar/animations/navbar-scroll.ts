import {
  getNavbarScrollMemoryKey,
  resetNavbarScrollMemory,
  setNavbarScrollMemoryKey,
} from "@/lib/navbar-scroll-memory";

import type { NavbarAnimationState, NavbarElements } from "@/components/layout/navbar/navbar.types";
import { getNavbarStateKey } from "@/components/layout/navbar/navbar.types";

import {
  getNavbarHideOffsetY,
  killNavbarTweens,
  setHiddenNavbarTarget,
  setVisibleNavbarTarget,
} from "./navbar-visibility";

export { resetNavbarScrollMemory };

export type { NavbarAnimationState, NavbarElements } from "@/components/layout/navbar/navbar.types";

export function setNavbarInitialState(
  elements: NavbarElements,
  state: Pick<NavbarAnimationState, "isDesktop" | "variant" | "isVisible">,
): void {
  const { target } = elements;

  killNavbarTweens(elements);
  setVisibleNavbarTarget(target);
  setNavbarScrollMemoryKey(
    getNavbarStateKey({
      isDesktop: state.isDesktop,
      isVisible: state.isVisible,
      variant: state.variant,
    }),
  );
}

export function applyNavbarAnimationState(
  elements: NavbarElements,
  state: NavbarAnimationState,
): gsap.core.Timeline | null {
  const stateKey = getNavbarStateKey(state);

  if (stateKey === getNavbarScrollMemoryKey()) {
    return null;
  }

  setNavbarScrollMemoryKey(stateKey);

  const { target } = elements;
  const hideOffsetY = getNavbarHideOffsetY(target);

  killNavbarTweens(elements);

  if (!state.isVisible) {
    setHiddenNavbarTarget(target, hideOffsetY);
    return null;
  }

  setVisibleNavbarTarget(target);
  return null;
}
