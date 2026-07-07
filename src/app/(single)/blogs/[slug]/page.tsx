import { notFound } from "next/navigation";

import { BlogDetailPage } from "@/features/blogs/components/blog-detail-page";
import { getAllBlogSlugs, getBlogArticleBySlug } from "@/features/blogs/constants/blogs";

interface BlogRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogRouteProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return {
      title: "Blog | theGeeX",
    };
  }

  return {
    title: `${article.breadcrumbLabel} | theGeeX`,
    description:
      article.detailBlocks.find((block) => block.type === "paragraph")?.content ?? "Read theGeeX blog article.",
  };
}

export default async function BlogRoute({ params }: BlogRouteProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <BlogDetailPage article={article} />;
}