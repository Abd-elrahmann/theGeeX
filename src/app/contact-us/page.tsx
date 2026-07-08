import type { Metadata } from "next";

import { SiteFooter } from "@/features/footer";
import { ContactUsPage } from "@/features/contact-us";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description: "Tell theGeeX what you have in mind and start your next digital product, platform, or transformation project.",
  path: "/contact-us",
});

export default function ContactUsRoute() {
  return (
    <>
      <ContactUsPage />
      <SiteFooter compactSpacing />
    </>
  );
}