import type { Metadata } from "next";

import { ServicesPage } from "@/features/services/components/services-page";

export const metadata: Metadata = {
  title: "Services | theGeeX",
  description: "Explore theGeeX services from product strategy to design, engineering, and integrations.",
};

export default function ServicesRoute() {
  return <ServicesPage />;
}