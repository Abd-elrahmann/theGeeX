"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { navbarConfig } from "@/config/navbar.config";
import { cn } from "@/lib/cn";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { useGSAP } from "@/lib/gsap";
import {
  applyNavbarAnimationState,
  resetNavbarScrollMemory,
  setNavbarInitialState,
} from "./animations/navbar-scroll";
import { NavbarDesktop } from "./navbar-desktop";
import { NavbarMobileBar } from "./navbar-mobile";
import { NavbarMobileMenu } from "./navbar-mobile-menu";
import { useNavbarState } from "./use-navbar-state";

export function Navbar() {
  const { variant, isVisible } = useNavbarState();
  const isDesktop = useDesktopBreakpoint();
  const isRoundedNav = isVisible && variant === "rounded";
  const [isMobileMenuRequested, setIsMobileMenuRequested] = useState(false);
  const isMobileMenuOpen = isMobileMenuRequested && isVisible && !isDesktop;
  const headerRef = useRef<HTMLElement>(null);
  const animatedRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const target = animatedRef.current;

    if (!header || !target) {
      return;
    }

    const isDesktopOnLoad = window.matchMedia(navbarConfig.desktopMediaQuery).matches;

    resetNavbarScrollMemory();
    setNavbarInitialState(
      { header, target },
      { isDesktop: isDesktopOnLoad, isVisible: true, variant: "primary" },
    );
    hasInitialized.current = true;
  }, []);

  useGSAP(
    () => {
      const header = headerRef.current;
      const target = animatedRef.current;

      if (!header || !target || !hasInitialized.current) {
        return;
      }

      applyNavbarAnimationState(
        { header, target },
        {
          isVisible,
          variant,
          isDesktop,
          isMobileMenuOpen,
        },
      );
    },
    { dependencies: [isVisible, variant, isDesktop, isMobileMenuOpen], scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-(--navbar-z-index) box-border h-(--navbar-height) w-full max-w-full",
        isMobileMenuOpen ? "overflow-visible" : "overflow-hidden",
      )}
    >
      <div
        ref={animatedRef}
        className={cn(
          "relative box-border h-full w-full max-w-full translate-y-0 opacity-100",
          "flex items-center justify-center will-change-transform",
        )}
        inert={!isVisible}
      >
        <nav
          aria-label="Main navigation"
          className={cn(
            "navbar-nav-shell box-border flex min-w-0 max-w-full items-center bg-surface backdrop-blur-(--navbar-blur)",
            "max-lg:justify-between lg:justify-normal",
            isRoundedNav ? "max-lg:h-auto lg:h-auto" : "max-lg:h-full lg:h-full",
            isRoundedNav ? "navbar-nav-shell--rounded" : "navbar-nav-shell--primary",
          )}
        >
          <NavbarDesktop />

          <NavbarMobileBar
            isMenuOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuRequested((open) => !open)}
          />
        </nav>
      </div>

      {!isDesktop ? (
        <NavbarMobileMenu
          isOpen={isMobileMenuOpen}
          isRoundedNav={isRoundedNav}
          onClose={() => setIsMobileMenuRequested(false)}
        />
      ) : null}
    </header>
  );
}
