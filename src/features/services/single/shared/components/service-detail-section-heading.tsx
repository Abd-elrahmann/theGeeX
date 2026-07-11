interface ServiceDetailSectionHeadingProps {
  label: string;
  title: string;
  titleId?: string;
  align?: "left" | "center";
  titleClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export function ServiceDetailSectionHeading({
  label,
  title,
  titleId,
  align = "left",
  titleClassName = "",
  labelClassName = "",
  containerClassName = "",
}: ServiceDetailSectionHeadingProps) {
  const alignmentClassName =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <div
      className={`flex w-full flex-col gap-(--service-detail-section-label-gap) ${alignmentClassName} ${containerClassName}`.trim()}
    >
      <p
        className={`m-0 w-auto whitespace-pre font-poppins text-(length:--service-detail-label-size) leading-(--service-detail-label-line-height) font-medium tracking-[-0.02em] text-(--color-service-detail-accent) ${labelClassName}`.trim()}
      >
        {label}
      </p>
      <h2
        id={titleId}
        className={`m-0 w-full max-w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-section-title-size) leading-(--service-detail-section-title-line-height) font-semibold tracking-normal text-(--color-service-detail-text) [font-synthesis:weight] [-webkit-text-stroke:0.1px_currentColor] [text-shadow:0_0_0.15px_currentColor] ${titleClassName}`.trim()}
      >
        {title}
      </h2>
    </div>
  );
}