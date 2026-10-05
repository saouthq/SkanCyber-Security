'use client';

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

const ease = [.22, 1, .36, 1] as const;

export function ReadingProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  return <motion.div className="p-reading-progress" aria-hidden="true" style={{ scaleX: reduced ? scrollYProgress : smooth }} />;
}

export function HeroTitle() {
  const reduced = useReducedMotion();
  return <h1 aria-label="Le numérique, à la hauteur de vos ambitions.">{['Le numérique,', 'à la hauteur de', 'vos ambitions.'].map((line, i) =>
    <span className="p-title-line" aria-hidden="true" key={line}>
      <motion.span initial={reduced ? false : { y: '105%', rotate: 2 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: reduced ? 0 : .85, delay: reduced ? 0 : .12 + i * .12, ease }}>{line}</motion.span>
    </span>
  )}</h1>;
}

export function HeroVisual({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const xTilt = useMotionValue(0);
  const yTilt = useMotionValue(0);
  const rotateX = useSpring(xTilt, { stiffness: 120, damping: 22 });
  const rotateY = useSpring(yTilt, { stiffness: 120, damping: 22 });
  return <motion.div ref={ref} className="p-hero-visual" style={reduced ? undefined : { y, rotateX, rotateY, transformPerspective: 1200 }}
    initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .9, delay: .25 }}
    onPointerMove={e => {
      if (reduced || e.pointerType !== 'mouse') return;
      const box = e.currentTarget.getBoundingClientRect();
      xTilt.set((.5 - (e.clientY - box.top) / box.height) * 4);
      yTilt.set(((e.clientX - box.left) / box.width - .5) * 4);
    }} onPointerLeave={() => { xTilt.set(0); yTilt.set(0); }}>{children}</motion.div>;
}

export function AnimatedDisclosure({ open, id, children }: { open: boolean; id: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.div id={id} className="p-disclosure" aria-hidden={!open} inert={!open} initial={false}
    animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: reduced ? 0 : .35, ease }}>{children}</motion.div>;
}

export function MethodStep({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'start 40%'] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <div ref={ref} className="p-step"><span>0{index + 1}</span><div className="p-step-line"><motion.i style={{ scaleX: reduced ? 1 : progress }} /></div><h3>{title}</h3><p>{children}</p></div>;
}
