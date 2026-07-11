import type { BlogArticleDetail } from "@/features/blogs/constants/blogs";
import { BlogAuthorByline } from "@/features/blogs/shared/components/blog-author-byline";
import { blogMetaTextClassName } from "@/features/blogs/shared/utils/blog-styles";
import { ClockIcon } from "@/features/blogs/single/shared/components/clock-icon";
import { cn } from "@/lib/cn";

interface BlogDetailMetaSectionProps {
  article: BlogArticleDetail;
}

export function BlogDetailMetaSection({ article }: BlogDetailMetaSectionProps) {
  return (
    <section className="-mt-12 flex w-full flex-row items-center justify-between gap-4 pt-6 md:gap-10">
      <BlogAuthorByline
        author={article.author}
        containerClassName="flex items-start gap-3 lg:gap-4"
        imageWrapperClassName="h-6.25 w-4.5 rounded-[999px]"
        textContainerClassName="flex flex-col gap-1"
      />

      <div className="flex items-center gap-2">
        <ClockIcon />
        <p className={cn("m-0", blogMetaTextClassName)}>{article.readingTime}</p>
      </div>
    </section>
  );
}