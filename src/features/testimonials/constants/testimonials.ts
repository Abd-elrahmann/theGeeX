export interface TestimonialItem {
  id: number;
  title: string;
  comment: string;
  personName: string;
  personRole: string;
  personImageSrc: string;
  rating: number;
}

export const testimonialsSectionTitle = "Testimonials";

export const testimonialItems: TestimonialItem[] = [
  {
    id: 1,
    title: "Sharp product thinking.",
    comment:
      "They understood the business problem quickly, translated it into a clear product direction, and kept every decision grounded in outcomes that actually mattered.",
    personName: "Muhanned Ehab",
    personRole: "Business Manager",
    personImageSrc: "/images/ourTeam/muhannad2.png",
    rating: 5,
  },
  {
    id: 2,
    title: "Reliable from strategy to launch.",
    comment:
      "What stood out was the consistency. The team moved from discovery into execution without losing the original vision, and the delivery quality stayed high throughout.",
    personName: "Sandra Atef",
    personRole: "UI/UX Designer",
    personImageSrc: "/images/ourTeam/sandra3.png",
    rating: 5,
  },
  {
    id: 3,
    title: "Fast, focused, and collaborative.",
    comment:
      "Communication was direct, timelines were respected, and feedback loops were smooth. It felt like working with a product partner, not just an external vendor.",
    personName: "Sandy Maged",
    personRole: "Project Manager",
    personImageSrc: "/images/ourTeam/sandy7.png",
    rating: 5,
  },
  {
    id: 4,
    title: "Execution with real attention to detail.",
    comment:
      "Design quality, interaction polish, and technical discipline were all visible in the final product. The experience felt considered at every layer.",
    personName: "Ahmed Tawfik",
    personRole: "Mobile Developer",
    personImageSrc: "/images/ourTeam/ahmed9.png",
    rating: 5,
  },
];