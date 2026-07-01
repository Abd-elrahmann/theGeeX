export const storytellingConfig = {
  scroll: {
    distance: 2800,
    progressStart: 0,
    progressEnd: 1,
  },
  path: {
    src: "/images/storytelling-path.svg",
    viewBox: "0 0 1946 1290",
    strokeWidth: 32,
    hidePadding: 4,
  },
  background: {
    mobileTriggerStart: "top bottom",
    mobileTriggerEnd: "bottom top",
    light: "rgba(255, 255, 255, 0)",
    dark: "var(--color-storytelling-background-dark)",
  },
} as const;
