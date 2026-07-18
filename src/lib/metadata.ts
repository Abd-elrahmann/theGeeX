import type { Metadata } from "next";

import { siteConfig } from "@/config/site.config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const defaultOgImage = "/images/footer_logo.webp";
const pageTitleSuffix = "TheGeeX Digital Transformation Studio";

export const siteMetadata = {
  name: siteConfig.name,
  description: siteConfig.description,
  siteUrl,
  metadataBase: new URL(siteUrl),
  ogImage: defaultOgImage,
} as const;

interface CreatePageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = siteMetadata.ogImage,
  noIndex = false,
}: CreatePageMetadataOptions = {}): Metadata {
  const resolvedTitle = title
    ? `${title} | ${pageTitleSuffix}`
    : `${siteMetadata.name} | ${pageTitleSuffix}`;
  const resolvedDescription = description ?? siteMetadata.description;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: path,
      siteName: siteMetadata.name,
      locale: "en_US",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}