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
    title: "MoreTckts",
    comment:
      '"They have a rare ability to listen to complex requirements and distill them into reality. TheGeeX took the time to understand our needs, helping us map out a robust, scalable ecosystem. Their technical depth and product intuition were vital to our success."',
    personName: "Amr Abdelmohsen",
    personRole: "Founder of MoreTckts",
    personImageSrc: "/images/testimonials/testimonials 1.webp",
    rating: 5,
  },
  {
    id: 2,
    title: "TravX",
    comment:
      '"TheGeeX completely transformed our brand identity and digital footprint. They built a cohesive, modern presence that truly reflects who we are as a company. Their strategic design approach made the entire rebranding process smooth and highly impactful."',
    personName: "John Raouf",
    personRole: "Operations Manager at TravX",
    personImageSrc: "/images/testimonials/testimonials 2.webp",
    rating: 5,
  },
  {
    id: 3,
    title: "AstraVibe",
    comment:
      '"Working with TheGeeX on our website was an exceptional, hassle-free experience. They captured our vision perfectly and translated it into a stunning, high-performing platform. The project was delivered exactly as expected, completely on time, and without compromises."',
    personName: "Tamer Zeitoun",
    personRole: "Founder & Creative Director of AstraVibe",
    personImageSrc: "/images/testimonials/testimonials 3.webp",
    rating: 5,
  },
];