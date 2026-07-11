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
        "relative order-2 w-full overflow-hidden rounded-(--blogs-card-image-radius) md:order-0",
        "h-(--blogs-card-image-height) md:w-(--blogs-card-image-width)",
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