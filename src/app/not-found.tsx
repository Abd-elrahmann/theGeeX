import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { NotFoundContent } from "@/components/shared/not-found-content";

export const metadata: Metadata = createPageMetadata({
  title: "Page Not Found",
  description: "The page you are looking for could not be found on theGeeX.",
  noIndex: true,
});

const notFoundButtonTransition = {
  type: "spring" as const,
  stiffness: 110,
  damping: 15,
  mass: 0.9,
  delay: 0,
};

export default function NotFoundPage() {
  return <NotFoundContent />;
}