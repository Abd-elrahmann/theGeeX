interface ContactInfoItemProps {
  label: string;
  value: string;
  href?: string;
  multiline?: boolean;
}

export function ContactInfoItem({
  label,
  value,
  href,
  multiline = false,
}: ContactInfoItemProps) {
  return (
    <div className="flex flex-col items-center gap-(--contact-us-item-gap) md:items-start">
      <p className="m-0 font-poppins text-(length:--contact-us-label-size) leading-(--contact-us-label-line-height) font-medium tracking-[-0.03em] text-(--color-contact-us-label)">
        {label}
      </p>

      {href ? (
        <a
          href={href}
          className="w-fit whitespace-nowrap font-poppins text-(length:--contact-us-value-size) leading-(--contact-us-value-line-height) font-medium tracking-[-0.03em] text-(--color-contact-us-value) transition-colors duration-200 hover:text-(--color-contact-us-title-accent)"
        >
          {value}
        </a>
      ) : (
        <p
          className={multiline
            ? "m-0 max-w-[20ch] whitespace-pre-line font-poppins text-(length:--contact-us-value-size) leading-(--contact-us-value-line-height) font-medium tracking-[-0.03em] text-(--color-contact-us-value)"
            : "m-0 font-poppins text-(length:--contact-us-value-size) leading-(--contact-us-value-line-height) font-medium tracking-[-0.03em] text-(--color-contact-us-value)"
          }
        >
          {value}
        </p>
      )}
    </div>
  );
}