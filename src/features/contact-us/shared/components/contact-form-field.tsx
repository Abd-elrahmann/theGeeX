import type { ReactNode } from "react";

import { ContactFormError } from "@/features/contact-us/shared/components/contact-form-error";
import { ContactFormLabel } from "@/features/contact-us/shared/components/contact-form-label";

interface ContactFormFieldProps {
  htmlFor: string;
  label: string;
  children: ReactNode;
  error?: string;
}

export function ContactFormField({
  htmlFor,
  label,
  children,
  error,
}: ContactFormFieldProps) {
  const errorId = `${htmlFor}-error`;

  return (
    <label htmlFor={htmlFor} className="flex w-full flex-col gap-(--contact-us-field-gap)">
      <ContactFormLabel>{label}</ContactFormLabel>
      {children}
      <ContactFormError id={errorId} message={error} />
    </label>
  );
}