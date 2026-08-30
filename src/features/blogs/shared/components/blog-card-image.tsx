import Image from "next/image";

import { cn } from "@/lib/cn";

interface BlogCardImageProps {
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
}

export function BlogCardImage({
  imageSrc,
  imageAlt,
  imageClassName,
}: BlogCardImageProps) {
  return (
    <div
      className={cn(
        "relative order-0 h-full min-w-0 flex-[1_0_0] overflow-hidden rounded-(--blogs-card-radius) md:order-0 md:h-(--blogs-card-image-height) md:w-(--blogs-card-image-width) md:flex-none md:rounded-(--blogs-card-image-radius)",
        imageClassName,
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(min-width: 800px) 248px, 100vw"
        className="object-cover"
      />
    </div>
  );
}