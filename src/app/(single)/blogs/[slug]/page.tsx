import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogDetailPage } from "@/features/blogs/single/components/blog-detail-page";
import { getAllBlogSlugs, getBlogArticleBySlug } from "@/features/blogs/constants/blogs";
import { createPageMetadata } from "@/lib/metadata";

interface BlogRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return createPageMetadata({ title: "Blog", path: "/blogs", noIndex: true });
  }

  return createPageMetadata({
    title: article.breadcrumbLabel,
    description:
      article.detailBlocks.find((block) => block.type === "paragraph")?.content ?? "Read theGeeX blog article.",
    path: `/blogs/${slug}`,
  });
}

export default async function BlogRoute({ params }: BlogRouteProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <BlogDetailPage article={article} />;
}