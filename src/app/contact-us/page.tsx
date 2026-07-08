import type { Metadata } from "next";

import { SiteFooter } from "@/features/footer";
import { ContactUsPage } from "@/features/contact-us";

export const metadata: Metadata = {
  title: "Contact Us | theGeeX",
  description: "Tell theGeeX what you have in mind and start your next digital product or platform.",
};

export default function ContactUsRoute() {
  return (
    <>
      <ContactUsPage />
      <SiteFooter compactSpacing />
    </>
  );
}