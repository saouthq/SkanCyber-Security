/**
 * « Typographie qui respire » — signature interactive du site.
 * Les lettres proches du curseur gagnent en graisse et en largeur
 * (axes variables wght / wdth d'Instrument Sans), puis se relâchent.
 *
 * Positions des lettres mises en cache (relatives au titre) : une seule
 * lecture de mise en page par image, aucune écriture hors des lettres.
 */
type Options = {
  radius?: number;
  base?: { wght: number; wdth: number };
  peak?: { wght: number; wdth: number };
};

export function breathingType(root: HTMLElement, chars: HTMLElement[], opts: Options = {}) {
  const radius = opts.radius ?? 260;
  const base = opts.base ?? { wght: 480, wdth: 96 };
  const peak = opts.peak ?? { wght: 700, wdth: 100 };
  const state = chars.map(() => 0);
  let centers: { x: number; y: number }[] = [];
  const pointer = { x: -9999, y: -9999, active: false };
  let raf = 0;
  let running = false;

  const measure = () => {
    const r = root.getBoundingClientRect();
    centers = chars.map((c) => {
      const b = c.getBoundingClientRect();
      return { x: b.left - r.left + b.width / 2, y: b.top - r.top + b.height / 2 };
    });
  };

  const apply = (i: number, t: number) => {
    const wght = base.wght + (peak.wght - base.wght) * t;
    const wdth = base.wdth + (peak.wdth - base.wdth) * t;
    chars[i].style.fontVariationSettings = `"wght" ${wght.toFixed(0)}, "wdth" ${wdth.toFixed(1)}`;
  };

  const frame = () => {
    raf = requestAnimationFrame(frame);
    const r = root.getBoundingClientRect();
    let moving = false;
    for (let i = 0; i < chars.length; i++) {
      let target = 0;
      if (pointer.active) {
        const dx = pointer.x - (r.left + centers[i].x);
        const dy = (pointer.y - (r.top + centers[i].y)) * 1.4;
        const d = Math.hypot(dx, dy);
        const k = Math.max(0, 1 - d / radius);
        target = k * k * (3 - 2 * k);
      }
      const next = state[i] + (target - state[i]) * 0.14;
      if (Math.abs(next - state[i]) > 0.001) {
        state[i] = next;
        apply(i, next);
        moving = true;
      }
    }
    if (!moving && !pointer.active) stop();
  };

  const start = () => {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const onMove = (e: PointerEvent) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
    start();
  };
  const onLeave = () => {
    pointer.active = false;
    start();
  };

  measure();
  const ro = new ResizeObserver(measure);
  ro.observe(root);
  root.addEventListener("pointermove", onMove, { passive: true });
  root.addEventListener("pointerleave", onLeave);

  return () => {
    stop();
    ro.disconnect();
    root.removeEventListener("pointermove", onMove);
    root.removeEventListener("pointerleave", onLeave);
    chars.forEach((c) => (c.style.fontVariationSettings = ""));
  };
}
