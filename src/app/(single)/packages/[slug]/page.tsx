import { notFound } from "next/navigation";

import { PackageDetailPage } from "@/features/packages";
import { getPackageBySlug, packageItems } from "@/features/packages/constants/packages";

interface PackageRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return packageItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PackageRouteProps) {
  const { slug } = await params;
  const item = getPackageBySlug(slug);

  if (!item) {
    return {
      title: "Package | theGeeX",
    };
  }

  return {
    title: `${item.name.trim()} | theGeeX`,
    description: item.description,
  };
}

export default async function PackageRoute({ params }: PackageRouteProps) {
  const { slug } = await params;
  const item = getPackageBySlug(slug);

  if (!item) {
    notFound();
  }

  return <PackageDetailPage item={item} />;
}
