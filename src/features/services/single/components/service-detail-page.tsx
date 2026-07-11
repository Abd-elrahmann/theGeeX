"use client";

import {
  type Service,
} from "@/features/services/constants/services";
import { ServiceDetailDeliverSection } from "@/features/services/single/components/service-detail-deliver-section";
import { ServiceDetailExtraSections } from "@/features/services/single/components/service-detail-extra-sections";
import { ServiceDetailFaqsSection } from "@/features/services/single/components/service-detail-faqs-section";
import { ServiceDetailHeroSection } from "@/features/services/single/components/service-detail-hero-section";
import { ServiceDetailOutcomesSection } from "@/features/services/single/components/service-detail-outcomes-section";
import { ServiceDetailOverviewSection } from "@/features/services/single/components/service-detail-overview-section";
import { ServiceDetailProjectsSection } from "@/features/services/single/components/service-detail-projects-section";

interface ServiceDetailPageProps {
  service: Service;
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  return (
    <main className="relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--services-page-top-padding)">
      <ServiceDetailHeroSection service={service} />
      <ServiceDetailOverviewSection service={service} />
      <ServiceDetailDeliverSection service={service} />
      <ServiceDetailOutcomesSection outcomes={service.page.outcomes} />
      <ServiceDetailProjectsSection projectsSection={service.page.projects} />
      <ServiceDetailFaqsSection faqs={service.page.faqs} />
      <ServiceDetailExtraSections sections={service.page.extraSections} />
    </main>
  );
}
