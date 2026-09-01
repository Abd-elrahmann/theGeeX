const SERVICES_VIEWPORT_PROBE_ID = "services-stable-viewport-probe";

function getServicesViewportProbe(): HTMLDivElement | null {
  if (typeof document === "undefined") {
    return null;
  }

  const existingProbe = document.getElementById(SERVICES_VIEWPORT_PROBE_ID);

  if (existingProbe instanceof HTMLDivElement) {
    return existingProbe;
  }

  if (!document.body) {
    return null;
  }

  const probe = document.createElement("div");

  probe.id = SERVICES_VIEWPORT_PROBE_ID;
  probe.setAttribute("aria-hidden", "true");
  probe.style.position = "absolute";
  probe.style.top = "0";
  probe.style.left = "0";
  probe.style.width = "0";
  probe.style.height = "100svh";
  probe.style.pointerEvents = "none";
  probe.style.visibility = "hidden";
  probe.style.overflow = "hidden";

  document.body.appendChild(probe);

  return probe;
}

export function getServicesStableViewportHeight(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  const probeHeight = getServicesViewportProbe()?.getBoundingClientRect().height ?? 0;

  if (probeHeight > 0) {
    return probeHeight;
  }

  return document.documentElement.clientHeight || window.innerHeight;
}