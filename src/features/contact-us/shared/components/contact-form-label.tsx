interface ContactFormLabelProps {
  children: string;
}

export function ContactFormLabel({ children }: ContactFormLabelProps) {
  return (
    <span className="font-poppins text-[14px] leading-[1.2] font-medium tracking-normal text-(--color-contact-us-input-label)">
      {children}
    </span>
  );
}