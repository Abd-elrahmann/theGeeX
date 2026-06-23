"use client";

import { useSyncExternalStore } from "react";

export type ExploreCursorZone = "none" | "services" | "projects" | "blogs";

let exploreCursorZone: ExploreCursorZone = "none";
const listeners = new Set<() => void>();

function emitExploreCursorChange(): void {
  listeners.forEach((listener) => {
    listener();
  });
}

export function getExploreCursorZone(): ExploreCursorZone {
  return exploreCursorZone;
}

export function setExploreCursorZone(zone: ExploreCursorZone): void {
  if (exploreCursorZone === zone) {
    return;
  }

  exploreCursorZone = zone;
  emitExploreCursorChange();
}

export function subscribeExploreCursor(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);

  return () => {
    listeners.delete(onStoreChange);
  };
}

export function useExploreCursorZone(): ExploreCursorZone {
  return useSyncExternalStore(
    subscribeExploreCursor,
    getExploreCursorZone,
    () => "none" as ExploreCursorZone,
  );
}

export function useIsServicesExploreCursorActive(): boolean {
  return useExploreCursorZone() === "services";
}

export function useHasActiveExploreCursor(): boolean {
  return useExploreCursorZone() !== "none";
}

export function useIsBlogsExploreCursorActive(): boolean {
  return useExploreCursorZone() === "blogs";
}
