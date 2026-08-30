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
  typeStartIndex?: number;
  dateClassName?: string;
  authorImageAfterText?: boolean;
}

export function BlogCard({ blog, articleClassName, dateClassName, footerClassName, imageClassName, metaContainerClassName, typesClassName, typeChipClassName, titleClassName, maxTypes, typeStartIndex = 0, authorImageAfterText = false }: BlogCardProps) {
  const visibleTypes = typeof maxTypes === "number"
    ? blog.types.slice(typeStartIndex, typeStartIndex + maxTypes)
    : blog.types;

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      aria-label={`Open ${blog.title}`}
      className={cn(
        "mx-auto box-border flex h-(--blogs-card-mobile-height) w-full max-w-(--blogs-card-max-width) items-stretch gap-(--blogs-card-gap) md:mx-0 md:grid md:h-auto md:grid-cols-[var(--blogs-card-image-width)_minmax(0,1fr)] md:justify-items-start",
        "rounded-(--blogs-card-radius) border border-(--color-blogs-card-border) bg-(--color-blogs-card-bg)",
        "p-(--blogs-card-padding) shadow-(--blogs-card-shadow)",
        "md:border-transparent md:bg-transparent md:shadow-none",
        articleClassName,
      )}
      data-blog-cursor-zone
    >
      <BlogCardImage imageSrc={blog.imageSrc} imageAlt={blog.imageAlt} imageClassName={imageClassName} />

      <div className="order-1 flex min-w-0 flex-[1.4_0_0] flex-col items-start justify-start gap-(--blogs-card-content-gap) pb-(--blogs-card-content-padding-bottom) text-left md:order-0 md:min-h-(--blogs-card-image-height) md:flex-auto md:justify-start md:gap-0 md:pb-0">
        <BlogCardTypes types={visibleTypes} typesClassName={typesClassName} typeChipClassName={typeChipClassName} />

        <h3
          className={cn(
            "order-1 mt-(--blogs-card-title-margin-top) w-full whitespace-pre-wrap wrap-break-word text-left md:order-0",
            "font-cal-sans text-(length:--blogs-card-title-size)",
            "leading-(--blogs-card-title-line-height) font-black tracking-normal",
            "text-(--color-blogs-card-title)",
            blogFeatureTitleClassName,
            titleClassName,
          )}
        >
          {blog.title}
        </h3>

        <BlogCardMeta date={blog.date} author={blog.author} dateClassName={dateClassName} footerClassName={footerClassName} metaContainerClassName={metaContainerClassName} authorImageAfterText={authorImageAfterText} />
      </div>
    </Link>
  );
}