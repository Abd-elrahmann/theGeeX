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
  const isServiceDetailPage = pathname.startsWith("/services/");

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
      <div
        className="relative min-h-(--lets-talk-footer-reveal-height)"
        style={{
          marginTop: isServiceDetailPage
            ? "calc(var(--lets-talk-margin-top) + 120px)"
            : "var(--lets-talk-margin-top)",
        }}
      >
        <div className="sticky top-(--navbar-height) z-10 md:top-0">
          <LetsTalkSection revealFooterOnScroll />
        </div>

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