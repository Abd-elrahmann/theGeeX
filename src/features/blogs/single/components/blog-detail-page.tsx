import type { BlogArticleDetail } from "@/features/blogs/constants/blogs";
import { BlogDetailContentSection } from "@/features/blogs/single/components/blog-detail-content-section";
import { BlogDetailHeroSection } from "@/features/blogs/single/components/blog-detail-hero-section";
import { BlogDetailMetaSection } from "@/features/blogs/single/components/blog-detail-meta-section";
import { BlogDetailRelatedSection } from "@/features/blogs/single/components/blog-detail-related-section";

interface BlogDetailPageProps {
  article: BlogArticleDetail;
}

export function BlogDetailPage({ article }: BlogDetailPageProps) {
  return (
    <main className="relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--navbar-height)">
      <article className="mx-auto flex w-full max-w-300 flex-col gap-10 px-4 pt-14 pb-20 md:px-6 lg:px-8">
        <BlogDetailHeroSection article={article} />
        <BlogDetailMetaSection article={article} />
        <BlogDetailContentSection article={article} />
        <BlogDetailRelatedSection article={article} />
      </article>
    </main>
  );
}