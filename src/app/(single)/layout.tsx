"use client";

import { usePathname } from "next/navigation";

import { SiteFooter } from "@/features/footer";
import { LetsTalkSection } from "@/features/lets-talk";

export default function SinglePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const shouldHideLetsTalk = pathname.startsWith("/packages");

  if (shouldHideLetsTalk) {
    return (
      <>
        {children}
        <SiteFooter compactSpacing />
      </>
    );
  }

  return (
    <>
      {children}
      <div className="relative mt-(--lets-talk-margin-top) h-(--lets-talk-footer-reveal-height)">
        <div className="sticky top-0 z-10">
          <LetsTalkSection revealFooterOnScroll />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-15 h-(--footer-overlap-bleed-height) bg-(--color-footer-surface)"
        />

        <div className="absolute inset-x-0 bottom-0 z-20">
          <SiteFooter revealFromPreviousSection />
        </div>
      </div>
    </>
  );
}