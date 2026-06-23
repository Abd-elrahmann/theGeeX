"use client";

import { ExploreSectionCursor } from "@/components/shared/cursor";
import { exploreCursorTransition } from "@/components/shared/cursor/constants/cursor.config";
import { useIsBlogsExploreCursorActive } from "@/lib/explore-cursor-state";

import { blogsCursorLabel } from "@/features/blogs/constants/blogs";

export function BlogsSectionCursor() {
  const isVisible = useIsBlogsExploreCursorActive();

  return (
    <ExploreSectionCursor
      isVisible={isVisible}
      label={blogsCursorLabel}
      transition={exploreCursorTransition}
    />
  );
}