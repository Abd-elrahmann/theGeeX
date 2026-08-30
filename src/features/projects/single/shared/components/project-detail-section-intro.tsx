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
    <div className="relative flex min-h-[96px] w-full flex-col items-center md:min-h-0">
      <span className="mx-auto box-border flex h-min w-min flex-row flex-nowrap content-center items-center justify-center gap-(--projects-detail-work-chip-gap) overflow-(--overflow-clip-fallback) rounded-(--projects-detail-chip-radius) bg-(--projects-detail-work-chip-background) px-(--projects-detail-work-chip-padding-x) py-(--projects-detail-work-chip-padding-y) font-poppins text-(length:--projects-detail-work-chip-text-size) leading-(--projects-detail-work-chip-line-height) font-medium whitespace-nowrap text-(--projects-detail-chip-color)">
        {label}
      </span>

      <h2
        id={id}
        className="absolute top-[37px] left-1/2 m-0 h-auto w-[calc(100%+32px)] max-w-[600px] -translate-x-1/2 whitespace-pre-wrap [overflow-wrap:break-word] [word-break:break-word] text-center font-cal-sans text-[24px] leading-[1.1] font-semibold tracking-[0em] text-(--projects-detail-work-title-color) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on] md:static md:w-full md:max-w-none md:translate-x-0 md:text-(length:--projects-detail-work-title-size) md:leading-(--projects-detail-work-title-line-height)"
      >
        {titleLines.map((line) => (
          <span key={line} className="block whitespace-normal md:whitespace-nowrap">
            {line}
          </span>
        ))}
      </h2>
    </div>
  );
}