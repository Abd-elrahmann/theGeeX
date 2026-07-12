import { BlogCard } from "@/features/blogs/shared/components/blog-card";
import { blogItems } from "@/features/blogs/constants/blogs";

export function BlogsPageListSection() {
  return (
    <div
      className="flex w-full flex-col gap-6"
      style={{
        paddingInlineStart: "max(0px, calc((100% - 700px) / 2))",
      }}
    >
      {blogItems.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          articleClassName="md:max-w-[820px]"
          dateClassName="self-center text-center md:self-start md:text-left lg:mt-4"
          metaContainerClassName="order-3 lg:order-3 lg:mt-0 lg:flex-1"
          typesClassName="order-2 mt-4 lg:order-1"
          titleClassName="order-1 lg:order-2 max-w-96 overflow-hidden text-[20px] leading-[1.35] font-normal [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] md:max-w-140 md:text-(length:--blogs-card-title-size) md:leading-(--blogs-card-title-line-height) lg:max-w-110"
          footerClassName="lg:mt-auto lg:pt-2"
          authorImageAfterText
        />
      ))}
    </div>
  );
}