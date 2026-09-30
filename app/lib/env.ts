export const isBrowser = typeof window !== "undefined";

export const prefersReducedMotion = () =>
  isBrowser && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  isBrowser && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export function supportsWebGL() {
  if (!isBrowser) return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
