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
        <header className="flex w-full max-w-(--service-detail-projects-title-max-width) flex-col items-center gap-(--service-detail-projects-title-gap) text-center">
          <p className="m-0 w-auto whitespace-pre font-poppins text-(length:--service-detail-projects-label-size) leading-(--service-detail-projects-label-line-height) font-bold tracking-[-0.02em] text-(--color-service-detail-accent)">
            Projects
          </p>
          <h2 id="project-detail-related-title" className="m-0 w-full max-w-full whitespace-normal wrap-break-word text-center font-cal-sans text-(length:--service-detail-projects-title-size) leading-(--service-detail-projects-title-line-height) font-bold tracking-normal text-(--color-service-detail-text) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on] md:whitespace-nowrap lg:text-[40px]">
            Real Solutions. Proven Impact.
          </h2>
        </header>

        <div
          className="mx-auto flex w-full max-w-(--projects-detail-gallery-max-width) flex-col gap-(--service-detail-projects-cards-gap)"
          style={{ paddingInline: "var(--projects-detail-gallery-padding-x)" }}
        >
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