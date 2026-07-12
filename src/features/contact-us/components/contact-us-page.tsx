"use client";

import { ContactUsForm } from "@/features/contact-us/components/contact-us-form";
import { ContactUsInfoSection } from "@/features/contact-us/components/contact-us-info-section";
import { contactUsContent } from "@/features/contact-us/constants/contact-us";

export function ContactUsPage() {
  return (
    <main className="relative z-(--page-main-z-index) min-h-svh overflow-visible bg-(image:--color-contact-us-page-bg) pt-(--contact-us-page-top-padding)">
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