import { motion } from "framer-motion";
import Image from "next/image";
import type { RefObject } from "react";

import type { ProjectProcessStep } from "@/features/projects/constants/projects";

interface ProjectDetailProcessIconRailProps {
  processSteps: ProjectProcessStep[];
  activeProcessIndex: number | null;
  railRef: RefObject<HTMLDivElement | null>;
}

export function ProjectDetailProcessIconRail({
  processSteps,
  activeProcessIndex,
  railRef,
}: ProjectDetailProcessIconRailProps) {
  return (
    <div ref={railRef} className="sticky top-(--projects-detail-process-icons-sticky-top) z-10 order-1 box-border flex h-(--projects-detail-process-icons-height) w-full items-center justify-center rounded-(--projects-detail-process-icons-radius) bg-(--projects-detail-process-icons-background) p-(--projects-detail-process-icons-padding) md:order-2 md:col-start-2 md:row-start-1 md:w-full md:self-start lg:w-(--projects-detail-process-icons-width)">
      <div
        className="absolute inset-x-0 mx-auto box-border block h-(--projects-detail-process-inner-box-height) w-(--projects-detail-process-inner-box-width) overflow-visible rounded-(--projects-detail-process-inner-box-radius) bg-(--projects-detail-process-icon-background) shadow-(--projects-detail-process-inner-box-shadow)"
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ gap: "var(--projects-detail-process-inner-box-gap)" }}
        >
          {processSteps.map((step, index) => {
            const isActive = activeProcessIndex === index;

            return (
              <motion.div
                key={step.number}
                className="relative flex h-(--projects-detail-process-icon-size) w-(--projects-detail-process-icon-size) items-center justify-center overflow-visible rounded-(--projects-detail-process-icon-radius) shadow-(--projects-detail-process-icon-shadow)"
                animate={{
                  scale: isActive ? 1 : 0.96,
                  y: isActive ? -4 : 0,
                }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{ backgroundColor: step.activeColor }}
              >
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-(--projects-detail-process-icon-radius)"
                  animate={{ opacity: isActive ? 1 : 0.16 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ backgroundColor: step.activeColor }}
                />
                <div className="relative z-1">
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
  );
}