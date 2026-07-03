import { notFound } from "next/navigation";

import { ServiceDetailPage } from "@/features/services/components/service-detail-page";
import { getServiceBySlug, services } from "@/features/services/constants/services";

interface ServiceRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceRouteProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service | theGeeX",
    };
  }

  return {
    title: `${service.navTitle} | theGeeX`,
    description: service.page.overviewDescription,
  };
}

export default async function ServiceRoute({ params }: ServiceRouteProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}