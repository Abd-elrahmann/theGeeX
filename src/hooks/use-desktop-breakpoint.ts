import { DESKTOP_MEDIA_QUERY } from "@/lib/breakpoints";

import { useMediaQuery } from "./use-media-query";

export function useDesktopBreakpoint(): boolean {
  return useMediaQuery(DESKTOP_MEDIA_QUERY);
}
