import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/cn";

import type { BlogItem } from "@/features/blogs/constants/blogs";

interface BlogCardProps {
  blog: BlogItem;
  articleClassName?: string;
  footerClassName?: string;
  imageClassName?: string;
  metaContainerClassName?: string;
  titleClassName?: string;
  maxTypes?: number;
  dateClassName?: string;
}

export function BlogCard({ blog, articleClassName, dateClassName, footerClassName, imageClassName, metaContainerClassName, titleClassName, maxTypes }: BlogCardProps) {
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
      <div
        className={cn(
          "relative order-2 w-full overflow-hidden rounded-(--blogs-card-image-radius) md:order-0",
          "h-(--blogs-card-image-height) md:w-(--blogs-card-image-width)",
          imageClassName,
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
        <div className="flex flex-wrap items-center justify-center gap-(--blogs-card-types-gap) md:justify-start">
          {visibleTypes.map((type) => (
            <span
              key={type}
              className={cn(
                "inline-flex h-auto w-auto items-center whitespace-pre rounded-(--blogs-card-badge-radius)",
                "bg-(--color-blogs-card-badge-bg) px-(--blogs-card-badge-padding-x) py-(--blogs-card-badge-padding-y)",
                "font-poppins text-(length:--blogs-card-badge-size) leading-(--blogs-card-badge-line-height)",
                "font-normal tracking-[-0.02em] text-(--color-blogs-card-badge-text)",
                "backdrop-blur-(--blogs-card-badge-blur)",
              )}
            >
              {type}
            </span>
          ))}
        </div>

        <h3
          className={cn(
            "mt-(--blogs-card-title-margin-top) w-full whitespace-pre-wrap wrap-break-word text-center md:text-left",
            "font-cal-sans text-(length:--blogs-card-title-size)",
            "leading-(--blogs-card-title-line-height) font-black tracking-normal",
            "text-(--color-blogs-card-title)",
            "font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]",
            titleClassName,
          )}
        >
          {blog.title}
        </h3>

        <div className={cn("flex w-full flex-col", metaContainerClassName)}>
          <p
            className={cn(
              "mt-(--blogs-card-date-margin-top) h-auto w-auto whitespace-pre font-poppins",
              "text-(length:--blogs-card-meta-size) leading-(--blogs-card-meta-line-height)",
              "font-normal tracking-normal text-(--color-blogs-card-meta)",
              dateClassName,
            )}
          >
            {blog.date}
          </p>

          <div
            className={cn(
              "hidden items-center gap-(--blogs-card-footer-gap) pt-(--blogs-card-footer-padding-top) md:flex",
              footerClassName,
            )}
          >
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
      </div>
    </Link>
  );
}