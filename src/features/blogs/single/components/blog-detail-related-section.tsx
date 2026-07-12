import Link from "next/link";

import { BlogCard } from "@/features/blogs/shared/components/blog-card";
import { blogItems } from "@/features/blogs/constants/blogs";
import type { BlogArticleDetail } from "@/features/blogs/constants/blogs";
import { blogFeatureTitleClassName } from "@/features/blogs/shared/utils/blog-styles";
import { cn } from "@/lib/cn";

interface BlogDetailRelatedSectionProps {
  article: BlogArticleDetail;
}

export function BlogDetailRelatedSection({ article }: BlogDetailRelatedSectionProps) {
  const relatedBlogs = blogItems.filter((blog) => blog.slug !== article.slug).slice(0, 2);

  return (
    <section className="flex w-full flex-col gap-8 pt-6">
      <div className="flex items-center justify-between gap-4">
        <h2
          className={cn(
            "m-0 h-auto w-full whitespace-pre-wrap wrap-break-word text-left font-cal-sans",
            "text-[clamp(42px,8vw,70px)] leading-[1.4] font-semibold tracking-[-0.04em] text-(--color-blogs-detail-title)",
            blogFeatureTitleClassName,
          )}
        >
          Explore More Thoughts
        </h2>

        <Link
          href="/blogs"
          className="hidden shrink-0 font-poppins text-[14px] leading-[1.4] font-medium text-text transition-colors duration-200 hover:text-(--color-blogs-detail-title) md:inline-flex"
        >
          View all
        </Link>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        {relatedBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            articleClassName="h-full md:max-w-none md:grid-cols-[168px_minmax(0,1fr)]"
            dateClassName="self-center text-center md:self-start md:text-left"
            footerClassName="pt-0 lg:mt-auto"
            imageClassName="h-75 md:h-75 md:w-42"
            metaContainerClassName="order-3 mt-3 lg:mt-2 lg:flex-1"
            typesClassName="order-2 mt-4"
            titleClassName="order-1 text-[20px] leading-[1.35] md:text-[24px] md:leading-[1.4]"
            maxTypes={1}
          />
        ))}
      </div>
    </section>
  );
}