'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** An original procedural sculpture; no remote textures or model downloads. */
export default function SignalSculpture({ phase = 0, paused = false }: { phase?: number; paused?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const settings = useRef({ phase, paused });
  useEffect(() => { settings.current = { phase, paused }; }, [phase, paused]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); } catch { return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    camera.position.set(0, 0, 10.8);
    const sculpture = new THREE.Group();
    scene.add(sculpture);
    const geometry = new THREE.TorusKnotGeometry(1.48, .39, 180, 28, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({ color: '#2448ee', metalness: .22, roughness: .27, clearcoat: 1, clearcoatRoughness: .17 });
    const knot = new THREE.Mesh(geometry, material);
    sculpture.add(knot);
    knot.rotation.set(.3, .5, .2);
    const rimGeometry = new THREE.TorusGeometry(2.32, .012, 8, 150);
    const rimMaterial = new THREE.MeshBasicMaterial({ color: '#fb6435', transparent: true, opacity: 0 });
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.rotation.x = 1.15;
    sculpture.add(rim);
    const moduleGeometry = new THREE.TorusGeometry(.68, .19, 20, 80);
    const moduleMaterials = ['#2448ee', '#fc5b35', '#899b68'].map(c => new THREE.MeshPhysicalMaterial({ color: c, metalness: .15, roughness: .3, clearcoat: 1 }));
    const modules = moduleMaterials.map((mat, index) => {
      const mesh = new THREE.Mesh(moduleGeometry, mat);
      mesh.position.set(...([[-.95, .85, .2], [1.05, .2, -.1], [-.2, -1.15, .4]][index] as [number, number, number]));
      mesh.rotation.set(.6 + index * .3, index * .6, index * .45);
      mesh.scale.setScalar(.001);
      sculpture.add(mesh);
      return mesh;
    });
    scene.add(new THREE.AmbientLight(0xdde5ff, 2.5));
    const key = new THREE.DirectionalLight(0xffffff, 6); key.position.set(-4, 6, 5); scene.add(key);
    const blue = new THREE.DirectionalLight(0x9abbff, 4); blue.position.set(4, -2, 3); scene.add(blue);
    const warm = new THREE.DirectionalLight(0xffd4b2, 3); warm.position.set(2, 4, -3); scene.add(warm);
    const pointer = { x: 0, y: 0 };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const r = element.getBoundingClientRect();
      pointer.x = (event.clientX - r.left) / r.width - .5;
      pointer.y = (event.clientY - r.top) / r.height - .5;
    };
    const leave = () => { pointer.x = 0; pointer.y = 0; };
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', leave);
    let needsRender = true;
    const resize = () => { const { width, height } = element.getBoundingClientRect(); if (!width || !height) return; renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix(); needsRender = true; };
    const observer = new ResizeObserver(resize); observer.observe(element); resize();
    let frame = 0, visible = true, disposed = false, previous = 0;
    const colors = ['#2448ee', '#fb6435', '#2448ee'];
    const color = new THREE.Color();
    const targetScale = new THREE.Vector3();
    let lastPhase = -1;
    const render = (time: number) => {
      if (disposed) return;
      frame = requestAnimationFrame(render);
      if (!visible || document.hidden || time - previous < 30) return;
      const delta = Math.min((time - previous) / 1000, .06); previous = time;
      const { phase: step, paused: stop } = settings.current;
      if (stop && step === lastPhase && !needsRender) return;
      color.set(colors[step % 3]); material.color.lerp(color, stop ? 1 : .055);
      const scale = step === 1 ? .85 : step === 2 ? .92 : 1;
      sculpture.scale.lerp(targetScale.setScalar(scale), stop ? 1 : .06);
      knot.scale.lerp(targetScale.setScalar(step === 2 ? .001 : 1), stop ? 1 : .09);
      modules.forEach(mesh => mesh.scale.lerp(targetScale.setScalar(step === 2 ? 1.3 : .001), stop ? 1 : .07));
      rimMaterial.opacity += ((step === 1 ? .7 : .12) - rimMaterial.opacity) * (stop ? 1 : .05);
      if (!stop) {
        knot.rotation.y += delta * .18;
        knot.rotation.z += delta * .055;
        sculpture.rotation.y += (pointer.x * .65 + step * .42 - sculpture.rotation.y) * .045;
        sculpture.rotation.x += (pointer.y * .5 - sculpture.rotation.x) * .045;
        rim.rotation.z += delta * .1;
        modules.forEach((mesh, i) => { mesh.rotation.y += delta * (.13 + i * .03); });
      }
      renderer.render(scene, camera);
      lastPhase = step; needsRender = false;
      element.dataset.ready = 'true';
    };
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: '100px' });
    visibility.observe(element); frame = requestAnimationFrame(render);
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect(); element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', leave); geometry.dispose(); material.dispose(); rimGeometry.dispose(); rimMaterial.dispose(); moduleGeometry.dispose(); moduleMaterials.forEach(m => m.dispose()); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div className="sculpture-canvas" ref={host} aria-hidden="true" />;
}
