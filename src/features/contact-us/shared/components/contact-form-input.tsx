import { cn } from "@/lib/cn";

interface ContactFormInputProps {
  id: string;
  name: string;
  type: string;
  autoComplete?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export function ContactFormInput({
  id,
  name,
  type,
  autoComplete,
  placeholder,
  value,
  onChange,
  hasError = false,
}: ContactFormInputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      aria-invalid={hasError}
      aria-describedby={hasError ? `${id}-error` : undefined}
      className={cn(
        "w-full rounded-(--contact-us-input-radius) border-(length:--contact-us-input-border-width)",
        "border-(--color-contact-us-input-border) bg-(--color-contact-us-input-bg)",
        "h-(--contact-us-input-height) px-(--contact-us-input-padding-x) py-(--contact-us-input-padding-y)",
        "font-poppins text-[14px] leading-[1.2] font-medium tracking-normal text-(--color-contact-us-input-text)",
        "placeholder:text-(--color-contact-us-input-placeholder)",
        "outline-none transition-colors duration-200 focus:border-(--color-contact-us-input-focus)",
        hasError && "border-(--color-contact-us-title-accent)",
      )}
    />
  );
}