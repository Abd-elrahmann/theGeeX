import { motion } from "framer-motion";

import type { ProjectProcessStep } from "@/features/projects/constants/projects";

interface ProjectDetailProcessCardsProps {
  processSteps: ProjectProcessStep[];
  processCardRefs: React.MutableRefObject<Array<HTMLElement | null>>;
}

export function ProjectDetailProcessCards({
  processSteps,
  processCardRefs,
}: ProjectDetailProcessCardsProps) {
  return (
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
  );
}