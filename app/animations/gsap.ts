import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

let registered = false;

/** Enregistre les plugins une seule fois, côté navigateur uniquement. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
  // Vocabulaire de mouvement — voir app/animations/tokens.ts
  CustomEase.create("precise", "0.7,0,0.2,1");
  CustomEase.create("lock", "0.16,1,0.3,1");
  gsap.defaults({ ease: "lock", duration: 1 });
  registered = true;
}

registerGsap();

export { gsap, ScrollTrigger, SplitText, useGSAP };
