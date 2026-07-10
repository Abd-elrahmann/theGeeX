import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailPage } from "@/features/services/single/components/service-detail-page";
import { getServiceBySlug, services } from "@/features/services/constants/services";
import { createPageMetadata } from "@/lib/metadata";

interface ServiceRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return createPageMetadata({ title: "Service", path: "/services", noIndex: true });
  }

  return createPageMetadata({
    title: service.navTitle,
    description: service.page.overviewDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceRoute({ params }: ServiceRouteProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}