export type NavbarVariant = "primary" | "rounded";

export interface NavbarElements {
  header: HTMLElement;
  target: HTMLElement;
}

export interface NavbarAnimationState {
  isVisible: boolean;
  variant: NavbarVariant;
  isDesktop: boolean;
  isMobileMenuOpen?: boolean;
}

export function getNavbarStateKey(state: NavbarAnimationState): string {
  return `${state.isDesktop ? "desktop" : "mobile"}:${state.isVisible ? "visible" : "hidden"}:${state.variant}`;
}
