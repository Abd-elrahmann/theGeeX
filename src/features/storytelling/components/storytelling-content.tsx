"use client";

import { memo } from "react";

import { cn } from "@/lib/cn";

import { type StorytellingItem } from "@/features/storytelling/constants/storytelling";
import { StorytellingCaptionPanel, StorytellingLines } from "./storytelling-text";
import { StorytellingImagePanel } from "./storytelling-image-panel";

interface StorytellingContentProps {
  items: StorytellingItem[];
  activeIndex: number;
  previousActiveIndex: number;
  transitionDirection: 1 | -1;
  variant?: "desktop" | "mobile";
  onSelectIndex?: (index: number) => void;
}

function StorytellingContentComponent({
  items,
  activeIndex,
  previousActiveIndex,
  transitionDirection,
  variant = "desktop",
  onSelectIndex,
}: StorytellingContentProps) {
  const isDesktop = variant === "desktop";

  return (
    <div
      className={cn(
        "relative z-(--storytelling-content-z-index) mx-auto box-border flex w-full shrink-0",
        "max-w-(--storytelling-content-max-width)",
        isDesktop
          ? "gap-(--storytelling-gap) p-(--storytelling-content-padding) flex-row flex-nowrap items-center justify-center overflow-visible max-lg:min-w-0 max-lg:overflow-hidden max-lg:p-0"
          : "gap-(--storytelling-gap) px-0 py-(--storytelling-content-padding) flex-col items-center overflow-x-clip",
      )}
    >
      <div
        className={cn(
          "box-border flex shrink-0 flex-col items-center justify-start overflow-hidden",
          isDesktop
            ? "h-(--storytelling-media-height) w-(--storytelling-media-width) max-w-full"
            : "h-(--storytelling-media-height) w-full",
          "mt-(--storytelling-media-offset-y)",
        )}
      >
        <StorytellingImagePanel
          items={items}
          activeIndex={activeIndex}
          previousActiveIndex={previousActiveIndex}
          direction={transitionDirection}
        />
        <StorytellingCaptionPanel
          items={items}
          activeIndex={activeIndex}
          direction={transitionDirection}
        />
      </div>

      <StorytellingLines
        activeIndex={activeIndex}
        variant={variant}
        onSelectIndex={onSelectIndex}
      />
    </div>
  );
}

export const StorytellingContent = memo(StorytellingContentComponent);
