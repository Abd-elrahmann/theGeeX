"use client";

import { useRef } from "react";

import { cn } from "@/lib/cn";

import { HeroHeadline } from "./hero-headline";
import { HeroPath } from "./hero-path";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative isolate z-(--hero-z-index) flex h-svh w-full max-w-full items-center justify-center",
        "safari-overflow-x-clip overflow-y-visible bg-background",
        "md:[clip-path:var(--hero-path-clip-path)]",
        "px-(--hero-padding-x) py-0",
      )}
      aria-label="Hero"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 flex h-svh w-full max-w-full justify-center safari-overflow-x-clip",
          "max-md:items-center max-md:overflow-y-visible",
          "md:items-start md:overflow-y-visible",
        )}
      >
        <HeroPath triggerRef={sectionRef} />
      </div>

      <div className="relative z-10 w-full max-w-full max-lg:pointer-events-none lg:flex lg:justify-center">
        <HeroHeadline />
      </div>
    </section>
  );
}
