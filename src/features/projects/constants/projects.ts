export type ProjectCategory = string;

export interface ProjectProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
  activeColor: string;
}

export interface ProjectItem {
  id: number;
  slug: string;
  name: string;
  detailTitle?: string;
  breadcrumbLabel?: string;
  year: string;
  categories: ProjectCategory[];
  detailCategory?: ProjectCategory;
  detailChipBackground?: string;
  description?: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  detailImage: string;
  detailGallery: string[];
  processSteps?: ProjectProcessStep[];
  imageClassName?: string;
  background: string;
}

export const projectsSectionTitle = "Projects";
export const projectsPageTitle = "Recent Projects";
export const projectsPageDescription =
  "Explore the products, platforms, and digital ecosystems we've designed, engineered, and scaled—turning ambitious ideas into measurable business outcomes.";
export const projectsCursorLabel = "View Project";
export const projectsFirstCardEnterProgress = 0.12;
export const projectsFirstCardEnterWindowRatio = 0.22;
export const projectsCardEnterWindowRatio = 0.65;

export const projectsCardRevealScaleTo = 0.9;
export const projectsCardScaleUpRecoveryExponent = 1.75;
export const projectsCardRevealOffsetY = 0;
export const projectsCardHiddenOffsetY = 900;
export const projectsCardScaleDepthStep = 0.025;
export const projectsCardExitScaleSpeed = 1.75;
export const projectsCardSpeedBase = 0.3;
export const projectsCardSpeedStep = 0.15;
export const projectsCardParallaxTravel = 360;
export const projectsCardArrowScrollAnimationMs = 550;

export const projects: ProjectItem[] = [
  {
    id: 1,
    slug: "travx",
    name: "TravX",
    detailTitle: "TravX Website",
    breadcrumbLabel: "Travx",
    year: "2026",
    categories: ["Mobile", "Website", "Rebranding"],
    detailCategory: "CMS & Booking",
    detailChipBackground: "var(--projects-detail-chip-travx-background)",
    description:
      "TravX was built to modernize and streamline the travel technology ecosystem through a high-performance digital platform designed for speed, scalability, and seamless connectivity.",
    image: "/images/projects/travx.png",
    imageAlt: "TravX mobile and website experience preview",
    imagePosition: "58% 42%",
    detailImage: "/images/Projects-Services/TravxCover.png",
    detailGallery: [
      "/images/Projects-Services/travx mock.png",
      "/images/Projects-Services/travxmoc2.png",
      "/images/Projects-Services/travx1.png",
      "/images/Projects-Services/travx2.png",
      "/images/Projects-Services/travx3.png",
      "/images/Projects-Services/travx4.png",
    ],
    processSteps: [
      {
        number: "01",
        title: "Discovery & Audit",
        description:
          "We audited the existing TravX platform, analyzed user needs and pain points, and defined a clear strategy to create a faster, more intuitive, and conversion-focused travel booking experience.",
        icon: "/images/phone.svg",
        activeColor: "var(--projects-detail-work-chip-background)",
      },
      {
        number: "02",
        title: "Brand Redesign",
        description:
          "We restructured the website architecture, created wireframes, and designed a modern user interface focused on simplicity, usability, and conversions.",
        icon: "/images/Projects icons/Brand Redesign.svg",
        activeColor: "#2060df",
      },
      {
        number: "03",
        title: "Development & Integrations",
        description:
          "The designs were transformed into a fully responsive website, with travel booking systems, APIs, and third-party services seamlessly integrated.",
        icon: "/images/development.svg",
        activeColor: "#df7afe",
      },
      {
        number: "04",
        title: "Testing & Optimization",
        description:
          "We conducted extensive testing, optimized performance, improved SEO, and ensured a smooth experience across all devices and browsers.",
        icon: "/images/Projects icons/Testing & Optimization.svg",
        activeColor: "#000000",
      },
      {
        number: "05",
        title: "Launch & Continuous Growth",
        description:
          "The new TravX website was launched with analytics and monitoring in place, followed by ongoing improvements based on user behavior and performance data.",
        icon: "/images/rocket.svg",
        activeColor: "#ffe700",
      },
    ],
    background: "var(--color-project-card-bg-1)",
  },
  {
    id: 2,
    slug: "efg-hermes",
    name: "EFG Hermes",
    detailTitle: "EFGHermes",
    breadcrumbLabel: "EFGHermes",
    year: "2026",
    categories: ["Web Application"],
    detailCategory: "Financial Content & Corporate CMS",
    detailChipBackground: "var(--projects-detail-chip-efg-background)",
    description:
      "The Wrap Up was developed for EFGHermes as a bespoke, high-security financial summary and content management engine, ensuring seamless delivery of critical market insights to premier investors.",
    image: "/images/projects/efg.png",
    imageAlt: "EFG Hermes web application preview",
    imagePosition: "60% 38%",
    detailImage: "/images/projects/efg_hermes.png",
    detailGallery: [
      "/images/Projects-Services/EFG.png",
      "/images/Projects-Services/EFG2.png",
    ],
    processSteps: [
      {
        number: "01",
        title: "Discovery & Audit",
        description:
          "We reviewed the specific content delivery demands of EFGHermes' financial reporting teams, detailing essential information security standards and publication speed requirements.",
        icon: "/images/Projects icons/Discovery & Audit.svg",
        activeColor: "var(--projects-detail-work-chip-background)",
      },
      {
        number: "02",
        title: "Corporate Editorial Redesign",
        description:
          "We crafted a elegant, clean reading experience optimized for high-level financial data summaries, charts, and breaking market reports across both desktop and mobile platforms.",
        icon: "/images/Projects icons/Corporate Editorial Redesign.svg",
        activeColor: "#2060df",
      },
      {
        number: "03",
        title: "Custom CMS Development",
        description:
          "Our engineering division built a specialized, highly responsive Content Management System (CMS) custom-tailored to let editorial authors publish critical financial insights securely within minutes.",
        icon: "/images/Projects icons/Custom CMS Development (1).svg",
        activeColor: "#df7afe",
      },
      {
        number: "04",
        title: "Security Verification & Optimization",
        description:
          "We subjected the customized web assets to extensive penetration testing, structural security reviews, and asset compression routines to ensure instantaneous load times under volatile market conditions.",
        icon: "/images/Security Verification & Optimization.svg",
        activeColor: "#000000",
      },
      {
        number: "05",
        title: "Delivery & Operational Handover",
        description:
          "The final proposal and technical CMS documentation were seamlessly delivered, setting a new benchmark for secure financial publishing within the enterprise framework.",
        icon: "/images/Delivery & Operational Handover.svg",
        activeColor: "#ffe700",
      },
    ],
    background: "var(--color-project-card-bg-2)",
  },
  {
    id: 3,
    slug: "performr",
    name: "Performr",
    detailTitle: "Performr Platform",
    breadcrumbLabel: "Performr",
    year: "2026",
    categories: ["Web & Mobile Apps", "End-to-End Product", "Brand to Platform"],
    detailCategory: "Talent Marketplace & Casting Platform",
    detailChipBackground: "var(--projects-detail-chip-performr-background)",
    description:
      "Performr was architected to revolutionize the entertainment and creative industry, providing a high-performance talent discovery platform where actors, singers, and models can showcase their portfolios, and casting directors can seamlessly source the perfect talent.",
    image: "/images/projects/performr.png",
    imageAlt: "Performr cross-platform product preview",
    imagePosition: "70% 42%",
    detailImage: "/images/projects/Performr.png",
    detailGallery: [
      "/images/Projects-Services/Performer.png",
      "/images/Projects-Services/Performer 2.png",
      "/images/Projects-Services/Product Strategy & Consultancy2.png",
      "/images/Projects-Services/UIUX & Product Design2.png",
    ],
    processSteps: [
      {
        number: "01",
        title: "Discovery & Industry Audit",
        description:
          "We analyzed the traditional casting bottlenecks in the entertainment industry, identifying how talent profiles, showreels, and audio portfolios get lost in fragmented channels, and mapped out a centralized marketplace strategy.",
        icon: "/images/phone.svg",
        activeColor: "var(--projects-detail-work-chip-background)",
      },
      {
        number: "02",
        title: "Media-Rich UI/UX Strategy",
        description:
          "We designed an immersive, highly visual interface optimized for talent presentation and director search. This included building seamless video showreel previews, audio clip players, and comprehensive modeling/acting data cards that look pristine on both web and mobile screens.",
        icon: "/images/Projects icons/UX Strategy  .svg",
        activeColor: "#2060df",
      },
      {
        number: "03",
        title: "Marketplace Engineering",
        description:
          "Our development team engineered a robust relational database backend paired with a fast, intuitive client interface. We implemented advanced elastic filtering tools, allowing directors to instantly filter talent by specific parameters like skills, age range, location, and physical attributes.",
        icon: "/images/Projects icons/Marketplace Marketplace Engineering.svg",
        activeColor: "#df7afe",
      },
      {
        number: "04",
        title: "Media Processing & Optimization",
        description:
          "We integrated cloud-based media processing pipelines to automatically compress and optimize heavy video uploads, images, and audio files. This guarantees lightning-fast loading speeds for casting directors screening hundreds of portfolios on the fly.",
        icon: "/images/Projects icons/Media Processing & Optimization.svg",
        activeColor: "#000000",
      },
      {
        number: "05",
        title: "Deployment & Production Launch",
        description:
          "The platform was deployed to a scalable production ecosystem, introducing a secure, efficient portal that bridges the gap between emerging creative talents and major industry productions.",
        icon: "/images/rocket.svg",
        activeColor: "#ffe700",
      },
    ],
    background: "var(--color-project-card-bg-3)",
  },
  {
    id: 4,
    slug: "moretckts",
    name: "MoreTckts",
    detailTitle: "MoreTckts",
    breadcrumbLabel: "MoreTckts",
    year: "2026",
    categories: ["Web & Mobile Apps", "End-to-End Integration"],
    detailCategory: "B2C Travel & Booking Engine",
    detailChipBackground: "var(--projects-detail-chip-moretckts-background)",
    description:
      "MoreTckts was engineered as a comprehensive B2C travel ecosystem, offering seamless cross-platform booking solutions for flights, hotels, and car rentals or limousines engineered for the modern traveler.",
    image: "/images/projects/moretckts.png",
    imageAlt: "moretckts product integration preview",
    imagePosition: "62% 45%",
    detailImage: "/images/Projects-Services/Moretickts2.png",
    detailGallery: [
      "/images/Projects-Services/Moretickts.png",
      "/images/Projects-Services/Moretickts2.png",
      "/images/Projects-Services/moretickts3.png",
      "/images/Projects-Services/moretickts 2.png",
      "/images/Projects-Services/moretickts(1).png",
      "/images/Projects-Services/Moretickts (1).png",
    ],
    processSteps: [
      {
        number: "01",
        title: "Discovery & Audit",
        description:
          "We investigated user behavior patterns within the B2C consumer leisure space, identifying specific drop-off friction points in traditional flight routing and hotel booking interfaces.",
        icon: "/images/phone.svg",
        activeColor: "var(--projects-detail-work-chip-background)",
      },
      {
        number: "02",
        title: "Interface & UX Architecture",
        description:
          "Our team drafted clean, unified user interfaces optimized for rapid selection filters, allowing consumers to switch effortlessly between booking a flight, securing a hotel suite, or reserving local limousine transits.",
        icon: "/images/Projects icons/UX Strategy  .svg",
        activeColor: "#2060df",
      },
      {
        number: "03",
        title: "API Infrastructure & Integration",
        description:
          "We built high-speed integration bridges connecting international distribution systems (GDS), airline aggregators, and private car rental webhooks to ensure synchronous pricing updates.",
        icon: "/images/Projects icons/API Infrastructure & Integration.svg",
        activeColor: "#df7afe",
      },
      {
        number: "04",
        title: "Performance & Stress Testing",
        description:
          "We pushed the transactional checkout architecture through simulated traffic surges to guarantee stability, validating payment gateway APIs and real-time ticket generation modules.",
        icon: "/images/Projects icons/Performance & Stress Testing  .svg",
        activeColor: "#000000",
      },
      {
        number: "05",
        title: "Launch & Iterative Optimization",
        description:
          "The platform was brought live to the public market with complete end-to-end data pipelines tracking user metrics to fuel iterative optimizations in search-to-book ratios.",
        icon: "/images/rocket.svg",
        activeColor: "#ffe700",
      },
    ],
    background: "var(--color-project-card-bg-4)",
  },
  {
    id: 5,
    slug: "astravibe",
    name: "AstraVibe",
    detailTitle: "AstraVibe Marketing Website",
    breadcrumbLabel: "AstraVibe",
    year: "2026",
    categories: ["Web & Mobile Apps", "End-to-End Integration"],
    detailCategory: "Strategic Marketing Agency Website",
    detailChipBackground: "var(--projects-detail-chip-astravibe-background)",
    description:
      "AstraVibe's website was designed as a digital flagship that showcases the agency's expertise in strategic marketing, cinematic production, and brand development while establishing authority and driving new business opportunities.",
    image: "/images/projects/astravibe.png",
    imageAlt: "AstraVibe web and mobile apps integration preview",
    imagePosition: "50% 42%",
    detailImage: "/images/projects/astravibe.png",
    detailGallery: [
      "/images/Projects-Services/astravibe.png",
      "/images/Projects-Services/astravibe2.png",
      "/images/Projects-Services/astravibe4.png",
      "/images/projects/astravibe.png",
    ],
    processSteps: [
      {
        number: "01",
        title: "Brand Strategy & Website Architecture",
        description:
          "We analyzed AstraVibe's positioning, services, audience, and business goals to develop a website structure that communicates its value clearly while differentiating it from traditional marketing agencies.",
        icon: "/images/Projects icons/Discovery & Audit.svg",
        activeColor: "var(--projects-detail-work-chip-background)",
      },
      {
        number: "02",
        title: "Content Strategy & Messaging Development",
        description:
          "Every page was carefully crafted to tell AstraVibe's story, explain its multidisciplinary capabilities, and guide visitors through a narrative that builds trust, credibility, and interest.",
        icon: "/images/Projects icons/UX Strategy  .svg",
        activeColor: "#2060df",
      },
      {
        number: "03",
        title: "Premium UI/UX Design System",
        description:
          "We designed a cinematic, editorial-inspired user experience that combines modern layouts, immersive visuals, motion interactions, and premium typography to reflect the AstraVibe brand.",
        icon: "/images/Projects icons/development.svg",
        activeColor: "#df7afe",
      },
      {
        number: "04",
        title: "Website Development & Performance Engineering",
        description:
          "The platform was developed with scalability, responsiveness, SEO readiness, and conversion optimization at its core, ensuring a seamless experience across desktop, tablet, and mobile devices.",
        icon: "/images/Projects icons/Performance & Stress Testing  .svg",
        activeColor: "#000000",
      },
      {
        number: "05",
        title: "Launch, Optimization & Growth Readiness",
        description:
          "Following deployment, the website was optimized for search visibility, analytics tracking, and future expansion, creating a scalable foundation capable of supporting AstraVibe's long-term growth across multiple markets.",
        icon: "/images/rocket.svg",
        activeColor: "#ffe700",
      },
    ],
    background: "var(--color-project-card-bg-5)",
  },
  {
    id: 6,
    slug: "zamalkawy",
    name: "Zamalkawy",
    detailTitle: "Zamalkawy",
    breadcrumbLabel: "Zamalkawy",
    year: "2026",
    categories: ["Mobile", "Website", "Match Center", "Game Hub"],
    detailCategory: "Fan Engagement & Mobile E-Commerce",
    detailChipBackground: "var(--projects-detail-chip-zamalkawy-background)",
    description:
      "Zamalkawy was engineered as the ultimate digital hub for millions of El Zamalek Sporting Club supporters, seamlessly bridging sports culture with dynamic feature hubs, interactive games, and custom digital retail modules.",
    image: "/images/projects/zamalkawy.png",
    imageAlt: "Zamalkawy mobile and website platform preview",
    imagePosition: "58% 46%",
    detailImage: "/images/projects/zamalkawy.png",
    detailGallery: [
      "/images/Projects-Services/zamalek.png",
      "/images/Projects-Services/Product Strategy & Consultancy3.png",
      "/images/Projects-Services/zamalkawy (1).png",
      "/images/projects/zamalkawy.png",
      "/images/Projects-Services/zamalek2.png",
      "/images/Projects-Services/UIUX & Product Design3.png",
    ],
    processSteps: [
      {
        number: "01",
        title: "Discovery & Fan Base Audit",
        description:
          "We thoroughly analyzed the engagement patterns of the Zamalek fanbase to engineer specialized modules tailored for high-intensity user engagement, such as the digital match center and retail stores.",
        icon: "/images/Projects icons/Discovery & Audit.svg",
        activeColor: "var(--projects-detail-work-chip-background)",
      },
      {
        number: "02",
        title: "Game Hub & E-Commerce Wireframing",
        description:
          "Our design experts restructured the mobile experience, conducting targeted UI/UX review meetings to perfect interactive layouts for the high-engagement Game Hub and the Zamalkawy Mart digital storefront layouts.",
        icon: "/images/Projects icons/UX Strategy  .svg",
        activeColor: "#2060df",
      },
      {
        number: "03",
        title: "Microservices & Monetization Engineering",
        description:
          "We built a resilient, highly scalable backend leveraging modern cloud infrastructure and integrated RevenueCat frameworks to efficiently process subscriptions and manage complex transaction records.",
        icon: "/images/Projects icons/development.svg",
        activeColor: "#df7afe",
      },
      {
        number: "04",
        title: "Scale & Stress Testing",
        description:
          "The app was subjected to extreme concurrent user volume simulation, optimizing real-time server responses to guarantee seamless performance during peak live match periods.",
        icon: "/images/Projects icons/Performance & Stress Testing  .svg",
        activeColor: "#000000",
      },
      {
        number: "05",
        title: "App Store Launch & Revenue Success",
        description:
          "We successfully launched the distribution builds across the Google Play Store and Apple App Store, rapidly hitting major commercial milestones and driving historic fan base retention numbers.",
        icon: "/images/Projects icons/rocket.svg",
        activeColor: "#ffe700",
      },
    ],
    background: "var(--color-project-card-bg-6)",
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((project) => project.slug === slug);
}
