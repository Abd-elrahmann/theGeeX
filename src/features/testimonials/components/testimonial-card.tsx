import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

import { type TestimonialItem } from "@/features/testimonials/constants/testimonials";

interface TestimonialCardProps {
  item: TestimonialItem;
  isActive: boolean;
}

function TestimonialStar() {
  return (
    <svg
      viewBox="0 0 15 15"
      aria-hidden="true"
      className="block h-(--testimonials-star-height) w-(--testimonials-star-width)"
      fill="none"
    >
      <path
        d="M 6.484 0.691 C 6.784 -0.23 8.087 -0.23 8.386 0.691 L 9.456 3.983 C 9.59 4.394 9.973 4.672 10.406 4.673 L 13.868 4.673 C 14.837 4.673 15.239 5.913 14.456 6.483 L 11.656 8.517 C 11.305 8.771 11.158 9.223 11.292 9.635 L 12.362 12.927 C 12.662 13.848 11.607 14.615 10.823 14.045 L 8.023 12.011 C 7.672 11.756 7.197 11.756 6.847 12.011 L 4.047 14.045 C 3.263 14.615 2.209 13.848 2.508 12.927 L 3.578 9.635 C 3.711 9.223 3.565 8.771 3.215 8.517 L 0.415 6.484 C -0.369 5.914 0.033 4.674 1.002 4.674 L 4.463 4.674 C 4.896 4.674 5.279 4.395 5.414 3.984 L 6.485 0.691 Z"
        fill="rgb(255 213 0)"
      />
    </svg>
  );
}

export function TestimonialCard({ item, isActive }: TestimonialCardProps) {
  return (
    <motion.article
      animate={{
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.96,
      }}
      transition={{
        type: "spring",
        duration: 0.4,
        bounce: 0.2,
        delay: 0,
      }}
      className={cn(
        "box-border flex h-min w-(--testimonials-card-width) shrink-0 snap-start flex-col overflow-hidden rounded-(--testimonials-card-radius)",
        "bg-(--color-testimonials-card-bg) p-(--testimonials-card-padding)",
      )}
    >
      <div className="flex w-full flex-col gap-(--testimonials-card-content-gap)">
        <h3
          className={cn(
            "w-full whitespace-pre-wrap wrap-break-word font-cal-sans",
            "text-(length:--testimonials-card-title-size) leading-(--testimonials-card-title-line-height)",
            "font-(--testimonials-card-title-weight) tracking-(--testimonials-card-title-letter-spacing)",
            "text-(--color-testimonials-card-title)",
            "font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_on]",
          )}
        >
          {item.title}
        </h3>

        <p
          className={cn(
            "w-full whitespace-pre-wrap wrap-break-word font-poppins",
            "text-(length:--testimonials-card-comment-size) leading-(--testimonials-card-comment-line-height)",
            "font-(--testimonials-card-comment-weight) tracking-(--testimonials-card-comment-letter-spacing)",
            "text-(--color-testimonials-card-comment)",
            "font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_on]",
          )}
        >
          {item.comment}
        </p>
      </div>

      <div className="mt-(--testimonials-card-footer-margin-top) flex w-full items-center justify-between gap-(--testimonials-card-footer-gap)">
        <div className="flex min-w-0 items-center gap-(--testimonials-person-gap)">
          <div className="flex h-(--testimonials-person-frame-size) w-(--testimonials-person-frame-size) shrink-0 items-end justify-center overflow-hidden rounded-(--testimonials-person-frame-radius) bg-background px-(--testimonials-person-frame-padding) pt-(--testimonials-person-frame-top-padding) pb-(--testimonials-person-frame-padding)">
            <Image
              src={item.personImageSrc}
              alt={item.personName}
              width={72}
              height={72}
              className="h-(--testimonials-person-image-size) w-(--testimonials-person-image-size) shrink-0 rounded-(--testimonials-person-image-radius) object-contain"
            />
          </div>

          <div className="min-w-0">
            <p
              className={cn(
                "w-full whitespace-pre-wrap wrap-break-word font-cal-sans",
                "text-(length:--testimonials-person-name-size) leading-(--testimonials-person-name-line-height)",
                "font-(--testimonials-person-name-weight) tracking-(--testimonials-person-name-letter-spacing)",
                "text-(--color-testimonials-person-name)",
                "font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_on]",
              )}
            >
              {item.personName}
            </p>

            <p
              className={cn(
                "w-full whitespace-pre-wrap wrap-break-word font-poppins",
                "text-(length:--testimonials-person-role-size) leading-(--testimonials-person-role-line-height)",
                "font-(--testimonials-person-role-weight) tracking-(--testimonials-person-role-letter-spacing)",
                "text-(--color-testimonials-person-role)",
                "font-features-['blwf'_on,'cv11'_on,'case'_on]",
              )}
            >
              {item.personRole}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-(--testimonials-stars-gap)">
          {Array.from({ length: item.rating }, (_, index) => (
            <TestimonialStar key={`${item.id}-star-${index + 1}`} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}