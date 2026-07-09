export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterRightItem {
  label: string;
  href?: string;
}

export const footerNavLinks: FooterLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact-us" },
];

export const footerSocialLinks: FooterLinkItem[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
];

export const footerContent = {
  newsletterTitle: "Stay in the loop.",
  newsletterSubtitle: "No spam just the good stuff.",
  emailPlaceholder: "Write your email here",
  subscribeLabel: "Subscribe",
  rights: [
    { label: "All rights reserved" },
    { label: "© 2026 TheGeeX" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ] satisfies FooterRightItem[],
  logoSrc: "/images/footer_logo.png",
} as const;