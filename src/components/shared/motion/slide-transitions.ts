export const slideSpringTransition = {
  type: "spring" as const,
  stiffness: 280,
  damping: 32,
  mass: 0.9,
};

export const verticalSlideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
  }),
  center: {
    y: 0,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
  }),
};

/** Content panels — scroll down: enters from bottom, exits upward */
export const contentVerticalSlideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    y: 0,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
  }),
};
