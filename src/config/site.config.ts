export interface NavLink {
  label: string;
  href: string;
}

export interface SiteCta {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "theGeeX",
  description:
    "theGeeX is an AI-native digital transformation studio building brands, products, platforms, and growth systems.",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact Us", href: "/contact-us" },
  ] satisfies NavLink[],
  cta: {
    label: "Book a Free Strategy Call",
    href: "/contact-us",
  } satisfies SiteCta,
} as const;
