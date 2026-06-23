export const heroConfig = {
  headline: {
    lines: ["Everything your", "business needs", "- to run digitally"] as const,
    compactLines: ["Everything your business needs", " - to run digitally"] as const,
    quoteOpen: '"',
    quoteClose: '"',
  },
  path: {
    scroll: {
      startAlign: "top",
      distance: 1000,
      holdDistance: 400,
      offset: 0,
      scrub: 1,
      progressStart: 0,
      progressEnd: 1,
    },
  },
  reveal: {
    initial: {
      opacity: 0,
      y: 16,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: 0.6,
      type: "spring" as const,
      stiffness: 120,
      damping: 18,
    },
    stagger: 0.075,
    viewport: {
      once: true,
      amount: 0.5,
    },
  },
} as const;
