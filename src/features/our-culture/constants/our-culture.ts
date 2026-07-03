export interface CultureCard {
  id: number;
  title: string;
  description?: string;
  mobileDescription?: string;
  image?: string;
  variant: "split" | "stacked";
}

export const ourCultureSectionTitle = "Our Culture";
export const cultureFirstStageTrigger = 0.18;
export const cultureSecondStageTrigger = 0.52;
export const cultureAnimationTransition = {
  duration: 0.6,
  ease: [0.44, 0, 0.56, 1] as const,
  delay: 0,
};

export const cultureCards: CultureCard[] = [
  {
    id: 1,
    title: "We Love Music",
    description:
      "Music fuels our creativity. It keeps ideas flowing, inspires fresh perspectives, and reminds us that great experiences-like great songs-are built on rhythm, emotion, and connection.",
    mobileDescription:
      "Music fuels our creativity, sparks fresh ideas, and keeps our momentum alive.",
    image: "/images/calture/calture1.jpg",
    variant: "split",
  },
  {
    id: 2,
    title: "We Read Kafka",
    description:
      "We value curiosity and deep thinking. Reading Kafka reflects our belief that challenging ideas expand how we see the world, solve problems, and understand people.",
    mobileDescription:
      "Curiosity drives us, Kafka reminds us to think deeper, question assumptions, and see the world differently.",
    image: "/images/calture/calture2.jpg",
    variant: "stacked",
  },
  {
    id: 3,
    title: "We Believe in Science",
    description:
      "Evidence beats assumptions. We trust research, experimentation, and data-driven thinking to guide our decisions and turn innovation into real, measurable impact.",
    mobileDescription:
      "We use research, experimentation, and data to drive decisions and create measurable impact.",
    image: "/images/calture/calture3.jpg",
    variant: "stacked",
  },
];