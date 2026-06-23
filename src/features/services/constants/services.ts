export interface Service {
  id: number;
  navTitle: string;
  contentTitle: string;
  description: string[];
  image: string;
  imageAlt: string;
}

export const servicesSectionTitle = "Services";

export const servicesCursorLabel = "Explore Service";

export const servicesScrollHeightPerService = 100;

export const servicesTransition = {
  type: "spring" as const,
  duration: 0.45,
  bounce: 0.2,
  delay: 0.04,
};

export const servicesSlideTransition = {
  type: "spring" as const,
  stiffness: 220,
  damping: 31,
  mass: 1,
  delay: 0.05,
};

export const servicesContentSlideTransition = {
  ...servicesSlideTransition,
  delay: 0.05,
};

export const servicesImageSlideTransition = {
  ...servicesSlideTransition,
  delay: 0.1,
};

export const servicesImagePlaceholder = "/images/services/placeholder.svg";

export const services: Service[] = [
  {
    id: 1,
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
    image: "/images/ServicesCard1.jpg",
    imageAlt: "Establish digital brand presence mockup",
  },
  {
    id: 2,
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
    image: "/images/ServicesCard2.jpg",
    imageAlt: "Monetize checkout and payment flow mockup",
  },
  {
    id: 3,
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
    image: servicesImagePlaceholder,
    imageAlt: "Mobilize mobile apps mockup placeholder",
  },
  {
    id: 4,
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
    image: "/images/ServicesCard4.jpg",
    imageAlt: "Evolve digital transformation mockup",
  },
  {
    id: 5,
    navTitle: "API Design & Ecosystem Integration",
    contentTitle: "Where Systems Connect and Businesses Scale",
    description: [
      "Don't just exist-be found. Data-driven strategies to make sure your message hits the right score",
    ],
    image: "/images/ServicesCard5.jpg",
    imageAlt: "Connect integrations ecosystem mockup",
  },
];
