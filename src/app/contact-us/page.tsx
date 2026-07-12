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
    <div className="relative bg-(image:--color-contact-us-page-bg)">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 bottom-0 hidden overflow-hidden lg:block">
        <svg
          viewBox="0 0 1946 1290"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-1/2 top-[calc(var(--navbar-height)+40px)] h-[min(1290px,150vh)] w-auto max-w-none -translate-x-1/2 opacity-95 lg:top-[calc(var(--navbar-height)+16px)] lg:h-auto lg:w-[min(1946px,185vw)]"
        >
          <path
            d="M11.4902 3.45703C11.4902 3.45703 30.2752 65.9085 51.9902 100.957C122.175 214.237 213.547 246.096 338.99 284.457C455.152 319.98 560.468 294.235 677.99 324.957C798.49 356.457 836.969 434.756 829.99 545.957C823.955 642.121 725.715 753.583 652.49 690.957C614.49 658.457 625.99 545.957 700.99 456.957C775.99 367.957 934.705 323.024 1027.99 390.957C1217.49 528.957 1144.99 751.957 1404.99 1041.46C1513.99 1162.82 1654.79 1229.96 1943.99 1277.96"
            stroke="var(--color-contact-us-path-stroke)"
            strokeWidth="24"
          />
        </svg>
      </div>

      <ContactUsPage />
      <SiteFooter />
    </div>
  );
}