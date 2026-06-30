export interface AwardItem {
  id: number;
  imageSrc: string;
  imageAlt: string;
  awardName: string;
  awardType: string;
}

export const awardsSectionTitle = "Award-Winning Excellence.";

export const awardsSectionTitleLines = ["Award-Winning", "Excellence."] as const;

export const awardItems: AwardItem[] = [
  {
    id: 1,
    imageSrc: "/images/GiteXLogo.png",
    imageAlt: "GITEX Global logo",
    awardName: "GITEX 2018",
    awardType: "Best Mobile App",
  },
  {
    id: 2,
    imageSrc: "/images/ElearningAfrica.png",
    imageAlt: "E-Learning Africa logo",
    awardName: "E-Learning Africa",
    awardType: "Best Online Quizzes App",
  },
];
