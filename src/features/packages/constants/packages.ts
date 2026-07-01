export interface PackageFeature {
  text: string;
  highlightedWords?: string[];
}

export interface PackageChip {
  label: string;
  variant?: "default" | "accent";
}

export interface PackageItem {
  id: number;
  name: string;
  chips: PackageChip[];
  description: string;
  price: string;
  billingCycle: string;
  features: PackageFeature[];
  featured?: boolean;
}

export const packagesSectionTitle = "Packages";

export const packageItems: PackageItem[] = [
  {
    id: 1,
    name: "Startup Launcher",
    chips: [
      { label: "Launch" },
      { label: "Startup", variant: "accent" },
    ],
    description: "For startups launching with confidence",
    price: "12,000",
    billingCycle: "EGP / month",
    features: [
      { text: "Build credibility from day one" },
      { text: "Fast go-to-market execution", highlightedWords: ["Fast"] },
      { text: "Social media launch assets" },
      { text: "Business email setup" },
      { text: "Website or landing page", highlightedWords: ["Website"] },
      { text: "Professional brand identity", highlightedWords: ["brand identity"] },
    ],
  },
  {
    id: 2,
    name: "Digital Ecosystem ",
    chips: [
      { label: "Growth" },
      { label: "Popular", variant: "accent" },
    ],
    description: "for growing buisnessed ready to grow",
    price: "25,000",
    billingCycle: "EGP / month",
    featured: true,
    features: [
      { text: "Content strategy & growth tools" },
      { text: "Workflow automation", highlightedWords: ["Workflow automation"] },
      { text: "CRM integration" },
      { text: "Mobile app MVP", highlightedWords: ["Mobile app"] },
      { text: "Advanced SEO-ready website" },
      { text: "Complete brand guidelines", highlightedWords: ["Complete"] },
    ],
  },
  {
    id: 3,
    name: "Enterprise Transformation",
    chips: [
      { label: "Scale" },
      { label: "Enterprise", variant: "accent" },
    ],
    description: "For organizations transforming at scale.",
    price: "Contact Sales",
    billingCycle: "",
    features: [
      { text: "End-to-end automation", highlightedWords: ["End-to-end automation"] },
      { text: "Internal dashboards & ERP solutions" },
      { text: "Advanced mobile applications", highlightedWords: ["Advanced"] },
      { text: "Custom web platforms" },
      { text: "Premium branding & design systems", highlightedWords: ["Premium"] },
    ],
  },
];