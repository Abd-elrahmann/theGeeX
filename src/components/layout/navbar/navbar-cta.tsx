"use client";

import Link from "next/link";
import { useState } from "react";

import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

import { NavbarCtaArrow } from "./navbar-cta-arrow";

interface NavbarCtaProps {
  onClick?: () => void;
}

export function NavbarCta({ onClick }: NavbarCtaProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={siteConfig.cta.href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "inline-flex shrink-0 items-center justify-end gap-2 whitespace-pre text-center font-poppins",
        "h-(--navbar-cta-height) w-(--navbar-cta-width)",
        "text-(length:--navbar-cta-font-size) font-normal leading-[1.2] tracking-normal",
        "text-cta-text transition-colors duration-(--navbar-cta-duration) ease-(--navbar-cta-ease)",
        "hover:text-brand",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      )}
    >
      <span className="min-w-0 truncate">{siteConfig.cta.label}</span>
      <NavbarCtaArrow isHovered={isHovered} />
    </Link>
  );
}
