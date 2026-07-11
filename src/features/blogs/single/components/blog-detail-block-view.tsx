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