import {
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  LineSegments,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { layerPattern } from "./patterns";
import { bitFragment, bitVertex, lineFragment, lineVertex } from "./shaders";
import type { SystemState } from "./system-state";

type Options = { mobile: boolean; reduced: boolean; finePointer: boolean };

const LAYERS = 4;
const SIZE = { w: 4, d: 5 }; // proportions 4 × 5 du symbole
const FOV = 26;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const spacingFor = (explode: number) => lerp(0.6, 1.3, explode);

/**
 * « Le Système » — quatre couches de bits posées à plat, vues en perspective.
 * Instanciation : un seul draw call pour tous les bits, un pour toutes les lignes.
 */
export function createSystemScene(container: HTMLElement, state: SystemState, opts: Options) {
  const cols = opts.mobile ? 16 : 24;
  const rows = opts.mobile ? 20 : 30;

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.mobile ? 1.5 : 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
  const system = new Group();
  scene.add(system);

  const bone = new Color("#f4f4f2");
  const signal = new Color("#ff6a4a");

  // ─── Bits (instances) ──────────────────────────────────────
  const count = cols * rows * LAYERS;
  const grid = new Float32Array(count * 2);
  const layer = new Float32Array(count);
  const seed = new Float32Array(count);
  const bitState = new Float32Array(count);
  let n = 0;
  for (let l = 0; l < LAYERS; l++) {
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        grid[n * 2] = (i + 0.5) / cols;
        grid[n * 2 + 1] = (j + 0.5) / rows;
        layer[n] = l;
        seed[n] = Math.random();
        bitState[n] = layerPattern(l, i, j, cols, rows);
        n++;
      }
    }
  }

  const quad = new PlaneGeometry(1, 1);
  quad.rotateX(-Math.PI / 2);
  const bitGeo = new InstancedBufferGeometry();
  bitGeo.index = quad.index;
  bitGeo.setAttribute("position", quad.getAttribute("position"));
  bitGeo.setAttribute("uv", quad.getAttribute("uv"));
  bitGeo.setAttribute("aGrid", new InstancedBufferAttribute(grid, 2));
  bitGeo.setAttribute("aLayer", new InstancedBufferAttribute(layer, 1));
  bitGeo.setAttribute("aSeed", new InstancedBufferAttribute(seed, 1));
  bitGeo.setAttribute("aState", new InstancedBufferAttribute(bitState, 1));
  bitGeo.instanceCount = count;

  const shared = {
    uTime: { value: 0 },
    uIntro: { value: 0 },
    uFocus: { value: 0 },
    uActive: { value: 0 },
    uEnvelope: { value: 0 },
    uOpacity: { value: 1 },
    uBone: { value: bone },
    uSignal: { value: signal },
  };

  const bitMat = new ShaderMaterial({
    vertexShader: bitVertex,
    fragmentShader: bitFragment,
    transparent: true,
    depthWrite: false,
    uniforms: {
      ...shared,
      uSpacing: { value: spacingFor(0) },
      uProbe: { value: 0 },
      uAgitation: { value: 0 },
      uMouse: { value: [9, 9] },
      uAspect: { value: 1 },
      uSize: { value: [SIZE.w, SIZE.d] },
      uBit: { value: (SIZE.w / cols) * 0.62 },
      uRows: { value: rows },
    },
  });
  const bits = new Mesh(bitGeo, bitMat);
  bits.frustumCulled = false;
  system.add(bits);

  // ─── Lignes : cadres, conduits, périmètre ─────────────────
  type Seg = { kind: number; edge: number; layer: number };
  const segs: Seg[] = [];
  for (let l = 0; l < LAYERS; l++) for (let e = 0; e < 4; e++) segs.push({ kind: 0, edge: e + l * 4, layer: l });
  const conduits: [number, number][] = [
    [-0.36, -0.3],
    [0.14, -0.42],
    [0.38, 0.12],
    [-0.1, 0.3],
    [0.3, 0.44],
  ];
  conduits.forEach((_, e) => segs.push({ kind: 1, edge: e, layer: 0 }));
  for (let e = 0; e < 12; e++) segs.push({ kind: 2, edge: e, layer: 0 });

  const linePos = new Float32Array(segs.length * 6);
  const lineT = new Float32Array(segs.length * 2);
  const lineKind = new Float32Array(segs.length * 2);
  const lineEdge = new Float32Array(segs.length * 2);
  const lineLayer = new Float32Array(segs.length * 2);
  segs.forEach((s, k) => {
    lineT.set([0, 1], k * 2);
    lineKind.set([s.kind, s.kind], k * 2);
    lineEdge.set([s.edge, s.edge], k * 2);
    lineLayer.set([s.layer, s.layer], k * 2);
  });
  const lineGeo = new BufferGeometry();
  const posAttr = new BufferAttribute(linePos, 3);
  lineGeo.setAttribute("position", posAttr);
  lineGeo.setAttribute("aT", new BufferAttribute(lineT, 1));
  lineGeo.setAttribute("aKind", new BufferAttribute(lineKind, 1));
  lineGeo.setAttribute("aEdge", new BufferAttribute(lineEdge, 1));
  lineGeo.setAttribute("aLayer", new BufferAttribute(lineLayer, 1));
  const lineMat = new ShaderMaterial({
    vertexShader: lineVertex,
    fragmentShader: lineFragment,
    transparent: true,
    depthWrite: false,
    uniforms: shared,
  });
  const lines = new LineSegments(lineGeo, lineMat);
  lines.frustumCulled = false;
  system.add(lines);

  const hw = SIZE.w / 2;
  const hd = SIZE.d / 2;
  const rect = (m: number): [number, number][] => [
    [-hw * m, -hd * m],
    [hw * m, -hd * m],
    [hw * m, hd * m],
    [-hw * m, hd * m],
  ];

  function updateLines(spacing: number) {
    const yOf = (l: number) => (1.5 - l) * spacing;
    let k = 0;
    const put = (a: number[], b: number[]) => {
      linePos.set(a, k * 6);
      linePos.set(b, k * 6 + 3);
      k++;
    };
    const frame = rect(1.035);
    for (let l = 0; l < LAYERS; l++) {
      const y = yOf(l);
      for (let e = 0; e < 4; e++) {
        const [x0, z0] = frame[e];
        const [x1, z1] = frame[(e + 1) % 4];
        put([x0, y, z0], [x1, y, z1]);
      }
    }
    for (const [u, v] of conduits) put([u * SIZE.w, yOf(0), v * SIZE.d], [u * SIZE.w, yOf(3), v * SIZE.d]);
    const env = rect(1.12);
    const top = yOf(0) + 0.42;
    const bottom = yOf(3) - 0.42;
    for (let e = 0; e < 4; e++) {
      const [x0, z0] = env[e];
      const [x1, z1] = env[(e + 1) % 4];
      put([x0, top, z0], [x1, top, z1]);
    }
    for (let e = 0; e < 4; e++) {
      const [x, z] = env[e];
      put([x, top, z], [x, bottom, z]);
    }
    for (let e = 0; e < 4; e++) {
      const [x0, z0] = env[e];
      const [x1, z1] = env[(e + 1) % 4];
      put([x0, bottom, z0], [x1, bottom, z1]);
    }
    posAttr.needsUpdate = true;
  }

  // ─── Pointeur ──────────────────────────────────────────────
  const mouse = { x: 9, y: 9, tx: 9, ty: 9, speed: 0, probe: 0 };
  const onPointer = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
    if (mouse.tx !== 9) mouse.speed = Math.min(1, mouse.speed + Math.hypot(nx - mouse.tx, ny - mouse.ty) * 3);
    mouse.tx = nx;
    mouse.ty = ny;
  };
  if (opts.finePointer && !opts.reduced) window.addEventListener("pointermove", onPointer, { passive: true });

  // ─── Taille & composition ──────────────────────────────────
  let width = 1;
  let height = 1;
  const resize = () => {
    width = container.clientWidth || 1;
    height = container.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    bitMat.uniforms.uAspect.value = width / height;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  // ─── Boucle ────────────────────────────────────────────────
  let raf = 0;
  let running = false;
  let last = performance.now();
  let time = 0;
  const cam = { dist: 0, rot: 0, ox: state.offsetX, oy: state.offsetY };

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!opts.reduced) time += dt;

    // Sonde : souris sur desktop, balayage autonome sur tactile
    if (opts.finePointer && !opts.reduced) {
      mouse.x = lerp(mouse.x, mouse.tx, 0.12);
      mouse.y = lerp(mouse.y, mouse.ty, 0.12);
      mouse.probe = lerp(mouse.probe, mouse.tx === 9 ? 0 : 1, 0.05);
    } else if (!opts.reduced) {
      mouse.x = Math.sin(time * 0.31) * 0.55 + 0.2;
      mouse.y = Math.cos(time * 0.23) * 0.35 - 0.1;
      mouse.probe = 0.75;
      mouse.speed = Math.max(mouse.speed, (Math.sin(time * 0.7) * 0.5 + 0.5) * 0.35);
    }
    mouse.speed *= 0.955;

    const spacing = spacingFor(state.explode);
    const u = bitMat.uniforms;
    u.uTime.value = time;
    u.uIntro.value = opts.reduced ? 1 : state.intro;
    u.uSpacing.value = spacing;
    u.uFocus.value = state.focus;
    u.uActive.value = state.active;
    u.uEnvelope.value = state.envelope;
    u.uOpacity.value = state.opacity;
    u.uMouse.value = [mouse.x, mouse.y];
    u.uProbe.value = mouse.probe;
    u.uAgitation.value = mouse.speed;
    updateLines(spacing);

    // Caméra : distance adaptée à la hauteur du système, légère parallaxe
    const portrait = width < height;
    const targetDist = ((portrait ? 21 : 15.5) + state.explode * (portrait ? 3 : 3.2)) * state.zoom;
    cam.dist = cam.dist === 0 ? targetDist : lerp(cam.dist, targetDist, 0.08);
    cam.rot = lerp(cam.rot, opts.finePointer && mouse.tx !== 9 ? mouse.x * 0.07 : 0, 0.04);
    cam.ox = lerp(cam.ox, state.offsetX, 0.08);
    cam.oy = lerp(cam.oy, state.offsetY, 0.08);

    system.rotation.y = -Math.PI / 4 + state.turn + cam.rot + (opts.reduced ? 0 : Math.sin(time * 0.12) * 0.03);
    const elev = 0.62 + (opts.finePointer && mouse.ty !== 9 ? mouse.y * 0.025 : 0);
    camera.position.set(0, Math.sin(elev) * cam.dist, Math.cos(elev) * cam.dist);
    camera.lookAt(0, 0, 0);
    camera.setViewOffset(width, height, -width * cam.ox, -height * cam.oy, width, height);

    renderer.render(scene, camera);
  };

  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const io = new IntersectionObserver(([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()), {
    rootMargin: "10% 0px",
  });
  io.observe(container);
  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", onVisibility);

  return {
    destroy() {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      quad.dispose();
      bitGeo.dispose();
      bitMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}

export type SystemScene = ReturnType<typeof createSystemScene>;
