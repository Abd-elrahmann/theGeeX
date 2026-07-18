import { cn } from "@/lib/cn";

import { blogsHomeSectionTitle } from "@/features/blogs/constants/blogs";

const blogsTitleHeadingClassName = cn(
  "relative m-0 mx-auto flex w-full justify-center p-0",
  "max-w-(--blogs-container-max-width)",
);

const blogsTitleTextClassName = cn(
  "font-cal-sans not-italic",
  "font-(--blogs-title-font-weight)",
  "text-[length:var(--blogs-title-size)] leading-(--blogs-title-line-height)",
  "tracking-[0px] text-center whitespace-nowrap",
  "[font-feature-settings:normal]",
);

interface BlogsTitleProps {
  title?: string;
}

export function BlogsTitle({ title = blogsHomeSectionTitle }: BlogsTitleProps) {
  return (
    <div className="pointer-events-none relative z-(--blogs-title-z-index) w-full overflow-visible">
      <h2 className={blogsTitleHeadingClassName}>
        <span
          className={blogsTitleTextClassName}
          style={{
            display: "inline-block",
            backgroundImage: "linear-gradient(180deg, rgb(0 0 0 / 36%) 0%, rgb(0 0 0 / 8%) 100%)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {title}
        </span>
      </h2>
    </div>
  );
}