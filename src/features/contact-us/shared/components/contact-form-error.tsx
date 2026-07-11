interface ContactFormErrorProps {
  id: string;
  message?: string;
}

export function ContactFormError({
  id,
  message,
}: ContactFormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p
      id={id}
      className="m-0 font-poppins text-[12px] leading-[1.4] font-medium tracking-normal text-(--color-contact-us-title-accent)"
    >
      {message}
    </p>
  );
}