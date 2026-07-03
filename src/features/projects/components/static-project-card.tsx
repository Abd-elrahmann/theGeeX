import Image from "next/image";
import { type CSSProperties } from "react";
import { useState } from "react";

import { AnimatedArrowSwap } from "@/components/shared/animations/animated-arrow-swap";
import { ArrowUpRightIcon } from "@/components/shared/icons/arrow-up-right";
import { cn } from "@/lib/cn";
import { formatIndex } from "@/lib/format-index";

import { type ProjectItem } from "@/features/projects/constants/projects";

interface StaticProjectCardProps {
  project: ProjectItem;
  index: number;
}

interface StaticProjectCardStyle extends CSSProperties {
  "--project-card-background": string;
}

export function StaticProjectCard({ project, index }: StaticProjectCardProps) {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <article
      className="isolate h-(--service-detail-project-card-height) w-full min-w-0 overflow-hidden rounded-(--projects-card-radius) bg-(--project-card-background) p-(--projects-card-padding) text-(--color-project-card-foreground) shadow-(--projects-card-shadow)"
      style={{ "--project-card-background": project.background } as StaticProjectCardStyle}
      onMouseEnter={() => {
        setIsCardHovered(true);
      }}
      onMouseLeave={() => {
        setIsCardHovered(false);
      }}
    >
      <header className="relative mx-auto flex min-h-(--projects-card-header-height) w-full max-w-(--projects-card-content-max-width) shrink-0 items-start justify-between gap-(--service-detail-project-card-header-gap) md:h-(--projects-card-header-height) md:items-center">
        <span className="h-auto w-auto shrink-0 whitespace-pre text-left font-cal-sans text-(length:--projects-card-index-size) leading-none font-(--projects-card-index-weight) tracking-normal text-(--color-project-card-foreground) font-features-normal">
          {formatIndex(index)}
        </span>
        <span className="z-2 flex h-min min-w-0 flex-1 flex-row flex-wrap items-start justify-end gap-(--projects-card-category-gap)">
          {project.categories.map((category) => (
            <span
              key={category}
              className="block h-auto w-auto max-w-full whitespace-nowrap rounded-(--projects-card-category-radius) bg-(--color-project-card-category-bg) px-(--projects-card-category-padding-x) py-(--projects-card-category-padding-y) text-left font-poppins text-(length:--projects-card-category-text-size) leading-(--projects-card-category-line-height) font-(--projects-card-category-text-weight) tracking-(--projects-card-category-letter-spacing) text-(--color-project-card-category-text) font-features-normal"
            >
              {category}
            </span>
          ))}
        </span>
      </header>

      <span aria-hidden="true" className="mt-(--projects-card-divider-margin-top) block h-px w-full bg-(--color-project-card-divider)" />

      <div className="relative mx-auto mt-(--projects-card-subheader-margin-top) flex w-full max-w-(--projects-card-content-max-width) items-center justify-between gap-3">
        <h3 className="m-0 h-(--projects-card-title-height) min-w-0 flex-1 whitespace-pre-wrap wrap-break-word font-cal-sans text-(length:--projects-card-title-size) leading-(--projects-card-title-line-height) font-(--projects-card-title-weight) tracking-(--projects-card-title-letter-spacing) text-(--color-project-card-foreground) font-features-normal">
          {project.name}
        </h3>
        <span aria-hidden="true" className="relative inline-flex shrink-0 translate-x-(--projects-card-arrow-offset-x) items-center justify-center overflow-hidden size-(--projects-card-arrow-size) text-(--color-project-card-foreground)">
          <AnimatedArrowSwap
            icon={ArrowUpRightIcon}
            isHovered={isCardHovered}
            sizeVar="--projects-card-arrow-size"
            sizeFallback={40}
            primaryClassName="text-(--color-project-card-foreground)"
            hoverClassName="text-(--color-project-card-foreground)"
          />
        </span>
      </div>

      {project.description ? (
        <p className="mx-auto mt-(--service-detail-project-card-description-margin-top) mb-0 w-full max-w-(--projects-card-content-max-width) whitespace-pre-wrap wrap-break-word font-poppins text-(length:--service-detail-project-card-description-size) leading-(--service-detail-project-card-description-line-height) font-normal tracking-normal text-(--color-project-card-foreground) font-features-normal">
          {project.description}
        </p>
      ) : null}

      <div className="relative mx-auto mt-(--projects-card-image-margin-top) min-h-0 w-full max-w-(--projects-card-content-max-width) flex-1 overflow-hidden rounded-(--projects-card-image-radius)">
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={1600}
          height={1200}
          sizes="(min-width: 1024px) min(100vw, 1280px), 100vw"
          loading={index === 0 ? "eager" : undefined}
          priority={index === 0}
          unoptimized
          draggable={false}
          className={cn("block h-full w-full object-cover object-center", project.imageClassName)}
        />
      </div>
    </article>
  );
}
