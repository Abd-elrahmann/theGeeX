"use client";

import { useEffect } from "react";

import { type StorytellingItem } from "@/features/storytelling/constants/storytelling";

export function usePreloadStorytellingImages(items: StorytellingItem[]): void {
  useEffect(() => {
    items.forEach(({ image }) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = image;

      void img.decode?.().catch(() => undefined);
    });
  }, [items]);
}
