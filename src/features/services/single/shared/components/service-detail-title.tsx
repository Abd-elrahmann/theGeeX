interface ServiceDetailTitleProps {
  title: string;
  className?: string;
}

export function ServiceDetailTitle({
  title,
  className = "",
}: ServiceDetailTitleProps) {
  return (
    <h1 className={`m-0 w-full whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--service-detail-main-title-size) leading-(--service-detail-main-title-line-height) font-semibold tracking-normal text-(--color-service-detail-text) font-features-normal ${className}`}>
      {title.split("\n").map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h1>
  );
}