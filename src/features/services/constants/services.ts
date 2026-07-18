import {
  servicePageConfigs,
  type ServiceDetail,
  type ServicePageSlug,
} from "@/features/services/constants/service-pages";

export type {
  ServiceDeliverable,
  ServiceDetail,
  ServiceExtraSection,
  ServiceOutcome,
  ServiceOutcomesSection,
  ServiceFaqItem,
  ServiceFaqsSection,
  ServiceProjectsSection,
} from "@/features/services/constants/service-pages";

export interface Service {
  id: number;
  slug: ServicePageSlug;
  navTitle: string;
  contentTitle: string;
  description: string[];
  pageDescription?: string[];
  image: string;
  pageImage: string;
  imageAlt: string;
  page: ServiceDetail;
}

type ServiceBase = Omit<Service, "page">;

export const servicesSectionTitle = "Services";

export const servicesCursorLabel = "Explore Service";

export const servicesScrollHeightPerService = 100;

export const servicesTransition = {
  type: "tween" as const,
  ease: [0.44, 0, 0.56, 1] as const,
  duration: 0.5,
  delay: 0,
};

export const servicesSlideTransition = {
  type: "tween" as const,
  ease: [0.44, 0, 0.56, 1] as const,
  duration: 0.5,
  delay: 0,
};

export const servicesContentSlideTransition = {
  ...servicesSlideTransition,
  delay: 0,
};

export const servicesImageSlideTransition = {
  ...servicesSlideTransition,
  delay: 0,
};

export const servicesImagePlaceholder = "/images/services/placeholder.svg";

const serviceBaseItems: ServiceBase[] = [
  {
    id: 1,
    slug: "product-strategy-consultancy",
    navTitle: "Product Strategy & Consultancy",
    contentTitle: "Great Products Start Long Before Development",
    description: [
      "Product Roadmapping",
      "Feature Scoping",
      "Tech Stack Selection",
      "Market Validation",
      "Technical Feasibility",
      "Growth Planning",
    ],
    pageDescription: [
      "Product",
      "RoadmappingFeature",
      "ScopingTech Stack",
      "SelectionMarket",
      "ValidationTechnical",
      "FeasibilityGrowth",
      "Planning",
    ],
    image: "/images/services section/one.webp",
    pageImage: "/images/Service Sections Covers/one.webp",
    imageAlt: "Establish digital brand presence mockup",
  },
  {
    id: 2,
    slug: "ui-ux-product-design",
    navTitle: "UI/UX & Product Design",
    contentTitle: "Designed to Be Effortless. Built to Perform.",
    description: [
      "User Research",
      "Wireframes & User Flows",
      "UI Design",
      "Interactive Prototypes",
      "Design Systems",
      "Usability Optimization",
    ],
    image: "/images/services section/two.webp",
    pageImage: "/images/Service Sections Covers/two.webp",
    imageAlt: "Monetize checkout and payment flow mockup",
  },
  {
    id: 3,
    slug: "backend-cloud-engineering",
    navTitle: "Backend & Cloud Engineering",
    contentTitle: "The Foundation Behind Every Great Product",
    description: [
      "Backend Development",
      "Cloud Infrastructure",
      "Database Architecture",
      "Security Engineering",
      "Performance Optimization",
      "Monitoring & Scalability",
    ],
    image: "/images/services section/three.webp",
    pageImage: "/images/Service Sections Covers/three.webp",
    imageAlt: "Mobilize mobile apps mockup placeholder",
  },
  {
    id: 4,
    slug: "frontend-mobile-app-development",
    navTitle: "Frontend & Mobile App Development",
    contentTitle: "Digital Experiences Users Love to Use",
    description: [
      "Web Application Development",
      "Mobile App Development",
      "Responsive Interfaces",
      "Cross-Platform Solutions",
      "Performance Optimization",
      "App Store Deployment",
    ],
    image: "/images/services section/four.webp",
    pageImage: "/images/Service Sections Covers/four.webp",
    imageAlt: "Evolve digital transformation mockup",
  },
  {
    id: 5,
    slug: "api-design-ecosystem-integration",
    navTitle: "API Design & Ecosystem Integration",
    contentTitle: "Where Systems Connect and Businesses Scale",
    description: [
      "Custom API Development",
      "Third-Party Integrations",
      "Payment Gateway Integration",
      "CRM & ERP Connectivity",
      "Legacy System Integration",
      "API Documentation",
    ],
    image: "/images/services section/five.webp",
    pageImage: "/images/Service Sections Covers/five.webp",
    imageAlt: "Connect integrations ecosystem mockup",
  },
];

export const services: Service[] = serviceBaseItems.map((service) => ({
  ...service,
  page: servicePageConfigs[service.slug],
}));

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
