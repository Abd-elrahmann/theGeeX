export type ProjectCategory = string;

export interface ProjectItem {
  id: number;
  name: string;
  categories: ProjectCategory[];
  image: string;
  imageAlt: string;
  imageClassName?: string;
  background: string;
}

export const projectsSectionTitle = "Projects";
export const projectsCursorLabel = "View Project";
export const projectsFirstCardEnterProgress = 0.06;

export const projectsCardRevealScaleTo = 0.9;
export const projectsCardScaleUpRecoveryExponent = 1.75;
export const projectsCardRevealOffsetY = 64;
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
    name: "TravX",
    categories: ["Mobile", "Website", "Rebranding"],
    image: "/images/projects/travx.jpg",
    imageAlt: "TravX mobile and website experience preview",
    background: "var(--color-project-card-bg-1)",
  },
  {
    id: 2,
    name: "EFG Hermes",
    categories: ["Web Application"],
    image: "/images/projects/efg_hermes.png",
    imageAlt: "EFG Hermes web application preview",
    background: "var(--color-project-card-bg-2)",
  },
  {
    id: 3,
    name: "Performr",
    categories: ["Web & Mobile Apps", "End-to-End Product", "Brand to Platform"],
    image: "/images/projects/Performr.png",
    imageAlt: "Performr cross-platform product preview",
    background: "var(--color-project-card-bg-3)",
  },
  {
    id: 4,
    name: "moretckts",
    categories: ["Web & Mobile Apps", "End-to-End Integration"],
    image: "/images/projects/moretckts.png",
    imageAlt: "moretckts product integration preview",
    background: "var(--color-project-card-bg-4)",
  },
  {
    id: 5,
    name: "AstraVibe",
    categories: ["Web & Mobile Apps", "End-to-End Integration"],
    image: "/images/projects/astravibe.png",
    imageAlt: "AstraVibe web and mobile apps integration preview",
    imageClassName: "md:scale-[1.12]",
    background: "var(--color-project-card-bg-5)",
  },
  {
    id: 6,
    name: "Zamalkawy",
    categories: ["Mobile", "Website", "Match Center", "Game Hub"],
    image: "/images/projects/zamalkawy.png",
    imageAlt: "Zamalkawy mobile and website platform preview",
    background: "var(--color-project-card-bg-6)",
  },
];
