import { cn } from "@/lib/cn";

import { projectsSectionTitle } from "@/features/projects/constants/projects";

const projectsTitleHeadingClassName = cn(
  "relative m-0 mx-auto flex w-full justify-center p-0",
  "max-w-(--projects-container-max-width)",
);

const projectsTitleTextClassName = cn(
  "projects-title-text font-cal-sans not-italic",
  "font-(--projects-title-font-weight)",
  "text-[length:var(--projects-title-size)] leading-(--projects-title-line-height)",
  "tracking-[0px] text-center whitespace-nowrap",
  "[font-feature-settings:normal]",
);

export function ProjectsTitle() {
  return (
    <div className="pointer-events-none relative z-(--projects-title-z-index) w-full overflow-visible">
      <h2 className={projectsTitleHeadingClassName}>
        <span className="projects-title-box">
          <span className={projectsTitleTextClassName}>{projectsSectionTitle}</span>
        </span>
      </h2>
    </div>
  );
}
