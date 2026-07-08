import type { Metadata } from "next";

import { BlogsPage } from "@/features/blogs";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Blogs",
  description: "Read theGeeX articles on product strategy, design, engineering, mobile, AI, and digital growth.",
  path: "/blogs",
});

export default function BlogsRoute() {
  return <BlogsPage />;
}