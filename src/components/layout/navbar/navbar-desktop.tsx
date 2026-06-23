import { siteConfig } from "@/config/site.config";

import { NavbarCta } from "./navbar-cta";
import { NavbarLink } from "./navbar-link";
import { NavbarLogo } from "./navbar-logo";

export function NavbarDesktop() {
  const navLinks = (
    <ul
      className="flex flex-row flex-nowrap items-center"
      style={{ gap: "var(--navbar-link-gap)" }}
    >
      {siteConfig.navLinks.map((link) => (
        <li key={link.href}>
              <NavbarLink link={link} className="text-center" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="hidden h-full w-full min-w-0 flex-row flex-nowrap items-center lg:flex">
      <div className="shrink-0">
        <NavbarLogo />
      </div>

      <div
        className="shrink-0"
        style={{ width: "var(--navbar-rounded-section-gap)" }}
        aria-hidden="true"
      />

      <div className="flex min-w-0 flex-1 justify-center">{navLinks}</div>

      <div
        className="shrink-0"
        style={{ width: "var(--navbar-rounded-section-gap)" }}
        aria-hidden="true"
      />

      <div className="shrink-0">
        <NavbarCta />
      </div>
    </div>
  );
}
