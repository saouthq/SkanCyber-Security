import { useRef, type ReactNode } from "react";
import { useScrollReveals } from "~/hooks/useScrollReveals";

/** Conteneur de page : cible du lien d'évitement + révélations au scroll. */
export function PageShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveals(ref);
  return (
    <main id="main" ref={ref} tabIndex={-1} className={`relative outline-none ${className}`}>
      {children}
    </main>
  );
}
