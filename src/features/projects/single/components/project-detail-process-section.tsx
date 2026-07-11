import type { ProjectProcessStep } from "@/features/projects/constants/projects";
import { ProjectDetailProcessCards } from "@/features/projects/single/components/project-detail-process-cards";
import { ProjectDetailProcessIconRail } from "@/features/projects/single/components/project-detail-process-icon-rail";
import { ProjectDetailSectionIntro } from "@/features/projects/single/shared/components/project-detail-section-intro";

interface ProjectDetailProcessSectionProps {
  processSteps: ProjectProcessStep[];
  activeProcessIndex: number | null;
  processCardRefs: React.MutableRefObject<Array<HTMLElement | null>>;
}

export function ProjectDetailProcessSection({
  processSteps,
  activeProcessIndex,
  processCardRefs,
}: ProjectDetailProcessSectionProps) {
  if (!processSteps.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="project-detail-process-title"
      className="mx-auto box-border flex w-full max-w-(--projects-detail-container-max-width) flex-col items-center gap-(--projects-detail-process-gap) px-(--projects-detail-process-padding-x) py-(--projects-detail-process-padding-y)"
    >
      <ProjectDetailSectionIntro
        id="project-detail-process-title"
        label="How We Work"
        titleLines={[
          "A clear process, from first",
          "conversation to lasting support.",
        ]}
      />

      <div className="grid w-full grid-cols-1 gap-(--projects-detail-process-grid-gap) lg:grid-cols-[minmax(0,1fr)_var(--projects-detail-process-icons-width)] lg:items-start">
        <ProjectDetailProcessCards
          processSteps={processSteps}
          processCardRefs={processCardRefs}
        />
        <ProjectDetailProcessIconRail
          processSteps={processSteps}
          activeProcessIndex={activeProcessIndex}
        />
      </div>
    </section>
  );
}