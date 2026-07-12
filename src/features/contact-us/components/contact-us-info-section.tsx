import { contactUsContent } from "@/features/contact-us/constants/contact-us";
import { ContactInfoItem } from "@/features/contact-us/shared/components/contact-info-item";

export function ContactUsInfoSection() {
  return (
    <div className="w-full flex-1 pt-2 md:pt-6">
      <div className="flex flex-col items-center gap-(--contact-us-info-gap) text-center md:items-start md:text-left">
        <h1 className="m-0 whitespace-pre-line font-poppins text-(length:--contact-us-title-size) leading-(--contact-us-title-line-height) font-bold tracking-normal text-(--color-contact-us-title)">
          {contactUsContent.title.replace(contactUsContent.titleAccent, "")}
          <span className="text-(--color-contact-us-title-accent)">{contactUsContent.titleAccent}</span>
        </h1>

        <div className="flex flex-col items-center gap-6 md:items-start">
          <ContactInfoItem
            label={contactUsContent.emailLabel}
            value={contactUsContent.emailValue}
            href={`mailto:${contactUsContent.emailValue}`}
            icon="email"
          />
          <ContactInfoItem
            label={contactUsContent.phoneLabel}
            value={contactUsContent.phoneValue}
            href="tel:+201108828385"
            icon="phone"
          />
          <ContactInfoItem
            label={contactUsContent.locationLabel}
            value={contactUsContent.locationValue}
            multiline
            icon="location"
          />
        </div>
      </div>
    </div>
  );
}