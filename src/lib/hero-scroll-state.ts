export const HERO_PINNED_CLASS = "hero-is-pinned";
export const HERO_SCROLL_STATE_EVENT = "hero-scroll-state-change";

export type HeroScrollIntent = -1 | 1;
export type HeroNavbarVariant = "primary" | "rounded";

interface HeroScrollState {
  isPinned: boolean;
  drawProgress: number;
  scrollIntent: HeroScrollIntent;
  navbarVariant: HeroNavbarVariant;
  isUpwardNavbarSession: boolean;
}

const DEFAULT_HERO_SCROLL_STATE: HeroScrollState = {
  isPinned: false,
  drawProgress: 0,
  scrollIntent: 1,
  navbarVariant: "primary",
  isUpwardNavbarSession: false,
};

let heroScrollState: HeroScrollState = { ...DEFAULT_HERO_SCROLL_STATE };
let latchedScrollIntent: HeroScrollIntent = 1;
let lastTrackedDrawProgress = 0;
let isHeroSessionActive = false;
let isUpwardSessionLocked = false;
let navbarVariantLatched: HeroNavbarVariant | null = null;
let upwardSessionFloorProgress = 1;

const DRAW_PROGRESS_EPSILON = 0.012;
const DRAW_INTENT_DOWN_DELTA = 0.03;
const DRAW_INTENT_UP_DELTA = 0.004;
const HERO_MORPH_TO_PRIMARY_AT = 0.48;
const UPWARD_SESSION_RELEASE_DELTA = 0.08;

function dispatchHeroScrollStateChange(): void {
  window.dispatchEvent(
    new CustomEvent(HERO_SCROLL_STATE_EVENT, {
      detail: { ...heroScrollState },
    }),
  );
}

function shouldDispatchDrawProgress(nextProgress: number, previousProgress: number): boolean {
  return Math.abs(nextProgress - previousProgress) >= DRAW_PROGRESS_EPSILON;
}

function resolveScrollIntent(drawProgress: number): HeroScrollIntent {
  if (isUpwardSessionLocked) {
    latchedScrollIntent = -1;
    lastTrackedDrawProgress = drawProgress;
    return latchedScrollIntent;
  }

  if (drawProgress < lastTrackedDrawProgress - DRAW_INTENT_UP_DELTA) {
    latchedScrollIntent = -1;
    isUpwardSessionLocked = true;
  } else if (drawProgress > lastTrackedDrawProgress + DRAW_INTENT_DOWN_DELTA) {
    latchedScrollIntent = 1;
  }

  lastTrackedDrawProgress = drawProgress;

  return latchedScrollIntent;
}

function resolveHeroNavbarVariant(
  drawProgress: number,
  scrollIntent: HeroScrollIntent,
): HeroNavbarVariant {
  if (scrollIntent !== -1) {
    navbarVariantLatched = null;
    return "primary";
  }

  if (navbarVariantLatched === "primary") {
    return "primary";
  }

  if (drawProgress <= HERO_MORPH_TO_PRIMARY_AT) {
    navbarVariantLatched = "primary";
    return "primary";
  }

  return "rounded";
}

export function releaseUpwardNavbarSession(): void {
  if (!isUpwardSessionLocked) {
    return;
  }

  isUpwardSessionLocked = false;
  latchedScrollIntent = 1;
  navbarVariantLatched = null;
  upwardSessionFloorProgress = 1;

  heroScrollState = {
    ...heroScrollState,
    scrollIntent: 1,
    isUpwardNavbarSession: false,
    navbarVariant: "primary",
  };

  dispatchHeroScrollStateChange();
}

export function maybeReleaseUpwardNavbarSession(drawProgress: number): boolean {
  if (!isUpwardSessionLocked) {
    return false;
  }

  upwardSessionFloorProgress = Math.min(upwardSessionFloorProgress, drawProgress);

  if (drawProgress < upwardSessionFloorProgress + UPWARD_SESSION_RELEASE_DELTA) {
    return false;
  }

  releaseUpwardNavbarSession();
  return true;
}

export function lockUpwardNavbarSession(drawProgress = heroScrollState.drawProgress): void {
  isHeroSessionActive = true;
  isUpwardSessionLocked = true;
  latchedScrollIntent = -1;
  lastTrackedDrawProgress = drawProgress;
  upwardSessionFloorProgress = drawProgress;
  navbarVariantLatched = null;

  const nextNavbarVariant = resolveHeroNavbarVariant(drawProgress, -1);

  heroScrollState = {
    ...heroScrollState,
    drawProgress,
    scrollIntent: -1,
    isPinned: true,
    isUpwardNavbarSession: true,
    navbarVariant: nextNavbarVariant,
  };

  document.documentElement.classList.add(HERO_PINNED_CLASS);
  dispatchHeroScrollStateChange();
}

export function setHeroScrollState(
  next: Partial<HeroScrollState> & { isScrollTriggerActive?: boolean },
): void {
  const previous = heroScrollState;
  const { isScrollTriggerActive, ...statePatch } = next;
  const nextDrawProgress = statePatch.drawProgress ?? heroScrollState.drawProgress;

  if (isScrollTriggerActive && nextDrawProgress > 0.002) {
    isHeroSessionActive = true;

    if (lastTrackedDrawProgress === 0 && nextDrawProgress > 0.002) {
      lastTrackedDrawProgress = nextDrawProgress;
    }
  }

  const nextScrollIntent =
    statePatch.drawProgress === undefined
      ? (statePatch.scrollIntent ?? heroScrollState.scrollIntent)
      : resolveScrollIntent(nextDrawProgress);

  const nextNavbarVariant = resolveHeroNavbarVariant(
    nextDrawProgress,
    nextScrollIntent,
  );

  heroScrollState = {
    ...heroScrollState,
    ...statePatch,
    drawProgress: nextDrawProgress,
    scrollIntent: nextScrollIntent,
    isPinned:
      isHeroSessionActive &&
      (Boolean(isScrollTriggerActive) || isUpwardSessionLocked),
    isUpwardNavbarSession: isUpwardSessionLocked,
    navbarVariant: nextNavbarVariant,
  };

  document.documentElement.classList.toggle(
    HERO_PINNED_CLASS,
    heroScrollState.isPinned,
  );

  const pinnedChanged = previous.isPinned !== heroScrollState.isPinned;
  const intentChanged = previous.scrollIntent !== heroScrollState.scrollIntent;
  const variantChanged = previous.navbarVariant !== heroScrollState.navbarVariant;
  const upwardSessionChanged =
    previous.isUpwardNavbarSession !== heroScrollState.isUpwardNavbarSession;
  const progressChanged = shouldDispatchDrawProgress(
    nextDrawProgress,
    previous.drawProgress,
  );

  if (
    pinnedChanged ||
    intentChanged ||
    variantChanged ||
    upwardSessionChanged ||
    progressChanged
  ) {
    dispatchHeroScrollStateChange();
  }
}

export function resetHeroScrollState(): void {
  latchedScrollIntent = 1;
  lastTrackedDrawProgress = 0;
  isHeroSessionActive = false;
  isUpwardSessionLocked = false;
  navbarVariantLatched = null;
  upwardSessionFloorProgress = 1;
  heroScrollState = { ...DEFAULT_HERO_SCROLL_STATE };
  document.documentElement.classList.remove(HERO_PINNED_CLASS);
  dispatchHeroScrollStateChange();
}

export function isHeroPinned(): boolean {
  return heroScrollState.isPinned;
}

export function isUpwardNavbarSession(): boolean {
  return heroScrollState.isUpwardNavbarSession;
}

export function getHeroNavbarVariant(): HeroNavbarVariant {
  return heroScrollState.navbarVariant;
}
