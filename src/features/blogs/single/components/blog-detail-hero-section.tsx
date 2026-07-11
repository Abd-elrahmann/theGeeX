import Image from "next/image";

import { DetailBreadcrumb } from "@/components/shared/detail-breadcrumb";
import type { BlogArticleDetail } from "@/features/blogs/constants/blogs";
import { blogFeatureTitleClassName } from "@/features/blogs/shared/utils/blog-styles";
import { cn } from "@/lib/cn";

interface BlogDetailHeroSectionProps {
  article: BlogArticleDetail;
}

export function BlogDetailHeroSection({ article }: BlogDetailHeroSectionProps) {
  return (
    <>
      <DetailBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: article.breadcrumbLabel },
        ]}
        className="flex h-4.75 w-min flex-row flex-nowrap content-center items-center justify-center gap-2 overflow-(--overflow-clip-fallback) p-0 whitespace-nowrap font-poppins text-(length:--service-detail-breadcrumb-size) leading-(--service-detail-breadcrumb-line-height) font-normal text-(--color-service-detail-text)"
        linkClassName="whitespace-nowrap transition-colors duration-200 hover:text-(--color-service-detail-text)"
        currentClassName="text-(--color-service-detail-text)"
      />

      <header className="flex w-full flex-col gap-6">
        <h2
          className={cn(
            "m-0 h-auto w-full whitespace-pre-wrap wrap-break-word font-cal-sans",
            "text-[24px] leading-[1.4] font-normal tracking-normal text-(--color-blogs-detail-title) md:text-[40px]",
            blogFeatureTitleClassName,
          )}
        >
          {article.title}
        </h2>

        <p className="m-0 font-poppins text-[16px] leading-[1.6] font-normal text-text">{article.date}</p>

        <div className="flex flex-wrap items-center gap-3">
          {article.categories.map((category) => (
            <span
              key={category}
              className={cn(
                "box-border inline-flex h-min w-auto max-w-full flex-nowrap items-center justify-start gap-2.5 overflow-hidden whitespace-nowrap rounded-4xl px-4 py-1.5",
                "bg-(--color-ai-growth-accent) backdrop-blur-[68px]",
                "font-poppins text-(length:--blogs-card-badge-size) leading-(--blogs-card-badge-line-height)",
                "font-normal tracking-[-0.02em] text-brand-foreground",
              )}
            >
              {category}
            </span>
          ))}
        </div>
      </header>

      <div className="relative h-80 w-full overflow-hidden rounded-3xl md:h-130">
        <Image
          src={article.imageSrc}
          alt={article.imageAlt}
          fill
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover object-center"
        />
      </div>
    </>
  );
}