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
        <div className="sticky z-10" style={{ top: "var(--lets-talk-reveal-sticky-top)" }}>
          <LetsTalkSection revealFooterOnScroll />
        </div>

        <div className="sticky z-20 mt-(--footer-reveal-gap)" style={{ top: "var(--lets-talk-reveal-sticky-top)" }}>
          <SiteFooter revealFromPreviousSection />
        </div>
      </div>
    </>
  );
}