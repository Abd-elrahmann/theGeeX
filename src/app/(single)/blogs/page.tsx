import type { Metadata } from "next";

import { BlogsPage } from "@/features/blogs";

export const metadata: Metadata = {
  title: "Blogs | theGeeX",
  description: "Read theGeeX blog articles on product, design, engineering, mobile, and growth.",
};

export default function BlogsRoute() {
  return <BlogsPage />;
}