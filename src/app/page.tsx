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
      <div className="relative mt-(--lets-talk-margin-top) h-auto md:h-(--lets-talk-footer-reveal-height)">
        <div className="relative z-10 md:sticky md:top-0">
          <LetsTalkSection revealFooterOnScroll />
        </div>

        <div
          aria-hidden="true"
          className="hidden absolute inset-x-0 bottom-0 z-15 h-(--footer-overlap-bleed-height) bg-(--color-footer-surface) md:block"
        />

        <div className="relative z-20 md:absolute md:inset-x-0 md:bottom-0">
          <SiteFooter revealFromPreviousSection />
        </div>
      </div>
    </main>
  );
}
