import { motion } from "framer-motion";
import Link from "next/link";

import { cn } from "@/lib/cn";

const packageButtonTransition = {
  type: "spring" as const,
  stiffness: 110,
  damping: 15,
  mass: 0.9,
  delay: 0,
};

interface PackageCardButtonProps {
  slug: string;
  isHovered: boolean;
  canAnimateButtonHover: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export function PackageCardButton({
  slug,
  isHovered,
  canAnimateButtonHover,
  onHoverStart,
  onHoverEnd,
}: PackageCardButtonProps) {
  return (
    <motion.div
      initial="rest"
      animate={canAnimateButtonHover && isHovered ? "hover" : "rest"}
      whileTap={canAnimateButtonHover ? "hover" : "rest"}
    >
      <Link
        href={`/packages/${slug}`}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        className={cn(
          "relative mt-(--packages-card-button-margin-top) flex h-(--packages-button-height) min-h-(--packages-button-height) w-(--packages-button-width) shrink-0 self-center max-md:w-full md:max-lg:w-full",
          "items-center justify-center overflow-hidden rounded-(--packages-button-radius)",
          "bg-(--color-packages-button-bg) px-(--packages-button-padding-x) pt-(--packages-button-padding-top) pb-(--packages-button-padding-bottom)",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
        )}
      >
        <motion.span
          aria-hidden="true"
          variants={{
            rest: { y: 0, scale: 0.94 },
            hover: { y: -240, scale: 1 },
          }}
          transition={packageButtonTransition}
          className={cn(
            "absolute left-1/2 top-full -translate-x-1/2",
            "h-(--packages-button-orb-height) w-(--packages-button-orb-width)",
            "rounded-full bg-(--color-packages-button-hover-bg)",
          )}
        />

        <span className="absolute inset-0 z-1 flex items-center justify-center overflow-hidden">
          <span
            aria-hidden="true"
            className="invisible block h-auto w-auto whitespace-pre font-poppins text-(length:--packages-button-text-size) leading-(--packages-button-text-line-height) font-medium tracking-(--packages-button-text-letter-spacing) text-(--color-packages-button-text) font-features-normal"
          >
            Learn More
          </span>

          <motion.span
            variants={{
              rest: { x: "-50%", y: "-50%", opacity: 1 },
              hover: { x: "-50%", y: "-190%", opacity: 0 },
            }}
            transition={packageButtonTransition}
            className="absolute left-1/2 top-1/2 h-auto w-auto whitespace-pre font-poppins text-(length:--packages-button-text-size) leading-(--packages-button-text-line-height) font-medium tracking-(--packages-button-text-letter-spacing) text-(--color-packages-button-text) font-features-normal"
          >
            Learn More
          </motion.span>

          <motion.span
            variants={{
              rest: { x: "-50%", y: "140%", opacity: 0 },
              hover: { x: "-50%", y: "-50%", opacity: 1 },
            }}
            transition={packageButtonTransition}
            className="absolute left-1/2 top-1/2 h-auto w-auto whitespace-pre font-poppins text-(length:--packages-button-text-size) leading-(--packages-button-text-line-height) font-medium tracking-(--packages-button-text-letter-spacing) text-(--color-packages-button-hover-text) font-features-normal"
          >
            Learn More
          </motion.span>
        </span>
      </Link>
    </motion.div>
  );
}