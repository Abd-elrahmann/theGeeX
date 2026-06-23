import { cn } from "@/lib/cn";

import { testimonialsSectionTitle } from "@/features/testimonials/constants/testimonials";

const testimonialsTitleHeadingClassName = cn(
  "relative m-0 mx-auto flex w-full justify-center p-0",
  "max-w-(--testimonials-title-max-width)",
);

const testimonialsTitleTextClassName = cn(
  "testimonials-title-text font-[family-name:var(--font-cal-sans)] not-italic",
  "font-(--testimonials-title-font-weight)",
  "text-[length:var(--testimonials-title-size)] leading-(--testimonials-title-line-height)",
  "tracking-[0px] text-center whitespace-nowrap",
  "[font-feature-settings:normal]",
);

function TestimonialsTitleContent() {
  return (
    <span className="testimonials-title-box">
      <span className={testimonialsTitleTextClassName}>{testimonialsSectionTitle}</span>
    </span>
  );
}

export function TestimonialsTitle() {
  return (
    <div className="pointer-events-none relative z-(--testimonials-title-z-index) w-full overflow-visible">
      <h2 className={testimonialsTitleHeadingClassName}>
        <TestimonialsTitleContent />
      </h2>
    </div>
  );
}