interface ProjectDetailSectionIntroProps {
  id: string;
  label: string;
  titleLines: [string, string] | [string];
}

export function ProjectDetailSectionIntro({
  id,
  label,
  titleLines,
}: ProjectDetailSectionIntroProps) {
  return (
    <>
      <span className="box-border flex h-min w-min flex-row flex-nowrap content-center items-center justify-start gap-(--projects-detail-work-chip-gap) overflow-(--overflow-clip-fallback) rounded-(--projects-detail-chip-radius) bg-(--projects-detail-work-chip-background) px-(--projects-detail-work-chip-padding-x) py-(--projects-detail-work-chip-padding-y) font-poppins text-(length:--projects-detail-work-chip-text-size) leading-(--projects-detail-work-chip-line-height) font-medium whitespace-nowrap text-(--projects-detail-chip-color)">
        {label}
      </span>

      <h2
        id={id}
        className="m-0 h-auto w-full whitespace-pre-wrap wrap-break-word text-center font-cal-sans text-(length:--projects-detail-work-title-size) leading-(--projects-detail-work-title-line-height) font-semibold tracking-normal text-(--projects-detail-work-title-color) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]"
      >
        {titleLines.map((line) => (
          <span key={line} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </h2>
    </>
  );
}