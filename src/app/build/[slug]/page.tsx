import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/features/footer";
import { PackageBookingPage } from "@/features/packages/booking/components/package-booking-page";
import {
  getPackageBookingContentBySlug,
  getPackageBySlug,
  packageItems,
} from "@/features/packages/constants/packages";
import { createPageMetadata } from "@/lib/metadata";

interface BuildPackageBookingRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return packageItems
    .filter((item) => item.chips[0]?.label.toLowerCase() === "build")
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: BuildPackageBookingRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPackageBySlug(slug);

  if (!item || item.chips[0]?.label.toLowerCase() !== "build") {
    return createPageMetadata({ title: "Build Package", path: "/build", noIndex: true });
  }

  const content = getPackageBookingContentBySlug(slug);

  return createPageMetadata({
    title: `${item.name.trim()} Booking`,
    description: content.description,
    path: content.bookingPath,
  });
}

export default async function BuildPackageBookingRoute({ params }: BuildPackageBookingRouteProps) {
  const { slug } = await params;
  const item = getPackageBySlug(slug);

  if (!item || item.chips[0]?.label.toLowerCase() !== "build") {
    notFound();
  }

  const content = getPackageBookingContentBySlug(slug);

  return (
    <div className="relative bg-(image:--color-contact-us-page-bg)">
      <PackageBookingPage content={content} />
      <SiteFooter />
    </div>
  );
}