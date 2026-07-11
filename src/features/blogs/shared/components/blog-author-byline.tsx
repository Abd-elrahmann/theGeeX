import Image from "next/image";

import type { BlogAuthor } from "@/features/blogs/constants/blogs";
import {
  blogAuthorNameClassName,
  blogMetaEyebrowClassName,
} from "@/features/blogs/shared/utils/blog-styles";
import { cn } from "@/lib/cn";

interface BlogAuthorBylineProps {
  author: BlogAuthor;
  containerClassName?: string;
  imageWrapperClassName?: string;
  textContainerClassName?: string;
  labelClassName?: string;
  nameClassName?: string;
  label?: string;
}

export function BlogAuthorByline({
  author,
  containerClassName,
  imageWrapperClassName,
  textContainerClassName,
  labelClassName,
  nameClassName,
  label = "Written by",
}: BlogAuthorBylineProps) {
  return (
    <div className={containerClassName}>
      <div className={cn("relative overflow-hidden rounded-full", imageWrapperClassName)}>
        <Image
          src={author.avatar}
          alt={author.name}
          fill
          sizes="18px"
          className="object-cover object-top"
        />
      </div>

      <div className={textContainerClassName}>
        <p className={cn(blogMetaEyebrowClassName, labelClassName)}>{label}</p>
        <p className={cn(blogAuthorNameClassName, nameClassName)}>{author.name}</p>
      </div>
    </div>
  );
}