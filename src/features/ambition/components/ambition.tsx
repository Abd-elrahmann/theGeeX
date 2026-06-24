import { cn } from "@/lib/cn";

import { AmbitionHeadline } from "./ambition-headline";

export function Ambition() {
  return (
    <section
      id="ambition"
      className={cn(
        "relative grid min-h-(--ambition-min-height) w-full flex-1 place-items-center",
        "mt-(--ambition-margin-top) overflow-x-clip bg-background",
        "pb-(--ambition-padding-bottom) py-0",
      )}
      aria-label="Ambition statement"
    >
      <div className="box-border w-full max-w-full min-w-0 px-(--ambition-padding-x)">
        <AmbitionHeadline />
      </div>
    </section>
  );
}
