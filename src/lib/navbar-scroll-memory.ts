let lastAppliedNavbarStateKey = "";

export function getNavbarScrollMemoryKey(): string {
  return lastAppliedNavbarStateKey;
}

export function setNavbarScrollMemoryKey(stateKey: string): void {
  lastAppliedNavbarStateKey = stateKey;
}

export function resetNavbarScrollMemory(): void {
  lastAppliedNavbarStateKey = "";
}
