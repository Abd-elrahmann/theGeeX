import type { Metadata } from "next";

import { SiteFooter } from "@/features/footer";
import { BookAMeetingPage } from "@/features/book-a-meeting";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Book a Meeting",
  description:
    "Tell theGeeX what you're building and book a strategy session to shape the next stage of your product.",
  path: "/book-a-meeting",
});

export default function BookAMeetingRoute() {
  return (
    <>
      <BookAMeetingPage />
      <div
        className="relative mt-(--lets-talk-margin-top) min-h-[calc(var(--footer-card-min-height)+var(--book-a-meeting-footer-reveal-gap)+var(--footer-padding-bottom)+var(--footer-overlap-bleed-height))]"
        style={{
          ['--book-a-meeting-footer-reveal-gap' as string]: '72px',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-(--footer-reveal-bottom-gap) z-15 h-(--footer-reveal-cover-height) bg-(--color-footer-surface)"
        />

        <div className="absolute inset-x-0 bottom-(--footer-reveal-bottom-gap) z-20">
          <SiteFooter revealFromPreviousSection />
        </div>
      </div>
    </>
  );
}