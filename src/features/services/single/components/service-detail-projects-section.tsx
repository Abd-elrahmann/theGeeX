import { StaticProjectCard } from "@/features/projects/shared/components/static-project-card";
import type { ServiceProjectsSection } from "@/features/services/constants/services";
import { getSelectedProjects } from "@/features/services/single/utils/service-detail";

interface ServiceDetailProjectsSectionProps {
  projectsSection?: ServiceProjectsSection;
}

export function ServiceDetailProjectsSection({
  projectsSection,
}: ServiceDetailProjectsSectionProps) {
  if (!projectsSection) {
    return null;
  }

  const selectedProjects = getSelectedProjects(projectsSection);

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