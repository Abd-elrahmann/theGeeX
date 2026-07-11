"use client";

import { ContactUsForm } from "@/features/contact-us/components/contact-us-form";
import { ContactUsInfoSection } from "@/features/contact-us/components/contact-us-info-section";
import { contactUsContent } from "@/features/contact-us/constants/contact-us";

export function ContactUsPage() {
  return (
    <main className="relative z-(--page-main-z-index) min-h-svh overflow-hidden bg-(image:--color-contact-us-page-bg) pt-(--contact-us-page-top-padding)">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 1946 1290"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-1/2 top-10 h-auto w-[min(1946px,185vw)] -translate-x-1/2 opacity-95 lg:top-0"
        >
          <path
            d="M11.4902 3.45703C11.4902 3.45703 30.2752 65.9085 51.9902 100.957C122.175 214.237 213.547 246.096 338.99 284.457C455.152 319.98 560.468 294.235 677.99 324.957C798.49 356.457 836.969 434.756 829.99 545.957C823.955 642.121 725.715 753.583 652.49 690.957C614.49 658.457 625.99 545.957 700.99 456.957C775.99 367.957 934.705 323.024 1027.99 390.957C1217.49 528.957 1144.99 751.957 1404.99 1041.46C1513.99 1162.82 1654.79 1229.96 1943.99 1277.96"
            stroke="var(--color-contact-us-path-stroke)"
            strokeWidth="24"
          />
        </svg>
      </div>

      <section className="relative z-10 px-(--contact-us-padding-x) pb-(--contact-us-padding-bottom)">
        <div className="mx-auto mt-(--contact-us-content-offset-top) flex w-full max-w-(--contact-us-container-max-width) items-start justify-center">
          <div className="flex w-full flex-col items-center justify-center gap-(--contact-us-grid-gap) md:flex-1 md:flex-row md:flex-nowrap md:items-start md:justify-center">
            <ContactUsInfoSection />

            <div className="flex w-full flex-1 items-start justify-center md:self-start md:justify-center">
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}