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
        containerClassName="flex items-center gap-2 md:gap-3"
        imageWrapperClassName="h-(--blogs-card-author-image-height) w-(--blogs-card-author-image-width)"
        labelClassName="whitespace-pre !text-[14px] !leading-[1.6] normal-case !tracking-normal text-nav-link"
        nameClassName="whitespace-pre !text-[14px] !leading-[1.6] !font-normal text-nav-link"
        imageAfterText
      />

      <div className="flex items-center gap-2">
        <ClockIcon />
        <p className={cn("m-0", blogMetaTextClassName)}>{article.readingTime}</p>
      </div>
    </section>
  );
}