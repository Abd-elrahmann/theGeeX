import type { CSSProperties } from "react";
import Image from "next/image";

import type { ProjectItem } from "@/features/projects/constants/projects";
import { ProjectDetailSectionIntro } from "@/features/projects/single/shared/components/project-detail-section-intro";

interface ProjectDetailImageStyle extends CSSProperties {
  "--project-detail-image-position"?: string;
}

interface ProjectDetailGallerySectionProps {
  project: ProjectItem;
}

export function ProjectDetailGallerySection({ project }: ProjectDetailGallerySectionProps) {
  return (
    <section
      aria-labelledby="project-detail-work-title"
      className="mx-auto box-border flex w-full max-w-(--projects-detail-container-max-width) flex-col items-center gap-(--projects-detail-work-gap) px-(--projects-detail-padding-x) py-(--projects-detail-work-padding-y)"
    >
      <ProjectDetailSectionIntro
        id="project-detail-work-title"
        label="How We Work"
        titleLines={[
          "A clear process, from first",
          "conversation to lasting support.",
        ]}
      />

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
  );
}