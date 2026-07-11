import StickyScrollRevealText from "@/components/shared/animations/Text_Scroll";

interface ProjectDetailDescriptionSectionProps {
  description: string;
}

export function ProjectDetailDescriptionSection({
  description,
}: ProjectDetailDescriptionSectionProps) {
  if (!description.trim()) {
    return null;
  }

  const productionCalSansFontStack =
    '"Cal Sans", CalSansText, "CalSansText Fallback", ui-sans-serif, sans-serif';

  return (
    <div className="mt-28">
      <StickyScrollRevealText
        text={description}
        unit="Words"
        font={{
          fontFamily: productionCalSansFontStack,
            fontSize: "clamp(26px, 4vw, 44px)",
          lineHeight: "var(--projects-detail-description-line-height)",
          fontWeight: 400,
          textAlign: "center",
        }}
        textColor="#2C3134"
        sectionHeightVh={350}
        speed={1.1}
        alignY="Center"
        startPaddingVh={12}
        maxWidth={1080}
        paddingVw={4}
        wordGapEm={0}
        canvasPreview="Full"
        ghostEnabled
        ghostOpacity={0.2}
        ghostColor="#2C3134"
      />
    </div>
  );
}