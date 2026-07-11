import Link from "next/link";

import { BlogCardImage } from "@/features/blogs/shared/components/blog-card-image";
import { BlogCardMeta } from "@/features/blogs/shared/components/blog-card-meta";
import { BlogCardTypes } from "@/features/blogs/shared/components/blog-card-types";
import { blogFeatureTitleClassName } from "@/features/blogs/shared/utils/blog-styles";
import { cn } from "@/lib/cn";

import type { BlogItem } from "@/features/blogs/constants/blogs";

interface BlogCardProps {
  blog: BlogItem;
  articleClassName?: string;
  footerClassName?: string;
  imageClassName?: string;
  metaContainerClassName?: string;
  typesClassName?: string;
  typeChipClassName?: string;
  titleClassName?: string;
  maxTypes?: number;
  dateClassName?: string;
}

export function BlogCard({ blog, articleClassName, dateClassName, footerClassName, imageClassName, metaContainerClassName, typesClassName, typeChipClassName, titleClassName, maxTypes }: BlogCardProps) {
  const visibleTypes = typeof maxTypes === "number" ? blog.types.slice(0, maxTypes) : blog.types;

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      aria-label={`Open ${blog.title}`}
      className={cn(
        "mx-auto box-border grid w-full max-w-(--blogs-card-max-width) grid-cols-1 justify-items-center gap-(--blogs-card-gap) md:mx-0 md:justify-items-start",
        "rounded-(--blogs-card-radius) border border-(--color-blogs-card-border) bg-(--color-blogs-card-bg)",
        "p-(--blogs-card-padding) shadow-(--blogs-card-shadow)",
        "md:border-transparent md:bg-transparent md:shadow-none",
        "md:grid-cols-[var(--blogs-card-image-width)_minmax(0,1fr)]",
        articleClassName,
      )}
      data-blog-cursor-zone
    >
      <BlogCardImage imageSrc={blog.imageSrc} imageAlt={blog.imageAlt} imageClassName={imageClassName} />

      <div className="order-1 flex min-w-0 flex-col items-center md:order-0 md:min-h-(--blogs-card-image-height) md:items-start">
        <BlogCardTypes types={visibleTypes} typesClassName={typesClassName} typeChipClassName={typeChipClassName} />

        <h3
          className={cn(
            "order-1 mt-(--blogs-card-title-margin-top) w-full whitespace-pre-wrap wrap-break-word text-center md:order-0 md:text-left",
            "font-cal-sans text-(length:--blogs-card-title-size)",
            "leading-(--blogs-card-title-line-height) font-black tracking-normal",
            "text-(--color-blogs-card-title)",
            blogFeatureTitleClassName,
            titleClassName,
          )}
        >
          {blog.title}
        </h3>

        <BlogCardMeta date={blog.date} author={blog.author} dateClassName={dateClassName} footerClassName={footerClassName} metaContainerClassName={metaContainerClassName} />
      </div>
    </Link>
  );
}