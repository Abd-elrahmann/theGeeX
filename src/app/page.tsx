import { Ambition } from "@/features/ambition";
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
        <div className="sticky top-0 z-10">
          <LetsTalkSection revealFooterOnScroll />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20">
          <SiteFooter revealFromPreviousSection />
        </div>
      </div>
    </main>
  );
}
