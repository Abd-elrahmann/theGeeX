export interface ServiceDeliverable {
  title: string;
  description: string;
  image: string;
}

export interface ServiceExtraSection {
  id: string;
  label?: string;
  title: string;
  description?: string;
  items?: Array<{
    title: string;
    description: string;
  }>;
  images?: string[];
}

export interface ServiceOutcome {
  title: string;
  description: string;
}

export interface ServiceOutcomesSection {
  label: string;
  title: string;
  outcomes: ServiceOutcome[];
}

export interface ServiceProjectsSection {
  label: string;
  title: string;
  projectIds: number[];
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceFaqsSection {
  label: string;
  title: string;
  items: ServiceFaqItem[];
}

export interface ServiceDetail {
  smallTitle: string;
  mainTitle: string;
  mobileMainTitle?: string;
  categories: string[];
  overviewTitle: string;
  overviewDescription: string;
  overviewImages: string[];
  deliverTitle: string;
  deliverMainTitle: string;
  deliverables: ServiceDeliverable[];
  outcomes?: ServiceOutcomesSection;
  projects?: ServiceProjectsSection;
  faqs?: ServiceFaqsSection;
  extraSections?: ServiceExtraSection[];
}

export type ServicePageSlug =
  | "product-strategy-consultancy"
  | "ui-ux-product-design"
  | "backend-cloud-engineering"
  | "frontend-mobile-app-development"
  | "api-design-ecosystem-integration";

interface ServicePageInput extends Omit<ServiceDetail, "overviewImages" | "deliverables"> {
  assetFolder: string;
  overviewImageFiles: string[];
  deliverables: Array<Omit<ServiceDeliverable, "image"> & { imageFile?: string; image?: string }>;
}

function serviceAssetPath(assetFolder: string, fileName: string): string {
  return `/images/${assetFolder}/${fileName}`;
}

function createServicePageConfig({
  assetFolder,
  overviewImageFiles,
  deliverables,
  ...content
}: ServicePageInput): ServiceDetail {
  return {
    ...content,
    overviewImages: overviewImageFiles.map((fileName) => serviceAssetPath(assetFolder, fileName)),
    deliverables: deliverables.map(({ imageFile, image, ...deliverable }) => ({
      ...deliverable,
      image: image ?? serviceAssetPath(assetFolder, imageFile ?? overviewImageFiles[0]),
    })),
  };
}

const sharedServiceProjects: ServiceProjectsSection = {
  label: "Projects",
  title: "Real Solutions. Proven Impact.",
  projectIds: [4, 6, 3],
};

const sharedServiceFaqs: ServiceFaqsSection = {
  label: "FAQs",
  title: "All the important details you need to know.",
  items: [
    {
      question: "What services does TheGeeX offer?",
      answer:
        "TheGeeX provides end-to-end digital transformation services, including Brand & Digital Identity, Custom Websites & Platforms, E-Commerce Solutions, AI-Powered Automation, Growth Marketing & Analytics, and integrated business systems.",
    },
    {
      question: "Who do you typically work with?",
      answer:
        "We work with startups, growing businesses, and established enterprises looking to build, modernize, automate, or scale their digital presence and operations.",
    },
    {
      question: "How do I know which package is right for my business?",
      answer:
        "Our Launch package is ideal for startups establishing their digital foundation, Grow is designed for businesses ready to scale, and Scale is built for organizations requiring custom software, advanced automation, and enterprise-grade solutions.",
    },
    {
      question: "Do you only build websites, or can you develop mobile apps too?",
      answer:
        "We design and develop both websites and mobile applications, ranging from simple MVPs to advanced cross-platform solutions with custom integrations and scalable infrastructure.",
    },
    {
      question: "Can TheGeeX help with branding and visual identity?",
      answer:
        "Yes. We create complete brand identity systems, including positioning, logo design, messaging, visual guidelines, design systems, and brand assets to ensure consistency across every touchpoint.",
    },
    {
      question: "What does your AI-Powered Automation service include?",
      answer:
        "We automate repetitive business processes by connecting your tools, systems, and data through workflows, integrations, AI copilots, dashboards, and communication platforms such as WhatsApp, CRM systems, and email tools.",
    },
  ],
};

export const servicePageConfigs = {
  "product-strategy-consultancy": createServicePageConfig({
    assetFolder: "Product Strategy & Consultancy",
    smallTitle: "Product Strategy & Consultancy",
    mainTitle: "Great Products Aren't Built by\nChance. They're Built on Strategy.",
    mobileMainTitle: "Great Products Aren't\nBuilt by Chance.\nThey're Built on Strategy.",
    categories: ["Brand Identity", "Content Structure", "Performance Optimization"],
    overviewTitle: "Blueprinting products built to scale",
    overviewDescription:
      "We help businesses turn ideas into scalable digital products through strategic planning, product discovery, technology selection, and roadmap development. By aligning business goals with technical execution, we reduce risk, accelerate development, and create a clear path from concept to launch.",
    overviewImageFiles: [
      "Product Roadmapping & Scoping.png",
      "Market & Technical Feasibility.png",
      "Tech Stack Selection.png",
    ],
    deliverTitle: "What We Deliver",
    deliverMainTitle: "Everything You Need to Connect and Scale",
    deliverables: [
      {
        title: "API Development",
        description:
          "Design and build secure, high-performance APIs that enable reliable communication between systems.",
        imageFile: "Product Roadmapping & Scoping.png",
      },
      {
        title: "System Integration",
        description:
          "Connect applications, platforms, and databases to streamline operations and eliminate data silos.",
        imageFile: "Market & Technical Feasibility.png",
      },
      {
        title: "Integration Architecture",
        description:
          "Design scalable integration frameworks that support growth, flexibility, and long-term maintainability.",
        imageFile: "Tech Stack Selection.png",
      },
    ],
    outcomes: {
      label: "The Outcomes",
      title: "Outcomes You Can Expect",
      outcomes: [
        {
          title: "Clear Product Direction",
          description:
            "Gain a well-defined vision, roadmap, and execution plan that aligns stakeholders and removes uncertainty from the development process.",
        },
        {
          title: "Faster Time to Market",
          description:
            "Prioritize the right features from day one, reduce wasted effort, and accelerate your path from concept to launch.",
        },
        {
          title: "Smarter Technology Decisions",
          description:
            "Select the right architecture, tools, and technologies based on your business goals, scalability requirements, and long-term growth plans.",
        },
        {
          title: "Reduced Risk & Development Costs",
          description:
            "Identify technical challenges, market gaps, and operational risks early-before they become expensive problems later in the project lifecycle.",
        },
        {
          title: "Stronger Investor & Stakeholder Confidence",
          description:
            "Present a structured product strategy backed by research, validation, and clear milestones that inspire confidence among investors, partners, and decision-makers.",
        },
      ],
    },
    projects: sharedServiceProjects,
    faqs: sharedServiceFaqs,
  }),
  "ui-ux-product-design": createServicePageConfig({
    assetFolder: "UI-UX & Product Design",
    smallTitle: "UI/UX & Product Design",
    mainTitle: "Digital Experiences\nEngineered with Intent.",
    categories: ["User Research", "Interface Design", "User Experience Design", "Interactive Prototyping"],
    overviewTitle: "Designing Experiences People Love to Use",
    overviewDescription:
      "At TheGeeX, design is where technology meets art. We create user-centered digital experiences that balance functionality, usability, and visual excellence. Through research, strategy, and thoughtful design systems, we help businesses deliver products that users enjoy and trust.",
    overviewImageFiles: [
      "User Research & Wireframing (1).png",
      "High-Fidelity UI Design.png",
      "Interactive Prototyping.png",
    ],
    deliverTitle: "What We Deliver",
    deliverMainTitle: "Everything You Need to Connect and Scale",
    deliverables: [
      {
        title: "User Research & Wireframing",
        description:
          "Mapping out frictionless user psychology and structural blueprints.",
        imageFile: "User Research & Wireframing (1).png",
      },
      {
        title: "High-Fidelity UI Design",
        description:
          "Creating modern, dark-mode-optimized, high-end visual designs that stand out in the global market.",
        imageFile: "High-Fidelity UI Design.png",
      },
      {
        title: "Interactive Prototyping",
        description:
          "Delivering live, clickable micro-interactions to visualize the end-user experience before coding.",
        imageFile: "Interactive Prototyping.png",
      },
    ],
    outcomes: {
      label: "The Outcomes",
      title: "Outcomes You Can Expect",
      outcomes: [
        {
          title: "Better User Experience",
          description: "Create intuitive journeys that reduce friction and improve user satisfaction.",
        },
        {
          title: "Higher User Engagement",
          description: "Design experiences that encourage deeper interaction and stronger product adoption.",
        },
        {
          title: "Improved Conversion Rates",
          description: "Guide users toward key actions through strategic layouts and clear user flows.",
        },
        {
          title: "Stronger Brand Perception",
          description: "Deliver consistent and polished experiences that build trust and credibility.",
        },
        {
          title: "Reduced Development Rework",
          description: "Validate ideas early through prototypes and testing before development begins.",
        },
      ],
    },
    projects: sharedServiceProjects,
    faqs: sharedServiceFaqs,
  }),
  "backend-cloud-engineering": createServicePageConfig({
    assetFolder: "Backend & Cloud Engineering",
    smallTitle: "Backend & Cloud Engineering",
    mainTitle: "Heavy-Duty Infrastructure\nBuilt for Infinite Scale.",
    categories: ["Backend Architecture", "Cloud Infrastructure", "Database Engineering"],
    overviewTitle: "Building the Foundation Behind Every Great Product",
    overviewDescription:
      "A powerful user experience starts with an even stronger foundation. At TheGeeX, we design and engineer robust backend systems, cloud environments, and data architectures that ensure your applications remain fast, secure, and reliable under any level of demand. Our solutions are built to scale with your business and support long-term growth.",
    overviewImageFiles: [
      "Cloud Infrastructure Management.png",
      "Database Design & Optimization.png",
      "Cloud Infrastructure Management.png",
    ],
    deliverTitle: "What We Deliver",
    deliverMainTitle: "Everything You Need to Connect and Scale",
    deliverables: [
      {
        title: "Scalable Backend Architecture",
        description:
          "Custom, clean-coded server applications leveraging high-performance frameworks (Laravel/PHP, Node.js).",
        imageFile: "Cloud Infrastructure Management.png",
      },
      {
        title: "Cloud Infrastructure Management",
        description:
          "Enterprise-grade cloud deployment, monitoring, and auto-scaling automated via AWS.",
        imageFile: "Database Design & Optimization.png",
      },
      {
        title: "Database Design & Optimization",
        description:
          "Structuring high-speed, secure data pipelines built for complex querying and zero downtime.",
        imageFile: "Database Design & Optimization.png",
      },
    ],
    outcomes: {
      label: "The Outcomes",
      title: "Outcomes You Can Expect",
      outcomes: [
        {
          title: "Scalable Infrastructure",
          description: "Build systems capable of handling growing traffic, users, and operational demands.",
        },
        {
          title: "Improved Reliability",
          description: "Ensure applications remain stable, available, and resilient under heavy workloads.",
        },
        {
          title: "Enhanced Security",
          description: "Protect critical business data through secure architectures and industry best practices.",
        },
        {
          title: "Faster System Performance",
          description: "Optimize infrastructure and databases to deliver faster response times and better user experiences.",
        },
        {
          title: "Future-Ready Technology",
          description: "Establish a technical foundation designed to support long-term growth and innovation.",
        },
      ],
    },
    projects: sharedServiceProjects,
    faqs: sharedServiceFaqs,
  }),
  "frontend-mobile-app-development": createServicePageConfig({
    assetFolder: "Frontend & Mobile App Development",
    smallTitle: "Frontend & Mobile App Development",
    mainTitle: "Blazing-Fast Frontend.\nSeamless Mobile Execution.",
    categories: ["Web Applications", "Mobile Development", "Performance Optimization"],
    overviewTitle: "Building Experiences That Feel Effortless",
    overviewDescription:
      "We transform complex functionality into fast, responsive, and intuitive digital experiences. Using modern web frameworks and mobile technologies, we develop applications that deliver exceptional performance, seamless interactions, and consistent experiences across every device.",
    overviewImageFiles: [
      "High-Performance Web Apps.png",
      "Native & Cross-Platform Mobile Apps.png",
      "Performance Optimization.png",
    ],
    deliverTitle: "What We Deliver",
    deliverMainTitle: "Everything You Need to Connect and Scale",
    deliverables: [
      {
        title: "High-Performance Web Apps",
        description:
          "Clean, highly interactive frontends built with modern JavaScript frameworks (React, Next.js).",
        imageFile: "High-Performance Web Apps.png",
      },
      {
        title: "Native & Cross-Platform Mobile Apps",
        description:
          "Deploying premium mobile applications optimized for both iOS and Android stores.",
        imageFile: "Native & Cross-Platform Mobile Apps.png",
      },
      {
        title: "Performance Optimization",
        description:
          "Compressing load times, streamlining rendering, and optimizing for flawless SEO and Core Web Vitals.",
        imageFile: "Performance Optimization.png",
      },
    ],
    outcomes: {
      label: "The Outcomes",
      title: "Outcomes You Can Expect",
      outcomes: [
        {
          title: "Faster User Experiences",
          description: "Deliver responsive applications that keep users engaged and reduce friction.",
        },
        {
          title: "Higher User Engagement",
          description: "Create seamless interactions that encourage adoption, retention, and repeated use.",
        },
        {
          title: "Cross-Platform Consistency",
          description: "Provide a unified experience across web, mobile, and tablet devices.",
        },
        {
          title: "Improved Performance Metrics",
          description: "Optimize load times, responsiveness, and overall application efficiency.",
        },
        {
          title: "Scalable Digital Products",
          description: "Build applications designed to grow alongside your users and business objectives.",
        },
      ],
    },
    projects: sharedServiceProjects,
    faqs: sharedServiceFaqs,
  }),
  "api-design-ecosystem-integration": createServicePageConfig({
    assetFolder: "API Design & Ecosystem Integration",
    smallTitle: "API Design & Ecosystem Integration",
    mainTitle: "Connect Your Software to\nthe World. Seamlessly.",
    categories: ["API Development", "System Integration", "Connected Ecosystems"],
    overviewTitle: "Building Connected Digital Ecosystems",
    overviewDescription:
      "Modern software thrives on connectivity. At TheGeeX, we design secure, scalable APIs and seamless integrations that allow systems, platforms, and third-party services to communicate effortlessly. From internal operations to external partnerships, we help businesses create connected ecosystems that improve efficiency, automation, and data flow.",
    overviewImageFiles: [
      "Custom API Development.png",
      "Third-Party Engine Orchestration.png",
      "Enterprise Legacy Integrations.png",
    ],
    deliverTitle: "What We Deliver",
    deliverMainTitle: "Everything You Need to Connect and Scale",
    deliverables: [
      {
        title: "Custom API Development",
        description:
          "Building high-speed, highly secure internal and external API frameworks.",
        imageFile: "Custom API Development.png",
      },
      {
        title: "Enterprise Legacy Integrations",
        description:
          "Connecting modern apps seamlessly with heavy, legacy enterprise databases and software.",
        imageFile: "Enterprise Legacy Integrations.png",
      },
      {
        title: "Third-Party Engine Orchestration",
        description:
          "Seamlessly integrating payment gateways, CRM engines, and global data distribution networks.",
        imageFile: "Third-Party Engine Orchestration.png",
      },
    ],
    outcomes: {
      label: "The Outcomes",
      title: "Outcomes You Can Expect",
      outcomes: [
        {
          title: "Seamless Data Flow",
          description: "Enable information to move efficiently across systems, teams, and platforms.",
        },
        {
          title: "Improved Operational Efficiency",
          description: "Reduce manual processes and streamline workflows through connected technologies.",
        },
        {
          title: "Greater System Reliability",
          description: "Ensure integrations perform consistently, securely, and at scale.",
        },
        {
          title: "Enhanced Business Agility",
          description: "Quickly adapt to new tools, partners, and technologies as business needs evolve.",
        },
        {
          title: "Future-Ready Ecosystems",
          description: "Build a flexible digital foundation capable of supporting long-term growth and innovation.",
        },
      ],
    },
    projects: sharedServiceProjects,
    faqs: sharedServiceFaqs,
  }),
} satisfies Record<ServicePageSlug, ServiceDetail>;
