"use client";

import { usePathname } from "next/navigation";

import { FooterRevealStack } from "@/components/layout/footer-reveal-stack";
import { SiteFooter } from "@/features/footer";

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
      <FooterRevealStack
        marginTop={
          isServiceDetailPage
            ? "calc(var(--lets-talk-margin-top) + 120px)"
            : "var(--lets-talk-margin-top)"
        }
      />
    </>
  );
}