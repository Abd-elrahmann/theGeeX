import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

export function NavbarLogo() {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <Image
        src="/images/logo.svg"
        alt=""
        width={103}
        height={40}
        loading="eager"
        className="h-(--navbar-logo-height) w-(--navbar-logo-width)"
      />
    </Link>
  );
}
