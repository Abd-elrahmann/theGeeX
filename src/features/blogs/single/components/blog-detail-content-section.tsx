import type { BlogArticleDetail } from "@/features/blogs/constants/blogs";
import { BlogDetailBlockView } from "@/features/blogs/single/components/blog-detail-block-view";

interface BlogDetailContentSectionProps {
  article: BlogArticleDetail;
}

export function BlogDetailContentSection({ article }: BlogDetailContentSectionProps) {
  let headingCount = 0;

  return (
    <section className="flex w-full flex-col gap-8">
      <div className="flex w-full max-w-225 flex-col gap-8">
        {article.detailBlocks.map((block, index) => (
          <BlogDetailBlockView
            key={`${article.slug}-${block.type}-${index}`}
            block={block}
            isFirstHeading={block.type === "heading" && headingCount++ === 0}
          />
        ))}
      </div>
    </section>
  );
}