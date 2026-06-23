export interface FooterLinkItem {
  label: string;
  href: string;
}

export const footerNavLinks: FooterLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Why Us", href: "#why-us" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact Us", href: "#contact-us" },
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
  rights: ["All rights reserved", "© 2026 TheGeeX", "Terms & Conditions"],
  logoSrc: "/images/footerLogo.png",
} as const;