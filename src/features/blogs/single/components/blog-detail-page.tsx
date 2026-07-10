import Image from "next/image";
import Link from "next/link";

import { BlogCard } from "@/features/blogs/shared/components/blog-card";
import { blogItems } from "@/features/blogs/constants/blogs";
import type { BlogArticleDetail, BlogArticleDetailBlock } from "@/features/blogs/constants/blogs";
import { cn } from "@/lib/cn";

interface BlogDetailPageProps {
  article: BlogArticleDetail;
}

function renderInlineBold(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={`${part}-${index}`} className="font-semibold">{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      className="h-5.25 w-4.5 shrink-0"
    >
      <path
        d="M7 2C6.717 2 6.479 1.904 6.288 1.712C6.097 1.52 6.001 1.283 6 1C5.999 0.717 6.095 0.48 6.288 0.288C6.481 0.096 6.718 0 7 0H11C11.283 0 11.521 0.096 11.713 0.288C11.905 0.48 12.001 0.717 12 1C11.999 1.283 11.903 1.52 11.712 1.713C11.521 1.906 11.283 2.001 11 2H7ZM9.713 12.713C9.904 12.521 10 12.283 10 12V8C10 7.717 9.904 7.479 9.712 7.288C9.52 7.097 9.283 7.001 9 7C8.717 6.999 8.48 7.095 8.288 7.288C8.096 7.481 8 7.718 8 8V12C8 12.283 8.096 12.521 8.288 12.713C8.48 12.905 8.717 13.001 9 13C9.283 12.999 9.52 12.903 9.713 12.712M5.513 20.288C4.421 19.813 3.467 19.167 2.65 18.35C1.833 17.533 1.188 16.579 0.713 15.487C0.238 14.395 0.001 13.233 0 12C-0.001 10.767 0.237 9.605 0.713 8.512C1.189 7.419 1.835 6.465 2.65 5.65C3.465 4.835 4.42 4.189 5.513 3.713C6.606 3.237 7.769 2.999 9 3C10.033 3 11.025 3.167 11.975 3.5C12.925 3.833 13.817 4.317 14.65 4.95L15.35 4.25C15.533 4.067 15.767 3.975 16.05 3.975C16.333 3.975 16.567 4.067 16.75 4.25C16.933 4.433 17.025 4.667 17.025 4.95C17.025 5.233 16.933 5.467 16.75 5.65L16.05 6.35C16.683 7.183 17.167 8.075 17.5 9.025C17.833 9.975 18 10.967 18 12C18 13.233 17.762 14.396 17.287 15.488C16.812 16.58 16.166 17.534 15.35 18.35C14.534 19.166 13.58 19.812 12.487 20.288C11.394 20.764 10.232 21.001 9 21C7.768 20.999 6.605 20.761 5.512 20.288M13.95 16.95C15.317 15.583 16 13.933 16 12C16 10.067 15.317 8.417 13.95 7.05C12.583 5.683 10.933 5 9 5C7.067 5 5.417 5.683 4.05 7.05C2.683 8.417 2 10.067 2 12C2 13.933 2.683 15.583 4.05 16.95C5.417 18.317 7.067 19 9 19C10.933 19 12.583 18.317 13.95 16.95Z"
        fill="rgb(92, 92, 92)"
      />
    </svg>
  );
}

function BlogDetailBlockView({ block, isFirstHeading }: { block: BlogArticleDetailBlock; isFirstHeading: boolean }) {
  if (block.type === "heading" && block.content) {
    return (
      <h2
        className={cn(
          "m-0 h-auto w-full whitespace-pre-wrap wrap-break-word font-poppins leading-[1.6] font-medium tracking-normal text-text font-features-[normal] md:text-[28px]",
          isFirstHeading ? "text-[24px]" : "text-[18px]",
        )}
      >
        {renderInlineBold(block.content)}
      </h2>
    );
  }

  if (block.type === "paragraph" && block.content) {
    return (
      <p className="m-0 h-auto w-full whitespace-pre-wrap wrap-break-word font-poppins text-[16px] leading-[1.6] font-normal tracking-normal text-text font-features-[normal]">
        {renderInlineBold(block.content)}
      </p>
    );
  }

  if (block.type === "callout" && block.content) {
    if (block.variant === "split-arrows") {
      const [topLine = "", bottomLine = ""] = block.content.split("\n\n");
      const [leftTarget = "", rightTarget = ""] = bottomLine.split("] [").map((part, index, parts) => {
        if (parts.length === 1) {
          return part;
        }

        if (index === 0) {
          return `${part}]`;
        }

        if (index === parts.length - 1) {
          return `[${part}`;
        }

        return `[${part}]`;
      });

      return (
        <div
          className={cn(
            "box-border flex h-min w-full flex-col items-center justify-center gap-2.5 overflow-(--overflow-clip-fallback)",
            "border border-(--color-blogs-detail-callout-border) bg-(--color-blogs-detail-callout-bg) px-3 py-2",
          )}
        >
          <p className="m-0 w-full whitespace-pre-wrap wrap-break-word text-center font-poppins text-[16px] leading-[1.6] font-normal tracking-normal text-text font-features-[normal]">
            {renderInlineBold(topLine)}
          </p>

          <div className="grid w-full max-w-110 grid-cols-2 items-start gap-x-4 gap-y-1">
            <div className="flex justify-center text-[18px] leading-none text-text" aria-hidden="true">
              ↓
            </div>
            <div className="flex justify-center text-[18px] leading-none text-text" aria-hidden="true">
              ↓
            </div>

            <p className="m-0 whitespace-nowrap text-center font-poppins text-[16px] leading-[1.6] font-normal tracking-normal text-text font-features-[normal]">
              {renderInlineBold(leftTarget)}
            </p>
            <p className="m-0 whitespace-nowrap text-center font-poppins text-[16px] leading-[1.6] font-normal tracking-normal text-text font-features-[normal]">
              {renderInlineBold(rightTarget)}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "box-border flex h-min w-full flex-col items-center justify-center gap-2.5 overflow-(--overflow-clip-fallback)",
          "border border-(--color-blogs-detail-callout-border) bg-(--color-blogs-detail-callout-bg) px-3 py-2",
        )}
      >
        <p className="m-0 w-full whitespace-pre-wrap wrap-break-word text-center font-poppins text-[16px] leading-[1.6] font-normal tracking-normal text-text font-features-[normal]">
          {renderInlineBold(block.content)}
        </p>
      </div>
    );
  }

  if (block.type === "unordered-list" && block.items?.length) {
    return (
      <ul className="m-0 flex list-disc flex-col gap-3 pl-6 font-poppins text-[16px] leading-[1.6] font-normal text-text marker:text-text font-features-[normal]">
        {block.items.map((item) => (
          <li key={item}>{renderInlineBold(item)}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "ordered-list" && block.items?.length) {
    return (
      <ol className="m-0 flex list-decimal flex-col gap-3 pl-6 font-poppins text-[16px] leading-[1.6] font-normal text-text marker:font-medium marker:text-text font-features-[normal]">
        {block.items.map((item) => (
          <li key={item}>{renderInlineBold(item)}</li>
        ))}
      </ol>
    );
  }

  return null;
}

export function BlogDetailPage({ article }: BlogDetailPageProps) {
  const relatedBlogs = blogItems.filter((blog) => blog.slug !== article.slug).slice(0, 2);
  let headingCount = 0;

  return (
    <main className="relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--navbar-height)">
      <article className="mx-auto flex w-full max-w-300 flex-col gap-10 px-4 pt-14 pb-20 md:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex h-[19px] w-min flex-row flex-nowrap content-center items-center justify-center gap-2 overflow-(--overflow-clip-fallback) p-0 whitespace-nowrap font-poppins text-(length:--service-detail-breadcrumb-size) leading-(--service-detail-breadcrumb-line-height) font-normal text-(--color-service-detail-text)"
        >
          <Link href="/" className="whitespace-nowrap transition-colors duration-200 hover:text-(--color-service-detail-text)">
            Home
          </Link>
          <span aria-hidden="true">&gt;</span>
          <Link href="/blogs" className="whitespace-nowrap transition-colors duration-200 hover:text-(--color-service-detail-text)">
            Blogs
          </Link>
          <span aria-hidden="true">&gt;</span>
          <span className="whitespace-nowrap font-medium text-(--color-service-detail-text)">{article.breadcrumbLabel}</span>
        </nav>

        <header className="flex w-full flex-col gap-6">
          <h2
            className={cn(
              "m-0 h-auto w-full whitespace-pre-wrap wrap-break-word font-cal-sans",
              "text-[24px] leading-[1.4] font-normal tracking-normal text-(--color-blogs-detail-title) md:text-[40px]",
              "font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]",
            )}
          >
            {article.title}
          </h2>

          <p className="m-0 font-poppins text-[16px] leading-[1.6] font-normal text-text">{article.date}</p>

          <div className="flex flex-wrap items-center gap-3">
            {article.categories.map((category) => (
              <span
                key={category}
                className={cn(
                  "box-border inline-flex h-min w-auto max-w-full flex-nowrap items-center justify-start gap-2.5 overflow-hidden whitespace-nowrap rounded-4xl px-4 py-1.5",
                  "bg-(--color-ai-growth-accent) backdrop-blur-[68px]",
                  "font-poppins text-(length:--blogs-card-badge-size) leading-(--blogs-card-badge-line-height)",
                  "font-normal tracking-[-0.02em] text-brand-foreground",
                )}
              >
                {category}
              </span>
            ))}
          </div>
        </header>

        <div className="relative h-80 w-full overflow-hidden rounded-3xl md:h-130">
          <Image
            src={article.imageSrc}
            alt={article.imageAlt}
            fill
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-center"
          />
        </div>

        <section className="-mt-12 flex w-full flex-row items-center justify-between gap-4 pt-6 md:gap-10">
          <div className="flex items-start gap-3 lg:gap-4">
            <div className="relative h-6.25 w-4.5 overflow-hidden rounded-[999px]">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                sizes="18px"
                className="object-cover object-top"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="m-0 font-poppins text-[12px] leading-[1.4] font-normal uppercase tracking-[0.08em] text-nav-link">
                Written by
              </p>
              <p className="m-0 font-poppins text-[18px] leading-[1.4] font-medium text-text">{article.author.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ClockIcon />
            <p className="m-0 font-poppins text-[14px] leading-[1.6] font-normal text-nav-link">{article.readingTime}</p>
          </div>
        </section>

        <section className="flex w-full flex-col gap-8">
          <div className="flex w-full max-w-225 flex-col gap-8">
            {article.detailBlocks.map((block, index) => (
              <BlogDetailBlockView
                key={`${article.slug}-${block.type}-${index}`}
                block={block}
                isFirstHeading={block.type === "heading" && headingCount++ === 0}
              />
            ))}
          </div>
        </section>

        <section className="flex w-full flex-col gap-8 pt-6">
          <h2
            className={cn(
              "m-0 h-auto w-full whitespace-pre-wrap wrap-break-word text-left font-cal-sans",
              "text-[clamp(42px,8vw,70px)] leading-[1.4] font-semibold tracking-[-0.04em] text-(--color-blogs-detail-title)",
              "font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]",
            )}
          >
            Explore More Thoughts
          </h2>

          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
            {relatedBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                articleClassName="h-full md:max-w-none md:grid-cols-[168px_minmax(0,1fr)]"
                dateClassName="self-center text-center md:self-start md:text-left"
                footerClassName="pt-0"
                imageClassName="h-75 md:h-75 md:w-42"
                metaContainerClassName="order-3 mt-auto"
                typesClassName="order-2 mt-4"
                titleClassName="order-1 text-[20px] leading-[1.35] md:text-[24px] md:leading-[1.4]"
                maxTypes={1}
              />
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}