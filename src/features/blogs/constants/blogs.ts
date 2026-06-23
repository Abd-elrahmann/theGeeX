export interface BlogAuthor {
  name: string;
  avatar: string;
}

export interface BlogItem {
  id: number;
  type: string;
  title: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  author: BlogAuthor;
}

export const blogsSectionTitle = "Blogs";
export const blogsCursorLabel = "Read Article";

export const blogItems: BlogItem[] = [
  {
    id: 1,
    type: "Product",
    title: "How Product Teams Reduce Waste Before Writing a Single Line of Code",
    date: "May 12, 2026",
    imageSrc: "/images/ServicesCard1.jpg",
    imageAlt: "Product strategy workshop visuals",
    author: {
      name: "Cherif Badawi",
      avatar: "/images/ourTeam/cherif1.png",
    },
  },
  {
    id: 2,
    type: "Design",
    title: "Why Interface Clarity Usually Matters More Than Feature Count",
    date: "May 26, 2026",
    imageSrc: "/images/ServicesCard2.jpg",
    imageAlt: "Design review and user interface mockups",
    author: {
      name: "Sandra Atef",
      avatar: "/images/ourTeam/sandra3.png",
    },
  },
  {
    id: 3,
    type: "Engineering",
    title: "Backend Decisions That Keep Fast-Growing Products Stable Later",
    date: "June 03, 2026",
    imageSrc: "/images/ServicesCard4.jpg",
    imageAlt: "Cloud engineering and system architecture imagery",
    author: {
      name: "Anas Ali",
      avatar: "/images/ourTeam/anas6.png",
    },
  },
  {
    id: 4,
    type: "Mobile",
    title: "What Makes a Mobile Experience Feel Premium Instead of Merely Functional",
    date: "June 18, 2026",
    imageSrc: "/images/ServicesCard5.jpg",
    imageAlt: "Mobile product showcase on large display",
    author: {
      name: "Ahmed Tawfik",
      avatar: "/images/ourTeam/ahmed9.png",
    },
  },
];