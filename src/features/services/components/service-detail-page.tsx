"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Fragment, useRef, useState } from "react";

import { formatIndex } from "@/lib/format-index";
import { useDesktopBreakpoint } from "@/hooks/use-desktop-breakpoint";
import { StaticProjectCard } from "@/features/projects/components/static-project-card";
import { projects } from "@/features/projects/constants/projects";

import {
  servicesImageSlideTransition,
  type Service,
  type ServiceDeliverable,
  type ServiceExtraSection,
  type ServiceFaqItem,
  type ServiceFaqsSection,
  type ServiceOutcome,
  type ServiceOutcomesSection,
  type ServiceProjectsSection,
} from "@/features/services/constants/services";

interface ServiceDetailPageProps {
  service: Service;
}

function ServiceDetailTitle({ title, className = "" }: { title: string; className?: string }) {
  return (
    <h1 className={`m-0 w-full whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--service-detail-main-title-size) leading-(--service-detail-main-title-line-height) font-semibold tracking-normal text-(--color-service-detail-text) font-features-normal ${className}`}>
      {title.split("\n").map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h1>
  );
}

const deliverTransition = {
  type: "spring",
  duration: 0.4,
  bounce: 0.15,
} as const;

const deliverNumberColor = {
  active: "#2c3134",
  inactive: "#2c3134",
} as const;

const faqTextReveal = {
  initial: {
    opacity: 0,
    y: 16,
    filter: "blur(12px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  transition: {
    duration: 0.6,
    type: "spring" as const,
    stiffness: 120,
    damping: 18,
  },
  viewport: {
    once: true,
    amount: 0.5,
  },
} as const;

function getDeliverableImageOffset(index: number, activeIndex: number): string {
  if (index === activeIndex) {
    return "0%";
  }

  if (index < activeIndex) {
    return "-100%";
  }

  return "100%";
}

function ServiceDetailHero({ service }: ServiceDetailPageProps) {
  return (
    <section className="mx-auto flex w-full max-w-(--service-detail-container-max-width) flex-col items-start gap-(--service-detail-hero-gap) px-(--service-detail-padding-x) pt-(--service-detail-hero-padding-top)">
      <nav aria-label="Breadcrumb" className="flex h-[19px] w-min flex-row flex-nowrap content-center items-center justify-center gap-(--service-detail-breadcrumb-gap) overflow-(--overflow-clip-fallback) p-0 whitespace-nowrap font-poppins text-(length:--service-detail-breadcrumb-size) leading-(--service-detail-breadcrumb-line-height) font-normal text-(--color-service-detail-text)">
        <Link href="/" className="whitespace-nowrap transition-colors duration-200 hover:text-(--color-service-detail-text)">
          Home
        </Link>
        <span aria-hidden>&gt;</span>
        <Link href="/services" className="whitespace-nowrap transition-colors duration-200 hover:text-(--color-service-detail-text)">
          Services
        </Link>
        <span aria-hidden>&gt;</span>
        <span className="whitespace-nowrap font-medium text-(--color-service-detail-text)">{service.navTitle}</span>
      </nav>

      <div className="mx-auto flex w-full max-w-(--service-detail-title-max-width) flex-col items-center gap-(--service-detail-title-types-gap) text-center">
        <div className="flex w-full flex-col items-center gap-(--service-detail-title-stack-gap)">
          <p className="m-0 w-full whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--service-detail-small-title-size) leading-(--service-detail-small-title-line-height) font-semibold tracking-normal text-(--color-service-detail-accent) font-features-normal">
            {service.page.smallTitle}
          </p>
          {service.page.mobileMainTitle ? (
            <>
              <ServiceDetailTitle title={service.page.mobileMainTitle} className="md:hidden" />
              <ServiceDetailTitle title={service.page.mainTitle} className="hidden md:block" />
            </>
          ) : (
            <ServiceDetailTitle title={service.page.mainTitle} />
          )}
        </div>
        <ul className="m-0 flex list-none flex-row flex-wrap items-center justify-center gap-x-(--service-detail-types-gap) gap-y-(--service-detail-types-row-gap) p-0 font-poppins text-(length:--service-detail-type-size) leading-(--service-detail-type-line-height) font-normal tracking-normal text-(--color-service-detail-text)">
          {service.page.categories.map((category, index) => (
            <li key={category} className="flex flex-row flex-nowrap items-center gap-(--service-detail-type-separator-gap) whitespace-nowrap">
              {index > 0 ? <span aria-hidden="true">|</span> : null}
              <span>{category}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="box-border flex h-min w-full self-stretch flex-row flex-nowrap items-center justify-start gap-0 overflow-hidden px-(--service-detail-image-container-padding-x) py-(--service-detail-image-container-padding-y)">
        <div className="relative block h-(--service-detail-hero-image-height) w-full max-w-none overflow-hidden rounded-(--service-detail-image-radius)">
          <Image
            src={service.pageImage}
            alt={service.imageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width: 1440px) calc(100vw - 160px), (min-width: 1024px) calc(100vw - 80px), 100vw"
          />
        </div>
      </div>
    </section>
  );
}

function ServiceOverview({ service }: ServiceDetailPageProps) {
  return (
    <section className="mx-auto grid w-full max-w-(--service-detail-container-max-width) grid-cols-1 gap-(--service-detail-section-gap) px-(--service-detail-padding-x) py-(--service-detail-section-padding-y)">
      <div className="flex w-full flex-col items-start gap-(--service-detail-section-label-gap) text-left">
        <p className="m-0 w-auto whitespace-pre font-poppins text-(length:--service-detail-label-size) leading-(--service-detail-label-line-height) font-medium tracking-[-0.02em] text-(--color-service-detail-accent)">
          Overview
        </p>
        <h2 className="m-0 h-auto w-full max-w-full whitespace-pre-wrap wrap-break-word font-poppins text-[38px] leading-[1.3] font-semibold tracking-normal text-(--color-service-detail-heading) [font-synthesis:weight] [-webkit-text-stroke:0.1px_currentColor] [text-shadow:0_0_0.15px_currentColor] font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
          {service.page.overviewTitle}
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-(--service-detail-overview-grid-gap) md:grid-cols-2 md:items-start">
        <div className="grid w-full grid-cols-3 gap-(--service-detail-overview-images-gap)">
          {service.page.overviewImages.map((image, index) => (
            <motion.div
              key={`${image}-${index}`}
              className="relative h-(--service-detail-overview-image-height) w-full flex-1 overflow-hidden rounded-(--service-detail-overview-image-radius) bg-surface"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.65, delay: index * 0.12, ease: "easeInOut" }}
            >
              <Image src={image} alt={`${service.navTitle} overview ${index + 1}`} fill className="object-cover" sizes="(min-width: 1024px) 180px, 33vw" />
            </motion.div>
          ))}
        </div>

        <div className="relative min-h-(--service-detail-description-min-height) w-full md:min-h-0 md:max-w-(--service-detail-overview-description-max-width)">
          <p className="absolute inset-x-0 top-0 m-0 h-auto w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-description-size) leading-(--service-detail-description-line-height) font-light tracking-normal text-(--color-service-detail-text) font-features-normal md:static">
            {service.page.overviewDescription}
          </p>
        </div>
      </div>
    </section>
  );
}

function DeliverableRow({ item, index, isActive }: { item: ServiceDeliverable; index: number; isActive: boolean }) {
  return (
    <motion.article className="flex w-full flex-col gap-(--service-detail-deliver-row-gap) overflow-hidden" transition={deliverTransition}>
      <div className="flex min-w-0 flex-1 flex-col gap-(--service-detail-deliver-row-gap)">
        <div className="relative min-w-0 pl-(--service-detail-deliver-number-column-width)">
          <motion.span className="absolute top-(--service-detail-deliver-number-offset-y) left-0 h-auto w-auto whitespace-pre text-center font-cal-sans text-(length:--service-detail-deliver-number-size) leading-(--service-detail-deliver-number-line-height) font-semibold tracking-[-0.04em] font-features-normal" animate={{ color: isActive ? deliverNumberColor.active : deliverNumberColor.inactive }} transition={deliverTransition}>
            {formatIndex(index)}
          </motion.span>
          <motion.h3 className="m-0 min-w-0 flex-1 whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--service-detail-deliver-title-size) leading-(--service-detail-deliver-title-line-height) font-semibold tracking-normal" animate={{ color: isActive ? "var(--color-service-detail-text)" : "var(--color-service-detail-inactive)" }} transition={deliverTransition}>
            {item.title}
          </motion.h3>
        </div>

        <motion.div initial={false} animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }} transition={deliverTransition} className="overflow-hidden pl-(--service-detail-deliver-number-column-width)">
          <p className="m-0 w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-deliver-description-size) leading-(--service-detail-deliver-description-line-height) font-normal tracking-normal text-(--color-service-detail-text) font-features-normal">
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.article>
  );
}

function DeliverableImageSlidePanel({
  deliverables,
  activeIndex,
  previousActiveIndex,
}: {
  deliverables: ServiceDeliverable[];
  activeIndex: number;
  previousActiveIndex: number;
}) {
  const fallbackDeliverable = deliverables[0];

  return (
    <div className="isolate relative z-10 h-(--service-detail-deliver-image-height) w-full overflow-hidden rounded-3xl bg-surface lg:h-full">
      {fallbackDeliverable ? (
        <Image
          src={fallbackDeliverable.image}
          alt=""
          fill
          aria-hidden="true"
          className={fallbackDeliverable.image.endsWith(".svg") ? "rounded-3xl object-contain p-4 lg:p-10" : "rounded-3xl object-cover"}
          sizes="(min-width: 1024px) 50vw, calc(100vw - (2 * var(--service-detail-padding-x)))"
          priority
        />
      ) : null}
      {deliverables.map((item, index) => {
        const isActive = index === activeIndex;
        const isTransitioning = index === previousActiveIndex && previousActiveIndex !== activeIndex;

        return (
          <motion.div
            key={item.title}
            aria-hidden={!isActive}
            className="absolute inset-0 h-full w-full min-w-0 overflow-hidden rounded-3xl bg-surface will-change-transform"
            initial={false}
            animate={{ y: getDeliverableImageOffset(index, activeIndex) }}
            transition={servicesImageSlideTransition}
            style={{
              zIndex: isActive ? 3 : isTransitioning ? 2 : 1,
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className={item.image.endsWith(".svg") ? "rounded-3xl object-contain p-4 lg:p-10" : "rounded-3xl object-cover"}
              sizes="(min-width: 1024px) 50vw, calc(100vw - (2 * var(--service-detail-padding-x)))"
              priority={index === 0}
              loading={index === 0 ? "eager" : undefined}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function WhatWeDeliver({ service }: ServiceDetailPageProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobilePinRegionRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useDesktopBreakpoint();
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousActiveIndex, setPreviousActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: isDesktop ? sectionRef : mobilePinRegionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!Number.isFinite(progress)) {
      return;
    }

    const maxIndex = Math.max(service.page.deliverables.length - 1, 0);
    const nextIndex = Math.min(Math.max(Math.round(progress * maxIndex), 0), maxIndex);

    setActiveIndex((currentIndex) => {
      if (currentIndex !== nextIndex) {
        setPreviousActiveIndex(currentIndex);
      }

      return nextIndex;
    });
  });

  return (
    <section ref={sectionRef} className="relative min-h-(--service-detail-deliver-scroll-height) w-full px-0 py-(--service-detail-section-padding-y) lg:px-(--service-detail-padding-x)">
      <div className="mx-auto flex w-full max-w-(--service-detail-container-max-width) flex-col gap-(--service-detail-deliver-grid-gap) lg:hidden">
        <div className="flex w-full flex-col gap-(--service-detail-section-label-gap) px-(--service-detail-padding-x)">
          <p className="m-0 w-auto whitespace-pre font-poppins text-(length:--service-detail-label-size) leading-(--service-detail-label-line-height) font-semibold tracking-[-0.02em] text-(--color-service-detail-accent)">
            {service.page.deliverTitle}
          </p>
          <h2 className="m-0 w-full max-w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-section-title-size) leading-(--service-detail-section-title-line-height) font-semibold tracking-normal text-(--color-service-detail-text) [font-synthesis:weight] [-webkit-text-stroke:0.1px_currentColor] [text-shadow:0_0_0.15px_currentColor]">
            {service.page.deliverMainTitle}
          </h2>
        </div>

        <div ref={mobilePinRegionRef} className="relative min-h-(--service-detail-deliver-scroll-height) w-full">
          <div className="sticky top-(--service-detail-deliver-sticky-top) z-10 flex w-full flex-col gap-(--service-detail-deliver-grid-gap)">
            <div className="w-full px-(--service-detail-padding-x)">
              <DeliverableImageSlidePanel
                deliverables={service.page.deliverables}
                activeIndex={activeIndex}
                previousActiveIndex={previousActiveIndex}
              />
            </div>

            <div className="flex w-full flex-col gap-(--service-detail-deliver-items-gap) px-(--service-detail-padding-x)">
              {service.page.deliverables.map((item, index) => (
                <Fragment key={item.title}>
                  <DeliverableRow item={item} index={index} isActive={index === activeIndex} />
                  {index < service.page.deliverables.length - 1 ? <div aria-hidden className="h-px w-full bg-(--color-service-detail-border)" /> : null}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-(--service-detail-deliver-sticky-top) mx-auto hidden w-full max-w-(--service-detail-container-max-width) grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center gap-(--service-detail-deliver-grid-gap) lg:grid lg:min-h-(--service-detail-deliver-stage-height) lg:items-stretch">
        <div className="col-start-1 row-start-1 flex w-full flex-col gap-(--service-detail-section-label-gap)">
          <p className="m-0 w-auto whitespace-pre font-poppins text-(length:--service-detail-label-size) leading-(--service-detail-label-line-height) font-semibold tracking-[-0.02em] text-(--color-service-detail-accent)">
            {service.page.deliverTitle}
          </p>
          <h2 className="m-0 w-full max-w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-section-title-size) leading-(--service-detail-section-title-line-height) font-semibold tracking-normal text-(--color-service-detail-text) [font-synthesis:weight] [-webkit-text-stroke:0.1px_currentColor] [text-shadow:0_0_0.15px_currentColor]">
            {service.page.deliverMainTitle}
          </h2>
        </div>

        <div className="col-start-2 row-span-2 row-start-1 h-full w-full self-stretch">
          <DeliverableImageSlidePanel
            deliverables={service.page.deliverables}
            activeIndex={activeIndex}
            previousActiveIndex={previousActiveIndex}
          />
        </div>

        <div className="col-start-1 row-start-2 flex w-full flex-col gap-(--service-detail-deliver-items-gap)">
          {service.page.deliverables.map((item, index) => (
            <Fragment key={item.title}>
              <DeliverableRow item={item} index={index} isActive={index === activeIndex} />
              {index < service.page.deliverables.length - 1 ? <div aria-hidden className="h-px w-full bg-(--color-service-detail-border)" /> : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomeCard({ outcome, isActive }: { outcome: ServiceOutcome; isActive: boolean }) {
  return (
    <motion.article
      className="box-border flex h-min w-full max-w-(--service-detail-outcome-card-width) flex-col items-start justify-center gap-(--service-detail-outcome-card-gap) overflow-clip rounded-(--service-detail-outcome-card-radius) p-(--service-detail-outcome-card-padding)"
      animate={{
        backgroundColor: isActive
          ? "var(--color-service-detail-outcome-active-bg)"
          : "var(--color-service-detail-outcome-bg)",
      }}
      transition={deliverTransition}
    >
      <motion.h3
        className="m-0 w-full whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--service-detail-outcome-card-title-size) leading-(--service-detail-outcome-card-title-line-height) font-semibold tracking-normal font-features-normal"
        animate={{
          color: isActive
            ? "var(--color-service-detail-outcome-active-text)"
            : "var(--color-service-detail-text)",
        }}
        transition={deliverTransition}
      >
        {outcome.title}
      </motion.h3>
      <motion.p
        className="m-0 w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-outcome-card-description-size) leading-(--service-detail-outcome-card-description-line-height) font-normal tracking-normal font-features-normal"
        animate={{
          color: isActive
            ? "var(--color-service-detail-outcome-active-text)"
            : "var(--color-service-detail-outcome-description)",
        }}
        transition={deliverTransition}
      >
        {outcome.description}
      </motion.p>
    </motion.article>
  );
}

function ServiceOutcomes({ outcomes }: { outcomes?: ServiceOutcomesSection }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!outcomes) {
      return;
    }

    const nextIndex = Math.round(progress * Math.max(outcomes.outcomes.length - 1, 0));
    setActiveIndex(nextIndex);
  });

  if (!outcomes) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-(--service-detail-outcomes-scroll-height) w-full overflow-visible bg-background px-(--service-detail-padding-x) pt-(--service-detail-outcomes-padding-top) pb-(--service-detail-outcomes-padding-bottom)"
      aria-labelledby="service-outcomes-title"
    >
      <div className="relative mx-auto grid w-full max-w-(--service-detail-container-max-width) grid-cols-1 gap-(--service-detail-outcomes-section-gap) overflow-visible md:grid-cols-[var(--service-detail-outcomes-title-column-width)_minmax(0,1fr)] md:items-start">
        <aside className="min-w-0 md:self-stretch">
          <div className="relative z-1 flex h-(--service-detail-outcomes-title-box-height) w-full flex-col flex-nowrap content-start items-start justify-center gap-(--service-detail-outcomes-title-gap) overflow-clip rounded-none p-0 md:sticky md:top-(--service-detail-outcomes-title-sticky-top)">
            <p className="m-0 w-auto whitespace-pre font-poppins text-(length:--service-detail-outcomes-label-size) leading-(--service-detail-outcomes-label-line-height) font-medium tracking-[-0.02em] text-(--color-service-detail-accent)">
              {outcomes.label}
            </p>
            <h2
              id="service-outcomes-title"
              className="m-0 w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-outcomes-title-size) leading-(--service-detail-outcomes-title-line-height) font-semibold tracking-normal text-(--color-service-detail-text) [font-synthesis:weight] [-webkit-text-stroke:0.1px_currentColor] [text-shadow:0_0_0.15px_currentColor] font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]"
            >
              {outcomes.title}
            </h2>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex h-min w-full flex-1 flex-col flex-nowrap content-center items-stretch justify-center gap-(--service-detail-outcomes-cards-gap) overflow-clip rounded-none p-0">
            {outcomes.outcomes.map((outcome, index) => (
              <OutcomeCard key={outcome.title} outcome={outcome} isActive={index === activeIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceProjects({ projectsSection }: { projectsSection?: ServiceProjectsSection }) {
  if (!projectsSection) {
    return null;
  }

  const selectedProjects = projects.filter((project) => projectsSection.projectIds.includes(project.id));

  return (
    <section className="relative w-full bg-background px-(--service-detail-padding-x) pt-(--service-detail-projects-padding-top) pb-(--service-detail-projects-padding-bottom)" aria-labelledby="service-projects-title">
      <div className="mx-auto flex w-full max-w-(--service-detail-container-max-width) flex-col items-center gap-(--service-detail-projects-section-gap)">
        <header className="flex w-full max-w-(--service-detail-projects-title-max-width) flex-col items-center gap-(--service-detail-projects-title-gap) text-center">
          <p className="m-0 w-auto whitespace-pre font-poppins text-(length:--service-detail-projects-label-size) leading-(--service-detail-projects-label-line-height) font-medium tracking-[-0.02em] text-(--color-service-detail-accent)">
            {projectsSection.label}
          </p>
          <h2 id="service-projects-title" className="m-0 w-auto max-w-full whitespace-nowrap text-center font-cal-sans text-(length:--service-detail-projects-title-size) leading-(--service-detail-projects-title-line-height) font-semibold tracking-normal text-(--color-service-detail-text) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
            {projectsSection.title}
          </h2>
        </header>

        <div className="flex w-full flex-col gap-(--service-detail-projects-cards-gap)">
          {selectedProjects.map((project, index) => (
            <StaticProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqCard({ item }: { item: ServiceFaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="box-border w-full overflow-clip rounded-(--service-detail-faq-card-radius) bg-(--color-service-detail-faq-card-bg) p-(--service-detail-faq-card-padding)">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-(--service-detail-faq-question-gap) text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <span className="min-w-0 flex-1 whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-faq-question-size) leading-(--service-detail-faq-question-line-height) font-medium tracking-normal text-(--color-service-detail-faq-question) font-features-normal">
          {item.question}
        </span>
        <span aria-hidden="true" className="box-border flex h-(--service-detail-faq-icon-height) w-(--service-detail-faq-icon-width) shrink-0 flex-row flex-nowrap content-center items-center justify-center gap-(--service-detail-faq-icon-gap) overflow-visible rounded-full bg-transparent p-(--service-detail-faq-icon-padding) font-cal-sans text-(length:--service-detail-faq-icon-text-size) leading-none text-(--color-service-detail-faq-icon) aspect-square">
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

function ServiceFaqs({ faqs }: { faqs?: ServiceFaqsSection }) {
  if (!faqs) {
    return null;
  }

  return (
    <section className="relative w-full bg-background px-(--service-detail-padding-x) py-(--service-detail-faqs-padding-y)" aria-labelledby="service-faqs-title">
      <div className="relative mx-auto grid w-full max-w-(--service-detail-container-max-width) grid-cols-1 gap-(--service-detail-faqs-section-gap) overflow-visible md:grid-cols-[var(--service-detail-faqs-title-column-width)_minmax(0,1fr)] md:items-start">
        <aside className="min-w-0 md:self-stretch">
          <div className="relative z-1 flex h-(--service-detail-faqs-title-box-height) w-full flex-col flex-nowrap content-start items-center justify-start gap-(--service-detail-faqs-title-gap) overflow-clip rounded-none p-0 text-center md:sticky md:top-(--service-detail-faqs-title-sticky-top) md:items-start md:text-left">
            <motion.p
              className="m-0 w-auto whitespace-pre font-poppins text-(length:--service-detail-faqs-label-size) leading-(--service-detail-faqs-label-line-height) font-medium tracking-[-0.02em] text-(--color-service-detail-accent)"
              initial={faqTextReveal.initial}
              whileInView={faqTextReveal.animate}
              viewport={faqTextReveal.viewport}
              transition={faqTextReveal.transition}
            >
              {faqs.label}
            </motion.p>
            <motion.h2
              id="service-faqs-title"
              className="m-0 w-full max-w-(--service-detail-faqs-title-max-width) whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--service-detail-faqs-title-size) leading-(--service-detail-faqs-title-line-height) font-semibold tracking-normal text-(--color-service-detail-text) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]"
              initial={faqTextReveal.initial}
              whileInView={faqTextReveal.animate}
              viewport={faqTextReveal.viewport}
              transition={{
                ...faqTextReveal.transition,
                delay: 0.075,
              }}
            >
              {faqs.title}
            </motion.h2>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex h-min w-full flex-1 flex-col flex-nowrap content-center items-center justify-center gap-(--service-detail-faqs-cards-gap) overflow-visible rounded-none p-0">
            {faqs.items.map((item) => (
              <FaqCard key={item.question} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceExtraSections({ sections }: { sections?: ServiceExtraSection[] }) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return sections.map((section) => (
    <section
      key={section.id}
      className="mx-auto grid w-full max-w-(--service-detail-container-max-width) grid-cols-1 gap-(--service-detail-section-gap) px-(--service-detail-padding-x) py-(--service-detail-section-padding-y)"
    >
      <div className="flex w-full flex-col gap-(--service-detail-section-label-gap)">
        {section.label ? (
          <p className="m-0 w-auto whitespace-pre font-poppins text-(length:--service-detail-label-size) leading-(--service-detail-label-line-height) font-semibold tracking-[-0.02em] text-(--color-service-detail-accent)">
            {section.label}
          </p>
        ) : null}
        <h2 className="m-0 w-full max-w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-section-title-size) leading-(--service-detail-section-title-line-height) font-medium tracking-normal text-(--color-service-detail-text)">
          {section.title}
        </h2>
        {section.description ? (
          <p className="m-0 h-auto w-full whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-description-size) leading-(--service-detail-description-line-height) font-light tracking-normal text-(--color-service-detail-text) font-features-normal">
            {section.description}
          </p>
        ) : null}
      </div>

      {section.items && section.items.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-(--service-detail-overview-grid-gap) md:grid-cols-3">
          {section.items.map((item) => (
            <article key={item.title} className="flex w-full flex-col gap-(--service-detail-deliver-row-gap)">
              <h3 className="m-0 font-cal-sans text-(length:--service-detail-deliver-title-size) leading-(--service-detail-deliver-title-line-height) font-semibold text-(--color-service-detail-text)">
                {item.title}
              </h3>
              <p className="m-0 font-poppins text-(length:--service-detail-deliver-description-size) leading-(--service-detail-deliver-description-line-height) font-normal text-(--color-service-detail-text)">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      ) : null}

      {section.images && section.images.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-(--service-detail-overview-images-gap) sm:grid-cols-3">
          {section.images.map((image, index) => (
            <div key={image} className="relative h-(--service-detail-overview-image-height) w-full overflow-hidden rounded-(--service-detail-overview-image-radius) bg-surface">
              <Image src={image} alt={`${section.title} ${index + 1}`} fill className="object-cover" sizes="(min-width: 1024px) 360px, 100vw" />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  ));
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  return (
    <main className="relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--services-page-top-padding)">
      <ServiceDetailHero service={service} />
      <ServiceOverview service={service} />
      <WhatWeDeliver service={service} />
      <ServiceOutcomes outcomes={service.page.outcomes} />
      <ServiceProjects projectsSection={service.page.projects} />
      <ServiceFaqs faqs={service.page.faqs} />
      <ServiceExtraSections sections={service.page.extraSections} />
    </main>
  );
}