import { SiteFooter } from "@/features/footer";
import { LetsTalkSection } from "@/features/lets-talk";

type FooterRevealStackProps = {
  marginTop?: string;
};

export function FooterRevealStack({ marginTop }: FooterRevealStackProps) {
  return (
    <div
      className={marginTop ? "relative" : "relative mt-(--lets-talk-margin-top)"}
      style={{
        marginTop,
        minHeight: "var(--lets-talk-footer-reveal-height)",
      }}
    >
      <div className="sticky z-10" style={{ top: "var(--lets-talk-reveal-sticky-top)" }}>
        <LetsTalkSection revealFooterOnScroll />
      </div>

      <div className="sticky z-20 mt-(--footer-reveal-gap)" style={{ top: "var(--lets-talk-reveal-sticky-top)" }}>
        <SiteFooter revealFromPreviousSection />
      </div>
    </div>
  );
}