import { useEffect, type RefObject } from "react";
import { gsap } from "~/animations/gsap";
import { pageLifecycle } from "~/animations/page-lifecycle";
import { setupScrollReveals } from "~/animations/reveals";
import { prefersReducedMotion } from "~/lib/env";

/** Active les révélations déclaratives (data-reveal, data-parallax) dans `scope`. */
export function useScrollReveals(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const off = pageLifecycle.onReady(() => {
      if (scope.current) ctx = gsap.context(() => setupScrollReveals(scope.current!), scope.current);
    });
    return () => {
      off();
      ctx?.revert();
    };
  }, [scope]);
}
