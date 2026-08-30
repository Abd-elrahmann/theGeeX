import type { BlogAuthor } from "@/features/blogs/constants/blogs";
import { BlogAuthorByline } from "@/features/blogs/shared/components/blog-author-byline";
import { cn } from "@/lib/cn";

interface BlogCardMetaProps {
  date: string;
  author: BlogAuthor;
  dateClassName?: string;
  footerClassName?: string;
  metaContainerClassName?: string;
  authorImageAfterText?: boolean;
}

export function BlogCardMeta({
  date,
  author,
  dateClassName,
  footerClassName,
  metaContainerClassName,
  authorImageAfterText = false,
}: BlogCardMetaProps) {
  return (
    <div className={cn("order-3 flex w-full flex-col items-start gap-(--blogs-card-meta-stack-gap) md:order-0 md:items-start", metaContainerClassName)}>
      <p
        className={cn(
          "order-0 mt-(--blogs-card-date-margin-top) h-auto w-auto whitespace-pre text-left font-poppins",
          "text-(length:--blogs-card-meta-size) leading-(--blogs-card-meta-line-height)",
          "font-normal tracking-normal text-(--color-blogs-card-meta)",
          dateClassName,
        )}
      >
        {date}
      </p>

      <div
        className={cn(
          "order-1 flex h-min w-fit items-center justify-center gap-2 pt-(--blogs-card-footer-padding-top)",
          footerClassName,
        )}
      >
        <BlogAuthorByline
          author={author}
          containerClassName="flex h-min w-fit items-center justify-center gap-2"
          imageWrapperClassName="h-(--blogs-card-author-image-height) w-(--blogs-card-author-image-width)"
          textContainerClassName="contents"
          labelClassName="whitespace-pre !text-(length:--blogs-card-meta-size) !leading-(--blogs-card-meta-line-height) normal-case !tracking-normal text-(--color-blogs-card-meta)"
          nameClassName="whitespace-pre !text-(length:--blogs-card-meta-size) !leading-(--blogs-card-meta-line-height) !font-normal text-(--color-blogs-card-meta)"
          imageAfterText={authorImageAfterText}
        />
      </div>
    </div>
  );
}