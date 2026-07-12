"use client";

import { useEffect, useState } from "react";
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

type MailchimpResponse = {
  result: "success" | "error";
  msg: string;
};

type MailchimpCallback = (response: MailchimpResponse) => void;
type MailchimpCallbackHost = Record<string, MailchimpCallback | undefined>;

const MAILCHIMP_URL =
  "https://echoes.us19.list-manage.com/subscribe/post?u=379fc32fa962d980fe92be245&id=66f63f57eb&f_id=00ebc2e1f0";

function createMailchimpJsonpUrl(email: string, callbackName: string): string {
  const endpoint = new URL(MAILCHIMP_URL.replace("/post?", "/post-json?"));

  endpoint.searchParams.set("EMAIL", email);
  endpoint.searchParams.set("c", callbackName);

  return endpoint.toString();
}

function subscribeToMailchimp(email: string): Promise<MailchimpResponse> {
  return new Promise((resolve, reject) => {
    const callbackName = `mailchimpCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const callbackHost = window as unknown as MailchimpCallbackHost;

    const cleanup = () => {
      script.remove();
      delete callbackHost[callbackName];
    };

    callbackHost[callbackName] = (response: MailchimpResponse) => {
      cleanup();
      resolve(response);
    };

    script.src = createMailchimpJsonpUrl(email, callbackName);
    script.async = true;
    script.onerror = () => {
      cleanup();
      reject(new Error("Newsletter subscription failed."));
    };

    document.body.appendChild(script);
  });
}

export function SiteFooter({ revealFromPreviousSection = false, compactSpacing = false }: SiteFooterProps) {
  const [rightsReserved, rightsCopyright, rightsTerms] = footerContent.rights;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  useEffect(() => {
    if (!showSuccessOverlay) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShowSuccessOverlay(false);
    }, 2600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [showSuccessOverlay]);

  async function handleSubscribeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setSubscribeError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setSubscribeError("Enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setSubscribeError(null);

    try {
      const response = await subscribeToMailchimp(normalizedEmail);

      if (response.result === "success") {
        setEmail("");
        setShowSuccessOverlay(true);
        return;
      }

      setSubscribeError(response.msg.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    } catch {
      setSubscribeError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
            "relative z-10 flex min-h-(--footer-card-min-height) w-full flex-col overflow-hidden rounded-(--footer-card-radius)",
            "bg-(--color-footer-surface) px-(--footer-card-padding-x) pt-(--footer-card-padding-top) pb-(--footer-card-padding-bottom)",
            !revealFromPreviousSection && "pt-(--footer-standalone-card-padding-top)",
            "md:items-center md:overflow-clip md:pb-0",
          )}
        >
          {showSuccessOverlay ? (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-(--color-footer-success-overlay) px-6 text-center backdrop-blur-sm">
              <div className="flex max-w-(--footer-success-overlay-max-width) flex-col items-center gap-(--footer-success-overlay-gap)">
                <span className="flex h-(--footer-success-icon-size) w-(--footer-success-icon-size) items-center justify-center rounded-full bg-(--color-footer-success-icon-bg) text-(--color-footer-success-icon-text)">
                  <span className="font-poppins text-(length:--footer-success-icon-text-size) leading-none font-semibold">✓</span>
                </span>
                <p className="m-0 font-poppins text-(length:--footer-success-title-size) leading-(--footer-success-title-line-height) font-semibold text-(--color-footer-success-text)">
                  Thanks for subscribing.
                </p>
              </div>
            </div>
          ) : null}

          <div
            className="grid w-full grid-cols-2 gap-(--footer-top-row-gap) md:flex md:flex-row md:items-start md:gap-(--footer-top-row-desktop-gap)"
          >
            <nav
              aria-label="Footer navigation"
              className="order-2 flex flex-col items-start gap-(--footer-link-column-gap) md:order-1 md:h-min md:w-px md:flex-1 md:justify-center md:gap-(--footer-link-desktop-gap) md:overflow-visible md:px-(--footer-nav-edge-padding) md:py-0"
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
              className="order-3 flex flex-col items-start gap-(--footer-link-column-gap) md:order-2 md:h-min md:w-px md:flex-1 md:justify-center md:gap-(--footer-link-desktop-gap) md:overflow-visible md:px-(--footer-nav-edge-padding) md:py-0"
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

            <div className="order-1 col-span-2 flex flex-col items-start gap-(--footer-newsletter-gap) md:order-3 md:col-span-1 md:min-w-0 md:w-px md:flex-[2.2] md:pr-(--footer-card-padding-x)">
              <div className="flex w-full flex-col items-start gap-(--footer-newsletter-copy-gap) md:ml-auto md:max-w-190">
                <h2
                  className={cn(
                    "whitespace-pre-wrap font-poppins text-(length:--footer-newsletter-title-size)",
                    "leading-(--footer-newsletter-title-line-height) font-[550] italic tracking-normal text-(--color-footer-title)",
                    "md:h-auto md:w-full md:whitespace-nowrap md:font-poppins md:italic md:text-white",
                    "md:max-lg:text-(length:--footer-newsletter-tablet-title-size) md:max-lg:leading-(--footer-newsletter-tablet-title-line-height)",
                    "lg:text-[34px] lg:leading-[1.2]",
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
                    "font-[550] italic tracking-normal text-(--color-footer-subtitle)",
                    "md:whitespace-nowrap md:text-white",
                    "md:max-lg:text-(length:--footer-newsletter-tablet-subtitle-size) md:max-lg:leading-(--footer-newsletter-tablet-subtitle-line-height)",
                    "lg:text-[34px] lg:leading-[1.2]",
                  )}
                  style={{
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    fontFeatureSettings: "normal",
                  }}
                >
                  {footerContent.newsletterSubtitle.split("good stuff.")[0]}
                  <span className="text-(--color-footer-subtitle-highlight)">good stuff.</span>
                </p>
              </div>

              <form
                className="flex w-full max-w-full flex-col items-stretch gap-(--footer-newsletter-form-gap) md:ml-auto md:max-w-190 lg:flex-row lg:items-center"
                onSubmit={handleSubscribeSubmit}
              >
                <input
                  type="email"
                  name="EMAIL"
                  placeholder={footerContent.emailPlaceholder}
                  aria-label="Email address"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (subscribeError) {
                      setSubscribeError(null);
                    }
                  }}
                  className={cn(
                    "min-h-(--footer-input-height) min-w-0 flex-1 rounded-(--footer-input-radius) border border-(--color-footer-input-border)",
                    "bg-(--color-footer-input-bg) px-(--footer-input-padding-x) py-(--footer-input-padding-y) text-(length:--footer-input-size)",
                    "font-poppins leading-(--footer-input-line-height) font-medium tracking-normal text-(--color-footer-input-text) caret-(--color-footer-input-text)",
                    "placeholder:text-(--color-footer-input-placeholder)",
                    "outline-none ring-0 focus:border-(--color-footer-input-border) focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
                    subscribeError && "outline-1 outline-(--color-footer-subscribe-error)",
                  )}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className={cn(
                    "inline-flex min-h-(--footer-subscribe-button-height) min-w-(--footer-subscribe-button-min-width) shrink-0 items-center justify-center rounded-(--footer-subscribe-button-radius)",
                    "bg-(--color-footer-subscribe-button-bg) px-(--footer-subscribe-button-padding-x) py-(--footer-subscribe-button-padding-y)",
                    "font-poppins text-(length:--footer-subscribe-button-size) leading-(--footer-subscribe-button-line-height)",
                    "font-medium tracking-normal text-(--color-footer-subscribe-button-text) transition-colors duration-200 hover:bg-(--color-footer-subscribe-button-hover-bg)",
                    isSubmitting && "cursor-not-allowed",
                  )}
                >
                  {isSubmitting ? (
                    <span
                      aria-hidden="true"
                      className="h-(--footer-subscribe-spinner-size) w-(--footer-subscribe-spinner-size) animate-spin rounded-full border-2 border-(--color-footer-subscribe-spinner) border-t-transparent"
                    />
                  ) : (
                    footerContent.subscribeLabel
                  )}
                </button>

                {subscribeError ? (
                  <p className="m-0 font-poppins text-(length:--footer-subscribe-error-size) leading-(--footer-subscribe-error-line-height) text-(--color-footer-subscribe-error) lg:basis-full">
                    {subscribeError}
                  </p>
                ) : null}
              </form>
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

          <div className="order-3 relative mt-auto pt-(--footer-logo-margin-top) h-(--footer-logo-height) w-full md:block md:h-(--footer-logo-height) md:overflow-visible md:aspect-[4.427745664739884/1]">
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