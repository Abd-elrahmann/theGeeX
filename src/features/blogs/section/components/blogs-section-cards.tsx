import { forwardRef } from "react";

import { blogItems } from "@/features/blogs/constants/blogs";
import { BlogCard } from "@/features/blogs/shared/components/blog-card";

export const BlogsSectionCards = forwardRef<HTMLDivElement>(function BlogsSectionCards(
  _props,
  ref,
) {
  return (
    <div ref={ref} className="flex flex-col gap-(--blogs-cards-gap)">
      {blogItems.map((blog) => (
        <BlogCard key={blog.id} blog={blog} authorImageAfterText />
      ))}
    </div>
  );
});