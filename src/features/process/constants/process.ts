export interface ProcessCardItem {
  id: number;
  title: string;
  transitionTitle?: string;
  description: string;
  variant?: "default" | "final";
}

export const processSectionTitleLines = [
  "A proven process.",
  "Measurable",
  "outcomes.",
] as const;

export const processCardStickyTops = [150, 270, 390, 510, 510] as const;

export const processCards: ProcessCardItem[] = [
  {
    id: 1,
    title: "Discovery",
    description:
      "We learn about your business, goals, audience, and challenges to uncover opportunities and define what success looks like.",
  },
  {
    id: 2,
    title: "Define",
    description:
      "We transform insights into a clear roadmap, prioritizing the actions that will create the biggest impact.",
  },
  {
    id: 3,
    title: "Design & Build",
    description:
      "Our team designs and develops the digital experiences, systems, and solutions needed to bring your vision to life.",
  },
  {
    id: 4,
    title: "Launch & Optimize",
    description:
      "Everything is tested, refined, and launched with performance, reliability, and user experience in mind.",
  },
  {
    id: 5,
    title: "Contact Us",
    transitionTitle: "Let's Build What's Next",
    description:
      "Every launch is tied back to outcomes, so what gets released can be evaluated, improved, and scaled with confidence.",
    variant: "final",
  },
];