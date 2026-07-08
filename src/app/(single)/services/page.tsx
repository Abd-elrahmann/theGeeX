import type { Metadata } from "next";

import { ServicesPage } from "@/features/services/components/services-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description: "Explore theGeeX services across strategy, design, engineering, integrations, and AI-powered digital transformation.",
  path: "/services",
});

export default function ServicesRoute() {
  return <ServicesPage />;
}