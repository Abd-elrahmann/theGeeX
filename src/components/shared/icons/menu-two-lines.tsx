import { cn } from "@/lib/cn";

interface MenuTwoLinesIconProps {
  className?: string;
}

export function MenuTwoLinesIcon({ className }: MenuTwoLinesIconProps) {
  return (
    <span
      className={cn(
        "block size-(--navbar-menu-icon-size) overflow-clip rounded-none",
        className,
      )}
      aria-hidden="true"
    >
      <span className="flex h-full w-full flex-col items-stretch justify-center gap-[10px]">
        <span className="block h-[2px] w-full rounded-none bg-cta-text" />
        <span className="block h-[2px] w-full rounded-none bg-cta-text" />
      </span>
    </span>
  );
}
