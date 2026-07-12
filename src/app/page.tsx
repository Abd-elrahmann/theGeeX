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
    <main className="relative z-(--page-main-z-index) flex flex-1 flex-col">
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
      <div className="relative mt-(--lets-talk-margin-top) h-(--lets-talk-footer-reveal-height)">
        <div className="sticky top-(--navbar-height) z-10 md:top-0">
          <LetsTalkSection revealFooterOnScroll />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-(--footer-reveal-bottom-gap) z-15 h-(--footer-overlap-bleed-height) bg-(--color-footer-surface)"
        />

        <div className="absolute inset-x-0 bottom-(--footer-reveal-bottom-gap) z-20">
          <SiteFooter revealFromPreviousSection />
        </div>
      </div>
    </main>
  );
}
