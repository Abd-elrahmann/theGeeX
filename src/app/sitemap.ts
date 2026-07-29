import type { MetadataRoute } from "next";

import { siteMetadata } from "@/lib/metadata";
import { getAllBlogSlugs } from "@/features/blogs/constants/blogs";
import { packageItems } from "@/features/packages/constants/packages";
import { projects } from "@/features/projects/constants/projects";
import { services } from "@/features/services/constants/services";

const staticRoutes = [
  "",
  "/services",
  "/projects",
  "/blogs",
  "/packages",
  "/contact-us",
  "/book-a-meeting",
  "/build/book-package",
  "/grow/book-package",
  "/scale/book-package",
  "/terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const buildPackageRoutes = packageItems
    .filter((item) => item.chips[0]?.label.toLowerCase() === "build")
    .map((item) => `/build/${item.slug}`);
  const growPackageRoutes = packageItems
    .filter((item) => item.chips[0]?.label.toLowerCase() === "grow")
    .map((item) => `/grow/${item.slug}`);
  const scalePackageRoutes = packageItems
    .filter((item) => item.chips[0]?.label.toLowerCase() === "scale")
    .map((item) => `/scale/${item.slug}`);

  const routes = [
    ...staticRoutes,
    ...services.map((service) => `/services/${service.slug}`),
    ...projects.map((project) => `/projects/${project.slug}`),
    ...packageItems.map((item) => `/packages/${item.slug}`),
    ...getAllBlogSlugs().map((slug) => `/blogs/${slug}`),
    ...buildPackageRoutes,
    ...growPackageRoutes,
    ...scalePackageRoutes,
  ];

  return routes.map((path) => ({
    url: new URL(path || "/", siteMetadata.metadataBase).toString(),
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/services") || path.startsWith("/projects") ? 0.8 : 0.7,
  }));
}