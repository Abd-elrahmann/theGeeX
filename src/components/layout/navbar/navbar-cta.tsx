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
        "text-cta-text transition-colors duration-(--navbar-cta-duration) ease-(--navbar-cta-ease)",
        "hover:text-brand",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      )}
    >
      <span
        className="h-auto w-auto whitespace-pre text-center font-poppins text-[14px] leading-[1.2] font-medium tracking-normal"
        style={{
          color: "var(--color-cta-text)",
          fontFeatureSettings: "normal",
        }}
      >
        {siteConfig.cta.label}
      </span>
      <NavbarCtaArrow isHovered={isHovered} />
    </Link>
  );
}
