import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { isIOSDevice } from "@/lib/is-ios-safari";

gsap.registerPlugin(ScrollTrigger, useGSAP);

ScrollTrigger.config({
	ignoreMobileResize: typeof window !== "undefined" && isIOSDevice(),
	limitCallbacks: true,
});

export { gsap, ScrollTrigger, useGSAP };
