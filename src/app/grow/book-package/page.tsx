import type { Metadata } from "next";

import { SiteFooter } from "@/features/footer";
import { PackageBookingPage } from "@/features/packages/booking/components/package-booking-page";
import { getPackageBookingContentBySlug } from "@/features/packages/constants/packages";
import { createPageMetadata } from "@/lib/metadata";

const content = getPackageBookingContentBySlug("digital-ecosystem");

export const metadata: Metadata = createPageMetadata({
  title: "Grow Book Package",
  description: content.description,
  path: content.bookingPath,
});

export default function GrowBookPackageRoute() {
  return (
    <div className="relative bg-(image:--color-contact-us-page-bg)">
      <PackageBookingPage content={content} />
      <SiteFooter />
    </div>
  );
}