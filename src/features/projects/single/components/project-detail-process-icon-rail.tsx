import { motion } from "framer-motion";
import Image from "next/image";

import type { ProjectProcessStep } from "@/features/projects/constants/projects";

interface ProjectDetailProcessIconRailProps {
  processSteps: ProjectProcessStep[];
  activeProcessIndex: number | null;
}

export function ProjectDetailProcessIconRail({
  processSteps,
  activeProcessIndex,
}: ProjectDetailProcessIconRailProps) {
  return (
    <div className="sticky top-(--projects-detail-process-icons-sticky-top) z-10 order-1 box-border flex h-(--projects-detail-process-icons-height) w-full items-center justify-center rounded-(--projects-detail-process-icons-radius) bg-(--projects-detail-process-icons-background) p-(--projects-detail-process-icons-padding) lg:order-2 lg:col-start-2 lg:row-start-1 lg:w-(--projects-detail-process-icons-width) lg:self-start">
      <div
        className="absolute box-border block h-(--projects-detail-process-inner-box-height) w-(--projects-detail-process-inner-box-width) overflow-visible rounded-(--projects-detail-process-inner-box-radius) bg-(--projects-detail-process-icon-background) shadow-(--projects-detail-process-inner-box-shadow)"
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ gap: "var(--projects-detail-process-inner-box-gap)" }}
        >
          {processSteps.map((step, index) => {
            const isActive = activeProcessIndex === index;
            const inactiveBackgroundColor = `color-mix(in srgb, ${step.activeColor} 16%, transparent)`;

            return (
              <motion.div
                key={step.number}
                className="relative flex h-(--projects-detail-process-icon-size) w-(--projects-detail-process-icon-size) items-center justify-center overflow-visible rounded-(--projects-detail-process-icon-radius) shadow-(--projects-detail-process-icon-shadow)"
                animate={{
                  backgroundColor: isActive ? step.activeColor : inactiveBackgroundColor,
                  scale: isActive ? 1 : 0.96,
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
  );
}