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
          sizes="(min-width: 800px) 248px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="order-1 flex min-w-0 flex-col items-center md:order-0 md:min-h-(--blogs-card-image-height) md:items-start">
        <div className={cn("order-2 mt-3 flex flex-wrap items-center justify-center gap-(--blogs-card-types-gap) md:order-0 md:mt-0 md:justify-start", typesClassName)}>
          {visibleTypes.map((type) => (
            <span
              key={type}
              className={cn(
                "inline-flex h-auto w-auto items-center whitespace-pre rounded-(--blogs-card-badge-radius)",
                "bg-(--color-blogs-card-badge-bg) px-(--blogs-card-badge-padding-x) py-(--blogs-card-badge-padding-y)",
                "font-poppins text-(length:--blogs-card-badge-size) leading-(--blogs-card-badge-line-height)",
                "font-normal tracking-[-0.02em] text-(--color-blogs-card-badge-text)",
                "backdrop-blur-(--blogs-card-badge-blur)",
                typeChipClassName,
              )}
            >
              {type}
            </span>
          ))}
        </div>

        <h3
          className={cn(
            "order-1 mt-(--blogs-card-title-margin-top) w-full whitespace-pre-wrap wrap-break-word text-center md:order-0 md:text-left",
            "font-cal-sans text-(length:--blogs-card-title-size)",
            "leading-(--blogs-card-title-line-height) font-black tracking-normal",
            "text-(--color-blogs-card-title)",
            "font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]",
            titleClassName,
          )}
        >
          {blog.title}
        </h3>

        <div className={cn("order-3 flex w-full flex-col md:order-0", metaContainerClassName)}>
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
              "flex items-center justify-start gap-(--blogs-card-footer-gap) pt-(--blogs-card-footer-padding-top)",
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

            <div className="relative h-(--blogs-card-author-image-height) w-(--blogs-card-author-image-width) overflow-hidden rounded-full">
              <Image
                src={blog.author.avatar}
                alt={blog.author.name}
                fill
                sizes="18px"
                className="rounded-full object-cover object-top"
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