import { SiteFooter } from "@/features/footer";
import { LetsTalkSection } from "@/features/lets-talk";
import { cn } from "@/lib/cn";

type FooterRevealStackProps = {
  marginTop?: string;
  className?: string;
};

export function FooterRevealStack({ marginTop, className }: FooterRevealStackProps) {
  return (
    <div
      className={cn(marginTop ? "relative" : "relative mt-(--lets-talk-margin-top)", className)}
      style={{
        marginTop,
        minHeight: "var(--lets-talk-footer-reveal-height)",
      }}
    >
      <div className="sticky z-10" style={{ top: "var(--lets-talk-reveal-sticky-top)" }}>
        <LetsTalkSection revealFooterOnScroll />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-(--footer-reveal-bottom-gap) z-15 h-(--footer-reveal-cover-height) bg-(--color-footer-surface)"
      />

      <div className="absolute inset-x-0 bottom-(--footer-reveal-bottom-gap) z-20">
        <SiteFooter revealFromPreviousSection />
      </div>
    </div>
  );
}