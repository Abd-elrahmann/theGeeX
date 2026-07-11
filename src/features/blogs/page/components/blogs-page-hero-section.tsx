import { blogsPageTitle } from "@/features/blogs/constants/blogs";
import { blogsPageDescription } from "@/features/blogs/page/constants/blogs-page";
import { blogFeatureTitleClassName } from "@/features/blogs/shared/utils/blog-styles";
import { cn } from "@/lib/cn";

export function BlogsPageHeroSection() {
  return (
    <header className="flex w-full flex-col items-center gap-4">
      <h1
        id="blogs-page-title"
        className={cn(
          "m-0 w-full max-w-150 whitespace-pre-wrap wrap-break-word font-cal-sans text-[clamp(42px,8vw,70px)] leading-[1.4] font-semibold tracking-normal text-text",
          blogFeatureTitleClassName,
        )}
      >
        {blogsPageTitle}
      </h1>

      <p className="m-0 w-full max-w-175 whitespace-pre-wrap wrap-break-word font-poppins text-[16px] leading-[1.6] font-normal tracking-normal text-text font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
        {blogsPageDescription}
      </p>
    </header>
  );
}