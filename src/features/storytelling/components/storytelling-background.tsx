import { forwardRef } from "react";

export const StorytellingBackground = forwardRef<HTMLDivElement>(
  function StorytellingBackground(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed right-0 left-0 z-0 bg-(--color-storytelling-background-dark) opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] delay-0 will-change-opacity"
      style={{
        top: "calc(-1 * env(safe-area-inset-top, 0px))",
        bottom: "calc(-1 * env(safe-area-inset-bottom, 0px))",
      }}
    />
  );
  },
);
