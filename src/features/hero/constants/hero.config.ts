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
      x: 0,
      y: 10,
      scale: 1,
      rotate: 0,
      skewX: 0,
      skewY: 0,
      filter: "blur(10px)",
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      skewX: 0,
      skewY: 0,
      filter: "blur(0px)",
    },
    transition: {
      duration: 0.6,
      type: "spring" as const,
      bounce: 0,
    },
    stagger: 0.075,
    viewport: {
      once: true,
      amount: 0,
      margin: "0px 0px -50% 0px",
    },
  },
} as const;
