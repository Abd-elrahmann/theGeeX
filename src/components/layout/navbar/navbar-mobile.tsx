"use client";

import { NavbarLogo } from "./navbar-logo";
import { NavbarMenuToggle } from "./navbar-menu-toggle";

interface NavbarMobileBarProps {
  isMenuOpen: boolean;
  onToggle: () => void;
}

export function NavbarMobileBar({ isMenuOpen, onToggle }: NavbarMobileBarProps) {
  return (
    <div className="contents lg:hidden">
      <NavbarLogo />
      <NavbarMenuToggle isOpen={isMenuOpen} onToggle={onToggle} />
    </div>
  );
}
