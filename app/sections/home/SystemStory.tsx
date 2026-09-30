import { useMemo } from "react";
import { createSystemState } from "~/webgl/system-state";
import { SystemCanvas } from "~/components/visuals/SystemCanvas";
import { Coupe } from "./Coupe";
import { Hero } from "./Hero";

/**
 * Hero + Coupe partagent une même scène WebGL, collée à l'écran (sticky)
 * pendant tout le récit, puis libérée à la fin de la séquence.
 */
export function SystemStory() {
  const state = useMemo(() => createSystemState(), []);

  return (
    <div className="relative">
      <div className="pointer-events-none sticky top-0 -mb-[100svh] h-[100svh]">
        <SystemCanvas state={state} className="absolute inset-0" />
        {/* Fondus de bord pour asseoir la scène dans la page */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink to-transparent" />
      </div>
      <Hero state={state} />
      <Coupe state={state} />
    </div>
  );
}
