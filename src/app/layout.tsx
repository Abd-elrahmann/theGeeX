import type { Metadata } from "next";
import { CalSansUI } from "@calcom/cal-sans-ui/ui";
import { Geist, Geist_Mono, Poppins } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Cursor } from "@/components/shared/cursor";
import { cn } from "@/lib/cn";

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
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "theGeeX",
  description: "Creative digital experiences",
  icons: {
    icon: "/images/logo.svg",
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
  openGraph: {
    title: "theGeeX",
    description: "Creative digital experiences",
    images: [
      {
        url: "/images/logo.svg",
        width: 103,
        height: 40,
        alt: "theGeeX",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "theGeeX",
    description: "Creative digital experiences",
    images: ["/images/logo.svg"],
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
        "h-full antialiased",
      )}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          <Cursor />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
