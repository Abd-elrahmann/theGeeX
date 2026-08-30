"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { isIosSafari } from "@/lib/is-ios-safari";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { NavbarDesktop } from "./navbar-desktop";
import { NavbarMobileBar } from "./navbar-mobile";
import { NavbarMobileMenu } from "./navbar-mobile-menu";
import { useNavbarState } from "./use-navbar-state";

const NAVBAR_HIDE_TRANSLATE_Y = "calc(-100% - 1rem)";

function subscribeToEnvironmentChange(): () => void {
  return () => undefined;
}

export function Navbar() {
  const { variant, isVisible } = useNavbarState();
  const isDesktop = useDesktopBreakpoint();
  const appliedVariant = variant;
  const isRoundedNav = appliedVariant === "rounded";
  const [isMobileMenuRequested, setIsMobileMenuRequested] = useState(false);
  const isIosSafariDevice = useSyncExternalStore(
    subscribeToEnvironmentChange,
    isIosSafari,
    () => false,
  );
  const isMobileMenuOpen = isMobileMenuRequested && isVisible && !isDesktop;
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const header = headerRef.current;
      const target = event.target;

      if (!(target instanceof Node) || !header || header.contains(target)) {
        return;
      }

      setIsMobileMenuRequested(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-(--navbar-z-index) box-border h-(--navbar-height) w-full max-w-full",
        isMobileMenuOpen ? "overflow-visible" : "overflow-hidden lg:overflow-visible",
      )}
      style={
        {
          transform: isVisible
            ? "translate3d(0, 0, 0)"
            : `translate3d(0, ${NAVBAR_HIDE_TRANSLATE_Y}, 0)`,
          transition: "transform 0.28s cubic-bezier(0.12, 0.23, 0.5, 1)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
          ...(isDesktop
            ? {
                height:
                  "calc(var(--navbar-height) + var(--navbar-rounded-offset-top) + 2 * var(--navbar-rounded-padding-y))",
              }
            : null),
        }
      }
    >
      <div
        className={cn(
          "relative box-border h-full w-full max-w-full translate-y-0 opacity-100",
          "flex justify-center max-lg:items-center lg:items-start",
          isIosSafariDevice ? "will-change-auto" : "will-change-transform",
        )}
        style={isIosSafariDevice ? { willChange: "opacity" } : undefined}
        inert={!isVisible}
      >
        <nav
          aria-label="Main navigation"
          className={cn(
            "navbar-nav-shell box-border flex min-w-0 max-w-full items-center bg-surface",
            isIosSafariDevice ? "navbar-nav-shell--ios-safari" : "backdrop-blur-(--navbar-blur)",
            "max-lg:justify-between lg:justify-normal",
            isRoundedNav ? "max-lg:h-full lg:h-auto" : "max-lg:h-full lg:h-full",
            isRoundedNav && "lg:mt-(--navbar-rounded-offset-top)",
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
