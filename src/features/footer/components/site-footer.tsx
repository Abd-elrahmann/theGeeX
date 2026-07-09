import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

import {
  footerContent,
  footerNavLinks,
  footerSocialLinks,
} from "@/features/footer/constants/footer";

type SiteFooterProps = {
  revealFromPreviousSection?: boolean;
  compactSpacing?: boolean;
};

export function SiteFooter({ revealFromPreviousSection = false, compactSpacing = false }: SiteFooterProps) {
  const [rightsReserved, rightsCopyright, rightsTerms] = footerContent.rights;

  return (
    <footer
      className={cn(
        "w-full overflow-visible bg-background",
        revealFromPreviousSection || compactSpacing ? "relative mt-0" : "relative mt-(--footer-margin-top)",
        "px-(--footer-padding-x) pt-(--footer-padding-top)",
        revealFromPreviousSection || compactSpacing ? "pb-0" : "pb-(--footer-padding-bottom)",
      )}
    >
      <div className="relative mx-auto w-full max-w-(--footer-container-max-width)">
        {revealFromPreviousSection ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 z-0 rounded-t-(--footer-card-radius) bg-(--color-footer-surface)"
            style={{
              top: "calc(var(--footer-overlap-bleed-height) * -1)",
              height: "calc(var(--footer-overlap-bleed-height) + var(--footer-card-radius))",
            }}
          />
        ) : null}

        <div
          className={cn(
            "relative z-10 flex min-h-(--footer-card-min-height) w-full flex-col justify-between overflow-hidden rounded-(--footer-card-radius)",
            "bg-(--color-footer-surface) px-(--footer-card-padding-x) pt-(--footer-card-padding-top) pb-(--footer-card-padding-bottom)",
            "md:items-center md:overflow-clip md:pt-5 md:pb-0",
          )}
        >
          <div
            className="grid w-full grid-cols-2 gap-(--footer-top-row-gap) md:flex md:flex-row md:items-start md:gap-2"
          >
            <nav
              aria-label="Footer navigation"
              className="order-2 flex flex-col items-start gap-(--footer-link-column-gap) md:order-1 md:h-min md:w-px md:flex-1 md:justify-center md:gap-5 md:overflow-visible md:p-0"
            >
              {footerNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "whitespace-pre font-poppins text-(length:--footer-link-size) leading-(--footer-link-line-height)",
                    "font-medium tracking-(--footer-link-letter-spacing) text-(--color-footer-link)",
                    "transition-colors duration-200 hover:underline hover:decoration-2 hover:underline-offset-4",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <nav
              aria-label="Footer social links"
              className="order-3 flex flex-col items-start gap-(--footer-link-column-gap) md:order-2 md:h-min md:w-px md:flex-1 md:justify-center md:gap-5 md:overflow-visible md:p-0"
            >
              {footerSocialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "whitespace-pre font-poppins text-(length:--footer-link-size) leading-(--footer-link-line-height)",
                    "font-medium tracking-(--footer-link-letter-spacing) text-(--color-footer-link)",
                    "transition-colors duration-200 hover:underline hover:decoration-2 hover:underline-offset-4",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="order-1 col-span-2 flex flex-col items-start gap-(--footer-newsletter-gap) md:order-3 md:col-span-1 md:w-px md:flex-[1.45]">
              <div className="flex w-full flex-col items-start gap-(--footer-newsletter-copy-gap)">
                <h2
                  className={cn(
                    "whitespace-pre-wrap font-cal-sans text-(length:--footer-newsletter-title-size)",
                    "leading-(--footer-newsletter-title-line-height) font-semibold tracking-normal text-(--color-footer-title)",
                    "md:h-auto md:w-full md:wrap-break-word md:font-poppins md:text-[40px] md:leading-[1.2] md:italic md:text-white",
                  )}
                  style={{
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    fontFeatureSettings: "normal",
                  }}
                >
                  {footerContent.newsletterTitle}
                </h2>
                <p
                  className={cn(
                    "h-auto w-full whitespace-pre-wrap wrap-break-word font-poppins",
                    "text-(length:--footer-newsletter-subtitle-size) leading-(--footer-newsletter-subtitle-line-height)",
                    "font-semibold italic tracking-normal text-(--color-footer-subtitle)",
                    "md:text-[40px] md:leading-[1.2] md:text-white",
                  )}
                  style={{
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    fontFeatureSettings: "normal",
                  }}
                >
                  No spam just the <span className="text-(--color-footer-subtitle-highlight)">good stuff.</span>
                </p>
              </div>

              <div className="flex w-full flex-col items-stretch gap-(--footer-newsletter-form-gap) lg:flex-row lg:items-center">
                <input
                  type="email"
                  placeholder={footerContent.emailPlaceholder}
                  aria-label="Email address"
                  className={cn(
                    "min-h-(--footer-input-height) min-w-0 flex-1 rounded-(--footer-input-radius)",
                    "bg-(--color-footer-input-bg) px-(--footer-input-padding-x) py-(--footer-input-padding-y) text-(length:--footer-input-size)",
                    "font-poppins leading-(--footer-input-line-height) font-medium tracking-normal text-(--color-footer-input-text)",
                    "placeholder:text-(--color-footer-input-placeholder)",
                  )}
                />

                <button
                  type="button"
                  className={cn(
                    "inline-flex min-h-(--footer-subscribe-button-height) shrink-0 items-center justify-center rounded-(--footer-subscribe-button-radius)",
                    "bg-(--color-footer-subscribe-button-bg) px-(--footer-subscribe-button-padding-x) py-(--footer-subscribe-button-padding-y)",
                    "font-poppins text-(length:--footer-subscribe-button-size) leading-(--footer-subscribe-button-line-height)",
                    "font-medium tracking-normal text-(--color-footer-subscribe-button-text) transition-colors duration-200 hover:bg-(--color-footer-subscribe-button-hover-bg)",
                  )}
                >
                  {footerContent.subscribeLabel}
                </button>
              </div>
            </div>
          </div>

          <div className="order-2 mt-(--footer-rights-margin-top) flex w-full items-center justify-center gap-(--footer-rights-line-gap) pt-(--footer-rights-padding-top) pb-(--footer-rights-padding-bottom)">
            <span className="hidden h-px w-(--footer-rights-line-width) shrink-0 bg-(--color-footer-rights-line) md:block" />

            <div className="flex w-fit max-w-(--footer-rights-max-width) shrink-0 flex-col items-center justify-center gap-(--footer-rights-mobile-row-gap) md:flex-row md:flex-wrap md:gap-(--footer-rights-gap)">
              <div className="flex items-center justify-center whitespace-nowrap md:hidden">
                {rightsTerms.href ? (
                  <Link
                    href={rightsTerms.href}
                    className={cn(
                      "font-poppins text-(length:--footer-rights-size) leading-(--footer-rights-line-height)",
                      "font-medium tracking-normal text-(--color-footer-rights)",
                      "md:text-[18px] md:leading-[1.2]",
                      "transition-colors duration-200 hover:underline hover:underline-offset-4",
                    )}
                  >
                    {rightsTerms.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "font-poppins text-(length:--footer-rights-size) leading-(--footer-rights-line-height)",
                      "font-medium tracking-normal text-(--color-footer-rights)",
                      "md:text-[18px] md:leading-[1.2]",
                    )}
                  >
                    {rightsTerms.label}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center gap-(--footer-rights-gap) whitespace-nowrap md:hidden">
                {[rightsReserved, rightsCopyright].map((item, index) => (
                  <div key={item.label} className="flex items-center gap-(--footer-rights-gap)">
                    <span
                      className={cn(
                        "font-poppins text-(length:--footer-rights-size) leading-(--footer-rights-line-height)",
                        "font-medium tracking-normal text-(--color-footer-rights)",
                        "md:text-[18px] md:leading-[1.2]",
                      )}
                    >
                      {item.label}
                    </span>
                    {index === 0 ? (
                      <span className="text-(--color-footer-rights-divider)">|</span>
                    ) : null}
                  </div>
                ))}
              </div>

              {footerContent.rights.map((item, index) => (
                <div key={item.label} className="hidden items-center gap-(--footer-rights-gap) md:flex">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "font-poppins text-(length:--footer-rights-size) leading-(--footer-rights-line-height)",
                        "font-medium tracking-normal text-(--color-footer-rights)",
                        "md:text-[18px] md:leading-[1.2]",
                        "transition-colors duration-200 hover:underline hover:underline-offset-4",
                      )}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        "font-poppins text-(length:--footer-rights-size) leading-(--footer-rights-line-height)",
                        "font-medium tracking-normal text-(--color-footer-rights)",
                        "md:text-[18px] md:leading-[1.2]",
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                  {index < footerContent.rights.length - 1 ? (
                    <span className="text-(--color-footer-rights-divider)">|</span>
                  ) : null}
                </div>
              ))}
            </div>

            <span className="hidden h-px w-(--footer-rights-line-width) shrink-0 bg-(--color-footer-rights-line) md:block" />
          </div>

          <div className="order-3 relative h-(--footer-logo-height) w-full md:block md:h-86.5 md:flex-1 md:overflow-visible md:aspect-[4.427745664739884/1]">
            <Image
              src={footerContent.logoSrc}
              alt="theGeeX logo"
              fill
              className="object-contain object-center md:object-top"
              sizes="(min-width: 1440px) 1440px, 100vw"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}