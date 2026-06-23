export type OurTeamCardVariant = "standard" | "compact";

export interface OurTeamImageStyleOverride {
  width?: number;
  height?: number;
  top?: string;
  left?: string;
  transform?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  backgroundRepeat?: string;
  opacity?: string;
  scale?: string;
}

export interface OurTeamMemberCard {
  id: number;
  name: string;
  role: string;
  imageSrc: string;
  variant: OurTeamCardVariant;
  targetX: number;
  targetY: number;
  collapsedOffsetX: number;
  collapsedOffsetY: number;
  gradientVar: string;
  imageStyle?: OurTeamImageStyleOverride;
  mobileImageStyle?: OurTeamImageStyleOverride;
}

export const ourTeamSectionTitle = "Our Team";

export const ourTeamGalleryDimensions = {
  width: 1059,
  height: 736,
} as const;

export const ourTeamCardSizes = {
  standard: {
    width: 199,
    height: 300,
  },
  compact: {
    width: 199,
    height: 214,
  },
} as const;

export const ourTeamImageBaseStyle: Required<OurTeamImageStyleOverride> = {
  width: 243,
  height: 450,
  left: "50%",
  top: "10%",
  transform: "translate(-50%, -20%)",
  backgroundPosition: "center 80px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  opacity: "var(--team-card-image-opacity)",
  scale: "1.01",
};

export const ourTeamPrimaryCardId = 2;

export const ourTeamCards: OurTeamMemberCard[] = [
  {
    id: 1,
    name: "Cherif Badawi",
    role: "Co founder -Technical lead",
    imageSrc: "/images/ourTeam/cherif1.png",
    variant: "standard",
    targetX: 0,
    targetY: 0,
    collapsedOffsetX: 0,
    collapsedOffsetY: 0,
    gradientVar: "--team-card-gradient-01",
  },
  {
    id: 2,
    name: "Muhanned Ehab",
    role: "Business Manager",
    imageSrc: "/images/ourTeam/muhannad2.png",
    variant: "standard",
    targetX: 0,
    targetY: 352,
    collapsedOffsetX: -10,
    collapsedOffsetY: 16,
    gradientVar: "--team-card-gradient-02",
    imageStyle: {
      top: "65%",
      transform: "translate(-50%, -50%)",
      backgroundPosition: "center center",
    },
    mobileImageStyle: {
      top: "75%",
    },
  },
  {
    id: 3,
    name: "Sandra Atef",
    role: "UI/UX Designer",
    imageSrc: "/images/ourTeam/sandra3.png",
    variant: "compact",
    targetX: 215,
    targetY: 0,
    collapsedOffsetX: 10,
    collapsedOffsetY: -20,
    gradientVar: "--team-card-gradient-03",
    imageStyle: {
      top: "67%",
      transform: "translate(-50%, -50%)",
      backgroundPosition: "center center",
    },
  },
  {
    id: 4,
    name: "Gasser Amr",
    role: "UI/UX Designer",
    imageSrc: "/images/ourTeam/gasser4.png",
    variant: "compact",
    targetX: 215,
    targetY: 230,
    collapsedOffsetX: -16,
    collapsedOffsetY: 34,
    gradientVar: "--team-card-gradient-04",
  },
  {
    id: 5,
    name: "Nada Ehab",
    role: "Graphic Designer",
    imageSrc: "/images/ourTeam/nada5.png",
    variant: "compact",
    targetX: 215,
    targetY: 460,
    collapsedOffsetX: 20,
    collapsedOffsetY: 52,
    gradientVar: "--team-card-gradient-05",
  },
  {
    id: 6,
    name: "Anas Ali",
    role: "Back-end Developer",
    imageSrc: "/images/ourTeam/anas6.png",
    variant: "standard",
    targetX: 430,
    targetY: 8,
    collapsedOffsetX: -24,
    collapsedOffsetY: -12,
    gradientVar: "--team-card-gradient-06",
    imageStyle: {
      top: "40%",
      transform: "translate(-60%, -50%)",
      backgroundPosition: "center center",
      scale: "0.9",
    },
  },
  {
    id: 7,
    name: "Sandy Maged",
    role: "Project Manager",
    imageSrc: "/images/ourTeam/sandy7.png",
    variant: "standard",
    targetX: 430,
    targetY: 360,
    collapsedOffsetX: 26,
    collapsedOffsetY: 28,
    gradientVar: "--team-card-gradient-07",
    imageStyle: {
      top: "55%",
      transform: "translate(-60%, -60%)",
      backgroundPosition: "center center",
      scale: "0.8",
    },
    mobileImageStyle: {
      top: "70%",
    },
  },
  {
    id: 8,
    name: "AbdelRahman Mo.",
    role: "Front-end Developer",
    imageSrc: "/images/ourTeam/abdelrhaman8.png",
    variant: "compact",
    targetX: 645,
    targetY: 230,
    collapsedOffsetX: -32,
    collapsedOffsetY: -24,
    gradientVar: "--team-card-gradient-09",
    imageStyle: {
      top: "70%",
      transform: "translate(-52%, -50%)",
      backgroundPosition: "center center",
      scale: "0.9",
    },
  },
  {
    id: 9,
    name: "Ahmed Tawfik",
    role: "Mobile Developer",
    imageSrc: "/images/ourTeam/ahmed9.png",
    variant: "compact",
    targetX: 645,
    targetY: 460,
    collapsedOffsetX: 34,
    collapsedOffsetY: 40,
    gradientVar: "--team-card-gradient-10",
    imageStyle: {
      top: "24%",
      left: "50%",
      transform: "translate(-35%, -11%)",
      scale: "1.5",
    },
  },
  {
    id: 12,
    name: "Tamer Lotfy",
    role: "Graphic Designer",
    imageSrc: "/images/ourTeam/tamer7.png",
    variant: "compact",
    targetX: 645,
    targetY: 0,
    collapsedOffsetX: -18,
    collapsedOffsetY: 60,
    gradientVar: "--team-card-gradient-08",
    imageStyle: {
      top: "85%",
      transform: "translate(-60%, -50%)",
      backgroundPosition: "center center",
      scale: "0.90",
    },
  },
  {
    id: 10,
    name: "Belal Ahmed",
    role: "Back-end Developer",
    imageSrc: "/images/ourTeam/belal10.png",
    variant: "standard",
    targetX: 860,
    targetY: 0,
    collapsedOffsetX: -36,
    collapsedOffsetY: -8,
    gradientVar: "--team-card-gradient-11",
    imageStyle: {
      top: "55%",
      transform: "translate(-50%, -50%)",
      backgroundPosition: "center center",
    },
    mobileImageStyle: {
      top: "64%",
    },
  },
  {
    id: 11,
    name: "AbdelRahman Ragab",
    role: "Mobile Developer",
    imageSrc: "/images/ourTeam/abdelrhaman11.png",
    variant: "standard",
    targetX: 860,
    targetY: 352,
    collapsedOffsetX: 38,
    collapsedOffsetY: 48,
    gradientVar: "--team-card-gradient-12",
    imageStyle: {
      top: "65%",
      transform: "translate(-50%, -50%)",
      backgroundPosition: "center center",
    },
    mobileImageStyle: {
      top: "80%",
    },
  },
];