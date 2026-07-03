export interface BlogAuthor {
  name: string;
  avatar: string;
}

export interface BlogItem {
  id: number;
  types: string[];
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
    types: ["Product", "Strategy"],
    title: "How Product Teams Reduce Waste Before Writing a Single Line of Code",
    date: "May 12, 2026",
    imageSrc: "/images/blogs/Blog%201.png",
    imageAlt: "Product strategy workshop visuals",
    author: {
      name: "Cherif Badawi",
      avatar: "/images/ourTeam/cherif1.png",
    },
  },
  {
    id: 2,
    types: ["Design", "UX"],
    title: "Why Interface Clarity Usually Matters More Than Feature Count",
    date: "May 26, 2026",
    imageSrc: "/images/blogs/Blog2.png",
    imageAlt: "Design review and user interface mockups",
    author: {
      name: "Sandra Atef",
      avatar: "/images/ourTeam/sandra3.png",
    },
  },
  {
    id: 3,
    types: ["Engineering", "Backend"],
    title: "Backend Decisions That Keep Fast-Growing Products Stable Later",
    date: "June 03, 2026",
    imageSrc: "/images/blogs/Blog3.png",
    imageAlt: "Cloud engineering and system architecture imagery",
    author: {
      name: "Anas Ali",
      avatar: "/images/ourTeam/anas6.png",
    },
  },
  {
    id: 4,
    types: ["Mobile", "Experience"],
    title: "What Makes a Mobile Experience Feel Premium Instead of Merely Functional",
    date: "June 18, 2026",
    imageSrc: "/images/blogs/Blog%204.png",
    imageAlt: "Mobile product showcase on large display",
    author: {
      name: "Ahmed Tawfik",
      avatar: "/images/ourTeam/ahmed9.png",
    },
  },
  {
    id: 5,
    types: ["Automation", "Growth"],
    title: "How Automation Turns Repetitive Workflows Into Scalable Systems",
    date: "June 25, 2026",
    imageSrc: "/images/blogs/Blog5.png",
    imageAlt: "Automation workflow and growth systems visuals",
    author: {
      name: "Cherif Badawi",
      avatar: "/images/ourTeam/cherif1.png",
    },
  },
  {
    id: 6,
    types: ["Brand", "Product"],
    title: "Why Strong Digital Products Need a Brand System Behind Them",
    date: "July 02, 2026",
    imageSrc: "/images/blogs/Blog6.png",
    imageAlt: "Brand system and digital product presentation visuals",
    author: {
      name: "Sandra Atef",
      avatar: "/images/ourTeam/sandra3.png",
    },
  },
];