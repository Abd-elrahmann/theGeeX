import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PackageDetailPage } from "@/features/packages";
import { getPackageBySlug, packageItems } from "@/features/packages/constants/packages";
import { createPageMetadata } from "@/lib/metadata";

interface PackageRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return packageItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PackageRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPackageBySlug(slug);

  if (!item) {
    return createPageMetadata({ title: "Package", path: "/packages", noIndex: true });
  }

  return createPageMetadata({
    title: item.name.trim(),
    description: item.description,
    path: `/packages/${item.slug}`,
  });
}

export default async function PackageRoute({ params }: PackageRouteProps) {
  const { slug } = await params;
  const item = getPackageBySlug(slug);

  if (!item) {
    notFound();
  }

  return <PackageDetailPage item={item} />;
}
