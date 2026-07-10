"use client";

import { ExploreSectionCursor } from "@/components/shared/cursor";
import { useIsServicesExploreCursorActive } from "@/lib/explore-cursor-state";

import { exploreCursorTransition } from "@/components/shared/cursor/constants/cursor.config";

import { servicesCursorLabel } from "@/features/services/constants/services";

export function ServicesSectionCursor() {
  const isVisible = useIsServicesExploreCursorActive();

  return (
    <ExploreSectionCursor
      isVisible={isVisible}
      label={servicesCursorLabel}
      transition={exploreCursorTransition}
    />
  );
}