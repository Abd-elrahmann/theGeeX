export interface StorytellingItem {
  id: number;
  image: string;
  imageAlt: string;
  caption: string;
}

export const storytellingLines = [
  "Studio Vibe, Enterprise Standards",
  'Integrated, Not Just "Installed"',
  '"End-to-End" Success',
] as const;

export const storytellingItems: StorytellingItem[] = [
  {
    id: 1,
    image: "/images/storyTelling1.jpg",
    imageAlt: "Developer working at a desk with monitor and headphones",
    caption:
      "A tight, fast-moving studio with the precision and discipline of a production-grade tech team.",
  },
  {
    id: 2,
    image: "/images/storyTelling3.jpg",
    imageAlt: "Two team members collaborating at a computer workstation",
    caption:
      "We act as your technical co-founder—handling everything from build to launch and scale.",
  },
  {
    id: 3,
    image: "/images/storyTelling2.jpg",
    imageAlt: "Team collaborating around a shared workspace table",
    caption:
      "No disconnected tools—everything we build works as one unified, integrated ecosystem.",
  },
];

export const storytellingLineActiveScale = {
  active: 1,
  inactive: 0.96,
} as const;

export const storytellingLineActiveTransition = {
  type: "spring" as const,
  duration: 0.6,
  delay: 0,
};

export const storytellingBackgroundTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
} as const;
