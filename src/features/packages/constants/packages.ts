export interface PackageFeature {
  text: string;
  highlightedWords?: string[];
}

export interface PackageIncludedItem {
  title: string;
  description: string;
}

export interface PackageChip {
  label: string;
  variant?: "default" | "accent";
}

export interface PackageItem {
  id: number;
  name: string;
  chips: PackageChip[];
  cardChips?: PackageChip[];
  description: string;
  cardDescription?: string;
  price: string;
  detailPrice?: string;
  detailPriceLabel?: string;
  billingCycle: string;
  features: PackageFeature[];
  slug: string;
  detailImage: string;
  detailImageAlt: string;
  includedItems: PackageIncludedItem[];
  detailCtaTitle: string;
  featured?: boolean;
}

export interface PackageBookingContent {
  slug: string;
  breadcrumbLabel: string;
  headingLabel: string;
  packageTitle: string;
  description: string;
  bookingPath: string;
}

export const packagesSectionTitle = "Packages";

export const packageItems: PackageItem[] = [
  {
    id: 1,
    slug: "startup-launcher",
    name: "Startup Launcher",
    chips: [
      { label: "BUILD" },
    ],
    cardChips: [
      { label: "Build" },
    ],
    description: "Build a professional foundation with everything you need to launch confidently. From branding and your website to essential business tools, we create a seamless digital presence built for growth.",
    cardDescription: "For startups launching with confidence",
    price: "EGP 49,999",
    detailPrice: "EGP 49,999",
    detailPriceLabel: "Package Price",
    billingCycle: "",
    features: [
      { text: "Build credibility from day one" },
      { text: "Fast go-to-market execution", highlightedWords: ["Fast"] },
      { text: "Social media launch assets" },
      { text: "Business email setup" },
      { text: "Website or landing page", highlightedWords: ["Website"] },
      { text: "Professional brand identity", highlightedWords: ["brand identity"] },
    ],
    detailImage: "/images/services/One.webp",
    detailImageAlt: "Startup Launcher package preview",
    includedItems: [
      {
        title: "Brand Identity",
        description: "Create a memorable first impression with a professionally designed visual identity, including logo variations, typography, color palette, and brand assets that ensure consistency across every customer touchpoint.",
      },
      {
        title: "Professional Website",
        description: "Launch with a modern, responsive website designed to communicate your value, build trust, and convert visitors into customers. Optimized for performance, search engines, and future scalability.",
      },
      {
        title: "Business Essentials",
        description: "Operate professionally from day one with business email configuration, digital stationery, and the essential tools needed to communicate confidently with clients and partners.",
      },
      {
        title: "Social Media Launch Kit",
        description: "Start promoting your business immediately with branded social media profiles and professionally designed launch templates that maintain a consistent identity across every platform.",
      },
      {
        title: "Launch Strategy",
        description: "Every deliverable is organized into a complete launch-ready package, ensuring your brand, website, and business assets work together seamlessly from the moment you go live.",
      },
      {
        title: "Built to Grow",
        description: "Your startup may be launching today, but your digital foundation is built for tomorrow. Every asset is designed to scale alongside your business, making future growth faster, simpler, and more cost-effective.",
      },
    ],
    detailCtaTitle: "Launch Your Startup",
  },
  {
    id: 2,
    slug: "digital-ecosystem",
    name: "Digital Ecosystem ",
    chips: [
      { label: "GROW" },
      { label: "Most picked", variant: "accent" },
    ],
    cardChips: [
      { label: "Grow" },
      { label: "Most picked", variant: "accent" },
    ],
    description: "Build a connected digital ecosystem with advanced branding, a high-performance website, a mobile app, and smart automation-giving your business the tools it needs to scale with confidence.",
    cardDescription: "for growing buisnessed ready to grow",
    price: "EGP 79,999",
    detailPrice: "EGP 79,999",
    detailPriceLabel: "Package Price",
    billingCycle: "",
    featured: true,
    features: [
      { text: "Content strategy & growth tools" },
      { text: "Workflow automation", highlightedWords: ["Workflow automation"] },
      { text: "CRM integration" },
      { text: "Mobile app MVP", highlightedWords: ["Mobile app"] },
      { text: "Advanced SEO-ready website" },
      { text: "Complete brand guidelines", highlightedWords: ["Complete"] },
    ],
    detailImage: "/images/services/Two.webp",
    detailImageAlt: "Digital Ecosystem package preview",
    includedItems: [
      {
        title: "Complete Brand Identity",
        description: "Create a cohesive brand system with comprehensive guidelines covering your logo, typography, colors, messaging, and visual style to ensure consistency across every customer touchpoint.",
      },
      {
        title: "Professional Website",
        description: "Launch a feature-rich website with CMS capabilities, SEO optimization, blog functionality, analytics, and CRM integration, transforming your website into a powerful business and marketing platform.",
      },
      {
        title: "Mobile App MVP",
        description: "Bring your business to your customers with a cross-platform mobile application featuring the core functionality needed to validate your product and support your growing audience.",
      },
      {
        title: "CRM Integration",
        description: "Centralize your customer data by connecting your website, forms, and marketing channels to a CRM, making it easier to manage leads, improve communication, and grow your sales pipeline.",
      },
      {
        title: "Workflow Automation",
        description: "Automate repetitive business processes such as lead management, customer notifications, and internal workflows to improve efficiency, reduce manual work, and save valuable time.",
      },
      {
        title: "Growth-Ready Infrastructure",
        description: "Every solution is designed as part of a connected ecosystem, giving your business the flexibility and scalability to expand with new products, services, and opportunities without rebuilding from scratch.",
      },
    ],
    detailCtaTitle: "Grow Your Business",
  },
  {
    id: 3,
    slug: "enterprise-transformation",
    name: "Enterprise Transformation",
    chips: [
      { label: "SCALE" },
    ],
    cardChips: [
      { label: "Scale" },
    ],
    description: "Transform your business with custom software, enterprise-grade platforms, and intelligent automation built around your operations. Designed for growing organizations, this package streamlines complex workflows, improves efficiency, and creates a scalable digital foundation for long-term success.",
    cardDescription: "For organizations transforming at scale.",
    price: "Contact Sales",
    detailPrice: "Contact Sales for Price",
    detailPriceLabel: "",
    billingCycle: "",
    features: [
      { text: "End-to-end automation", highlightedWords: ["End-to-end automation"] },
      { text: "Internal dashboards & ERP solutions" },
      { text: "Advanced mobile applications", highlightedWords: ["Advanced"] },
      { text: "Custom web platforms" },
      { text: "Premium branding & design systems", highlightedWords: ["Premium"] },
    ],
    detailImage: "/images/services/Three.webp",
    detailImageAlt: "Enterprise Transformation package preview",
    includedItems: [
      {
        title: "Premium Brand Evolution",
        description: "Refresh and strengthen your brand with an enhanced identity system, custom visual assets, and scalable design standards that ensure consistency across every product and platform.",
      },
      {
        title: "Custom Web Platform",
        description: "Build a fully customized web platform tailored to your business, whether it's a customer portal, booking system, management platform, or enterprise application.",
      },
      {
        title: "Advanced Mobile Application",
        description: "Develop a high-performance mobile app with advanced capabilities such as secure authentication, payment integration, real-time synchronization, push notifications, and offline functionality.",
      },
      {
        title: "Internal Management System",
        description: "Replace disconnected tools with a centralized dashboard that simplifies daily operations, improves visibility, and helps manage customers, teams, sales, inventory, and reporting from one place.",
      },
      {
        title: "End-to-End Automation",
        description: "Automate business processes across departments by connecting your systems, eliminating repetitive tasks, reducing manual errors, and improving operational efficiency.",
      },
      {
        title: "Enterprise-Ready Infrastructure",
        description: "Built for performance, security, and scalability, every solution is designed to support your organization's growth while adapting to future technologies, users, and business requirements.",
      },
    ],
    detailCtaTitle: "Transform Your Business",
  },
];

export function getPackageBySlug(slug: string) {
  return packageItems.find((item) => item.slug === slug);
}

export function getPackageBookingContentBySlug(slug: string): PackageBookingContent {
  const packageItem = getPackageBySlug(slug);

  if (!packageItem) {
    throw new Error(`Package booking content not found for slug: ${slug}`);
  }

  return {
    slug: packageItem.slug,
    breadcrumbLabel: packageItem.name.trim(),
    headingLabel: packageItem.chips[0]?.label ?? "Package",
    packageTitle: packageItem.name.trim(),
    description: packageItem.description,
    bookingPath: `/${packageItem.chips[0]?.label.toLowerCase() ?? "packages"}/book-package`,
  };
}