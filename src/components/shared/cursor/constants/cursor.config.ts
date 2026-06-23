import { POINTER_FINE_MEDIA_QUERY } from "@/lib/breakpoints";

export const cursorConfig = {
  spring: {
    type: "spring" as const,
    duration: 0.4,
    bounce: 0.2,
    delay: 0,
  },
  pointerMediaQuery: POINTER_FINE_MEDIA_QUERY,
} as const;

export const exploreCursorTransition = {
  type: "spring" as const,
  duration: 0.45,
  bounce: 0.2,
  delay: 0.04,
};
