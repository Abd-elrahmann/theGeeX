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

interface ScalePackageBookingRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return packageItems
    .filter((item) => item.chips[0]?.label.toLowerCase() === "scale")
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ScalePackageBookingRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPackageBySlug(slug);

  if (!item || item.chips[0]?.label.toLowerCase() !== "scale") {
    return createPageMetadata({ title: "Scale Package", path: "/scale", noIndex: true });
  }

  const content = getPackageBookingContentBySlug(slug);

  return createPageMetadata({
    title: `${item.name.trim()} Booking`,
    description: content.description,
    path: content.bookingPath,
  });
}

export default async function ScalePackageBookingRoute({ params }: ScalePackageBookingRouteProps) {
  const { slug } = await params;
  const item = getPackageBySlug(slug);

  if (!item || item.chips[0]?.label.toLowerCase() !== "scale") {
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