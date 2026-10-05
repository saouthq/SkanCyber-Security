'use client';

import { motion, useMotionValue, useReducedMotion, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const chapters = [
  { label: 'L’impulsion', title: 'Tout commence par votre besoin.', detail: 'Une idée, un usage, une ambition. Le point de départ vous appartient.' },
  { label: 'La connexion', title: 'Une base. Plusieurs possibilités.', detail: 'Relier votre réseau, vos interfaces et vos données autour de vos usages.' },
  { label: 'La concrétisation', title: 'Votre projet prend forme.', detail: 'La technique devient un outil concret, au service de votre activité.' },
  { label: 'Le déploiement', title: 'De l’idée au quotidien.', detail: 'Comprendre, concevoir, déployer. Et vous accompagner dans la suite.' },
  { label: 'La suite', title: 'Écrivons la suite ensemble.', detail: 'Le fil arrive ici. La conversation peut commencer.' },
];

type Point = { x: number; y: number };
const lerp = (a: Point, b: Point, t: number): Point => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
function curve(a: Point, b: Point, t: number) {
  const c = { x: a.x, y: a.y + (b.y - a.y) * .45 };
  const d = { x: b.x, y: b.y - (b.y - a.y) * .45 };
  const ab = lerp(a, c, t), bc = lerp(c, d, t), cd = lerp(d, b, t);
  const abc = lerp(ab, bc, t), bcd = lerp(bc, cd, t);
  return { point: lerp(abc, bcd, t), c, d, ab, abc };
}
function Mark() {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M7 8h18v6H13v4h12v6H7v-6h12v-4H7Z" fill="currentColor" /></svg>;
}

export function StoryStation({ index }: { index: number }) {
  const chapter = chapters[index];
  return <div className={`p-story-station station-${index}`}>
    <span className="p-story-dock" data-story-anchor={index} aria-hidden="true"><Mark /></span>
    <div className="p-story-copy"><span className="p-story-eyebrow">0{index + 1} / {chapter.label}</span><h3>{chapter.title}</h3><p>{chapter.detail}</p></div>
    <span className="p-story-station-line" aria-hidden="true" />
  </div>;
}

export function ProjectStory() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [chapter, setChapter] = useState(0);
  const phase = useRef(0);
  const points = useRef<Point[]>([]);
  const stationPoints = useRef<Point[]>([]);
  const screen = useRef({ width: 0, height: 0 });
  const { scrollY } = useScroll();
  const x = useMotionValue(0), y = useMotionValue(0), turn = useMotionValue(0);
  const track = useMotionValue(''), trail = useMotionValue('');
  const fill = useMotionValue(0);
  const enabled = ready && !paused && !reduced;

  useEffect(() => {
    if (reduced) { setReady(false); return; }
    let frame = 0;
    let disposed = false;
    const update = (scroll: number) => {
      const stops = points.current;
      if (stops.length < chapters.length) return;
      const targetY = scroll + screen.current.height * .62;
      let i = 0;
      while (i < stops.length - 2 && targetY > stops[i + 1].y) i++;
      const a = stops[i], b = stops[i + 1];
      let low = 0, high = 1;
      for (let n = 0; n < 18; n++) {
        const mid = (low + high) / 2;
        if (curve(a, b, mid).point.y < targetY) low = mid; else high = mid;
      }
      const t = targetY <= a.y ? 0 : targetY >= b.y ? 1 : (low + high) / 2;
      const c = curve(a, b, t);
      x.set(c.point.x); y.set(c.point.y - scroll); turn.set((i + t) * 180);
      let active = 0;
      for (let n = 1; n < stationPoints.current.length; n++) { if (targetY >= stationPoints.current[n].y - 65) active = n; }
      if (active !== phase.current) { phase.current = active; setChapter(active); }
      fill.set((i + t) / (stops.length - 1));
      const path = (start: Point, first: Point, second: Point, end: Point) => `M${start.x},${start.y - scroll} C${first.x},${first.y - scroll} ${second.x},${second.y - scroll} ${end.x},${end.y - scroll}`;
      track.set(path(a, c.c, c.d, b));
      trail.set(path(a, c.ab, c.abc, c.point));
    };
    const measure = () => {
      const anchors = [...document.querySelectorAll<HTMLElement>('[data-story-anchor]')];
      screen.current = { width: window.innerWidth, height: window.innerHeight };
      const stations = anchors.map(el => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY }; });
      stationPoints.current = stations;
      const mobile = window.innerWidth <= 700;
      const edge = mobile ? 12 : 38;
      const side = (p: Point) => p.x < window.innerWidth / 2 ? edge : window.innerWidth - edge;
      const route: Point[] = stations.length ? [stations[0]] : [];
      for (let n = 0; n < stations.length - 1; n++) {
        const a = stations[n], b = stations[n + 1];
        const bridge = document.querySelector<HTMLElement>(`[data-story-bridge="${n}"]`);
        const r = bridge?.getBoundingClientRect();
        const middle = r ? r.top + r.height / 2 + window.scrollY : (a.y + b.y) / 2;
        route.push({x:side(a),y:a.y+25},{x:side(a),y:middle-38},{x:side(b),y:middle+38},{x:side(b),y:b.y-25},b);
      }
      points.current = route;
      update(window.scrollY); setReady(anchors.length === chapters.length);
    };
    const schedule = () => { if (disposed) return; cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    document.querySelectorAll('main > section').forEach(el => observer.observe(el));
    window.addEventListener('resize', schedule);
    const unsubscribe = scrollY.on('change', update);
    document.fonts.ready.then(schedule);
    schedule();
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); unsubscribe(); window.removeEventListener('resize', schedule); };
  }, [reduced, scrollY, x, y, turn, track, trail, fill]);

  useEffect(() => {
    document.documentElement.dataset.storyFlight = enabled ? 'on' : 'off';
    return () => { delete document.documentElement.dataset.storyFlight; };
  }, [enabled]);

  return <>
    {enabled && <div className="p-story-flight" aria-hidden="true">
      <svg className="p-story-path"><motion.path d={track} className="p-story-track" /><motion.path d={trail} className="p-story-trail" /></svg>
      <motion.div className="p-story-signal" style={{ left: x, top: y }}><motion.i className="p-story-orbit" style={{ rotate: turn }} /><span className="p-story-core"><Mark /></span></motion.div>
    </div>}
    {ready && !reduced && <aside className="p-story-caption" aria-label="Le fil de votre projet">
      <span className="p-story-caption-dot" /><div><span className="p-story-caption-label">LE FIL DE VOTRE PROJET</span><span className="p-story-caption-title">0{chapter + 1} — {chapters[chapter].label}</span></div>
      <div className="p-story-caption-progress" aria-hidden="true"><motion.i style={{ scaleX: fill }} /></div>
      <button onClick={() => setPaused(v => !v)} aria-label={paused ? 'Reprendre l’histoire animée' : 'Mettre l’histoire en pause'} aria-pressed={paused}>{paused ? <Play size={13} /> : <Pause size={13} />}</button>
    </aside>}
  </>;
}
