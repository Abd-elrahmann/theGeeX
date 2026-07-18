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

interface GrowPackageBookingRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return packageItems
    .filter((item) => item.chips[0]?.label.toLowerCase() === "grow")
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: GrowPackageBookingRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPackageBySlug(slug);

  if (!item || item.chips[0]?.label.toLowerCase() !== "grow") {
    return createPageMetadata({ title: "Grow Package", path: "/grow", noIndex: true });
  }

  const content = getPackageBookingContentBySlug(slug);

  return createPageMetadata({
    title: `${item.name.trim()} Booking`,
    description: content.description,
    path: content.bookingPath,
  });
}

export default async function GrowPackageBookingRoute({ params }: GrowPackageBookingRouteProps) {
  const { slug } = await params;
  const item = getPackageBySlug(slug);

  if (!item || item.chips[0]?.label.toLowerCase() !== "grow") {
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