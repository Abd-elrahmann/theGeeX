"use client";

import { cn } from "@/lib/cn";

import { contactUsContent } from "@/features/contact-us/constants/contact-us";

export function ContactUsPage() {
  const [fullNameField, emailField, phoneField] = contactUsContent.fields;

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
            <div className="w-full flex-1 pt-2 md:pt-6">
              <div className="flex flex-col items-center gap-(--contact-us-info-gap) text-center md:items-start md:text-left">
              <h1 className="m-0 whitespace-pre-line font-poppins text-(length:--contact-us-title-size) leading-(--contact-us-title-line-height) font-bold tracking-normal text-(--color-contact-us-title)">
                {contactUsContent.title.replace(contactUsContent.titleAccent, "")}
                <span className="text-(--color-contact-us-title-accent)">{contactUsContent.titleAccent}</span>
              </h1>

              <div className="flex flex-col items-center gap-6 md:items-start">
                <div className="flex flex-col items-center gap-(--contact-us-item-gap) md:items-start">
                  <p className="m-0 font-poppins text-(length:--contact-us-label-size) leading-(--contact-us-label-line-height) font-medium tracking-[-0.03em] text-(--color-contact-us-label)">
                    {contactUsContent.emailLabel}
                  </p>
                  <a
                    href={`mailto:${contactUsContent.emailValue}`}
                    className="w-fit whitespace-nowrap font-poppins text-(length:--contact-us-value-size) leading-(--contact-us-value-line-height) font-medium tracking-[-0.03em] text-(--color-contact-us-value) transition-colors duration-200 hover:text-(--color-contact-us-title-accent)"
                  >
                    {contactUsContent.emailValue}
                  </a>
                </div>

                <div className="flex flex-col items-center gap-(--contact-us-item-gap) md:items-start">
                  <p className="m-0 font-poppins text-(length:--contact-us-label-size) leading-(--contact-us-label-line-height) font-medium tracking-[-0.03em] text-(--color-contact-us-label)">
                    {contactUsContent.phoneLabel}
                  </p>
                  <a
                    href="tel:+201108828385"
                    className="w-fit whitespace-nowrap font-poppins text-(length:--contact-us-value-size) leading-(--contact-us-value-line-height) font-medium tracking-[-0.03em] text-(--color-contact-us-value) transition-colors duration-200 hover:text-(--color-contact-us-title-accent)"
                  >
                    {contactUsContent.phoneValue}
                  </a>
                </div>

                <div className="flex flex-col items-center gap-(--contact-us-item-gap) md:items-start">
                  <p className="m-0 font-poppins text-(length:--contact-us-label-size) leading-(--contact-us-label-line-height) font-medium tracking-[-0.03em] text-(--color-contact-us-label)">
                    {contactUsContent.locationLabel}
                  </p>
                  <p className="m-0 max-w-[20ch] whitespace-pre-line font-poppins text-(length:--contact-us-value-size) leading-(--contact-us-value-line-height) font-medium tracking-[-0.03em] text-(--color-contact-us-value)">
                    {contactUsContent.locationValue}
                  </p>
                </div>
              </div>
              </div>
            </div>

            <div className="flex w-full flex-1 items-start justify-center md:self-start md:justify-center">
              <div className="w-full rounded-(--contact-us-form-card-radius) border border-(--color-contact-us-form-border) bg-(--color-contact-us-form-card-bg) px-(--contact-us-form-card-padding) pt-(--contact-us-form-card-padding) pb-(--contact-us-form-card-padding) backdrop-blur-(--contact-us-form-blur) md:max-w-[min(100%,576px)]">
                <form
                  className="flex w-full flex-col gap-(--contact-us-form-gap) rounded-(--contact-us-form-inner-radius) bg-(--color-contact-us-form-surface) px-(--contact-us-form-inner-padding) pt-(--contact-us-form-inner-padding) pb-(--contact-us-form-inner-padding)"
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <label htmlFor={fullNameField.id} className="flex w-full flex-col gap-(--contact-us-field-gap)">
                    <span className="font-poppins text-[14px] leading-[1.2] font-medium tracking-normal text-(--color-contact-us-input-label)">
                      {fullNameField.label}
                    </span>

                    <input
                      id={fullNameField.id}
                      name={fullNameField.id}
                      type={fullNameField.type}
                      autoComplete={fullNameField.autoComplete}
                      placeholder={fullNameField.placeholder}
                      className={cn(
                        "w-full rounded-(--contact-us-input-radius) border-(length:--contact-us-input-border-width)",
                        "border-(--color-contact-us-input-border) bg-(--color-contact-us-input-bg)",
                        "h-(--contact-us-input-height) px-(--contact-us-input-padding-x) py-(--contact-us-input-padding-y)",
                        "font-poppins text-[14px] leading-[1.2] font-medium tracking-normal text-(--color-contact-us-input-text)",
                        "placeholder:text-(--color-contact-us-input-placeholder)",
                        "outline-none transition-colors duration-200 focus:border-(--color-contact-us-input-focus)",
                      )}
                    />
                  </label>

                  <div className="grid w-full grid-cols-1 gap-(--contact-us-form-gap) md:grid-cols-2">
                    <label htmlFor={emailField.id} className="flex w-full flex-col gap-(--contact-us-field-gap)">
                      <span className="font-poppins text-[14px] leading-[1.2] font-medium tracking-normal text-(--color-contact-us-input-label)">
                        {emailField.label}
                      </span>

                      <input
                        id={emailField.id}
                        name={emailField.id}
                        type={emailField.type}
                        autoComplete={emailField.autoComplete}
                        placeholder={emailField.placeholder}
                        className={cn(
                          "w-full rounded-(--contact-us-input-radius) border-(length:--contact-us-input-border-width)",
                          "border-(--color-contact-us-input-border) bg-(--color-contact-us-input-bg)",
                          "h-(--contact-us-input-height) px-(--contact-us-input-padding-x) py-(--contact-us-input-padding-y)",
                          "font-poppins text-[14px] leading-[1.2] font-medium tracking-normal text-(--color-contact-us-input-text)",
                          "placeholder:text-(--color-contact-us-input-placeholder)",
                          "outline-none transition-colors duration-200 focus:border-(--color-contact-us-input-focus)",
                        )}
                      />
                    </label>

                    <label htmlFor={phoneField.id} className="flex w-full flex-col gap-(--contact-us-field-gap)">
                      <span className="font-poppins text-[14px] leading-[1.2] font-medium tracking-normal text-(--color-contact-us-input-label)">
                        {phoneField.label}
                      </span>

                      <input
                        id={phoneField.id}
                        name={phoneField.id}
                        type={phoneField.type}
                        autoComplete={phoneField.autoComplete}
                        placeholder={phoneField.placeholder}
                        className={cn(
                          "w-full rounded-(--contact-us-input-radius) border-(length:--contact-us-input-border-width)",
                          "border-(--color-contact-us-input-border) bg-(--color-contact-us-input-bg)",
                          "h-(--contact-us-input-height) px-(--contact-us-input-padding-x) py-(--contact-us-input-padding-y)",
                          "font-poppins text-[14px] leading-[1.2] font-medium tracking-normal text-(--color-contact-us-input-text)",
                          "placeholder:text-(--color-contact-us-input-placeholder)",
                          "outline-none transition-colors duration-200 focus:border-(--color-contact-us-input-focus)",
                        )}
                      />
                    </label>
                  </div>

                  <label htmlFor={contactUsContent.messageField.id} className="flex w-full flex-col gap-(--contact-us-field-gap)">
                    <span className="font-poppins text-[14px] leading-[1.2] font-medium tracking-normal text-(--color-contact-us-input-label)">
                      {contactUsContent.messageField.label}
                    </span>

                    <textarea
                      id={contactUsContent.messageField.id}
                      name={contactUsContent.messageField.id}
                      placeholder={contactUsContent.messageField.placeholder}
                      className={cn(
                        "min-h-(--contact-us-textarea-min-height) w-full rounded-(--contact-us-input-radius)",
                        "border-(length:--contact-us-input-border-width) border-(--color-contact-us-input-border)",
                        "bg-(--color-contact-us-input-bg) px-(--contact-us-input-padding-x) py-(--contact-us-input-padding-y)",
                        "font-poppins text-[14px] leading-[1.6] font-medium tracking-normal text-(--color-contact-us-input-text)",
                        "placeholder:text-(--color-contact-us-input-placeholder)",
                        "outline-none transition-colors duration-200 focus:border-(--color-contact-us-input-focus)",
                      )}
                    />
                  </label>

                  <button
                    type="submit"
                    className={cn(
                      "flex h-(--contact-us-submit-height) w-full items-center justify-center overflow-visible rounded-(--contact-us-submit-radius)",
                      "bg-(--color-contact-us-submit-bg) p-0 transition-colors duration-200 hover:bg-(--color-contact-us-submit-hover-bg)",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    )}
                  >
                    <span className="font-poppins text-(length:--lets-talk-button-text-size) leading-(--lets-talk-button-text-line-height) font-medium text-(--color-contact-us-submit-text)">
                      {contactUsContent.submitLabel}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}