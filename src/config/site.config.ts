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
    "TheGeeX is a digital transformation studio building high-performance websites, e-commerce platforms, and integrated digital systems that help businesses grow, scale, and operate efficiently.",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact Us", href: "/contact-us" },
  ] satisfies NavLink[],
  cta: {
    label: "Book a Free Strategy Call",
    href: "/book-a-meeting",
  } satisfies SiteCta,
} as const;
