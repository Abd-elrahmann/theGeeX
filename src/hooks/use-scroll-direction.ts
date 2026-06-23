import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down";

interface UseScrollDirectionOptions {
  threshold?: number;
  trackPosition?: boolean;
}

interface UseScrollDirectionReturn {
  scrollDirection: ScrollDirection | null;
  isAtTop: boolean;
  scrollY: number;
}

function getCurrentScrollY(): number {
  return typeof window === "undefined" ? 0 : window.scrollY;
}

export function useScrollDirection(
  options: UseScrollDirectionOptions = {},
): UseScrollDirectionReturn {
  const { threshold = 10, trackPosition = true } = options;
  const initialScrollY = getCurrentScrollY();
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection | null>(
    null,
  );
  const [isAtTop, setIsAtTop] = useState(initialScrollY <= threshold);
  const [scrollY, setScrollY] = useState(initialScrollY);
  const lastScrollY = useRef(initialScrollY);
  const scrollDirectionRef = useRef<ScrollDirection | null>(null);
  const isAtTopRef = useRef(initialScrollY <= threshold);

  useEffect(() => {
    lastScrollY.current = getCurrentScrollY();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (trackPosition) {
        setScrollY(currentScrollY);
        const nextIsAtTop = currentScrollY <= threshold;

        if (nextIsAtTop !== isAtTopRef.current) {
          isAtTopRef.current = nextIsAtTop;
          setIsAtTop(nextIsAtTop);
        }
      }

      if (Math.abs(currentScrollY - lastScrollY.current) < threshold) {
        return;
      }

      const nextDirection = currentScrollY > lastScrollY.current ? "down" : "up";

      if (nextDirection !== scrollDirectionRef.current) {
        scrollDirectionRef.current = nextDirection;
        setScrollDirection(nextDirection);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, trackPosition]);

  return { scrollDirection, isAtTop, scrollY };
}
