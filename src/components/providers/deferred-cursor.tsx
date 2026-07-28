"use client";

import dynamic from "next/dynamic";

const Cursor = dynamic(
  () => import("@/components/shared/cursor").then((module) => module.Cursor),
  {
    ssr: false,
  },
);

export function DeferredCursor() {
  return <Cursor />;
}