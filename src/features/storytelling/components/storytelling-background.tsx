import { storytellingBackgroundTransition } from "@/features/storytelling/constants/storytelling";

import { cn } from "@/lib/cn";

interface StorytellingBackgroundProps {
  isDark: boolean;
}

export function StorytellingBackground({ isDark }: StorytellingBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-0 h-svh w-full",
        "transition-colors",
        isDark ? "bg-(--color-storytelling-background-dark)" : "bg-transparent",
      )}
      style={{
        transitionDuration: `${storytellingBackgroundTransition.duration}s`,
        transitionTimingFunction: `cubic-bezier(${storytellingBackgroundTransition.ease.join(", ")})`,
      }}
    />
  );
}
