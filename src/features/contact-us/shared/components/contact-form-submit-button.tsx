import { cn } from "@/lib/cn";

interface ContactFormSubmitButtonProps {
  label: string;
  isSubmitting?: boolean;
}

export function ContactFormSubmitButton({
  label,
  isSubmitting = false,
}: ContactFormSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      className={cn(
        "flex h-(--contact-us-submit-height) w-full items-center justify-center overflow-visible rounded-(--contact-us-submit-radius)",
        "bg-(--color-contact-us-submit-bg) p-0 transition-colors duration-200 hover:bg-(--color-contact-us-submit-hover-bg)",
        isSubmitting && "cursor-not-allowed",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      )}
    >
      {isSubmitting ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-(--color-contact-us-submit-text) border-t-transparent"
        />
      ) : (
        <span className="font-poppins text-(length:--lets-talk-button-text-size) leading-(--lets-talk-button-text-line-height) font-medium text-(--color-contact-us-submit-text)">
          {label}
        </span>
      )}
    </button>
  );
}