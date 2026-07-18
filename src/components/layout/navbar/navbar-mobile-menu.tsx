"use client";

import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

import { NavbarCta } from "./navbar-cta";
import { NavbarLink } from "./navbar-link";

interface NavbarMobileMenuProps {
  isOpen: boolean;
  isRoundedNav: boolean;
  onClose: () => void;
}

export function NavbarMobileMenu({ isOpen, isRoundedNav, onClose }: NavbarMobileMenuProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="navbar-mobile-menu"
      className={cn(
        "navbar-mobile-menu-surface safari-overflow-x-clip",
        "absolute inset-x-0 top-full z-(--navbar-mobile-menu-z-index) box-border",
        "flex w-full max-w-full flex-col flex-nowrap items-center",
        "justify-center md:justify-start",
        "bg-surface backdrop-blur-(--navbar-blur)",
        "shadow-(--navbar-mobile-menu-shadow)",
        "h-(--navbar-mobile-menu-height)",
        "gap-(--navbar-mobile-menu-gap)",
        "p-(--navbar-mobile-menu-padding)",
        isRoundedNav &&
          "overflow-hidden rounded-(--navbar-mobile-menu-rounded-radius)",
      )}
    >
      {siteConfig.navLinks.map((link) => (
        <NavbarLink key={link.href} link={link} onClick={onClose} className="text-center" />
      ))}

      <NavbarCta onClick={onClose} />
    </div>
  );
}
