import type { Metadata } from "next";

import { PackagesPage } from "@/features/packages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Packages",
  description: "Explore theGeeX packages for startups, scaling teams, and enterprise digital transformation initiatives.",
  path: "/packages",
});

export default function PackagesRoute() {
  return <PackagesPage />;
}
