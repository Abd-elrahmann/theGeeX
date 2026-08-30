import type { CSSProperties } from "react";
import Image from "next/image";

import { DetailBreadcrumb } from "@/components/shared/detail-breadcrumb";
import type { ProjectItem } from "@/features/projects/constants/projects";

interface ProjectDetailChipStyle extends CSSProperties {
  "--project-detail-chip-background"?: string;
}

interface ProjectDetailHeroSectionProps {
  project: ProjectItem;
  projectTitle: string;
  breadcrumbLabel: string;
  primaryCategory: string;
}

export function ProjectDetailHeroSection({
  project,
  projectTitle,
  breadcrumbLabel,
  primaryCategory,
}: ProjectDetailHeroSectionProps) {
  const detailImageScale = project.detailImageScale;
  const detailImagePosition = project.imagePosition ?? "center center";
  const chipStyle: ProjectDetailChipStyle = {
    "--project-detail-chip-background":
      project.detailChipBackground ?? "var(--projects-detail-chip-background)",
  };

  return (
    <section
      aria-labelledby="project-detail-title"
      className="relative mx-auto box-border flex w-full max-w-(--projects-detail-container-max-width) flex-col gap-(--projects-detail-hero-gap) px-(--projects-detail-padding-x) pt-(--projects-detail-hero-padding-top) pb-(--projects-detail-hero-padding-bottom)"
    >
      <DetailBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: breadcrumbLabel },
        ]}
        className="flex h-(--projects-detail-breadcrumb-height) w-min flex-row flex-nowrap content-center items-center justify-center gap-(--projects-detail-breadcrumb-gap) overflow-(--overflow-clip-fallback) p-0 whitespace-nowrap font-poppins text-(length:--projects-detail-breadcrumb-size) leading-(--projects-detail-breadcrumb-line-height) font-normal text-(--projects-detail-text-color)"
        linkClassName="whitespace-nowrap transition-colors hover:text-(--projects-detail-text-color) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--projects-detail-accent-color)"
        currentClassName="text-(--projects-detail-text-color)"
      />

      <div className="relative flex min-h-[112px] flex-col gap-(--projects-detail-title-stack-gap) md:min-h-0">
        <h1
          id="project-detail-title"
          className="absolute left-0 top-0 m-0 h-auto w-auto max-w-[600px] whitespace-pre-wrap [overflow-wrap:break-word] [word-break:break-word] text-left font-cal-sans text-[40px] leading-[1.4] font-semibold tracking-[0em] text-(--projects-detail-text-color) font-features-['blwf'_on,'cv03'_on,'cv04'_on,'cv09'_on,'cv11'_on] md:static md:w-full md:max-w-(--projects-detail-title-max-width) md:whitespace-nowrap md:text-(length:--projects-detail-title-size) md:leading-(--projects-detail-title-line-height)"
        >
          {projectTitle}
        </h1>

        <div className="mt-[72px] flex flex-row flex-wrap items-center gap-(--projects-detail-chip-gap) md:mt-0" style={chipStyle}>
          <div className="box-border flex h-(--projects-detail-year-chip-height) w-(--projects-detail-year-chip-width) flex-row flex-nowrap content-center items-center justify-center gap-(--projects-detail-chip-inner-gap) overflow-(--overflow-clip-fallback) rounded-(--projects-detail-chip-radius) bg-(--project-detail-chip-background) px-(--projects-detail-year-chip-padding-x) py-(--projects-detail-year-chip-padding-y) whitespace-nowrap text-(--projects-detail-chip-color)">
            <p className="m-0 font-poppins text-(length:--projects-detail-chip-text-size) leading-(--projects-detail-chip-line-height) font-medium">Year :</p>
            <p className="m-0 font-poppins text-(length:--projects-detail-chip-text-size) leading-(--projects-detail-chip-line-height) font-medium">{project.year}</p>
          </div>
          <div className="box-border inline-flex h-(--projects-detail-chip-height) w-auto shrink-0 self-start flex-row flex-nowrap items-center justify-start gap-x-(--projects-detail-chip-inner-gap) overflow-hidden rounded-(--projects-detail-chip-radius) bg-(--project-detail-chip-background) px-(--projects-detail-chip-padding-x) py-(--projects-detail-chip-padding-y) whitespace-nowrap text-(--projects-detail-chip-color)">
            <p className="m-0 shrink-0 font-poppins text-(length:--projects-detail-chip-text-size) leading-(--projects-detail-chip-line-height) font-medium">Category :</p>
            <p className="m-0 shrink-0 text-left font-poppins text-(length:--projects-detail-chip-text-size) leading-(--projects-detail-chip-line-height) font-medium whitespace-nowrap">{primaryCategory}</p>
          </div>
        </div>
      </div>

      <div className="relative h-(--projects-detail-cover-height) w-full overflow-hidden rounded-(--projects-detail-image-radius)">
        <Image
          src={project.detailImage}
          alt={project.imageAlt}
          fill
          priority
          sizes="(min-width: 1440px) 1440px, 100vw"
          className="block md:[object-position:var(--projects-detail-image-position,center_center)]"
          style={{
            objectFit: "cover",
            objectPosition: "center center",
            ...(detailImagePosition !== "center center"
              ? ({ ["--projects-detail-image-position" as const]: detailImagePosition } as CSSProperties)
              : {}),
            ...(detailImageScale ? { transform: `scale(${detailImageScale})` } : {}),
          }}
          unoptimized
        />
      </div>
    </section>
  );
}