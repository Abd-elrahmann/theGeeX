import { cn } from "@/lib/cn";

interface BlogCardTypesProps {
  types: string[];
  typesClassName?: string;
  typeChipClassName?: string;
}

export function BlogCardTypes({
  types,
  typesClassName,
  typeChipClassName,
}: BlogCardTypesProps) {
  return (
    <div className={cn("order-2 mt-3 flex flex-wrap items-center justify-center gap-(--blogs-card-types-gap) md:order-0 md:mt-0 md:justify-start", typesClassName)}>
      {types.map((type) => (
        <span
          key={type}
          className={cn(
            "inline-flex h-auto w-auto items-center whitespace-pre rounded-(--blogs-card-badge-radius)",
            "bg-(--color-blogs-card-badge-bg) px-(--blogs-card-badge-padding-x) py-(--blogs-card-badge-padding-y)",
            "font-poppins text-(length:--blogs-card-badge-size) leading-(--blogs-card-badge-line-height)",
            "font-normal tracking-[-0.02em] text-(--color-blogs-card-badge-text)",
            "backdrop-blur-(--blogs-card-badge-blur)",
            typeChipClassName,
          )}
        >
          {type}
        </span>
      ))}
    </div>
  );
}