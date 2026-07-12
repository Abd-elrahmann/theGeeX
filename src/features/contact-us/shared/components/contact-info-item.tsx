interface ContactInfoItemProps {
  label: string;
  value: string;
  href?: string;
  multiline?: boolean;
  icon?: "email" | "phone" | "location";
}

function ContactInfoIcon({ icon }: { icon: NonNullable<ContactInfoItemProps["icon"]> }) {
  if (icon === "email") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-(--contact-us-icon-size) w-(--contact-us-icon-size)"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 7.5L10.47 12.03C11.39 12.67 12.61 12.67 13.53 12.03L20 7.5M5.2 19H18.8C19.92 19 20.48 19 20.91 18.78C21.29 18.59 21.59 18.29 21.78 17.91C22 17.48 22 16.92 22 15.8V8.2C22 7.08 22 6.52 21.78 6.09C21.59 5.71 21.29 5.41 20.91 5.22C20.48 5 19.92 5 18.8 5H5.2C4.08 5 3.52 5 3.09 5.22C2.71 5.41 2.41 5.71 2.22 6.09C2 6.52 2 7.08 2 8.2V15.8C2 16.92 2 17.48 2.22 17.91C2.41 18.29 2.71 18.59 3.09 18.78C3.52 19 4.08 19 5.2 19Z"
          stroke="var(--color-contact-us-icon)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "phone") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-(--contact-us-icon-size) w-(--contact-us-icon-size)"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 16.92V19.92C21 20.47 20.55 20.93 20 20.9C16.92 20.73 13.96 19.49 11.62 17.38C9.51 15.04 8.27 12.08 8.1 9C8.07 8.45 8.53 8 9.08 8H12.08C12.57 8 12.99 8.35 13.07 8.83L13.52 11.54C13.58 11.92 13.45 12.31 13.17 12.58L11.69 14.06C12.57 15.61 14.39 17.43 15.94 18.31L17.42 16.83C17.69 16.55 18.08 16.42 18.46 16.48L21.17 16.93C21.65 17.01 22 17.43 22 17.92Z"
          stroke="var(--color-contact-us-icon)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-(--contact-us-icon-size) w-(--contact-us-icon-size)"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21C15.5 17.19 19 14.06 19 10C19 6.13 15.87 3 12 3C8.13 3 5 6.13 5 10C5 14.06 8.5 17.19 12 21Z"
        stroke="var(--color-contact-us-icon)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="var(--color-contact-us-icon)" strokeWidth="1.8" />
    </svg>
  );
}

export function ContactInfoItem({
  label,
  value,
  href,
  multiline = false,
  icon,
}: ContactInfoItemProps) {
  return (
    <div className="flex flex-col items-center gap-(--contact-us-item-gap) md:items-start">
      <p className="m-0 font-poppins text-(length:--contact-us-label-size) leading-(--contact-us-label-line-height) font-medium tracking-[-0.03em] text-(--color-contact-us-label)">
        {label}
      </p>

      <div className="flex items-start gap-(--contact-us-item-content-gap)">
        {icon ? <ContactInfoIcon icon={icon} /> : null}

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
    </div>
  );
}