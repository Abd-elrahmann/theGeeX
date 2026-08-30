import { StaticProjectCard } from "@/features/projects/shared/components/static-project-card";
import type { ProjectItem } from "@/features/projects/constants/projects";

interface ProjectDetailRelatedProjectsSectionProps {
  relatedProjects: ProjectItem[];
}

export function ProjectDetailRelatedProjectsSection({
  relatedProjects,
}: ProjectDetailRelatedProjectsSectionProps) {
  return (
    <section
      className="relative w-full bg-background pt-(--service-detail-projects-padding-top) pb-(--service-detail-projects-padding-bottom)"
      aria-labelledby="project-detail-related-title"
    >
      <div className="mx-auto flex w-full flex-col items-center gap-(--service-detail-projects-section-gap)">
        <header className="relative flex min-h-[118px] w-full max-w-(--service-detail-projects-title-max-width) flex-col items-center gap-(--service-detail-projects-title-gap) text-center md:min-h-0">
          <p className="absolute top-0 m-0 h-auto w-auto whitespace-pre font-poppins text-[15px] leading-[1.4] font-medium tracking-[-0.02em] text-(--color-service-detail-accent) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on] md:static md:text-(length:--service-detail-projects-label-size) md:leading-(--service-detail-projects-label-line-height) md:font-bold">
            Projects
          </p>
          <h2 id="project-detail-related-title" className="absolute top-[29px] m-0 h-auto w-full max-w-full whitespace-pre-wrap [overflow-wrap:break-word] [word-break:break-word] text-center font-cal-sans text-[40px] leading-[1.2] font-semibold tracking-[0em] text-(--color-service-detail-text) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on] md:static md:whitespace-nowrap md:text-(length:--service-detail-projects-title-size) md:leading-(--service-detail-projects-title-line-height) md:font-bold lg:text-[40px]">
            Real Solutions. Proven Impact.
          </h2>
        </header>

        <div className="mx-auto flex w-full max-w-(--projects-detail-gallery-max-width) flex-col gap-(--service-detail-projects-cards-gap) [padding-inline:var(--service-detail-padding-x)] lg:[padding-inline:var(--projects-detail-gallery-padding-x)]">
          {relatedProjects.map((relatedProject, index) => (
            <StaticProjectCard
              key={relatedProject.id}
              project={relatedProject}
              index={index}
              hasShadow={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}