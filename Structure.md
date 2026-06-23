# Project Structure

## Goals

This architecture is designed for:

* Next.js App Router
* TypeScript
* Tailwind CSS
* GSAP + ScrollTrigger
* Lenis
* Framer Motion
* Feature isolation
* Shared motion primitives
* Design tokens

---

# Folder Structure

```txt
src/
│
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   │   └── navbar/
│   ├── providers/
│   │   └── smooth-scroll-provider.tsx
│   └── shared/
│       ├── animations/
│       ├── cursor/
│       ├── icons/
│       └── motion/
│
├── config/
│   ├── navbar.config.ts
│   └── site.config.ts
│
├── features/
│   ├── hero/
│   ├── ambition/
│   ├── services/
│   └── storytelling/
│
├── hooks/
│   ├── use-desktop-breakpoint.ts
│   ├── use-media-query.ts
│   ├── use-pointer-spring-position.ts
│   └── use-scroll-direction.ts
│
├── lib/
│   ├── breakpoints.ts
│   ├── cn.ts
│   ├── explore-cursor-state.ts
│   ├── format-index.ts
│   ├── gsap.ts
│   ├── hero-scroll-state.ts
│   ├── lenis-scroll-trigger.ts
│   ├── navbar-scroll-memory.ts
│   ├── parse-path-svg.ts
│   ├── read-css-var.ts
│   ├── scroll-path-draw.ts
│   ├── scroll-session.ts
│   └── sync-active-index-from-progress.ts
│
└── styles/
    └── variables.css
```

Each feature follows:

```txt
features/[feature]/
├── components/
├── animations/   (GSAP scroll / timeline logic)
├── hooks/
├── constants/
├── lib/          (feature-only helpers)
└── index.ts      (public section export only)
```

---

# Page Composition

`page.tsx` composes sections only:

```txt
Hero → Ambition → Services → Storytelling
```

No animation logic in the page.

---

# Animation Architecture

| Animation Type | Library | Location |
| --- | --- | --- |
| Text reveals / hover | Framer Motion | `features/*/components/` + `constants/` |
| Scroll pin / SVG draw | GSAP + ScrollTrigger | `features/*/animations/` + `hooks/` |
| Shared slide / arrow swap | Framer Motion | `components/shared/motion/` |

---

## Framer Motion Pattern

Motion config lives in feature constants:

```txt
features/hero/constants/hero.config.ts
features/hero/components/hero-headline.tsx
```

---

## GSAP Pattern

Scroll logic stays in animation files or hooks:

```txt
features/hero/animations/hero-path-draw.ts
features/services/hooks/use-active-service.ts
```

Always use:

```tsx
useGSAP(() => { ... }, { scope: containerRef })
```

Breakpoint-specific scroll behavior uses `gsap.matchMedia()` with `DESKTOP_MEDIA_QUERY` from `lib/breakpoints.ts`.

---

# Shared Layer

Cross-feature primitives live outside features:

```txt
components/shared/motion/     slide variants, arrow swap
components/shared/animations/ AnimatedArrowSwap
lib/read-css-var.ts          CSS token readers
lib/format-index.ts          index formatting
lib/explore-cursor-state.ts  cursor zone (useSyncExternalStore)
```

Features must not import from other features for motion primitives.

---

# Lenis Integration

Lenis is initialized once in:

```txt
components/providers/smooth-scroll-provider.tsx
```

Scroll session bootstrap runs via `prepareFreshPageScrollSession()` in the provider — not on module import.

---

# GSAP Setup

Register plugins once in `lib/gsap.ts`. Import `@/lib/gsap` in `app/layout.tsx`.

---

# Import Rules

Prefer absolute paths:

```tsx
import { heroConfig } from "@/features/hero/constants/hero.config"
```

Avoid deep relative imports (`../../../`) inside features.

Barrel exports (`index.ts`) expose the section component only:

```tsx
export { Hero } from "./components/hero"
```

---

# Responsive Animation Strategy

| Viewport | Strategy |
| --- | --- |
| Desktop | Full pin, scroll-driven index, SVG draw |
| Mobile | No pin; manual navigation for multi-item sections |

Use `gsap.matchMedia()` for GSAP breakpoint logic and `useDesktopBreakpoint()` for React layout branching.

---

# Performance Rules

Animate only `transform` and `opacity` in GSAP.

Navbar variant morph uses CSS classes + transitions, not GSAP layout properties.

---

# Golden Rule

```txt
lib / shared  →  contracts & primitives
features      →  isolated sections
app           →  composition only
```

Component = UI  
Constants = motion config  
Animation file / hook = scroll behavior  
Page = composition only
