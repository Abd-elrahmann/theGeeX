import { PackagesSection } from "@/features/packages/section/components/packages-section";

export function PackagesPage() {
  return (
    <main className="relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--packages-page-top-padding)">
      <PackagesSection />
    </main>
  );
}