// The 16:9 film's Kowloon: bright and map-like, but busy close up. Clouds to fall
// through, ferries and a red-sailed junk on the harbour, signs over every street,
// tanks and helipads on the roofs, ICC, IFC and the clock tower by the pier.
// Everything is seeded, so a moment in the film always looks the same.
import * as THREE from 'three';
import { EffectComposer } from './lib/EffectComposer.js';
import { RenderPass } from './lib/RenderPass.js';
import { OutputPass } from './lib/OutputPass.js';
import { RoomEnvironment } from './lib/RoomEnvironment.js';
import { makeBus, makeCar } from './city.js';

let seed = 2611;
const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const pick = (list) => list[Math.floor(random() * list.length)];
const between = (a, b) => a + random() * (b - a);
const clamp = (x) => Math.max(0, Math.min(1, x));
const smooth = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * k * (k * (6 * k - 15) + 10); };
const lerp = (a, b, k) => a + (b - a) * k;
const inOut = (x) => (x < 0.5 ? 16 * x ** 5 : 1 - (-2 * x + 2) ** 5 / 2);
const outCubic = (x) => 1 - (1 - clamp(x)) ** 3;
const inCubic = (x) => clamp(x) ** 3;
const V = (x, y, z) => new THREE.Vector3(x, y, z);

const B = 80, ROAD = 14, WALK = 4, LANE = 3, FACADE = ROAD / 2 + WALK;
const XI = [-14, 18], ZI = [-11, 12]; // The whole city; streets and towers.
const CORE = { x: [-5, 9], z: [-11, 4] }; // Where the film comes close: trees and signs.
const inCore = (x, z) => x >= CORE.x[0] * B - FACADE && x <= CORE.x[1] * B + FACADE && z >= CORE.z[0] * B - FACADE && z <= CORE.z[1] * B + FACADE;
const SHORE = ZI[0] * B - FACADE - 12;
const HAZE = new THREE.Color('#e7eef6');

// MARK: Story time
// The picture slows to a hang at a few moments; everything that moves runs on this clock.
const SLOW = [[2.5, 3.5, 0.28], [4.0, 5.0, 0.4], [10.6, 11.2, 0.25]];
const speedAt = (t) => { let v = 1; for (const [a, b, s] of SLOW) v = Math.min(v, lerp(1, s, smooth(a - 0.12, a + 0.08, t) * (1 - smooth(b - 0.08, b + 0.2, t)))); return v; };
const TAU = new Float64Array(30001);
for (let i = 1; i <= 30000; i++) TAU[i] = TAU[i - 1] + speedAt((i - 0.5) / 1000) / 1000;
export const storyTime = (t) => { if (t <= 0) return t; const u = Math.min(29999.999, t * 1000), i = Math.floor(u); return lerp(TAU[i], TAU[i + 1], u - i); };

// MARK: The route, from 竹園邨 to the pier
const CORNERS = [[0, 200], [0, -240], [160, -240], [160, -640], [400, -640], [400, -868]];
const path = new THREE.CurvePath();
{
  const R = 18, pts = CORNERS.map(([x, z]) => V(x, 0, z));
  let from = pts[0];
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i], last = i === pts.length - 1, into = p.clone().sub(pts[i - 1]).normalize();
    const until = last ? p : p.clone().addScaledVector(into, -R);
    path.add(new THREE.LineCurve3(from, until));
    if (!last) { const out = pts[i + 1].clone().sub(p).normalize(), next = p.clone().addScaledVector(out, R); path.add(new THREE.QuadraticBezierCurve3(until, p.clone(), next)); from = next; }
  }
}
const STEP = 0.5, samples = path.getSpacedPoints(Math.ceil(path.getLength() / STEP)), ROUTE = (samples.length - 1) * STEP;
function along(s, lane = LANE) {
  const u = Math.max(0, Math.min(samples.length - 1.001, s / STEP)), i = Math.floor(u), k = u - i, a = samples[i], b = samples[i + 1];
  const tangent = b.clone().sub(a).normalize(), left = V(tangent.z, 0, -tangent.x);
  return { point: a.clone().lerp(b, k).addScaledVector(left, lane), tangent, left };
}

// MARK: Textures and materials
function canvas(width, height, draw) { const c = document.createElement('canvas'); c.width = width; c.height = height; draw(c.getContext('2d'), width, height); return c; }
function canvasTexture(width, height, draw) {
  const texture = new THREE.CanvasTexture(canvas(width, height, draw));
  texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 8; texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}
/** Tileable ripples, as a normal map, from a handful of whole-number waves. */
function waterNormals() {
  const N = 256, h = new Float32Array(N * N), waves = [];
  for (let k = 0; k < 16; k++) { const kx = Math.round(between(-10, 10)), ky = Math.round(between(-10, 10)); if (kx || ky) waves.push([kx, ky, between(0, 6.283), between(0.4, 1) / Math.hypot(kx, ky)]); }
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { let v = 0; for (const [kx, ky, ph, a] of waves) v += a * Math.sin((6.283 * (kx * x + ky * y)) / N + ph); h[y * N + x] = v; }
  const texture = new THREE.CanvasTexture(canvas(N, N, (c) => {
    const img = c.createImageData(N, N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const dx = h[y * N + ((x + 1) % N)] - h[y * N + ((x + N - 1) % N)], dy = h[((y + 1) % N) * N + x] - h[((y + N - 1) % N) * N + x];
      const n = V(-dx * 6, -dy * 6, 1).normalize(), i = (y * N + x) * 4;
      img.data[i] = (n.x * 0.5 + 0.5) * 255; img.data[i + 1] = (n.y * 0.5 + 0.5) * 255; img.data[i + 2] = (n.z * 0.5 + 0.5) * 255; img.data[i + 3] = 255;
    }
    c.putImageData(img, 0, 0);
  }));
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.colorSpace = THREE.NoColorSpace;
  return texture;
}

/** White towers with a faint grid of windows, drawn from where each pixel is in the world. */
function towerMaterial(key, tint = 'vec3(0.74, 0.82, 0.93)', strength = 0.85) {
  const material = new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0 });
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vW; varying vec3 vN;')
      .replace('#include <project_vertex>', `#include <project_vertex>
        vec4 wp = vec4(transformed, 1.0); vec3 wn = objectNormal;
        #ifdef USE_INSTANCING
        wp = instanceMatrix * wp; wn = mat3(instanceMatrix) * wn;
        #endif
        vW = (modelMatrix * wp).xyz; vN = normalize(mat3(modelMatrix) * wn);`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vW; varying vec3 vN;')
      .replace('#include <color_fragment>', `#include <color_fragment>
        if (abs(vN.y) < 0.5) {
          float across = abs(vN.x) > 0.5 ? vW.z : vW.x;
          float fy = fract(vW.y / 3.3), fx = fract(across / 2.7);
          float glass = step(0.3, fy) * step(fy, 0.84) * step(0.16, fx) * step(fx, 0.86) * step(4.5, vW.y);
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * ${tint}, glass * ${strength.toFixed(2)});
          diffuseColor.rgb *= mix(0.74, 1.0, smoothstep(0.0, 16.0, vW.y));
        } else diffuseColor.rgb *= 0.94;`);
  };
  material.customProgramCacheKey = () => `wide-tower-${key}`;
  return material;
}

/** A ribbon laid along the route, whose width is set per frame so it reads from any height. */
function routeRibbon(y, color, order) {
  const positions = [], sides = [], lefts = [], index = [];
  let row = 0;
  for (let s = 0; s <= ROUTE; s += 1, row++) {
    const a = along(s);
    for (const side of [1, -1]) { positions.push(a.point.x, y, a.point.z); sides.push(side); lefts.push(a.left.x, 0, a.left.z); }
    if (row) { const k = (row - 1) * 2; index.push(k, k + 2, k + 1, k + 1, k + 2, k + 3); }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aSide', new THREE.Float32BufferAttribute(sides, 1));
  geometry.setAttribute('aLeft', new THREE.Float32BufferAttribute(lefts, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(positions.map((_, i) => (i % 3 === 1 ? 1 : 0)), 3));
  geometry.setIndex(index);
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.55, emissive: color, emissiveIntensity: 0.18, side: THREE.DoubleSide, fog: false, polygonOffset: true, polygonOffsetFactor: -order, polygonOffsetUnits: -order * 4 });
  const uniforms = { uHalf: { value: 2 } };
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uHalf = uniforms.uHalf;
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nattribute float aSide; attribute vec3 aLeft; uniform float uHalf;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed += aLeft * aSide * uHalf;');
  };
  material.customProgramCacheKey = () => `wide-ribbon-${order}`;
  const mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true; mesh.renderOrder = 10 + order;
  return { mesh, uniforms, show: (metres) => geometry.setDrawRange(0, Math.max(0, Math.floor(metres)) * 6) };
}

// MARK: The city
const m4 = new THREE.Matrix4(), q4 = new THREE.Quaternion(), UP = V(0, 1, 0);
function instanced(geometry, material, items, shadow = true) {
  const mesh = new THREE.InstancedMesh(geometry, material, Math.max(1, items.length));
  items.forEach(([matrix, color], i) => { mesh.setMatrixAt(i, matrix); if (color) mesh.setColorAt(i, color); });
  mesh.count = items.length; mesh.castShadow = shadow; mesh.receiveShadow = true;
  return mesh;
}
const boxAt = (x0, z0, x1, z1, y0, y1) => new THREE.Matrix4().makeScale(x1 - x0, y1 - y0, z1 - z0).setPosition((x0 + x1) / 2, y0, (z0 + z1) / 2);

function buildCity(scene) {
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(9000, 4000), new THREE.MeshStandardMaterial({ color: '#eceff3', roughness: 1 }));
  ground.rotation.x = -Math.PI / 2; ground.position.set(0, 0, SHORE + 2000); ground.receiveShadow = true; scene.add(ground);
  const ripples = waterNormals(); ripples.repeat.set(90, 40);
  const water = new THREE.Mesh(new THREE.PlaneGeometry(9000, 4000), new THREE.MeshStandardMaterial({ color: '#8ec6ee', roughness: 0.16, metalness: 0.05, normalMap: ripples, normalScale: new THREE.Vector2(0.55, 0.55), envMapIntensity: 1.4 }));
  water.rotation.x = -Math.PI / 2; water.position.set(0, -0.4, SHORE - 2000); water.receiveShadow = true; scene.add(water);
  const wall = new THREE.Mesh(new THREE.BoxGeometry(9000, 1.6, 3), new THREE.MeshStandardMaterial({ color: '#f7f8fa', roughness: 0.9 }));
  wall.position.set(0, -0.2, SHORE); scene.add(wall);
  // The Star Ferry pier at the end of the route, green roofed.
  const white = new THREE.MeshStandardMaterial({ color: '#f4f5f7', roughness: 0.8 }), green = new THREE.MeshStandardMaterial({ color: '#2f8f5b', roughness: 0.6 });
  for (const [x, w] of [[400, 44], [470, 30]]) {
    const pier = new THREE.Mesh(new THREE.BoxGeometry(w, 7, 64), white); pier.position.set(x, 3.5, SHORE - 32); pier.castShadow = pier.receiveShadow = true; scene.add(pier);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 4, 1.4, 68), green); roof.position.set(x, 7.6, SHORE - 32); roof.castShadow = true; scene.add(roof);
  }

  // Streets.
  const marks = canvasTexture(128, 512, (c, w, h) => {
    c.fillStyle = '#fbfbfd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#d9dce3'; c.fillRect(w / 2 - 2, 0, 4, h * 0.5);
    c.fillStyle = '#e6e8ee'; c.fillRect(6, 0, 3, h); c.fillRect(w - 9, 0, 3, h);
  });
  const roadMaterial = new THREE.MeshStandardMaterial({ map: marks, roughness: 0.95 }), walkMaterial = new THREE.MeshStandardMaterial({ color: '#e0e3e9', roughness: 1 });
  const xMin = XI[0] * B, xMax = XI[1] * B, zMin = ZI[0] * B, zMax = ZI[1] * B;
  const strip = (x, z, isX, length, width, material, y) => {
    const geometry = new THREE.PlaneGeometry(width, length), uv = geometry.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setY(i, uv.getY(i) * length / 24);
    const mesh = new THREE.Mesh(geometry, material); mesh.rotation.x = -Math.PI / 2; if (isX) mesh.rotation.z = Math.PI / 2;
    mesh.position.set(x, y, z); mesh.receiveShadow = true; scene.add(mesh);
  };
  for (let i = XI[0]; i <= XI[1]; i++) { strip(i * B, (zMin + zMax) / 2, false, zMax - zMin + 2 * FACADE, 2 * FACADE, walkMaterial, 0.02); strip(i * B, (zMin + zMax) / 2, false, zMax - zMin + ROAD, ROAD, roadMaterial, 0.05); }
  for (let j = ZI[0]; j <= ZI[1]; j++) { strip((xMin + xMax) / 2, j * B, true, xMax - xMin + 2 * FACADE, 2 * FACADE, walkMaterial, 0.03); strip((xMin + xMax) / 2, j * B, true, xMax - xMin + ROAD, ROAD, roadMaterial, 0.06); }

  // Blocks: towers on podiums, now and then a park; tanks and plant on the roofs.
  const kowloon = [], glassy = [], roofs = [], trees = [];
  const TONES = ['#ffffff', '#f7f8fa', '#f1f3f7', '#f8f4ee', '#eaf0f7', '#fbfaf7', '#f3efe8', '#eef3f1'].map((c) => new THREE.Color(c));
  const lot = (x0, z0, x1, z1, tall) => {
    const podium = between(7, 13), tone = pick(TONES);
    kowloon.push([boxAt(x0, z0, x1, z1, 0, podium), tone]);
    const inset = between(2, 5), w = x1 - x0, d = z1 - z0;
    if (w < 12 || d < 12) return;
    const height = tall ? between(90, 180) : random() < 0.7 ? between(28, 70) : between(70, 115);
    const tx = random() < 0.5 ? [x0 + inset, x1 - inset] : [x0 + inset + w * 0.15, x1 - inset], tz = [z0 + inset, z1 - inset];
    const top = podium + height, isGlass = height > 95 && random() < 0.35;
    (isGlass ? glassy : kowloon).push([boxAt(tx[0], tz[0], tx[1], tz[1], podium, top), isGlass ? new THREE.Color(pick(['#d6e4f2', '#cfe0ee', '#dfe8f1'])) : tone]);
    roofs.push({ x0: tx[0], z0: tz[0], x1: tx[1], z1: tz[1], y: top, tall: height > 100 });
  };
  const parkMaterial = new THREE.MeshStandardMaterial({ color: '#cbe8cf', roughness: 1 });
  const PARKS = new Set(['2,-9', '-2,-3', '5,1', '-4,-7', '7,-4', '3,-5', '-1,2', '6,-10', '-9,-6', '-12,2', '12,-7', '15,3', '11,8', '-7,9', '4,9', '16,-2', '-11,-9']), SKIP = new Set(['-5,-11', '-5,-10']);
  for (let i = XI[0]; i < XI[1]; i++) for (let j = ZI[0]; j < ZI[1]; j++) {
    const x0 = i * B + FACADE, x1 = (i + 1) * B - FACADE, z0 = j * B + FACADE, z1 = (j + 1) * B - FACADE;
    if (SKIP.has(`${i},${j}`)) continue;
    if (PARKS.has(`${i},${j}`)) {
      const park = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), parkMaterial);
      park.rotation.x = -Math.PI / 2; park.position.set((x0 + x1) / 2, 0.04, (z0 + z1) / 2); park.receiveShadow = true; scene.add(park);
      for (let k = 0, n = inCore(x0, z0) ? 50 : 30; k < n; k++) trees.push([between(x0 + 3, x1 - 3), between(z0 + 3, z1 - 3), between(2.6, 4.4)]);
      continue;
    }
    const tall = j <= -9 || random() < 0.18;
    const sx = random() < 0.55 ? between(0.4, 0.6) : 1, sz = random() < 0.6 ? between(0.35, 0.65) : 1, gap = 1.5;
    const xs = sx < 1 ? [[x0, lerp(x0, x1, sx) - gap], [lerp(x0, x1, sx) + gap, x1]] : [[x0, x1]];
    const zs = sz < 1 ? [[z0, lerp(z0, z1, sz) - gap], [lerp(z0, z1, sz) + gap, z1]] : [[z0, z1]];
    for (const [a, b] of xs) for (const [c, d] of zs) lot(a, c, b, d, tall && random() < 0.6);
  }
  // ICC on the West Kowloon waterfront, stepping in at the top.
  const iccX = -360, iccZ = -830;
  for (const [half, y0, y1] of [[30, 0, 18], [24, 18, 430], [21, 430, 470], [16, 470, 486]]) glassy.push([boxAt(iccX - half, iccZ - half, iccX + half, iccZ + half, y0, y1), new THREE.Color('#c8d9ea')]);
  // Hong Kong Island across the water, with IFC standing over it, and the hills behind.
  const island = [];
  for (let x = -2600; x < 3200; x += between(22, 46)) {
    const z = between(-1560, -1500), w = between(16, 36), d = between(16, 30), h = between(50, 250) * Math.max(0.25, 1 - Math.abs(x - 300) / 3600);
    island.push([boxAt(x, z - d, x + w, z, 0, h), pick(TONES)]);
    if (random() < 0.6) island.push([boxAt(x + between(-10, 10), z - d - between(20, 60), x + w, z - d - 10, 0, h * between(0.4, 0.8)), pick(TONES)]);
  }
  const ifcX = 180, ifcZ = -1600;
  for (const [half, y0, y1] of [[27, 0, 300], [23, 300, 360], [19, 360, 392], [14, 392, 404]]) glassy.push([boxAt(ifcX - half, ifcZ - half, ifcX + half, ifcZ + half, y0, y1), new THREE.Color('#d2dfec')]);
  for (const [dx, dz] of [[-12, -12], [12, -12], [-12, 12], [12, 12]]) glassy.push([boxAt(ifcX + dx - 1.5, ifcZ + dz - 1.5, ifcX + dx + 1.5, ifcZ + dz + 1.5, 404, 416), new THREE.Color('#e3ebf3')]);
  const hill = new THREE.MeshStandardMaterial({ color: '#8ab98a', roughness: 1 });
  for (const [x, z, r, h] of [[-1900, -2300, 700, 300], [-1000, -2400, 760, 420], [-200, -2250, 600, 470], [450, -2300, 680, 552], [1150, -2450, 820, 420], [1900, -2300, 620, 330], [2700, -2350, 700, 260]]) {
    const geometry = new THREE.SphereGeometry(1, 64, 24, 0, Math.PI * 2, 0, Math.PI / 2), p = geometry.attributes.position, ph = [between(0, 6), between(0, 6), between(0, 6)];
    for (let i = 0; i < p.count; i++) { const a = Math.atan2(p.getZ(i), p.getX(i)), y = p.getY(i); const bump = 1 + (0.1 * Math.sin(a * 3 + ph[0]) + 0.05 * Math.sin(a * 7 + ph[1]) + 0.025 * Math.sin(a * 13 + ph[2])) * Math.sin(y * Math.PI * 0.5); p.setXYZ(i, p.getX(i) * (1 + 0.04 * Math.sin(a * 7)), y * bump, p.getZ(i)); }
    geometry.computeVertexNormals();
    const mesh = new THREE.Mesh(geometry, hill); mesh.scale.set(r, h, r * 0.6); mesh.position.set(x, -2, z); mesh.receiveShadow = true; scene.add(mesh);
  }
  const unit = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  scene.add(instanced(unit, towerMaterial('white'), [...kowloon, ...island]));
  const glass = towerMaterial('glass', 'vec3(0.55, 0.68, 0.84)', 0.9); glass.roughness = 0.25; glass.metalness = 0.35; glass.envMapIntensity = 1.3;
  scene.add(instanced(unit, glass, glassy));

  // The clock tower by the pier: red brick, white top, a spire.
  const brick = new THREE.MeshStandardMaterial({ color: '#b65b3c', roughness: 0.85 }), stone = new THREE.MeshStandardMaterial({ color: '#efe9de', roughness: 0.8 });
  const clock = new THREE.Group();
  [[new THREE.BoxGeometry(9, 30, 9), brick, 15], [new THREE.BoxGeometry(10, 1.2, 10), stone, 30.6], [new THREE.BoxGeometry(7, 6, 7), stone, 34], [new THREE.ConeGeometry(2.4, 9, 8), brick, 41.5]].forEach(([g, m, y]) => { const part = new THREE.Mesh(g, m); part.position.y = y; part.castShadow = true; clock.add(part); });
  for (let k = 0; k < 4; k++) { const face = new THREE.Mesh(new THREE.CircleGeometry(1.8, 24), new THREE.MeshStandardMaterial({ color: '#ffffff' })); const a = (k * Math.PI) / 2; face.position.set(Math.sin(a) * 3.55, 34, Math.cos(a) * 3.55); face.rotation.y = a; clock.add(face); }
  clock.position.set(335, 0, SHORE + 6); scene.add(clock);

  // Roofs: water tanks, plant, the odd helipad and mast.
  const tanks = [], plant = [], masts = [];
  const helipad = canvasTexture(256, 256, (c, w, h) => {
    c.fillStyle = '#5b6170'; c.fillRect(0, 0, w, h); c.strokeStyle = '#f2c94c'; c.lineWidth = 12; c.beginPath(); c.arc(128, 128, 96, 0, 7); c.stroke();
    c.fillStyle = '#fff'; c.font = '900 120px -apple-system,Helvetica'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('H', 128, 136);
  });
  const padMaterial = new THREE.MeshStandardMaterial({ map: helipad, roughness: 0.8 });
  for (const r of roofs) {
    const w = r.x1 - r.x0, d = r.z1 - r.z0;
    if (r.tall && random() < 0.16 && w > 18 && d > 18) {
      const pad = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(w, d) * 0.8, Math.min(w, d) * 0.8), padMaterial);
      pad.rotation.x = -Math.PI / 2; pad.position.set((r.x0 + r.x1) / 2, r.y + 0.6, (r.z0 + r.z1) / 2); scene.add(pad);
      const deck = new THREE.Mesh(new THREE.BoxGeometry(Math.min(w, d) * 0.86, 0.6, Math.min(w, d) * 0.86), new THREE.MeshStandardMaterial({ color: '#8a909c' }));
      deck.position.set(pad.position.x, r.y + 0.3, pad.position.z); deck.castShadow = true; scene.add(deck);
      continue;
    }
    for (let k = 0, n = random() < 0.6 ? 1 + Math.floor(random() * 3) : 0; k < n; k++) { const rad = between(1.3, 2), h = between(2.4, 3.6); tanks.push([new THREE.Matrix4().makeScale(rad, h, rad).setPosition(between(r.x0 + 3, r.x1 - 3), r.y, between(r.z0 + 3, r.z1 - 3)), new THREE.Color(pick(['#dfe3ea', '#e8e2d6', '#cfd6e0']))]); }
    for (let k = 0, n = random() < 0.7 ? 2 + Math.floor(random() * 4) : 0; k < n; k++) plant.push([new THREE.Matrix4().makeScale(between(1.6, 3.2), between(1, 1.8), between(1.2, 2.4)).setPosition(between(r.x0 + 2, r.x1 - 2), r.y, between(r.z0 + 2, r.z1 - 2)), new THREE.Color(pick(['#c3c9d3', '#d4d8df', '#b9c0cc']))]);
    if (r.tall && random() < 0.25) masts.push([new THREE.Matrix4().makeScale(1, between(10, 24), 1).setPosition(between(r.x0 + 3, r.x1 - 3), r.y, between(r.z0 + 3, r.z1 - 3))]);
  }
  scene.add(instanced(new THREE.CylinderGeometry(1, 1, 1, 14).translate(0, 0.5, 0), new THREE.MeshStandardMaterial({ roughness: 0.6 }), tanks));
  scene.add(instanced(unit, new THREE.MeshStandardMaterial({ roughness: 0.7 }), plant));
  scene.add(instanced(new THREE.CylinderGeometry(0.18, 0.3, 1, 6).translate(0, 0.5, 0), new THREE.MeshStandardMaterial({ color: '#9aa0ab', metalness: 0.5, roughness: 0.4 }), masts));

  // Signs out over every street, as Kowloon has them.
  const SIGNS = ['茶餐廳', '大押', '金行', '涼茶', '藥房', '找換', '燒臘', '粥麵', '冰室', '酒家', '時裝', '眼鏡', '海味', '麻雀'];
  const PAINT = [['#e8423a', '#fff'], ['#f2b632', '#3a2a10'], ['#2f80ed', '#fff'], ['#27ae60', '#fff'], ['#ffffff', '#d4232b'], ['#8e44ad', '#fff'], ['#f2994a', '#fff'], ['#1f3b73', '#ffd166']];
  const designs = SIGNS.map((text) => { const [bg, ink] = pick(PAINT); return new THREE.MeshStandardMaterial({ roughness: 0.55, emissive: '#ffffff', emissiveIntensity: 0.08, map: canvasTexture(128, 512, (c, w, h) => {
    c.fillStyle = bg; c.fillRect(0, 0, w, h); c.strokeStyle = ink; c.globalAlpha = 0.85; c.lineWidth = 6; c.strokeRect(9, 9, w - 18, h - 18); c.globalAlpha = 1;
    c.fillStyle = ink; c.textAlign = 'center'; c.textBaseline = 'middle'; const chars = [...text], size = Math.min(92, (h - 60) / chars.length); c.font = `900 ${size}px "PingFang HK","PingFang SC",sans-serif`;
    chars.forEach((ch, i) => c.fillText(ch, w / 2, 30 + (i + 0.5) * ((h - 60) / chars.length)));
  }) }); });
  const edge = new THREE.MeshStandardMaterial({ color: '#30333d', roughness: 0.7 });
  const placed = designs.map(() => []);
  const sign = (x, z, alongX, side) => {
    const w = between(1.5, 2.5), h = w * between(2.6, 4), y = between(6.5, 17);
    const out = side * (FACADE - w / 2 - 0.2);
    const pos = alongX ? V(x, y, z + out) : V(x + out, y, z);
    q4.setFromAxisAngle(UP, alongX ? Math.PI / 2 : 0);
    placed[Math.floor(random() * designs.length)].push([new THREE.Matrix4().compose(pos, q4, V(w, h, 0.35))]);
  };
  const quiet = (v) => { const r = ((v % B) + B) % B; return r < FACADE + 3 || r > B - FACADE - 3; };
  for (let i = XI[0]; i <= XI[1]; i++) for (let z = zMin; z < zMax; z += between(8, 15)) if (!quiet(z) && inCore(i * B, z)) for (const side of [-1, 1]) if (random() < 0.5) sign(i * B, z, false, side);
  for (let j = ZI[0] + 1; j <= ZI[1]; j++) for (let x = xMin; x < xMax; x += between(8, 15)) if (!quiet(x) && inCore(x, j * B)) for (const side of [-1, 1]) if (random() < 0.5) sign(x, j * B, true, side);
  const signGeometry = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  designs.forEach((material, k) => scene.add(instanced(signGeometry, [edge, edge, edge, edge, material, material], placed[k])));

  // Trees along every pavement.
  for (let i = XI[0]; i <= XI[1]; i++) for (let z = zMin; z < zMax; z += between(10, 13)) { if (quiet(z) || !inCore(i * B, z)) continue; for (const side of [-1, 1]) if (random() < 0.85) trees.push([i * B + side * (ROAD / 2 + WALK * 0.55), z + between(-1, 1), between(2.2, 3.1)]); }
  for (let j = ZI[0] + 1; j <= ZI[1]; j++) for (let x = xMin; x < xMax; x += between(10, 13)) { if (quiet(x) || !inCore(x, j * B)) continue; for (const side of [-1, 1]) if (random() < 0.85) trees.push([x + between(-1, 1), j * B + side * (ROAD / 2 + WALK * 0.55), between(2.2, 3.1)]); }
  const GREENS = ['#7cc98d', '#90d39f', '#69b97c', '#a3dbae', '#86cf8b'].map((c) => new THREE.Color(c));
  scene.add(instanced(new THREE.IcosahedronGeometry(1, 1), new THREE.MeshStandardMaterial({ roughness: 0.95 }), trees.map(([x, z, r]) => [new THREE.Matrix4().makeScale(r, r * 0.92, r).setPosition(x, r * 1.25 + r * 0.8, z), pick(GREENS)])));
  scene.add(instanced(new THREE.CylinderGeometry(0.16, 0.24, 1, 6).translate(0, 0.5, 0), new THREE.MeshStandardMaterial({ color: '#a08d7a', roughness: 1 }), trees.map(([x, z, r]) => [new THREE.Matrix4().makeScale(1, r * 1.75, 1).setPosition(x, 0, z)])));
}

// MARK: The harbour
const wakeTexture = () => canvasTexture(512, 128, (c, w, h) => {
  c.clearRect(0, 0, w, h);
  for (let k = 0; k < 900; k++) {
    const x = Math.pow(random(), 0.7) * w, spread = (1 - x / w) * 0.5 + 0.06, y = h / 2 + (random() - 0.5) * h * spread * (random() < 0.5 ? 0.25 : 1.9);
    c.globalAlpha = 0.5 * (x / w) * random(); c.fillStyle = '#fff'; c.beginPath(); c.arc(x, Math.max(2, Math.min(h - 2, y)), between(1.5, 5), 0, 7); c.fill();
  }
});
function buildBoat(kind, wake) {
  const g = new THREE.Group(), mat = (color, roughness = 0.6) => new THREE.MeshStandardMaterial({ color, roughness });
  const box = (w, h, d, material, x, y, z = 0) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material); m.position.set(x, y, z); m.castShadow = true; g.add(m); return m; };
  let length = 20, beam = 6;
  if (kind === 'ferry') { // Star Ferry: green below, white above, green roof.
    length = 38; beam = 11; const green = mat('#2e7a4d');
    box(38, 3, 11, green, 0, 1.2); box(34, 2.8, 10, mat('#f6f6f2'), 0, 4); box(34.2, 1, 10.2, mat('#34404e', 0.3), 0, 4.2); box(31, 0.6, 10.6, green, 0, 5.7); box(2, 2, 3, mat('#f6f6f2'), 0, 7);
  } else if (kind === 'junk') { // The red-sailed junk.
    length = 24; beam = 6.5; box(24, 2.4, 6.5, mat('#5c3a28'), 0, 1); box(6, 1.6, 5, mat('#6e4630'), -8, 2.8);
    const sail = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(9, 0), new THREE.Vector2(10, 7), new THREE.Vector2(7.5, 15), new THREE.Vector2(-0.5, 13)]);
    for (const [x, s] of [[-4, 1], [5, 0.8]]) { const m = new THREE.Mesh(new THREE.ShapeGeometry(sail), new THREE.MeshStandardMaterial({ color: '#d63a2e', roughness: 0.8, side: THREE.DoubleSide })); m.scale.setScalar(s); m.position.set(x - 4 * s, 2.4, 0); m.castShadow = true; g.add(m); const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 16 * s), mat('#3a2a20')); mast.position.set(x - 4 * s, 2.4 + 8 * s, 0); g.add(mast); }
  } else if (kind === 'ship') { // A small container ship.
    length = 120; beam = 20; box(120, 8, 20, mat('#203a5c'), 0, 2); box(120.2, 1.2, 20.2, mat('#c0392b'), 0, -1.6); box(12, 14, 18, mat('#f3f4f6'), -50, 13); box(14, 1, 19, mat('#203a5c'), -50, 20.5);
    const colours = ['#c0392b', '#2e86c1', '#f39c12', '#27ae60', '#8e44ad', '#7f8c8d', '#d35400'];
    for (let x = -38; x < 54; x += 6.4) for (let z = -7.5; z <= 7.5; z += 2.6) for (let y = 0, n = 1 + Math.floor(random() * 3); y < n; y++) box(6, 2.5, 2.4, mat(pick(colours), 0.8), x, 7.3 + y * 2.6, z);
  } else { // A launch.
    length = 14; beam = 4.5; box(14, 1.8, 4.5, mat('#f7f7f7'), 0, 0.8); box(6, 1.8, 3.6, mat('#dfe6ee'), -1, 2.6); box(6.2, 0.7, 3.7, mat('#2b3a4a', 0.3), -1, 2.8);
  }
  const trail = new THREE.Mesh(new THREE.PlaneGeometry(length * 3.2, beam * 3.4), new THREE.MeshBasicMaterial({ map: wake, transparent: true, depthWrite: false, opacity: 0.9 }));
  trail.rotation.x = -Math.PI / 2; trail.position.set(-length / 2 - length * 1.5, 0.45, 0); g.add(trail);
  return g;
}

// MARK: Clouds
function cloudTexture() {
  return canvasTexture(256, 256, (c, w, h) => {
    for (let k = 0; k < 46; k++) {
      const a = random() * 6.283, r = Math.sqrt(random()) * 70, x = 128 + Math.cos(a) * r, y = 128 + Math.sin(a) * r * 0.7, size = between(30, 72);
      const g = c.createRadialGradient(x, y, 0, x, y, size); g.addColorStop(0, 'rgba(255,255,255,.34)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      c.fillStyle = g; c.fillRect(0, 0, w, h);
    }
  });
}

// MARK: The film
export const busS = (tau) => 26 + 12.5 * tau;
export const SHOP = V(160 + 22, 0, -470);

export function createWideCity(canvasEl, width, height, lang = 'hans') {
  const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(1); renderer.setSize(width, height, false);
  renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  scene.background = HAZE.clone(); scene.fog = new THREE.FogExp2(HAZE.clone(), 0.00026);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.6;
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(7000, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    vertexShader: 'varying vec3 p; void main(){ p=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: 'varying vec3 p; void main(){ float h=normalize(p).y; vec3 c=mix(vec3(.906,.933,.965),vec3(.62,.78,.95),smoothstep(.0,.45,h)); gl_FragColor=vec4(c,1.); #include <colorspace_fragment> }',
  })));
  scene.add(new THREE.HemisphereLight('#ffffff', '#cbd3de', 1.2));
  const sun = new THREE.DirectionalLight('#fff1df', 3.4), SUN = V(-0.6, 1, 0.45).normalize();
  sun.castShadow = true; sun.shadow.mapSize.set(4096, 4096); sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.6; sun.shadow.radius = 3;
  scene.add(sun, sun.target);
  buildCity(scene);

  const casing = routeRibbon(0.14, '#ffffff', 1), line = routeRibbon(0.18, '#e3242b', 2);
  scene.add(casing.mesh, line.mesh);
  const stopGeometry = new THREE.CylinderGeometry(1, 1, 0.3, 32), stops = [];
  for (let s = 70; s < ROUTE - 40; s += 150) {
    const group = new THREE.Group(), a = along(s);
    const ring = new THREE.Mesh(stopGeometry, new THREE.MeshBasicMaterial({ color: '#e3242b', fog: false })); ring.scale.set(4.6, 1, 4.6); ring.position.y = 0.3;
    const dot = new THREE.Mesh(stopGeometry, new THREE.MeshBasicMaterial({ color: '#ffffff', fog: false })); dot.scale.set(3, 1, 3); dot.position.y = 0.5;
    group.add(ring, dot); group.position.copy(a.point); scene.add(group); stops.push({ group, s });
  }
  const startDot = new THREE.Group();
  { const w = new THREE.Mesh(stopGeometry, new THREE.MeshBasicMaterial({ color: '#ffffff', fog: false })); w.scale.set(6, 1, 6); w.position.y = 0.4;
    const b = new THREE.Mesh(stopGeometry, new THREE.MeshBasicMaterial({ color: '#0a84ff', fog: false })); b.scale.set(4.4, 1, 4.4); b.position.y = 0.6;
    startDot.add(w, b); startDot.position.copy(along(0).point); scene.add(startDot); }

  const bus = makeBus(lang === 'en' ? '1  Star Ferry' : '1  尖沙咀碼頭'); scene.add(bus.group);
  bus.group.traverse((part) => { if (part.isMesh) part.receiveShadow = true; });
  // Traffic: oncoming on the bus's street, red taxis and green minibuses everywhere else.
  const traffic = [];
  const ONCOMING = ['#f4f4f6', '#d9141e', '#c9ccd3', '#1d1d22', '#d9141e', '#8a8f99', '#2b6fd6'];
  ONCOMING.forEach((color, k) => { const car = makeCar(color, k % 3 === 2); scene.add(car.group); traffic.push({ ...car, kind: 'oncoming', meet: [11.5, 12.3, 13.1, 13.6, 18.6, 3.0, 19.5][k], speed: between(10, 13) }); });
  for (let k = 0; k < 26; k++) {
    const isVan = k % 4 === 1, color = isVan ? '#2f9e5b' : pick(['#d9141e', '#d9141e', '#f4f4f6', '#c9ccd3', '#1d1d22', '#2b6fd6']);
    const car = makeCar(color, isVan); scene.add(car.group);
    const alongX = k % 2 === 0, busy = alongX ? [-240, -640] : [0, 160, 400];
    let streetAt; do streetAt = (alongX ? Math.round(between(ZI[0] + 1, ZI[1])) : Math.round(between(XI[0], XI[1]))) * B; while (busy.includes(streetAt)); // Keep the bus's own streets clear.
    traffic.push({ ...car, kind: 'grid', alongX, line: streetAt, start: alongX ? between(XI[0] * B, XI[1] * B) : between(ZI[0] * B, ZI[1] * B), dir: random() < 0.5 ? 1 : -1, speed: between(9, 15) });
  }
  for (const car of traffic) car.group.traverse((part) => { if (part.isMesh) part.castShadow = true; });
  // Boats crossing the harbour.
  const wake = wakeTexture(), boats = [];
  for (const [kind, z, x0, speed, dir] of [['ferry', -1010, 120, 7, 1], ['ferry', -1330, 700, 7, -1], ['junk', -960, 260, 4, 1], ['ship', -1250, -300, 6, 1], ['launch', -1120, 520, 12, -1], ['launch', -1420, 0, 11, 1], ['junk', -1180, 900, 3.5, -1], ['launch', -980, -150, 10, 1]]) {
    const group = buildBoat(kind, wake); scene.add(group); boats.push({ group, z, x0, speed, dir, phase: random() * 6 });
  }
  // Clouds to fall through, high above everything else in the film.
  const cloudMaps = [cloudTexture(), cloudTexture(), cloudTexture()], clouds = new THREE.Group();
  for (let k = 0; k < 40; k++) {
    const cx = between(-1600, 2200), cz = between(-2600, 1400), cy = between(1700, 3500);
    for (let n = 0, count = 5 + Math.floor(random() * 6); n < count; n++) {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: pick(cloudMaps), transparent: true, depthWrite: false, fog: false, color: new THREE.Color(pick(['#ffffff', '#f4f7fb', '#eef2f8'])), opacity: between(0.6, 0.95) }));
      const size = between(260, 620); sprite.scale.set(size, size * 0.7, 1); sprite.position.set(cx + between(-260, 260), cy + between(-90, 90), cz + between(-220, 220));
      clouds.add(sprite);
    }
  }
  // A few right where the dive passes, so it goes through them, not between them.
  for (let n = 0; n < 16; n++) { const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: pick(cloudMaps), transparent: true, depthWrite: false, fog: false, opacity: between(0.5, 0.85) })); const size = between(240, 520); sprite.scale.set(size, size * 0.7, 1); sprite.position.set(between(100, 650), between(1500, 3600), between(-400, 700)); clouds.add(sprite); }
  scene.add(clouds);

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.5, 14000);
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(width, height, { type: THREE.HalfFloatType, samples: 4 }));
  composer.addPass(new RenderPass(scene, camera)); composer.addPass(new OutputPass());

  const busPoint = V(0, 0, 0);
  const poseOn = (object, point, tangent, wheels, travelled, facing = 1) => {
    object.position.set(point.x, point.y ?? 0, point.z); object.rotation.set(0, Math.atan2(-tangent.z * facing, tangent.x * facing), 0);
    for (const wheel of wheels) wheel.rotation.z = -travelled / 0.5;
  };

  // MARK: Shots. Each is [eye, target, fov, roll].
  const overview = (t, from, to, look, a0, a1, d0, d1, h0, h1, fov) => {
    const k = smooth(from, to, t), a = lerp(a0, a1, k), d = lerp(d0, d1, k);
    return [V(look.x + Math.sin(a) * d, lerp(h0, h1, k), look.z + Math.cos(a) * d), look.clone(), fov, 0];
  };
  const chase = (t) => { const a = along(busS(storyTime(t))); return (f, l, y) => a.point.clone().addScaledVector(a.tangent, f).addScaledVector(a.left, l).setY(y); };
  // The dive, in five beats: through the icon, through the cloud, a hang over the harbour, a swoop, a glide between towers.
  const TOP = [V(300, 7000, -260), V(300.01, 0, -261), 38, -1.5];
  const hang = (t) => { const k = smooth(2.4, 3.6, t); return [V(lerp(560, 520, k), lerp(820, 760, k), lerp(380, 320, k)), V(lerp(150, 190, k), 0, -1250), 42, lerp(0.05, 0, k)]; };
  const glide = (t) => { const k = clamp((t - 4.0) / 1.0), z = lerp(-330, -430, k); return [V(160 + Math.sin(k * 2) * 4, lerp(64, 46, k), z), V(160, lerp(18, 26, k), z - 220), 46, Math.sin(k * 3.1) * 0.04]; };
  const shotO1 = (t) => overview(t, 5.3, 10.0, V(350, 0, -150), -0.16, -0.05, 860, 780, 380, 340, 42);
  const shotB = (t) => { const off = chase(t), k = clamp((t - 10.6) / 3.2); return [off(lerp(-26, -22, k), lerp(1, -6, k), lerp(12, 9, k)), off(lerp(8, 10, k), lerp(6, 7, k), 0), lerp(40, 42, k), 0]; };
  const shotC = (t) => { const off = chase(t), k = clamp((t - 14.3) / 2.9); return [off(lerp(30, 22, k), -9, lerp(1.4, 1.5, k)), off(0, -4.5, lerp(1.4, 1.1, k)), 36, 0]; };
  const shotO2 = (t) => overview(t, 17.7, 21.2, V(300, 0, -50), -1.36, -1.24, 330, 290, 1640, 1560, 34);
  const mix = (p, q, k) => {
    const e = p[0].clone().lerp(q[0], k);
    e.y = Math.exp(lerp(Math.log(p[0].y), Math.log(q[0].y), k));
    return [e, p[1].clone().lerp(q[1], k), lerp(p[2], q[2], k), lerp(p[3], q[3], k)];
  };
  function poseAt(t) {
    const ABOVE = [V(320, 4300, -150), V(320.01, 0, -151), 40, -1.1];
    if (t < 2.0) return mix(TOP, ABOVE, inCubic((t - 1.4) / 0.6)); // Speeding up through the icon, down onto the cloud tops.
    if (t < 2.5) { const k = clamp((t - 2.0) / 0.5); return mix(ABOVE, hang(2.5), lerp(k, outCubic(k), 0.3)); } // Through the cloud.
    if (t < 3.5) return hang(t); // Hanging over the harbour.
    if (t < 4.0) { const k = inOut((t - 3.5) / 0.5); return mix(hang(3.5), glide(4.0), k); } // The swoop.
    if (t < 5.0) return glide(t); // Between the towers.
    if (t < 5.6) return mix(glide(5.0), shotO1(5.6), inOut((t - 5.0) / 0.6)); // Up and back to see it all.
    if (t < 10.0) return shotO1(t);
    if (t < 10.6) return mix(shotO1(10.0), shotB(10.6), outCubic((t - 10.0) / 0.6));
    if (t < 13.8) return shotB(t);
    if (t < 14.3) return mix(shotB(13.8), shotC(14.3), inOut((t - 13.8) / 0.5));
    if (t < 17.2) return shotC(t);
    if (t < 17.7) return mix(shotC(17.2), shotO2(17.7), inOut((t - 17.2) / 0.5));
    if (t < 21.2) return shotO2(t);
    const k = inOut(clamp((t - 21.2) / 0.6)), o = shotO2(21.2);
    return [o[0].clone().lerp(V(300, 3000, -50), k), o[1].clone().lerp(V(300, 0, -400), k), 34, -1.0 * k];
  }

  const up = V(0, 1, 0), forward = V(0, 0, -1);
  function render(t) {
    const tau = storyTime(t), s = busS(tau), a = along(s);
    poseOn(bus.group, a.point, a.tangent, bus.wheels, s); busPoint.copy(bus.group.position);
    for (const car of traffic) {
      if (car.kind === 'oncoming') { const carS = busS(storyTime(car.meet)) - car.speed * (tau - storyTime(car.meet)), p = along(carS, -LANE); poseOn(car.group, p.point, p.tangent, car.wheels, -carS, -1); continue; }
      const span = car.alongX ? (XI[1] - XI[0]) * B : (ZI[1] - ZI[0]) * B, base = car.alongX ? XI[0] * B : ZI[0] * B;
      const along1 = base + ((((car.start - base) + car.dir * car.speed * tau) % span) + span) % span, lane = car.dir > 0 ? 3.5 : -3.5;
      if (car.alongX) poseOn(car.group, V(along1, 0, car.line + lane), V(car.dir, 0, 0), car.wheels, along1);
      else poseOn(car.group, V(car.line - lane, 0, along1), V(0, 0, car.dir), car.wheels, along1);
    }
    for (const b of boats) {
      b.group.position.set(b.x0 + b.dir * b.speed * tau, -0.4, b.z); b.group.rotation.set(0, b.dir > 0 ? 0 : Math.PI, 0);
      b.group.rotation.z = Math.sin(tau * 1.4 + b.phase) * 0.012; b.group.position.y += Math.sin(tau * 1.1 + b.phase) * 0.15;
    }
    const [eye, target, fov, roll] = poseAt(t);
    camera.position.copy(eye);
    const look = target.clone().sub(eye).normalize(), steep = smooth(0.85, 0.999, -look.y);
    camera.up.copy(up).lerp(forward.clone().applyAxisAngle(up, roll), steep).normalize();
    camera.lookAt(target);
    if (roll && steep < 0.5) camera.rotateZ(roll * (1 - steep * 2));
    camera.fov = fov; camera.updateProjectionMatrix();
    clouds.visible = eye.y > 1300;

    const height = eye.y, far = smooth(30, 300, height);
    const reach = ROUTE * smooth(7.45, 8.9, t);
    line.show(reach); casing.show(reach);
    line.uniforms.uHalf.value = lerp(1.5, 11, far); casing.uniforms.uHalf.value = lerp(2.4, 16, far);
    const onTop = far > 0.5;
    for (const mat of [line.mesh.material, casing.mesh.material]) mat.depthTest = !onTop;
    for (const stop of stops) { const k = clamp((reach - stop.s) / 60); stop.group.scale.setScalar((k > 0 ? 1 + 0.3 * Math.sin(k * Math.PI) : 0) * lerp(0.4, 2.6, far)); stop.group.children.forEach((c) => { c.material.depthTest = !onTop; c.renderOrder = onTop ? 12 + c.position.y : 0; }); }
    startDot.scale.setScalar(t > 7.4 ? lerp(1, 2.6, far) : 0);
    startDot.children.forEach((c) => { c.material.depthTest = !onTop; c.renderOrder = onTop ? 12 + c.position.y : 0; });
    // Shadows follow what the camera is looking at.
    const span = Math.max(80, Math.min(1700, eye.distanceTo(target) * 0.9)), focus = target.clone().setY(0);
    sun.position.copy(focus).addScaledVector(SUN, 3000); sun.target.position.copy(focus);
    const sc = sun.shadow.camera; sc.left = sc.bottom = -span; sc.right = sc.top = span; sc.near = 100; sc.far = 6500; sc.updateProjectionMatrix();
    composer.render();
    return height;
  }
  const project = (point) => { const p = point.clone().project(camera); return { x: (p.x + 1) / 2, y: (1 - p.y) / 2, front: p.z < 1 }; };
  return { render, labels: () => ({ bus: project(busPoint.clone().setY(6)), end: project(along(ROUTE).point.setY(8)), shop: project(SHOP.clone().setY(4)) }) };
}
