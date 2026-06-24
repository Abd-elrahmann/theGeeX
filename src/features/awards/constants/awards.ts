export interface AwardItem {
  id: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  place: string;
}

export const awardsSectionTitle = "Our Awards";

export const awardItems: AwardItem[] = [
  {
    id: 1,
    imageSrc: "/images/GiteXLogo.png",
    imageAlt: "GITEX Global logo",
    title: "GITEX 2018 - Best Mobile App",
    place: "Tareeqi",
  },
  {
    id: 2,
    imageSrc: "/images/ElearningAfrica.png",
    imageAlt: "E-Learning Africa logo",
    title: "E-Learning Africa - Best Online Quizzes App",
    place: "iQuizzy",
  },
];
