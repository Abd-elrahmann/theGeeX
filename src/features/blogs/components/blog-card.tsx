import Image from "next/image";

import { cn } from "@/lib/cn";

import type { BlogItem } from "@/features/blogs/constants/blogs";

interface BlogCardProps {
  blog: BlogItem;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article
      data-blog-cursor-zone
      className={cn(
        "mx-auto box-border grid w-full max-w-(--blogs-card-max-width) grid-cols-1 justify-items-center gap-(--blogs-card-gap) md:mx-0 md:justify-items-start",
        "rounded-(--blogs-card-radius) border border-(--color-blogs-card-border) bg-(--color-blogs-card-bg)",
        "p-(--blogs-card-padding) shadow-(--blogs-card-shadow)",
        "md:border-transparent md:bg-transparent md:shadow-none",
        "md:grid-cols-[var(--blogs-card-image-width)_minmax(0,1fr)]",
      )}
    >
      <div
        className={cn(
          "relative order-2 w-full overflow-hidden rounded-(--blogs-card-image-radius) md:order-0",
          "h-(--blogs-card-image-height) md:w-(--blogs-card-image-width)",
        )}
      >
        <Image
          src={blog.imageSrc}
          alt={blog.imageAlt}
          fill
          sizes="(min-width: 768px) 248px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="order-1 flex min-w-0 flex-col items-center md:order-0 md:min-h-(--blogs-card-image-height) md:items-start">
        <span
          className={cn(
            "inline-flex w-fit items-center rounded-(--blogs-card-badge-radius)",
            "bg-(--color-blogs-card-badge-bg) px-(--blogs-card-badge-padding-x) py-(--blogs-card-badge-padding-y)",
            "font-poppins text-(length:--blogs-card-badge-size) leading-(--blogs-card-badge-line-height)",
            "font-medium tracking-normal text-(--color-blogs-card-badge-text)",
            "backdrop-blur-(--blogs-card-badge-blur)",
          )}
        >
          {blog.type}
        </span>

        <h3
          className={cn(
            "mt-(--blogs-card-title-margin-top) w-full whitespace-pre-wrap wrap-break-word text-center md:text-left",
            "font-cal-sans text-(length:--blogs-card-title-size)",
            "leading-(--blogs-card-title-line-height) font-normal tracking-normal",
            "text-(--color-blogs-card-title)",
          )}
        >
          {blog.title}
        </h3>

        <p
          className={cn(
            "mt-(--blogs-card-date-margin-top) whitespace-pre font-poppins",
            "text-(length:--blogs-card-meta-size) leading-(--blogs-card-meta-line-height)",
            "font-normal tracking-normal text-(--color-blogs-card-meta)",
          )}
        >
          {blog.date}
        </p>

        <div className="mt-auto hidden items-center gap-(--blogs-card-footer-gap) pt-(--blogs-card-footer-padding-top) md:flex">
          <p
            className={cn(
              "whitespace-pre font-poppins text-(length:--blogs-card-meta-size)",
              "leading-(--blogs-card-meta-line-height) font-normal tracking-normal text-(--color-blogs-card-meta)",
            )}
          >
            Written by
          </p>

          <div className="relative h-(--blogs-card-author-image-height) w-(--blogs-card-author-image-width) overflow-hidden">
            <Image
              src={blog.author.avatar}
              alt={blog.author.name}
              fill
              sizes="18px"
              className="object-cover"
            />
          </div>

          <p
            className={cn(
              "whitespace-pre font-poppins text-(length:--blogs-card-meta-size)",
              "leading-(--blogs-card-meta-line-height) font-normal tracking-normal text-(--color-blogs-card-meta)",
            )}
          >
            {blog.author.name}
          </p>
        </div>
      </div>
    </article>
  );
}