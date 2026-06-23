import { cn } from "@/lib/cn";

export const servicesContentContainerClassName = cn(
  "box-border flex h-full min-h-full w-full min-w-0 flex-col flex-nowrap content-start items-start justify-start",
  "overflow-hidden bg-(--color-services-content-bg)",
  "rounded-(--services-content-radius)",
  "pt-(--services-content-padding-top) pl-(--services-content-padding-left)",
  "pr-(--services-content-padding-right) pb-(--services-content-padding-bottom)",
);

export const servicesImageContainerVisualClassName = cn(
  "overflow-hidden bg-surface rounded-(--services-image-radius)",
);

export const servicesImageContainerClassName = cn(
  "relative h-full min-h-full w-full min-w-0",
  servicesImageContainerVisualClassName,
);

import { imageSlideLayerClassName } from "@/components/shared/motion/slide-layer";

export const servicesImageSlideLayerClassName = imageSlideLayerClassName;
