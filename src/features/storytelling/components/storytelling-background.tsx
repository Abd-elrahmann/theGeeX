import { forwardRef } from "react";

export const StorytellingBackground = forwardRef<HTMLDivElement>(
  function StorytellingBackground(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 h-svh w-full bg-(--color-storytelling-background-dark) opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] delay-0 will-change-opacity"
    />
  );
  },
);
