"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

import { type StorytellingItem } from "@/features/storytelling/constants/storytelling";

const storytellingImageSlideTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

interface StorytellingImageProps {
  image: string;
  imageAlt: string;
}

function StorytellingImage({ image, imageAlt }: StorytellingImageProps) {
  return (
    <div
      className={cn(
        "relative block h-full w-full min-h-0 overflow-hidden",
        "rounded-(--storytelling-image-radius)",
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="(min-width: 1024px) 240px, 100vw"
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          "rounded-(--storytelling-image-radius)",
        )}
      />
    </div>
  );
}

interface StorytellingImagePanelProps {
  items: StorytellingItem[];
  activeIndex: number;
  previousActiveIndex: number;
  direction: 1 | -1;
  className?: string;
}

export function StorytellingImagePanel({
  items,
  activeIndex,
  previousActiveIndex,
  direction,
  className,
}: StorytellingImagePanelProps) {
  const hiddenY = direction > 0 ? "-100%" : "100%";
  const exitY = direction > 0 ? "100%" : "-100%";

  return (
    <div
      className={cn(
        "relative isolate block min-h-0 w-full flex-1 overflow-hidden",
        "rounded-(--storytelling-image-radius)",
        className,
      )}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const isPrevious = index === previousActiveIndex && previousActiveIndex !== activeIndex;

        return (
          <motion.div
            key={item.id}
            aria-hidden={isActive ? "false" : "true"}
            animate={{
              y: isActive ? "0%" : isPrevious ? exitY : hiddenY,
              opacity: isActive ? 1 : isPrevious ? 0 : 0.01,
              zIndex: isActive ? 2 : isPrevious ? 1 : 0,
            }}
            transition={storytellingImageSlideTransition}
            className={cn(
              "absolute inset-0 h-full w-full min-w-0 transform-gpu will-change-transform",
              "overflow-hidden backface-hidden",
              "rounded-(--storytelling-image-radius)",
            )}
          >
            <StorytellingImage image={item.image} imageAlt={item.imageAlt} />
          </motion.div>
        );
      })}
    </div>
  );
}
