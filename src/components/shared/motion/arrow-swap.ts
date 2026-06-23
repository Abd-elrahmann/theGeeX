import type { Transition } from "framer-motion";

export const arrowSwapSpringTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 1,
  delay: 0,
};

export function getArrowSwapMotion(iconSize: number, isHovered: boolean) {
  return {
    primary: {
      x: isHovered ? iconSize : 0,
      y: isHovered ? -iconSize : 0,
    },
    hover: {
      x: isHovered ? 0 : -iconSize,
      y: isHovered ? 0 : iconSize,
    },
  };
}
