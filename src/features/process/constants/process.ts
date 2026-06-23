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
    title: "Discovery & Strategy",
    description:
      "Deep understanding of your business goals and challenges, forming the foundation for an impactful strategy.",
  },
  {
    id: 2,
    title: "Discovery & Strategy",
    description:
      "Deep understanding of your business goals and challenges, forming the foundation for an impactful strategy.",
  },
  {
    id: 3,
    title: "Discovery & Strategy",
    description:
      "Deep understanding of your business goals and challenges, forming the foundation for an impactful strategy.",
  },
  {
    id: 4,
    title: "Discovery & Strategy",
    description:
      "Deep understanding of your business goals and challenges, forming the foundation for an impactful strategy.",
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