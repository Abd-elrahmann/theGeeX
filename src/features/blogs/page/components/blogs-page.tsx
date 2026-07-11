import { BlogsPageHeroSection } from "@/features/blogs/page/components/blogs-page-hero-section";
import { BlogsPageListSection } from "@/features/blogs/page/components/blogs-page-list-section";

export function BlogsPage() {
  return (
    <main className="relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--navbar-height)">
      <section
        aria-labelledby="blogs-page-title"
        className="mx-auto flex w-full max-w-300 flex-col items-center gap-8 px-4 pt-12 pb-20 text-center md:px-6 lg:px-8"
      >
        <BlogsPageHeroSection />
        <BlogsPageListSection />
      </section>
    </main>
  );
}