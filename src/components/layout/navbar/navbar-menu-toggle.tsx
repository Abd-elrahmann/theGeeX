"use client";

import { CloseIcon } from "@/components/shared/icons/close-icon";
import { MenuTwoLinesIcon } from "@/components/shared/icons/menu-two-lines";
import { cn } from "@/lib/cn";

interface NavbarMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function NavbarMenuToggle({ isOpen, onToggle }: NavbarMenuToggleProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      )}
      aria-expanded={isOpen}
      aria-controls="navbar-mobile-menu"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={onToggle}
    >
      {isOpen ? <CloseIcon /> : <MenuTwoLinesIcon />}
    </button>
  );
}
