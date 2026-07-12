import Image from "next/image";

import type { ProjectItem } from "@/features/projects/constants/projects";
import { ProjectDetailSectionIntro } from "@/features/projects/single/shared/components/project-detail-section-intro";

interface ProjectDetailGallerySectionProps {
  project: ProjectItem;
}

export function ProjectDetailGallerySection({ project }: ProjectDetailGallerySectionProps) {
  return (
    <section
      aria-labelledby="project-detail-work-title"
      className="mx-auto box-border flex w-full flex-col items-center gap-(--projects-detail-work-gap) py-(--projects-detail-work-padding-y)"
    >
      <div className="flex w-full max-w-(--projects-detail-container-max-width) flex-col items-center gap-(--projects-detail-process-gap) px-(--projects-detail-padding-x) md:block">
        <ProjectDetailSectionIntro
          id="project-detail-work-title"
          label="How We Work"
          titleLines={[
            "A clear process, from first",
            "conversation to lasting support.",
          ]}
        />
      </div>

      <div
        className="grid w-full max-w-(--projects-detail-gallery-max-width) grid-cols-1 gap-(--projects-detail-gallery-gap) md:grid-cols-2"
        style={{ paddingInline: "var(--projects-detail-gallery-padding-x)" }}
      >
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
              className="block"
              style={{ objectFit: "cover", objectPosition: "center center" }}
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}