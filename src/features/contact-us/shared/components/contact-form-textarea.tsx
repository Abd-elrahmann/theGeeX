import { cn } from "@/lib/cn";

interface ContactFormTextareaProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export function ContactFormTextarea({
  id,
  name,
  placeholder,
  value,
  onChange,
  hasError = false,
}: ContactFormTextareaProps) {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      aria-invalid={hasError}
      aria-describedby={hasError ? `${id}-error` : undefined}
      className={cn(
        "min-h-(--contact-us-textarea-min-height) w-full rounded-(--contact-us-input-radius)",
        "border-(length:--contact-us-input-border-width) border-(--color-contact-us-input-border)",
        "bg-(--color-contact-us-input-bg) px-(--contact-us-input-padding-x) py-(--contact-us-input-padding-y)",
        "font-poppins text-[14px] leading-[1.6] font-medium tracking-normal text-(--color-contact-us-input-text)",
        "placeholder:text-(--color-contact-us-input-placeholder)",
        "outline-none transition-colors duration-200 focus:border-(--color-contact-us-input-focus)",
        hasError && "border-(--color-contact-us-title-accent)",
      )}
    />
  );
}