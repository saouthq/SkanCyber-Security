/** Shaders de la scène « Le Système ». */

export const bitVertex = /* glsl */ `
  attribute vec2 aGrid;    // position dans la grille (0..1)
  attribute float aLayer;  // 0 Interface → 3 Fondations
  attribute float aSeed;
  attribute float aState;  // 0 éteint · 1 allumé · 2 bit actif

  uniform float uTime;
  uniform float uIntro;
  uniform float uSpacing;
  uniform float uFocus;
  uniform float uActive;
  uniform float uEnvelope;
  uniform float uProbe;
  uniform float uAgitation;
  uniform vec2  uMouse;
  uniform float uAspect;
  uniform vec2  uSize;     // largeur, profondeur d'une couche
  uniform float uBit;      // taille d'un bit (monde)
  uniform float uRows;

  varying vec2  vUv;
  varying float vAlpha;
  varying float vSignal;
  varying float vGlow;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    vUv = uv;

    // Position du centre du bit
    float layerY = (1.5 - aLayer) * uSpacing + sin(uTime * 0.5 + aLayer * 1.7) * 0.015;
    vec3 center = vec3((aGrid.x - 0.5) * uSize.x, layerY, (aGrid.y - 0.5) * uSize.y);

    // Apparition : balayage diagonal, couche par couche
    float delay = (aGrid.x + aGrid.y) * 0.32 + aLayer * 0.1 + aSeed * 0.06;
    float appear = smoothstep(delay, delay + 0.22, uIntro * 1.05);
    center.y -= (1.0 - appear) * 0.35;

    // Sonde (souris) : distance en espace écran
    vec4 clip = projectionMatrix * modelViewMatrix * vec4(center, 1.0);
    vec2 ndc = clip.xy / clip.w;
    float d = length((ndc - uMouse) * vec2(uAspect, 1.0));
    float infl = smoothstep(0.32, 0.0, d) * uProbe;
    center.y += infl * 0.16;

    // Paquets de données qui circulent sur certaines voies
    float row = floor(aGrid.y * uRows);
    float lane = step(0.8, hash(row * 13.1 + aLayer * 71.7));
    float speed = 0.05 + hash(row * 7.3 + aLayer) * 0.07;
    float p = fract(uTime * speed + hash(row + aLayer * 19.0));
    float pulse = exp(-pow((aGrid.x - p) * 16.0, 2.0)) * lane;

    // Mise en avant d'une couche
    float w = 1.0 - smoothstep(0.25, 0.75, abs(aLayer - uActive));
    float focusDim = mix(1.0, mix(0.2, 1.0, w), uFocus);

    // Périmètre : bords des couches teintés signal
    vec2 e = abs(aGrid - 0.5);
    float edge = step(0.47, max(e.x, e.y));

    float on = step(0.5, aState);
    float isActive = step(1.5, aState);
    float base = mix(0.1, 0.72, on);
    float alpha = (base + pulse * 0.75 + infl * 0.55) * focusDim;
    alpha = max(alpha, isActive * focusDim);
    alpha = mix(alpha, max(alpha, 0.55), edge * uEnvelope);

    vAlpha = alpha * appear;
    vSignal = clamp(isActive + infl * uAgitation * 1.4 + edge * uEnvelope * 0.9, 0.0, 1.0);
    vGlow = pulse;

    float scale = uBit * (1.0 + infl * 0.35 + pulse * 0.25) * mix(0.4, 1.0, appear);
    vec3 pos = center + position * scale;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const bitFragment = /* glsl */ `
  precision highp float;
  uniform vec3 uBone;
  uniform vec3 uSignal;
  uniform float uOpacity;

  varying vec2  vUv;
  varying float vAlpha;
  varying float vSignal;
  varying float vGlow;

  // Carré arrondi (rayon 4/18 comme le module du logo)
  float sdRoundBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec2 p = vUv - 0.5;
    float d = sdRoundBox(p, vec2(0.5), 0.11);
    float aa = fwidth(d) * 1.2;
    float mask = 1.0 - smoothstep(-aa, aa, d);
    if (mask < 0.01) discard;
    vec3 col = mix(uBone, uSignal, vSignal);
    col += vGlow * 0.15;
    gl_FragColor = vec4(col, mask * vAlpha * uOpacity);
  }
`;

export const lineVertex = /* glsl */ `
  attribute float aT;      // progression le long du segment (0..1)
  attribute float aKind;   // 0 cadre de couche · 1 conduit · 2 périmètre
  attribute float aEdge;   // index d'arête (décalage d'apparition)
  attribute float aLayer;

  varying float vT;
  varying float vKind;
  varying float vEdge;
  varying float vLayer;

  void main() {
    vT = aT;
    vKind = aKind;
    vEdge = aEdge;
    vLayer = aLayer;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const lineFragment = /* glsl */ `
  precision highp float;
  uniform vec3 uBone;
  uniform vec3 uSignal;
  uniform float uTime;
  uniform float uIntro;
  uniform float uEnvelope;
  uniform float uFocus;
  uniform float uActive;
  uniform float uOpacity;

  varying float vT;
  varying float vKind;
  varying float vEdge;
  varying float vLayer;

  void main() {
    float alpha = 0.0;
    vec3 col = uBone;

    if (vKind < 0.5) {
      // Cadre de couche : se trace pendant l'intro
      float reveal = smoothstep(vT, vT + 0.05, uIntro * 1.4 - vEdge * 0.04);
      float w = 1.0 - smoothstep(0.25, 0.75, abs(vLayer - uActive));
      float focusDim = mix(1.0, mix(0.25, 1.0, w), uFocus);
      alpha = 0.16 * reveal * focusDim;
    } else if (vKind < 1.5) {
      // Conduits verticaux : impulsions descendantes
      float pulse = exp(-pow((fract(vT - uTime * 0.18 + vEdge * 0.37) - 0.5) * 9.0, 2.0));
      alpha = (0.07 + pulse * 0.4) * smoothstep(0.6, 1.0, uIntro);
    } else {
      // Périmètre : se referme arête par arête
      float reveal = step(vT, clamp(uEnvelope * 1.6 - vEdge * 0.05, 0.0, 1.0));
      alpha = 0.95 * reveal;
      col = uSignal;
    }
    if (alpha < 0.002) discard;
    gl_FragColor = vec4(col, alpha * uOpacity);
  }
`;
