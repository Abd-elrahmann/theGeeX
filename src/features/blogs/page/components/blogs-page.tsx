import { BlogCard } from "@/features/blogs/shared/components/blog-card";
import { blogItems, blogsPageTitle } from "@/features/blogs/constants/blogs";

const blogsPageDescription =
  "Insights on product strategy, design clarity, engineering decisions, mobile experiences, and scalable growth systems from the theGeeX team.";

export function BlogsPage() {
  return (
    <main className="relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--navbar-height)">
      <section
        aria-labelledby="blogs-page-title"
        className="mx-auto flex w-full max-w-300 flex-col items-center gap-8 px-4 pt-12 pb-20 text-center md:px-6 lg:px-8"
      >
        <header className="flex w-full flex-col items-center gap-4">
          <h1
            id="blogs-page-title"
            className="m-0 w-full max-w-150 whitespace-pre-wrap wrap-break-word font-cal-sans text-[clamp(42px,8vw,70px)] leading-[1.4] font-semibold tracking-normal text-text font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]"
          >
            {blogsPageTitle}
          </h1>

          <p className="m-0 w-full max-w-175 whitespace-pre-wrap wrap-break-word font-poppins text-[16px] leading-[1.6] font-normal tracking-normal text-text font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
            {blogsPageDescription}
          </p>
        </header>

        <div
          className="flex w-full flex-col gap-(--blogs-cards-gap)"
          style={{
            paddingInlineStart: "max(0px, calc((100% - 700px) / 2))",
          }}
        >
          {blogItems.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              articleClassName="md:max-w-[820px]"
              dateClassName="self-center text-center md:self-start md:text-left"
              metaContainerClassName="order-3"
              typesClassName="order-2 mt-4 lg:order-1"
              typeChipClassName="lg:text-[16px] lg:leading-[1.6] lg:tracking-[-0.02em]"
              titleClassName="order-1 lg:order-2 max-w-96 overflow-hidden text-[20px] leading-[1.35] font-normal [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] md:max-w-140 md:text-(length:--blogs-card-title-size) md:leading-(--blogs-card-title-line-height) lg:max-w-110"
            />
          ))}
        </div>
      </section>
    </main>
  );
}