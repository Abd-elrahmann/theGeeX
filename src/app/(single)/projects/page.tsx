import type { Metadata } from "next";

import { ProjectsPage } from "@/features/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description: "Explore featured theGeeX projects across web, mobile, branding, platforms, and digital product ecosystems.",
  path: "/projects",
});

export default function ProjectsRoute() {
  return <ProjectsPage />;
}