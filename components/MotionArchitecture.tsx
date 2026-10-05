'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Check, Database, Globe2, Network, ShieldCheck, Wifi } from 'lucide-react';

const acts = [
  { word: 'Connecter.', subtitle: 'Les fondations invisibles.', detail: 'Un réseau qui relie vos espaces, vos équipes et vos équipements.' },
  { word: 'Créer.', subtitle: 'Votre présence prend forme.', detail: 'Une interface conçue pour votre marque et pour ceux qui l’utilisent.' },
  { word: 'Réunir.', subtitle: 'Tout commence à fonctionner ensemble.', detail: 'Vos clients, vos données et vos processus dans un outil à votre mesure.' },
];
const tiles = [
  { name: 'Équipes', icon: Wifi, start: [0, 10], end: [5, 26], label: 'Votre identité', value: 'Une présence singulière.' },
  { name: 'Équipements', icon: Network, start: [74, 10], end: [53, 26], label: 'Votre activité', value: 'Une lecture claire.' },
  { name: 'Accès', icon: ShieldCheck, start: [0, 70], end: [5, 61], label: 'Vos clients', value: 'Chaque relation compte.' },
  { name: 'Données', icon: Database, start: [74, 70], end: [53, 61], label: 'Vos processus', value: 'Moins de friction.' },
];

function ArchitectureTile({ index, progress, reduced }: { index: number; progress: MotionValue<number>; reduced: boolean }) {
  const tile = tiles[index];
  const left = useTransform(progress, [0, .18, .48, 1], [`${tile.start[0]}%`, `${tile.start[0]}%`, `${tile.end[0]}%`, `${tile.end[0]}%`]);
  const top = useTransform(progress, [0, .18, .48, 1], [`${tile.start[1]}%`, `${tile.start[1]}%`, `${tile.end[1]}%`, `${tile.end[1]}%`]);
  const width = useTransform(progress, [.18, .48], ['26%', '42%']);
  const height = useTransform(progress, [.18, .48], ['20%', '29%']);
  const rotate = useTransform(progress, [0, .18, .48], [index % 2 ? 5 : -5, index % 2 ? 5 : -5, 0]);
  const network = useTransform(progress, [.2, .35], [1, 0]);
  const content = useTransform(progress, [.35, .49], [0, 1]);
  const web = useTransform(progress, [.65, .8], [1, 0]);
  const software = useTransform(progress, [.65, .8], [0, 1]);
  const Icon = tile.icon;
  return <motion.div className={`ma-tile tile-${index}`} style={reduced ? { left: `${tile.end[0]}%`, top: `${tile.end[1]}%`, width: '42%', height: '29%' } : { left, top, width, height, rotate }}>
    <motion.div className="ma-node" style={{ opacity: reduced ? 0 : network }}><Icon /><span>{tile.name}</span><i /></motion.div>
    <motion.div className="ma-tile-content" style={{ opacity: reduced ? 1 : content }}>
      <motion.div className="ma-web-block" style={{ opacity: reduced ? 0 : web }}><span>0{index + 1} / {tile.label}</span>{index === 0 ? <strong>Votre marque.<br/>Son univers.</strong> : index === 1 ? <div className="ma-art"><Globe2 /><i /><i /></div> : <><b>{tile.value}</b><div className="ma-copy-lines"><i /><i /></div></>}</motion.div>
      <motion.div className="ma-software-block" style={{ opacity: reduced ? 1 : software }}><span>{['ACTIVITÉ', 'PILOTAGE', 'RELATION CLIENT', 'ORGANISATION'][index]}</span>{index === 0 ? <><strong>Une vue d’ensemble.</strong><svg viewBox="0 0 200 45"><path d="M0 40C20 40 20 18 40 28S75 30 90 15S120 35 145 15S175 25 200 2" fill="none" stroke="currentColor" strokeWidth="2" /></svg></> : index === 1 ? <div className="ma-bars">{[35, 65, 48, 80, 100].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div> : <div className="ma-data-rows">{[0, 1, 2].map(n => <div key={n}><i /><span /><Check size={11} /></div>)}</div>}</motion.div>
    </motion.div>
  </motion.div>;
}

export default function MotionArchitecture() {
  const ref = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();
  const visible = useInView(ref, { amount: .12 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useMotionValue(0);
  const [act, setAct] = useState(0);
  const phase = useRef(0);
  useMotionValueEvent(scrollYProgress, 'change', value => { progress.set(value); const next = value < .32 ? 0 : value < .7 ? 1 : 2; if (phase.current !== next) { phase.current = next; setAct(next); } });
  const line = useTransform(progress, [0, .15, .3], [0, 1, 1]);
  const linesOpacity = useTransform(progress, [.2, .4], [1, 0]);
  const frameOpacity = useTransform(progress, [.24, .48], [0, 1]);
  const coreLeft = useTransform(progress, [.2, .48], ['50%', '9%']);
  const coreTop = useTransform(progress, [.2, .48], ['50%', '12%']);
  const coreScale = useTransform(progress, [.2, .48], [1, .48]);
  const sceneRotate = useTransform(progress, [0, .45, .75, 1], [-8, 0, 0, -3]);
  const depth = useTransform(progress, [0, .45, .75, 1], [12, 0, 0, 8]);
  const tiltX = useMotionValue(0), tiltY = useMotionValue(0);
  const pointerX = useSpring(tiltX, { stiffness: 100, damping: 25 }), pointerY = useSpring(tiltY, { stiffness: 100, damping: 25 });
  const choose = (index: number) => { if (!ref.current || reduced) return; const box = ref.current.getBoundingClientRect(); window.scrollTo({ top: window.scrollY + box.top + (box.height - window.innerHeight) * [0.06, .5, .94][index], behavior: 'smooth' }); };
  return <section ref={ref} className={`p-cinema ${reduced ? 'is-static' : ''}`} data-playing={visible} aria-label="Du réseau à votre outil : une vision d’ensemble">
    <div className="ma-sticky">
      <div className="ma-topline"><span><i /> UNE VISION. UN ÉCOSYSTÈME.</span><a href="#expertises">Explorer les expertises <ArrowDown size={13} /></a></div>
      <div className="ma-layout">
        <div className="ma-editorial"><span className="ma-act-number">0{(reduced ? 2 : act) + 1} / 03</span><div className="ma-act-copy" aria-live="off"><AnimatePresence mode="wait" initial={false}><motion.div key={reduced ? 2 : act} initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: .3 }}><h2>{acts[reduced ? 2 : act].word}</h2><h3>{acts[reduced ? 2 : act].subtitle}</h3><p>{acts[reduced ? 2 : act].detail}</p></motion.div></AnimatePresence></div><nav className="ma-act-nav" aria-label="Explorer la séquence">{acts.map((item, i) => <button key={item.word} onClick={() => choose(i)} aria-label={`Voir la séquence ${item.word.slice(0, -1)}`} aria-current={(reduced ? 2 : act) === i ? 'step' : undefined} disabled={reduced}><span>0{i + 1}</span>{item.word}<ArrowUpRight size={13} /></button>)}</nav></div>
        <div className="ma-stage" aria-hidden="true" onPointerMove={e => { if (reduced || e.pointerType !== 'mouse') return; const b = e.currentTarget.getBoundingClientRect(); tiltX.set((.5 - (e.clientY - b.top) / b.height) * 6); tiltY.set(((e.clientX - b.left) / b.width - .5) * 6); }} onPointerLeave={() => { tiltX.set(0); tiltY.set(0); }}>
          <div className="ma-stage-grid" /><motion.div className="ma-parallax" style={reduced ? undefined : { rotateX: pointerX, rotateY: pointerY, transformPerspective: 1400 }}><motion.div className="ma-scene" style={reduced ? undefined : { rotateZ: sceneRotate, rotateX: depth, transformPerspective: 1200 }}>
            <motion.div className="ma-frame" style={{ opacity: reduced ? 1 : frameOpacity }}><div className="ma-window-bar"><i /><i /><i /><span>Votre espace numérique</span><ArrowUpRight size={12} /></div><div className="ma-window-heading">{act < 2 && !reduced ? 'Un univers à votre image.' : 'Votre entreprise. En clair.'}<span>SK / SUR MESURE</span></div></motion.div>
            <motion.svg className="ma-network-lines" viewBox="0 0 600 420" style={{ opacity: reduced ? 0 : linesOpacity }}><defs><linearGradient id="ma-line"><stop stopColor="#a2efce" stopOpacity=".2" /><stop offset=".5" stopColor="#a2efce" /><stop offset="1" stopColor="#a2efce" stopOpacity=".2" /></linearGradient></defs>{['M300 210H78V84','M300 210H522V84','M300 210H78V336','M300 210H522V336'].map(d => <motion.path key={d} d={d} pathLength={1} style={{ pathLength: line }} stroke="url(#ma-line)" fill="none" strokeWidth="1.5" />)}<circle cx="300" cy="210" r="60" /><circle cx="300" cy="210" r="85" /></motion.svg>
            {tiles.map((_, index) => <ArchitectureTile key={index} index={index} progress={progress} reduced={reduced} />)}
            <motion.div className="ma-core" style={reduced ? { left: '9%', top: '12%', scale: .48 } : { left: coreLeft, top: coreTop, scale: coreScale }}><svg viewBox="0 0 32 32"><path d="M7 8h18v6H13v4h12v6H7v-6h12v-4H7Z" fill="currentColor" /></svg><i /></motion.div>
          </motion.div></motion.div><div className="ma-stage-caption"><span><i /> {['L’INFRASTRUCTURE', 'L’INTERFACE', 'L’APPLICATION'][reduced ? 2 : act]}</span><span>VISUALISATION CONCEPTUELLE</span></div>
        </div>
      </div>
      <div className="ma-bottomline"><span>{reduced ? 'Une architecture pensée dans son ensemble.' : 'Faites défiler. Les mêmes éléments, de nouvelles possibilités.'}</span><div><motion.i style={{ scaleX: reduced ? 1 : progress }} /></div><span>SKANCYBER / DU RÉSEAU À L’APPLICATION</span></div>
    </div>
  </section>;
}
