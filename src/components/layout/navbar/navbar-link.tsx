import Link from "next/link";

import { cn } from "@/lib/cn";

import type { NavLink } from "@/config/site.config";

interface NavbarLinkProps {
  link: NavLink;
  onClick?: () => void;
  className?: string;
}

export function NavbarLink({ link, onClick, className }: NavbarLinkProps) {
  return (
    <Link
      href={link.href}
      onClick={onClick}
      className={cn(
        "inline-block h-auto w-auto whitespace-pre font-poppins",
        "text-[14px] font-normal leading-[160%] tracking-normal",
        "text-(--color-nav-link) transition-colors duration-200",
        "hover:text-(--color-nav-link-hover)",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      {link.label}
    </Link>
  );
}
