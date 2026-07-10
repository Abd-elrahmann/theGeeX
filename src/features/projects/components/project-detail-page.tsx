"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import StickyScrollRevealText from "@/components/shared/animations/Text_Scroll";
import { StaticProjectCard } from "@/features/projects/components/static-project-card";
import { projects as projectItems, type ProjectItem } from "@/features/projects/constants/projects";

interface ProjectDetailPageProps {
  project: ProjectItem;
}

interface ProjectDetailImageStyle extends CSSProperties {
  "--project-detail-image-position"?: string;
}

interface ProjectDetailChipStyle extends CSSProperties {
  "--project-detail-chip-background"?: string;
}

const projectDescriptionFont = {
  fontFamily: "var(--font-cal-sans)",
  fontSize: "var(--projects-detail-description-size)",
  fontWeight: 400,
  lineHeight: "var(--projects-detail-description-line-height)",
  letterSpacing: "0em",
  textAlign: "center",
} satisfies CSSProperties;

const relatedProjectIds: number[] = [4, 6, 3];
const fallbackProcessSteps = projectItems.find((projectItem) => projectItem.slug === "travx")?.processSteps ?? [];

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);
  const processCardRefs = useRef<Array<HTMLElement | null>>([]);
  const projectTitle = project.detailTitle ?? project.name;
  const breadcrumbLabel = project.breadcrumbLabel ?? project.name;
  const primaryCategory = project.detailCategory ?? project.categories[0] ?? "Project";
  const processSteps = project.processSteps ?? fallbackProcessSteps;
  const chipStyle: ProjectDetailChipStyle = {
    "--project-detail-chip-background": project.detailChipBackground ?? "var(--projects-detail-chip-background)",
  };
  const relatedProjects = projectItems.filter(
    (projectItem) => relatedProjectIds.includes(projectItem.id) && projectItem.id !== project.id,
  );

  useEffect(() => {
    if (!processSteps.length) {
      return;
    }

    let animationFrame = 0;

    const updateActiveProcessIndex = () => {
      animationFrame = 0;
      const targetY = Math.min(window.innerHeight * 0.42, window.innerHeight - 140);
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      processCardRefs.current.forEach((cardElement, index) => {
        if (!cardElement) {
          return;
        }

        const rect = cardElement.getBoundingClientRect();
        const cardAnchorY = rect.top + rect.height * 0.35;
        const distance = Math.abs(cardAnchorY - targetY);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveProcessIndex(closestIndex);
    };

    const requestUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateActiveProcessIndex);
    };

    updateActiveProcessIndex();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [processSteps.length]);

  return (
    <main className="relative z-(--page-main-z-index) min-h-svh w-full bg-background pt-(--projects-detail-top-padding)">
      <section
        aria-labelledby="project-detail-title"
        className="relative mx-auto box-border flex w-full max-w-(--projects-detail-container-max-width) flex-col gap-(--projects-detail-hero-gap) px-(--projects-detail-padding-x) pt-(--projects-detail-hero-padding-top) pb-(--projects-detail-hero-padding-bottom)"
      >
        <nav
          aria-label="Breadcrumb"
          className="flex h-(--projects-detail-breadcrumb-height) w-min flex-row flex-nowrap content-center items-center justify-center gap-(--projects-detail-breadcrumb-gap) overflow-(--overflow-clip-fallback) p-0 whitespace-nowrap font-poppins text-(length:--projects-detail-breadcrumb-size) leading-(--projects-detail-breadcrumb-line-height) font-normal text-(--projects-detail-text-color)"
        >
          <Link href="/" className="whitespace-nowrap transition-colors hover:text-(--projects-detail-text-color) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--projects-detail-accent-color)">
            Home
          </Link>
          <span aria-hidden="true">&gt;</span>
          <Link href="/projects" className="whitespace-nowrap transition-colors hover:text-(--projects-detail-text-color) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--projects-detail-accent-color)">
            Projects
          </Link>
          <span aria-hidden="true">&gt;</span>
          <span className="whitespace-nowrap font-medium text-(--projects-detail-text-color)">{breadcrumbLabel}</span>
        </nav>

        <div className="flex flex-col gap-(--projects-detail-title-stack-gap)">
          <h1
            id="project-detail-title"
            className="m-0 h-auto w-full max-w-(--projects-detail-title-max-width) whitespace-nowrap text-left font-cal-sans text-(length:--projects-detail-title-size) leading-(--projects-detail-title-line-height) font-semibold tracking-normal text-(--projects-detail-text-color) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]"
          >
            {projectTitle}
          </h1>

          <div className="flex flex-row flex-wrap items-center gap-(--projects-detail-chip-gap)" style={chipStyle}>
            <span className="box-border flex h-(--projects-detail-year-chip-height) w-(--projects-detail-year-chip-width) flex-row flex-nowrap content-center items-center justify-center gap-(--projects-detail-chip-inner-gap) overflow-(--overflow-clip-fallback) rounded-(--projects-detail-chip-radius) bg-(--project-detail-chip-background) px-(--projects-detail-year-chip-padding-x) py-(--projects-detail-year-chip-padding-y) font-poppins text-(length:--projects-detail-chip-text-size) leading-(--projects-detail-chip-line-height) font-medium whitespace-nowrap text-(--projects-detail-chip-color)">
              Year : {project.year}
            </span>
            <span className="box-border flex h-(--projects-detail-chip-height) min-w-(--projects-detail-chip-width) max-w-full flex-row flex-nowrap content-center items-center justify-center gap-(--projects-detail-chip-inner-gap) overflow-(--overflow-clip-fallback) rounded-(--projects-detail-chip-radius) bg-(--project-detail-chip-background) px-(--projects-detail-chip-padding-x) py-(--projects-detail-chip-padding-y) font-poppins text-(length:--projects-detail-chip-text-size) leading-(--projects-detail-chip-line-height) font-medium whitespace-nowrap text-(--projects-detail-chip-color)">
              Category : {primaryCategory}
            </span>
          </div>
        </div>

        <div className="relative h-(--projects-detail-cover-height) w-full overflow-hidden rounded-(--projects-detail-image-radius)">
          <Image
            src={project.detailImage}
            alt={project.imageAlt}
            fill
            priority
            sizes="(min-width: 1440px) 1440px, 100vw"
            className="block object-cover object-center"
            unoptimized
          />
        </div>
      </section>

      {project.description ? (
        <div className="relative z-0 mt-(--projects-detail-description-section-margin-top) bg-background">
          <StickyScrollRevealText
            text={project.description}
            unit="Words"
            font={projectDescriptionFont}
            textColor="var(--projects-detail-text-color)"
            sectionHeightVh={260}
            speed={1.1}
            alignY="Center"
            stickyOffsetPx={48}
            maxWidth="var(--projects-detail-description-max-width)"
            padding="var(--projects-detail-description-padding)"
            startPaddingVh={20}
            paddingVw={4}
            wordGapEm={0}
            canvasPreview="Full"
            ghostEnabled
            ghostOpacity={0.2}
            ghostColor="var(--projects-detail-text-color)"
          />
        </div>
      ) : null}

      <section
        aria-labelledby="project-detail-work-title"
        className="mx-auto box-border flex w-full max-w-(--projects-detail-container-max-width) flex-col items-center gap-(--projects-detail-work-gap) px-(--projects-detail-padding-x) py-(--projects-detail-work-padding-y)"
      >
        <span className="box-border flex h-min w-min flex-row flex-nowrap content-center items-center justify-start gap-(--projects-detail-work-chip-gap) overflow-(--overflow-clip-fallback) rounded-(--projects-detail-chip-radius) bg-(--projects-detail-work-chip-background) px-(--projects-detail-work-chip-padding-x) py-(--projects-detail-work-chip-padding-y) font-poppins text-(length:--projects-detail-work-chip-text-size) leading-(--projects-detail-work-chip-line-height) font-medium whitespace-nowrap text-(--projects-detail-chip-color)">
          How We Work
        </span>

        <h2
          id="project-detail-work-title"
          className="m-0 h-auto w-full whitespace-pre-wrap wrap-break-word text-center font-cal-sans text-(length:--projects-detail-work-title-size) leading-(--projects-detail-work-title-line-height) font-semibold tracking-normal text-(--projects-detail-work-title-color) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]"
        >
          <span className="block whitespace-nowrap">A clear process, from first</span>
          <span className="block whitespace-nowrap">conversation to lasting support.</span>
        </h2>

        <div className="grid w-full grid-cols-1 gap-(--projects-detail-gallery-gap) md:grid-cols-2">
          {project.detailGallery.map((image, index) => (
            <div
              key={`${project.slug}-gallery-${image}-${index}`}
              className="relative block h-(--projects-detail-gallery-image-height) w-full flex-1 overflow-hidden rounded-(--projects-detail-image-radius)"
            >
              <Image
                src={image}
                alt={`${project.name} work sample ${index + 1}`}
                fill
                sizes="(min-width: 800px) 50vw, 100vw"
                className="block object-cover object-center"
                style={{ "--project-detail-image-position": "center" } as ProjectDetailImageStyle}
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>

      {processSteps.length ? (
        <section
          aria-labelledby="project-detail-process-title"
          className="mx-auto box-border flex w-full max-w-(--projects-detail-container-max-width) flex-col items-center gap-(--projects-detail-process-gap) px-(--projects-detail-padding-x) py-(--projects-detail-process-padding-y)"
        >
          <span className="box-border flex h-min w-min flex-row flex-nowrap content-center items-center justify-start gap-(--projects-detail-work-chip-gap) overflow-(--overflow-clip-fallback) rounded-(--projects-detail-chip-radius) bg-(--projects-detail-work-chip-background) px-(--projects-detail-work-chip-padding-x) py-(--projects-detail-work-chip-padding-y) font-poppins text-(length:--projects-detail-work-chip-text-size) leading-(--projects-detail-work-chip-line-height) font-medium whitespace-nowrap text-(--projects-detail-chip-color)">
            How We Work
          </span>

          <h2
            id="project-detail-process-title"
            className="m-0 h-auto w-full whitespace-pre-wrap wrap-break-word text-center font-cal-sans text-(length:--projects-detail-work-title-size) leading-(--projects-detail-work-title-line-height) font-semibold tracking-normal text-(--projects-detail-work-title-color) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]"
          >
            <span className="block whitespace-nowrap">A clear process, from first</span>
            <span className="block whitespace-nowrap">conversation to lasting support.</span>
          </h2>

          <div className="grid w-full grid-cols-1 gap-(--projects-detail-process-grid-gap) lg:grid-cols-[minmax(0,1fr)_var(--projects-detail-process-icons-width)] lg:items-start">
            <div className="order-2 flex min-w-0 w-full flex-col gap-(--projects-detail-process-card-gap) lg:order-1 lg:col-start-1 lg:row-start-1">
              {processSteps.map((step, index) => (
                <motion.article
                  key={step.number}
                  ref={(element) => {
                    processCardRefs.current[index] = element;
                  }}
                  className="flex min-h-(--projects-detail-process-card-height) w-full flex-col content-start items-start justify-center gap-(--projects-detail-process-card-inner-gap) overflow-visible rounded-none p-0"
                >
                  <span className="font-cal-sans text-(length:--projects-detail-process-number-size) leading-(--projects-detail-process-number-line-height) font-semibold tracking-normal text-(--projects-detail-muted-color)">
                    {step.number}
                  </span>
                  <h3 className="m-0 h-auto w-full whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--projects-detail-process-card-title-size) leading-(--projects-detail-process-card-title-line-height) font-semibold tracking-normal text-(--projects-detail-work-title-color) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
                    {step.title}
                  </h3>
                  <p className="m-0 h-auto w-full max-w-(--projects-detail-process-card-description-max-width) whitespace-pre-wrap wrap-break-word font-poppins text-(length:--projects-detail-process-card-description-size) leading-(--projects-detail-process-card-description-line-height) font-normal tracking-(--projects-detail-process-card-description-letter-spacing) text-(--projects-detail-process-card-description-color) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on]">
                    {step.description}
                  </p>
                </motion.article>
              ))}
            </div>

            <div className="sticky top-(--projects-detail-process-icons-sticky-top) z-10 order-1 box-border block h-(--projects-detail-process-icons-height) w-full rounded-(--projects-detail-process-icons-radius) bg-(--projects-detail-process-icons-background) p-(--projects-detail-process-icons-padding) lg:order-2 lg:col-start-2 lg:row-start-1 lg:w-(--projects-detail-process-icons-width) lg:self-start">
              <div className="grid h-full w-full grid-cols-5 items-center justify-items-center gap-(--projects-detail-process-icons-gap) lg:grid-cols-5 lg:grid-rows-1">
                {processSteps.map((step, index) => {
                  const isActive = activeProcessIndex === index;

                  return (
                    <motion.div
                      key={step.number}
                      className="relative flex h-(--projects-detail-process-icon-size) w-(--projects-detail-process-icon-size) items-center justify-center overflow-visible rounded-(--projects-detail-process-icon-radius) shadow-(--projects-detail-process-icon-shadow)"
                      animate={{
                        backgroundColor: step.activeColor,
                        scale: isActive ? 1 : 0.88,
                        opacity: isActive ? 1 : 0.16,
                        y: isActive ? -10 : 0,
                      }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div>
                        <Image
                          src={step.icon}
                          alt=""
                          width={32}
                          height={32}
                          className="h-(--projects-detail-process-icon-image-size) w-(--projects-detail-process-icon-image-size) object-contain"
                          unoptimized
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative w-full bg-background px-(--service-detail-padding-x) pt-(--service-detail-projects-padding-top) pb-(--service-detail-projects-padding-bottom)" aria-labelledby="project-detail-related-title">
        <div className="mx-auto flex w-full max-w-(--service-detail-container-max-width) flex-col items-center gap-(--service-detail-projects-section-gap)">
          <header className="flex w-full max-w-(--service-detail-projects-title-max-width) flex-col items-center gap-(--service-detail-projects-title-gap) text-center">
            <p className="m-0 w-auto whitespace-pre font-poppins text-(length:--service-detail-projects-label-size) leading-(--service-detail-projects-label-line-height) font-bold tracking-[-0.02em] text-(--color-service-detail-accent)">
              Projects
            </p>
            <h2 id="project-detail-related-title" className="m-0 w-full max-w-full whitespace-normal wrap-break-word text-center font-cal-sans text-(length:--service-detail-projects-title-size) leading-(--service-detail-projects-title-line-height) font-bold tracking-normal text-(--color-service-detail-text) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on] md:whitespace-nowrap lg:text-[40px]">
              Real Solutions. Proven Impact.
            </h2>
          </header>

          <div className="flex w-full flex-col gap-(--service-detail-projects-cards-gap)">
            {relatedProjects.map((relatedProject, index) => (
              <StaticProjectCard key={relatedProject.id} project={relatedProject} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}