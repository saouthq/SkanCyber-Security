'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export default function Mesh() {
 const ref = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const host = ref.current!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;
  const mobile = innerWidth < 700, N = mobile ? 130 : 260;
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' }); } catch { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1 : 1.25));
  renderer.setClearColor(0x05070c, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, .1, 100);
  camera.position.set(0, 0, 11);
  const group = new THREE.Group(); scene.add(group);
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 1.2, .6, .16);
  composer.addPass(bloom); composer.addPass(new OutputPass());
  const p = new Float32Array(N * 3), base = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
   const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), a = i * 2.399963;
   base[i * 3] = Math.cos(a) * r * 3.55;
   base[i * 3 + 1] = y * 2.7;
   base[i * 3 + 2] = Math.sin(a) * r * 2.5;
  }
  p.set(base);
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(p, 3));
  const uniforms = { uTime: { value: 0 }, uPointer: { value: new THREE.Vector2(20,20) } };
  const mat = new THREE.ShaderMaterial({ uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
   vertexShader: `uniform float uTime;uniform vec2 uPointer;varying float vLight;void main(){vec4 wp=modelMatrix*vec4(position,1.);vLight=.7+1.8*pow(max(0.,1.-distance(wp.xy,uPointer)/2.5),2.);vec4 mv=viewMatrix*wp;gl_PointSize=(6.+vLight*3.)*(8./-mv.z);gl_Position=projectionMatrix*mv;}`,
   fragmentShader: `varying float vLight;void main(){float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;float glow=pow(1.-d,3.);vec3 c=mix(vec3(.2,2.8,1.9),vec3(3.8,4.5,4.1),pow(1.-d,8.));gl_FragColor=vec4(c*vLight,glow*.75);}` });
  group.add(new THREE.Points(geo, mat));
  const pairs: number[][] = [];
  for (let i=0;i<N;i++) for(let j=i+1;j<N;j++) {
   const dx=base[i*3]-base[j*3],dy=base[i*3+1]-base[j*3+1],dz=base[i*3+2]-base[j*3+2];
   if(dx*dx+dy*dy+dz*dz < (mobile?1.45:1.05)) pairs.push([i,j]);
  }
  const lp = new Float32Array(pairs.length*6), lg = new THREE.BufferGeometry();lg.setAttribute('position',new THREE.BufferAttribute(lp,3));
  const lm=new THREE.LineBasicMaterial({color:new THREE.Color(.22,1.55,1.03),transparent:true,opacity:.30,blending:THREE.AdditiveBlending,depthWrite:false});group.add(new THREE.LineSegments(lg,lm));
  const count=mobile?400:2100,dust=new Float32Array(count*3);
  for(let i=0;i<count;i++){const h=(Math.sin(i*127.1)*43758.5453)%1;dust[i*3]=Math.sin(i*12.71)*10;dust[i*3+1]=Math.cos(i*19.13)*6;dust[i*3+2]=h*5-3;}
  const dg=new THREE.BufferGeometry();dg.setAttribute('position',new THREE.BufferAttribute(dust,3));
  const dm=new THREE.PointsMaterial({color:new THREE.Color(.22,.7,.6),size:.011,transparent:true,opacity:.65,blending:THREE.AdditiveBlending,depthWrite:false});const dustPoints=new THREE.Points(dg,dm);scene.add(dustPoints);
  const np=mobile?24:55,pp=new Float32Array(np*3),pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pp,3));
  const pm=new THREE.PointsMaterial({color:new THREE.Color(2.8,4.5,3.8),size:.035,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false});group.add(new THREE.Points(pg,pm));
  const sg=new THREE.SphereGeometry(3.65,36,24),sm=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{impact:{value:0}},vertexShader:`varying vec3 n;varying vec3 v;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);v=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`,fragmentShader:`varying vec3 n;varying vec3 v;uniform float impact;void main(){float rim=pow(1.-abs(dot(n,v)),3.);gl_FragColor=vec4(.2,2.4,1.5,rim*impact);}`});const shell=new THREE.Mesh(sg,sm);shell.scale.y=.79;group.add(shell);
  const tg=new THREE.SphereGeometry(.035,8,8),tm=new THREE.MeshBasicMaterial({color:new THREE.Color(3.0,.23,.13),transparent:true,blending:THREE.AdditiveBlending});const threat=new THREE.Mesh(tg,tm);group.add(threat);
  let section='hero',raf=0,visible=true,last=0;
  const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting)section=(e.target as HTMLElement).dataset.mesh||'hero';},{rootMargin:'-35% 0px -35% 0px'});
  document.querySelectorAll('[data-mesh]').forEach(e=>observer.observe(e));
  const resize=()=>{renderer.setSize(innerWidth,innerHeight);composer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();};resize();
  const pointer=(e:PointerEvent)=>uniforms.uPointer.value.set((e.clientX/innerWidth-.5)*15,(.5-e.clientY/innerHeight)*9);
  const visibility=()=>{visible=!document.hidden;};
  addEventListener('resize',resize);addEventListener('pointermove',pointer);document.addEventListener('visibilitychange',visibility);
  function frame(ms:number){raf=requestAnimationFrame(frame);if(!visible||reduced.matches)return;const dt=Math.min((ms-last)/1000,.05);last=ms;const t=ms*.001,lerp=1-Math.exp(-dt*3);
   uniforms.uTime.value=t;const isHero=section==='hero';host.style.opacity=isHero?'1':'.42';group.position.x+=( (isHero?(mobile?0:3.3):0)-group.position.x)*lerp;group.rotation.y+=((isHero?Math.sin(t*.07)*.24:0)-group.rotation.y)*lerp;group.rotation.z+=((isHero?-.2:0)-group.rotation.z)*lerp;
   for(let i=0;i<N;i++){let x=base[i*3],y=base[i*3+1],z=base[i*3+2];
    if(section==='wifi'){const a=i*2.399,r=.4+(i%25)*.06;x=(i%3-1)*3+Math.cos(a)*r;y=Math.sin(a)*r;z=Math.sin(a)*.1;}
    else if(section==='security'){x=(i%2?1:-1)*2.1+base[i*3]*.3;y=(i%4<2?1:-1)*1.5+base[i*3+1]*.3;z*=.22;}
    else if(section==='software'){x=(i%20-9.5)*.42;y=(Math.floor(i/20)-6)*.34;z=0;}
    else if(section==='footer'){x=(i%26-12.5)*.5;y=-1.5+Math.sin(i*.3+t*.2)*.13;z=Math.floor(i/26)*.32-2;}
    p[i*3]+=(x-p[i*3])*lerp;p[i*3+1]+=(y-p[i*3+1])*lerp;p[i*3+2]+=(z-p[i*3+2])*lerp;
   }
   pairs.forEach(([a,b],k)=>{const disconnected=section==='security'&&a%4!==b%4;for(let d=0;d<3;d++){lp[k*6+d]=p[a*3+d];lp[k*6+3+d]=p[(disconnected?a:b)*3+d];}});
   for(let i=0;i<np;i++){const [a,b]=pairs[(i*7)%pairs.length],f=(t*.17+i*.127)%1;for(let d=0;d<3;d++)pp[i*3+d]=p[a*3+d]*(1-f)+p[b*3+d]*f;}
   const phase=t%9;threat.position.set(5.2-Math.min(phase,2)*.8,.3,0);tm.opacity=phase<2?1:Math.max(0,1-(phase-2)*4);sm.uniforms.impact.value=phase>2&&phase<2.9?.35*Math.sin((phase-2)/.9*Math.PI):0;
   dustPoints.rotation.z=t*.002;geo.attributes.position.needsUpdate=true;lg.attributes.position.needsUpdate=true;pg.attributes.position.needsUpdate=true;composer.render();
  }
  raf=requestAnimationFrame(frame);
  return()=>{cancelAnimationFrame(raf);observer.disconnect();removeEventListener('resize',resize);removeEventListener('pointermove',pointer);document.removeEventListener('visibilitychange',visibility);[geo,lg,dg,pg,sg,tg].forEach(g=>g.dispose());[mat,lm,dm,pm,sm,tm].forEach(m=>m.dispose());bloom.dispose();composer.dispose();renderer.dispose();host.replaceChildren();};
 },[]);
 return <div className="mesh" ref={ref} aria-hidden="true"/>;
}
