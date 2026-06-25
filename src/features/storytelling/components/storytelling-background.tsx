import { forwardRef } from "react";

import { storytellingBackgroundTransition } from "@/features/storytelling/constants/storytelling";

export const StorytellingBackground = forwardRef<HTMLDivElement>(
  function StorytellingBackground(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 h-svh w-full bg-(--color-storytelling-background-dark) opacity-0 transition-opacity will-change-opacity"
      style={{
        transitionDuration: `${storytellingBackgroundTransition.duration}s`,
        transitionTimingFunction: `cubic-bezier(${storytellingBackgroundTransition.ease.join(", ")})`,
      }}
    />
  );
  },
);
