import type { BlogAuthor } from "@/features/blogs/constants/blogs";
import { BlogAuthorByline } from "@/features/blogs/shared/components/blog-author-byline";
import { cn } from "@/lib/cn";

interface BlogCardMetaProps {
  date: string;
  author: BlogAuthor;
  dateClassName?: string;
  footerClassName?: string;
  metaContainerClassName?: string;
}

export function BlogCardMeta({
  date,
  author,
  dateClassName,
  footerClassName,
  metaContainerClassName,
}: BlogCardMetaProps) {
  return (
    <div className={cn("order-3 flex w-full flex-col items-center md:order-0 md:items-start", metaContainerClassName)}>
      <p
        className={cn(
          "mt-(--blogs-card-date-margin-top) h-auto w-auto whitespace-pre text-center font-poppins md:text-left",
          "text-(length:--blogs-card-meta-size) leading-(--blogs-card-meta-line-height)",
          "font-normal tracking-normal text-(--color-blogs-card-meta)",
          dateClassName,
        )}
      >
        {date}
      </p>

      <div
        className={cn(
          "flex w-full items-center justify-center gap-(--blogs-card-footer-gap) pt-(--blogs-card-footer-padding-top) md:justify-start",
          footerClassName,
        )}
      >
        <BlogAuthorByline
          author={author}
          containerClassName="flex items-center justify-center gap-(--blogs-card-footer-gap)"
          imageWrapperClassName="h-(--blogs-card-author-image-height) w-(--blogs-card-author-image-width)"
          textContainerClassName="contents"
          labelClassName="whitespace-pre !text-(length:--blogs-card-meta-size) !leading-(--blogs-card-meta-line-height) normal-case !tracking-normal text-(--color-blogs-card-meta)"
          nameClassName="whitespace-pre !text-(length:--blogs-card-meta-size) !leading-(--blogs-card-meta-line-height) !font-normal text-(--color-blogs-card-meta)"
        />
      </div>
    </div>
  );
}