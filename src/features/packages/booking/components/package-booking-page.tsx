"use client";

import { DetailBreadcrumb } from "@/components/shared/detail-breadcrumb";
import { ContactUsForm } from "@/features/contact-us/components/contact-us-form";
import { type PackageBookingContent } from "@/features/packages/constants/packages";

interface PackageBookingPageProps {
  content: PackageBookingContent;
}

export function PackageBookingPage({ content }: PackageBookingPageProps) {
  return (
    <main className="relative z-(--page-main-z-index) min-h-svh overflow-visible bg-(image:--color-contact-us-page-bg) pt-(--contact-us-page-top-padding)">
      <section className="relative z-10 px-(--contact-us-padding-x) pb-(--contact-us-padding-bottom)">
        <div className="mx-auto mt-(--contact-us-content-offset-top) flex min-h-[calc(100svh-var(--contact-us-page-top-padding)-var(--contact-us-content-offset-top)-var(--contact-us-padding-bottom))] w-full max-w-(--contact-us-container-max-width) items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center gap-(--contact-us-grid-gap) md:flex-1 md:flex-row md:flex-nowrap md:items-center md:justify-center">
            <div className="w-full flex-1 pt-2 md:pt-0">
              <div className="flex flex-col items-center gap-(--contact-us-info-gap) text-center md:items-start md:text-left">
                <DetailBreadcrumb
                  items={[
                    { label: "Home", href: "/" },
                    { label: content.breadcrumbLabel, href: `/packages/${content.slug}` },
                    { label: "Book package" },
                  ]}
                  className="flex w-min flex-row flex-nowrap items-center gap-(--packages-detail-breadcrumb-gap) whitespace-nowrap font-poppins text-(length:--packages-detail-breadcrumb-size) leading-(--packages-detail-breadcrumb-line-height) font-normal text-(--color-packages-detail-text)"
                  linkClassName="transition-colors duration-200 hover:text-(--color-packages-detail-text)"
                  currentClassName="text-(--color-packages-detail-text)"
                />

                <div className="flex flex-col items-center gap-4 md:items-start">
                  <p className="m-0 whitespace-pre-wrap font-cal-sans text-(length:--packages-detail-chip-size) leading-(--packages-detail-chip-line-height) font-semibold tracking-normal text-(--color-packages-detail-accent)">
                    {content.headingLabel}
                  </p>

                  <h1 className="m-0 max-w-(--packages-detail-title-max-width) whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--packages-detail-title-size) leading-(--packages-detail-title-line-height) font-semibold tracking-normal text-(--color-packages-detail-text)">
                    {content.packageTitle}
                  </h1>

                  <p className="m-0 max-w-(--packages-detail-description-max-width) whitespace-pre-wrap wrap-break-word font-poppins text-(length:--packages-detail-description-size) leading-(--packages-detail-description-line-height) font-normal tracking-normal text-(--color-packages-detail-text)">
                    {content.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-1 items-center justify-center md:self-center md:justify-center">
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}