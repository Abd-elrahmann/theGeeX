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
    <div className="sticky top-(--projects-detail-process-icons-sticky-top) z-10 order-1 box-border block h-(--projects-detail-process-icons-height) w-full rounded-(--projects-detail-process-icons-radius) bg-(--projects-detail-process-icons-background) p-(--projects-detail-process-icons-padding) lg:order-2 lg:col-start-2 lg:row-start-1 lg:w-(--projects-detail-process-icons-width) lg:self-start">
      <div
        className="flex h-full w-full items-center justify-center rounded-(--projects-detail-process-icons-radius) bg-(--projects-detail-process-icon-background) shadow-(--projects-detail-process-icons-box-shadow)"
        style={{ gap: 0 }}
      >
        {processSteps.map((step, index) => {
          const isActive = activeProcessIndex === index;

          return (
            <motion.div
              key={step.number}
              className="relative flex h-(--projects-detail-process-icon-size) w-(--projects-detail-process-icon-size) items-center justify-center overflow-visible rounded-(--projects-detail-process-icon-radius) shadow-(--projects-detail-process-icon-shadow)"
              animate={{
                backgroundColor: isActive ? step.activeColor : "#ffffff",
                scale: isActive ? 1 : 0.96,
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
  );
}