import { useState } from "react";
import { motion } from "framer-motion";

import type { ServiceFaqItem, ServiceFaqsSection } from "@/features/services/constants/services";
import { ServiceDetailStickyIntro } from "@/features/services/single/shared/components/service-detail-sticky-intro";
import { deliverTransition, faqTextReveal } from "@/features/services/single/utils/service-detail";

function FaqCard({ item }: { item: ServiceFaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="box-border w-full max-w-(--service-detail-faq-card-max-width) overflow-clip rounded-(--service-detail-faq-card-radius) bg-(--color-service-detail-faq-card-bg) p-(--service-detail-faq-card-padding)">
      <button
        type="button"
        className="relative flex w-full items-center justify-between gap-(--service-detail-faq-question-gap) pr-[calc(var(--service-detail-faq-icon-width)+var(--service-detail-faq-question-gap))] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <span className="min-w-0 flex-1 whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-faq-question-size) leading-(--service-detail-faq-question-line-height) font-medium tracking-normal text-(--color-service-detail-faq-question) font-features-normal">
          {item.question}
        </span>
        <span
          aria-hidden="true"
          className="absolute top-1/2 right-0 box-border flex h-(--service-detail-faq-icon-height) w-(--service-detail-faq-icon-width) shrink-0 flex-row flex-nowrap content-center items-center justify-center gap-(--service-detail-faq-icon-gap) overflow-visible rounded-full p-(--service-detail-faq-icon-padding) font-poppins text-[28px] leading-none font-normal text-(--color-service-detail-faq-icon) aspect-square"
          style={{
            backgroundColor:
              "var(--token-9a7303fe-2324-4aa1-bbd4-e1f1d449de82, rgba(255, 255, 255, 0.12))",
            transform: "translateY(-50%)",
          }}
        >
          {isOpen ? "-" : "+"}
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={deliverTransition}
        className="overflow-hidden"
      >
        <p className="mt-(--service-detail-faq-answer-margin-top) mb-0 w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-faq-answer-size) leading-(--service-detail-faq-answer-line-height) font-normal tracking-normal text-(--color-service-detail-faq-answer) font-features-normal">
          {item.answer}
        </p>
      </motion.div>
    </article>
  );
}

interface ServiceDetailFaqsSectionProps {
  faqs?: ServiceFaqsSection;
}

export function ServiceDetailFaqsSection({
  faqs,
}: ServiceDetailFaqsSectionProps) {
  if (!faqs) {
    return null;
  }

  return (
    <section className="relative w-full bg-background px-(--service-detail-padding-x) py-(--service-detail-faqs-padding-y)" aria-labelledby="service-faqs-title">
      <div className="relative mx-auto grid w-full max-w-(--service-detail-faqs-container-max-width) grid-cols-1 gap-(--service-detail-faqs-section-gap) overflow-visible md:grid-cols-[var(--service-detail-faqs-title-column-width)_minmax(0,1fr)] md:items-start">
        <ServiceDetailStickyIntro
          titleId="service-faqs-title"
          label={faqs.label}
          title={faqs.title}
          containerClassName="relative z-1 flex h-(--service-detail-faqs-title-box-height) w-full flex-col flex-nowrap content-start items-center justify-start gap-(--service-detail-faqs-title-gap) overflow-clip rounded-none p-0 text-center md:sticky md:top-(--service-detail-faqs-title-sticky-top) md:items-start md:text-left"
          labelClassName="m-0 w-auto whitespace-pre font-poppins text-(length:--service-detail-faqs-label-size) leading-(--service-detail-faqs-label-line-height) font-medium tracking-[-0.02em] text-(--color-service-detail-accent)"
          titleClassName="m-0 w-full max-w-(--service-detail-faqs-title-max-width) whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--service-detail-faqs-title-size) leading-(--service-detail-faqs-title-line-height) font-semibold tracking-normal text-(--color-service-detail-text) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on] lg:max-w-none"
          motionConfig={faqTextReveal}
        />

        <div className="min-w-0">
          <div className="flex h-min w-full flex-1 flex-col flex-nowrap content-center items-start justify-center gap-(--service-detail-faqs-cards-gap) overflow-visible rounded-none p-0">
            {faqs.items.map((item) => (
              <FaqCard key={item.question} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}