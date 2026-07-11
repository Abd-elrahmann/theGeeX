import { useState } from "react";

import { contactUsContent } from "@/features/contact-us/constants/contact-us";
import { ContactFormField } from "@/features/contact-us/shared/components/contact-form-field";
import { ContactFormInput } from "@/features/contact-us/shared/components/contact-form-input";
import { ContactFormSubmitButton } from "@/features/contact-us/shared/components/contact-form-submit-button";
import { ContactFormTextarea } from "@/features/contact-us/shared/components/contact-form-textarea";

interface ContactUsFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

interface ContactUsFormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  message?: string;
}

function validateContactUsForm(values: ContactUsFormValues): ContactUsFormErrors {
  const errors: ContactUsFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
}

export function ContactUsForm() {
  const [fullNameField, emailField, phoneField] = contactUsContent.fields;
  const [values, setValues] = useState<ContactUsFormValues>({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactUsFormErrors>({});

  function updateField<K extends keyof ContactUsFormValues>(field: K, value: ContactUsFormValues[K]) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      return {
        ...currentErrors,
        [field]: undefined,
      };
    });
  }

  return (
    <div className="w-full rounded-(--contact-us-form-card-radius) border border-(--color-contact-us-form-border) bg-(--color-contact-us-form-card-bg) px-(--contact-us-form-card-padding) pt-(--contact-us-form-card-padding) pb-(--contact-us-form-card-padding) backdrop-blur-(--contact-us-form-blur) md:max-w-[min(100%,576px)]">
      <form
        className="flex w-full flex-col gap-(--contact-us-form-gap) rounded-(--contact-us-form-inner-radius) bg-(--color-contact-us-form-surface) px-(--contact-us-form-inner-padding) pt-(--contact-us-form-inner-padding) pb-(--contact-us-form-inner-padding)"
        onSubmit={(event) => {
          event.preventDefault();

          const nextErrors = validateContactUsForm(values);
          setErrors(nextErrors);
        }}
      >
        <ContactFormField htmlFor={fullNameField.id} label={fullNameField.label} error={errors.fullName}>
          <ContactFormInput
            id={fullNameField.id}
            name={fullNameField.id}
            type={fullNameField.type}
            autoComplete={fullNameField.autoComplete}
            placeholder={fullNameField.placeholder}
            value={values.fullName}
            onChange={(value) => {
              updateField("fullName", value);
            }}
            hasError={Boolean(errors.fullName)}
          />
        </ContactFormField>

        <div className="grid w-full grid-cols-1 gap-(--contact-us-form-gap) md:grid-cols-2">
          <ContactFormField htmlFor={emailField.id} label={emailField.label} error={errors.email}>
            <ContactFormInput
              id={emailField.id}
              name={emailField.id}
              type={emailField.type}
              autoComplete={emailField.autoComplete}
              placeholder={emailField.placeholder}
              value={values.email}
              onChange={(value) => {
                updateField("email", value);
              }}
              hasError={Boolean(errors.email)}
            />
          </ContactFormField>

          <ContactFormField htmlFor={phoneField.id} label={phoneField.label} error={errors.phoneNumber}>
            <ContactFormInput
              id={phoneField.id}
              name={phoneField.id}
              type={phoneField.type}
              autoComplete={phoneField.autoComplete}
              placeholder={phoneField.placeholder}
              value={values.phoneNumber}
              onChange={(value) => {
                updateField("phoneNumber", value);
              }}
              hasError={Boolean(errors.phoneNumber)}
            />
          </ContactFormField>
        </div>

        <ContactFormField htmlFor={contactUsContent.messageField.id} label={contactUsContent.messageField.label} error={errors.message}>
          <ContactFormTextarea
            id={contactUsContent.messageField.id}
            name={contactUsContent.messageField.id}
            placeholder={contactUsContent.messageField.placeholder}
            value={values.message}
            onChange={(value) => {
              updateField("message", value);
            }}
            hasError={Boolean(errors.message)}
          />
        </ContactFormField>

        <ContactFormSubmitButton label={contactUsContent.submitLabel} />
      </form>
    </div>
  );
}