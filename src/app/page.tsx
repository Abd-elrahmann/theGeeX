import type { Metadata } from "next";

import { Ambition } from "@/features/ambition";
import { AiGrowthSection } from "@/features/ai-growth";
import { AwardsSection } from "@/features/awards";
import { BlogsSection } from "@/features/blogs";
import { SiteFooter } from "@/features/footer";
import { Hero } from "@/features/hero";
import { LetsTalkSection } from "@/features/lets-talk";
import { OurCultureSection } from "@/features/our-culture";
import { OurTeamSection } from "@/features/our-team";
import { PackagesSection } from "@/features/packages";
import { ProcessSection } from "@/features/process";
import { ProjectsSection } from "@/features/projects";
import { ServicesSection } from "@/features/services";
import { StorytellingSection } from "@/features/storytelling";
import { TestimonialsSection } from "@/features/testimonials";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  description:
    "Explore theGeeX across strategy, branding, product design, engineering, AI automation, growth, and digital transformation services.",
  path: "/",
});

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col">
      <Hero />
      <Ambition />
      <ServicesSection />
      <AiGrowthSection />
      <StorytellingSection />
      <ProjectsSection />
      <OurCultureSection />
      <OurTeamSection />
      <ProcessSection />
      <TestimonialsSection />
      <AwardsSection />
      <BlogsSection />
      <PackagesSection />
      <div className="relative mt-(--lets-talk-margin-top) min-h-(--lets-talk-footer-reveal-height) md:mt-0">
        <div className="sticky z-10" style={{ top: "var(--lets-talk-reveal-sticky-top)" }}>
          <LetsTalkSection revealFooterOnScroll />
        </div>

        <div className="sticky z-20 mt-(--footer-reveal-gap)" style={{ top: "var(--lets-talk-reveal-sticky-top)" }}>
          <SiteFooter revealFromPreviousSection />
        </div>
      </div>
    </main>
  );
}
