import { cn } from "@/lib/cn";

interface ContactFormSubmitButtonProps {
  label: string;
}

export function ContactFormSubmitButton({
  label,
}: ContactFormSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={cn(
        "flex h-(--contact-us-submit-height) w-full items-center justify-center overflow-visible rounded-(--contact-us-submit-radius)",
        "bg-(--color-contact-us-submit-bg) p-0 transition-colors duration-200 hover:bg-(--color-contact-us-submit-hover-bg)",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      )}
    >
      <span className="font-poppins text-(length:--lets-talk-button-text-size) leading-(--lets-talk-button-text-line-height) font-medium text-(--color-contact-us-submit-text)">
        {label}
      </span>
    </button>
  );
}