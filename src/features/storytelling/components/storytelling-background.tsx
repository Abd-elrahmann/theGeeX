import { forwardRef } from "react";

export const StorytellingBackground = forwardRef<HTMLDivElement>(
  function StorytellingBackground(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 h-svh w-full bg-(--color-storytelling-background-dark) opacity-0 will-change-opacity"
    />
  );
  },
);
