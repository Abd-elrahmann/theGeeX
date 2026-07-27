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
            className="relative block min-w-0 flex-1 overflow-visible h-(--projects-detail-gallery-image-height) md:h-87.5 lg:h-(--projects-detail-gallery-image-height)"
          >
            <div className="absolute inset-0 block aspect-[1.016/1] w-full overflow-visible rounded-(--projects-detail-image-radius) h-(--projects-detail-gallery-image-height) md:h-87.5 lg:h-(--projects-detail-gallery-image-height)">
              <Image
                src={image}
                alt={`${project.name} work sample ${index + 1}`}
                fill
                sizes="(min-width: 800px) 50vw, 100vw"
                className="block rounded-(--projects-detail-image-radius) bg-transparent bg-cover bg-no-repeat bg-center object-cover"
                style={{ objectFit: "cover", objectPosition: "center center" }}
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}