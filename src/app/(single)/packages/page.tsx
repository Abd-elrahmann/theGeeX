import type { Metadata } from "next";

import { PackagesPage } from "@/features/packages";

export const metadata: Metadata = {
  title: "Packages | theGeeX",
  description: "Explore theGeeX packages for startups, growing businesses, and enterprise digital transformation.",
};

export default function PackagesRoute() {
  return <PackagesPage />;
}
