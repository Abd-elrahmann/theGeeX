import type { Metadata } from "next";

import { siteConfig } from "@/config/site.config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const defaultOgImage = "/images/footer_logo.webp";
const pageTitleSuffix = "TheGeeX Digital Transformation Studio";
const defaultKeywords = [
  "digital transformation studio",
  "product strategy",
  "ui ux design",
  "web development",
  "mobile app development",
  "ai automation",
  "ecommerce development",
  "branding",
  "cloud engineering",
  "theGeeX",
] as const;

export const siteMetadata = {
  name: siteConfig.name,
  description: siteConfig.description,
  siteUrl,
  metadataBase: new URL(siteUrl),
  ogImage: defaultOgImage,
  keywords: defaultKeywords,
  creator: siteConfig.name,
  publisher: siteConfig.name,
} as const;

interface CreatePageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  category?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

function resolveAbsoluteAssetUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return new URL(path, siteMetadata.metadataBase).toString();
}

function dedupeKeywords(values: Iterable<string>): string[] {
  return Array.from(
    new Set(
      Array.from(values)
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  );
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = siteMetadata.ogImage,
  keywords = [],
  category,
  type = "website",
  noIndex = false,
}: CreatePageMetadataOptions = {}): Metadata {
  const resolvedTitle = title
    ? `${title} | ${pageTitleSuffix}`
    : `${siteMetadata.name} | ${pageTitleSuffix}`;
  const resolvedDescription = description ?? siteMetadata.description;
  const resolvedImage = resolveAbsoluteAssetUrl(image);
  const inferredKeywords = title
    ? title
        .split(/[^A-Za-z0-9+&-]+/)
        .map((part) => part.trim().toLowerCase())
        .filter((part) => part.length > 2)
    : [];
  const resolvedKeywords = dedupeKeywords([
    ...siteMetadata.keywords,
    ...keywords,
    ...inferredKeywords,
  ]);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: resolvedKeywords,
    category,
    creator: siteMetadata.creator,
    publisher: siteMetadata.publisher,
    applicationName: siteMetadata.name,
    metadataBase: siteMetadata.metadataBase,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: path,
      siteName: siteMetadata.name,
      locale: "en_US",
      type,
      images: [resolvedImage],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}