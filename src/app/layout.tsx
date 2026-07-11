import type { Metadata } from "next";
import "@fontsource/cal-sans/index.css";
import { CalSansText } from "@calcom/cal-sans-ui/text";
import { CalSansUI } from "@calcom/cal-sans-ui/ui";
import { Geist, Geist_Mono, Poppins } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";
import { NavigationProgress } from "@/components/providers/navigation-progress";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Cursor } from "@/components/shared/cursor";
import { cn } from "@/lib/cn";
import { siteMetadata } from "@/lib/metadata";

import "@/lib/gsap";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: siteMetadata.metadataBase,
  title: siteMetadata.name,
  description: siteMetadata.description,
  applicationName: siteMetadata.name,
  icons: {
    icon: "/images/favicon_logo.svg",
    shortcut: "/images/favicon_logo.svg",
    apple: "/images/favicon_logo.svg",
  },
  openGraph: {
    title: siteMetadata.name,
    description: siteMetadata.description,
    siteName: siteMetadata.name,
    locale: "en_US",
    type: "website",
    images: [siteMetadata.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.name,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        poppins.variable,
        CalSansUI.variable,
        CalSansText.variable,
        "h-full antialiased",
      )}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          <NavigationProgress />
          <Cursor />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
