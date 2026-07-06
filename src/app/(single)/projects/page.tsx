import type { Metadata } from "next";

import { ProjectsPage } from "@/features/projects";

export const metadata: Metadata = {
  title: "Projects | theGeeX",
  description: "Explore six featured theGeeX projects across web, mobile, branding, and digital platforms.",
};

export default function ProjectsRoute() {
  return <ProjectsPage />;
}