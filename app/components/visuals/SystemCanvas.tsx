import { useEffect, useRef, useState } from "react";
import { hasFinePointer, prefersReducedMotion, supportsWebGL } from "~/lib/env";
import type { SystemState } from "~/webgl/system-state";

type Props = { state: SystemState; className?: string };

/**
 * Monte la scène WebGL après le premier affichage (import dynamique :
 * Three.js n'est jamais dans le bundle initial). Repli : aucune scène,
 * le contenu reste complet et lisible.
 */
export function SystemCanvas({ state, className = "" }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!host.current || !supportsWebGL()) return;
    let disposed = false;
    let destroy: (() => void) | undefined;

    const load = () =>
      import("~/webgl/system-scene").then(({ createSystemScene }) => {
        if (disposed || !host.current) return;
        const scene = createSystemScene(host.current, state, {
          mobile: window.matchMedia("(max-width: 48rem)").matches,
          reduced: prefersReducedMotion(),
          finePointer: hasFinePointer(),
        });
        destroy = scene.destroy;
        requestAnimationFrame(() => setReady(true));
      });

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const id = idle(load, { timeout: 600 });
    return () => {
      disposed = true;
      window.cancelIdleCallback?.(id as number);
      destroy?.();
    };
  }, [state]);

  return (
    <div
      ref={host}
      aria-hidden
      className={`transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
}
