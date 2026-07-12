import type { BlogArticleDetailBlock } from "@/features/blogs/constants/blogs";
import { renderInlineBold } from "@/features/blogs/single/utils/blog-detail";
import { cn } from "@/lib/cn";

interface BlogDetailBlockViewProps {
  block: BlogArticleDetailBlock;
  isFirstHeading: boolean;
}

export function BlogDetailBlockView({
  block,
  isFirstHeading,
}: BlogDetailBlockViewProps) {
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
            "box-border flex h-min w-full flex-col items-center justify-center overflow-(--overflow-clip-fallback)",
            "border border-(--color-blogs-detail-callout-border) bg-(--color-blogs-detail-callout-bg) px-3 py-3 md:px-4 md:py-3",
          )}
        >
          <div className="flex w-full max-w-160 flex-col items-center">
            <p className="m-0 w-full max-w-105 whitespace-pre-wrap rounded-xs border border-(--color-blogs-detail-callout-border) px-3 py-1.5 text-center font-poppins text-[16px] leading-[1.6] font-normal tracking-normal text-text font-features-[normal]">
              {renderInlineBold(topLine)}
            </p>

            <div className="relative h-10 w-full max-w-105" aria-hidden="true">
              <svg
                viewBox="0 0 420 40"
                className="absolute inset-0 h-full w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <marker
                    id="blog-split-arrowhead"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6.5"
                    refY="4"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0 0L8 4L0 8" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </marker>
                </defs>
                <path d="M210 4V14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                <path d="M210 14L156 34" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" markerEnd="url(#blog-split-arrowhead)" />
                <path d="M210 14L264 34" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" markerEnd="url(#blog-split-arrowhead)" />
              </svg>
            </div>

            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
              <p className="m-0 whitespace-pre-wrap rounded-xs border border-(--color-blogs-detail-callout-border) px-2.5 py-1.5 text-center font-poppins text-[16px] leading-[1.6] font-normal tracking-normal text-text font-features-[normal]">
                {renderInlineBold(leftTarget)}
              </p>
              <p className="m-0 whitespace-pre-wrap rounded-xs border border-(--color-blogs-detail-callout-border) px-2.5 py-1.5 text-center font-poppins text-[16px] leading-[1.6] font-normal tracking-normal text-text font-features-[normal]">
                {renderInlineBold(rightTarget)}
              </p>
            </div>
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