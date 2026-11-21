// A bright, map-like Kowloon for the vertical reel: white towers, round trees,
// the route in red, the harbour at the end of it. Everything is seeded, so a
// moment in the film always looks the same however often it is drawn.
import * as THREE from 'three';
import { EffectComposer } from './lib/EffectComposer.js';
import { RenderPass } from './lib/RenderPass.js';
import { OutputPass } from './lib/OutputPass.js';
import { RoomEnvironment } from './lib/RoomEnvironment.js';
import { makeBus, makeCar } from './city.js';

let seed = 1717;
const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const pick = (list) => list[Math.floor(random() * list.length)];
const between = (a, b) => a + random() * (b - a);
const clamp = (x) => Math.max(0, Math.min(1, x));
const smooth = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * k * (k * (6 * k - 15) + 10); };
const lerp = (a, b, k) => a + (b - a) * k;
const inOut = (x) => (x < 0.5 ? 16 * x ** 5 : 1 - (-2 * x + 2) ** 5 / 2);
const outCubic = (x) => 1 - (1 - clamp(x)) ** 3;
const V = (x, y, z) => new THREE.Vector3(x, y, z);

const B = 80, ROAD = 14, WALK = 4, LANE = 3;
const XI = [-5, 9], ZI = [-11, 4]; // Street indices; the harbour lies beyond the last one north.
const SHORE = ZI[0] * B - ROAD / 2 - WALK - 12;
const LAND = '#eceff3', HAZE = new THREE.Color('#e9eff6');

// MARK: The route, from 竹園邨 to the pier

const CORNERS = [[0, 200], [0, -240], [160, -240], [160, -640], [400, -640], [400, -868]];
const path = new THREE.CurvePath();
{
  const R = 18, pts = CORNERS.map(([x, z]) => V(x, 0, z));
  let from = pts[0];
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i], last = i === pts.length - 1;
    const into = p.clone().sub(pts[i - 1]).normalize();
    const until = last ? p : p.clone().addScaledVector(into, -R);
    path.add(new THREE.LineCurve3(from, until));
    if (!last) {
      const out = pts[i + 1].clone().sub(p).normalize(), next = p.clone().addScaledVector(out, R);
      path.add(new THREE.QuadraticBezierCurve3(until, p.clone(), next));
      from = next;
    }
  }
}
// Sampled every half metre so looking a point up is cheap and even.
const STEP = 0.5, samples = path.getSpacedPoints(Math.ceil(path.getLength() / STEP));
const ROUTE = (samples.length - 1) * STEP;
export const ROUTE_LENGTH = ROUTE;
function along(s, lane = LANE) {
  const u = Math.max(0, Math.min(samples.length - 1.001, s / STEP)), i = Math.floor(u), k = u - i;
  const a = samples[i], b = samples[i + 1];
  const tangent = b.clone().sub(a).normalize(), left = V(tangent.z, 0, -tangent.x);
  const point = a.clone().lerp(b, k).addScaledVector(left, lane);
  return { point, tangent, left };
}

// MARK: Materials

function canvasTexture(width, height, draw) {
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  draw(canvas.getContext('2d'), width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 8; texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/** White towers with a faint grid of windows, drawn from where each pixel is in the world. */
function towerMaterial() {
  const material = new THREE.MeshStandardMaterial({ roughness: 0.82, metalness: 0 });
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
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.74, 0.82, 0.93), glass * 0.85);
          diffuseColor.rgb *= mix(0.78, 1.0, smoothstep(0.0, 14.0, vW.y));
        } else diffuseColor.rgb *= 0.95;`);
  };
  material.customProgramCacheKey = () => 'reel-tower';
  return material;
}

/** A ribbon laid along the route, whose width is set per frame so it reads from any height. */
function routeRibbon(width, y, color, order) {
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
  const uniforms = { uHalf: { value: width / 2 } };
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uHalf = uniforms.uHalf;
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nattribute float aSide; attribute vec3 aLeft; uniform float uHalf;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed += aLeft * aSide * uHalf;');
  };
  material.customProgramCacheKey = () => `ribbon-${order}`;
  const mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true; mesh.renderOrder = 10 + order;
  return { mesh, uniforms, width, show: (metres) => geometry.setDrawRange(0, Math.max(0, Math.floor(metres)) * 6) };
}

// MARK: The city

function buildCity(scene) {
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(8000, 4000), new THREE.MeshStandardMaterial({ color: LAND, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2; ground.position.set(0, 0, SHORE + 2000); ground.receiveShadow = true; scene.add(ground);
  const water = new THREE.Mesh(new THREE.PlaneGeometry(8000, 4000), new THREE.MeshStandardMaterial({ color: '#9ccff3', roughness: 0.22, metalness: 0.05 }));
  water.rotation.x = -Math.PI / 2; water.position.set(0, -0.4, SHORE - 2000); scene.add(water);
  const wall = new THREE.Mesh(new THREE.BoxGeometry(8000, 1.6, 3), new THREE.MeshStandardMaterial({ color: '#f7f8fa', roughness: 0.9 }));
  wall.position.set(0, -0.2, SHORE); wall.receiveShadow = true; scene.add(wall);
  // The ferry pier at the end of the route.
  const pier = new THREE.Mesh(new THREE.BoxGeometry(44, 7, 60), new THREE.MeshStandardMaterial({ color: '#f4f5f7', roughness: 0.8 }));
  pier.position.set(400, 3.5, SHORE - 30); pier.castShadow = pier.receiveShadow = true; scene.add(pier);
  const pierRoof = new THREE.Mesh(new THREE.BoxGeometry(48, 1.4, 64), new THREE.MeshStandardMaterial({ color: '#2f8f5b', roughness: 0.6 }));
  pierRoof.position.set(400, 7.6, SHORE - 30); pierRoof.castShadow = true; scene.add(pierRoof);

  // Streets: white, with a quiet dashed line down the middle.
  const marks = canvasTexture(128, 512, (c, w, h) => {
    c.fillStyle = '#fbfbfd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#d9dce3'; c.fillRect(w / 2 - 2, 0, 4, h * 0.5);
    c.fillStyle = '#e6e8ee'; c.fillRect(6, 0, 3, h); c.fillRect(w - 9, 0, 3, h);
  });
  const roadMaterial = new THREE.MeshStandardMaterial({ map: marks, roughness: 0.95 });
  const walkMaterial = new THREE.MeshStandardMaterial({ color: '#e1e4ea', roughness: 1 });
  const xMin = XI[0] * B, xMax = XI[1] * B, zMin = ZI[0] * B, zMax = ZI[1] * B;
  const strip = (x, z, along, length, width, material, y) => {
    const geometry = new THREE.PlaneGeometry(width, length), uv = geometry.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setY(i, uv.getY(i) * length / 24);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2; if (along === 'x') mesh.rotation.z = Math.PI / 2;
    mesh.position.set(x, y, z); mesh.receiveShadow = true; scene.add(mesh);
  };
  for (let i = XI[0]; i <= XI[1]; i++) { strip(i * B, (zMin + zMax) / 2, 'z', zMax - zMin + ROAD + 2 * WALK, ROAD + 2 * WALK, walkMaterial, 0.02); strip(i * B, (zMin + zMax) / 2, 'z', zMax - zMin + ROAD, ROAD, roadMaterial, 0.05); }
  for (let j = ZI[0]; j <= ZI[1]; j++) { strip((xMin + xMax) / 2, j * B, 'x', xMax - xMin + ROAD + 2 * WALK, ROAD + 2 * WALK, walkMaterial, 0.03); strip((xMin + xMax) / 2, j * B, 'x', xMax - xMin + ROAD, ROAD, roadMaterial, 0.06); }

  // Blocks: mostly towers on podiums, now and then a park.
  const boxes = [], trees = [];
  const lot = (x0, z0, x1, z1, tall) => {
    const podium = between(7, 13);
    boxes.push([x0, z0, x1, z1, 0, podium]);
    const inset = between(2, 5), w = x1 - x0, d = z1 - z0;
    if (w < 12 || d < 12) return;
    const height = tall ? between(90, 175) : random() < 0.7 ? between(28, 70) : between(70, 110);
    const tx = random() < 0.5 ? [x0 + inset, x1 - inset] : [x0 + inset + w * 0.15, x1 - inset];
    boxes.push([tx[0], z0 + inset, tx[1], z1 - inset, podium, podium + height]);
    if (random() < 0.4) { const rx = between(tx[0], tx[1] - 6); boxes.push([rx, z0 + inset + 3, rx + 6, z0 + inset + 9, podium + height, podium + height + between(2, 5)]); }
  };
  const parkMaterial = new THREE.MeshStandardMaterial({ color: '#cfe9d3', roughness: 1 });
  const PARKS = new Set(['2,-9', '-2,-3', '5,1', '-4,-7', '7,-4', '3,-5', '-1,2']);
  for (let i = XI[0]; i < XI[1]; i++) for (let j = ZI[0]; j < ZI[1]; j++) {
    const x0 = i * B + ROAD / 2 + WALK, x1 = (i + 1) * B - ROAD / 2 - WALK, z0 = j * B + ROAD / 2 + WALK, z1 = (j + 1) * B - ROAD / 2 - WALK;
    if (PARKS.has(`${i},${j}`)) {
      const park = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), parkMaterial);
      park.rotation.x = -Math.PI / 2; park.position.set((x0 + x1) / 2, 0.04, (z0 + z1) / 2); park.receiveShadow = true; scene.add(park);
      for (let k = 0; k < 46; k++) trees.push([between(x0 + 3, x1 - 3), between(z0 + 3, z1 - 3), between(2.6, 4.2)]);
      continue;
    }
    const tall = j <= -9 || random() < 0.18;
    const sx = random() < 0.55 ? between(0.4, 0.6) : 1, sz = random() < 0.6 ? between(0.35, 0.65) : 1, gap = 1.5;
    const xs = sx < 1 ? [[x0, lerp(x0, x1, sx) - gap], [lerp(x0, x1, sx) + gap, x1]] : [[x0, x1]];
    const zs = sz < 1 ? [[z0, lerp(z0, z1, sz) - gap], [lerp(z0, z1, sz) + gap, z1]] : [[z0, z1]];
    for (const [a, b] of xs) for (const [c, d] of zs) lot(a, c, b, d, tall && random() < 0.6);
  }
  // Hong Kong Island across the water: a wall of towers, and the hills behind.
  for (let x = -1400; x < 1900; x += between(22, 46)) {
    const z = between(-1560, -1500), w = between(16, 36), d = between(16, 30), h = between(60, 260) * (1 - Math.abs(x - 300) / 3200);
    boxes.push([x, z - d, x + w, z, 0, h]);
    if (random() < 0.6) boxes.push([x + between(-10, 10), z - d - between(20, 60), x + w, z - d - 10, 0, h * between(0.4, 0.8)]);
  }
  const hill = new THREE.MeshStandardMaterial({ color: '#8fbf8e', roughness: 1 });
  for (const [x, z, r, h] of [[-600, -2300, 700, 430], [300, -2200, 600, 520], [1100, -2400, 800, 380], [1800, -2200, 500, 300]]) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), hill);
    mesh.scale.set(r, h, r * 0.6); mesh.position.set(x, -2, z); scene.add(mesh);
  }

  const towers = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), towerMaterial(), boxes.length);
  const TONES = ['#ffffff', '#f7f8fa', '#f1f3f7', '#f8f4ee', '#eaf0f7', '#fbfaf7'].map((c) => new THREE.Color(c));
  const m = new THREE.Matrix4();
  boxes.forEach(([x0, z0, x1, z1, y0, y1], i) => {
    m.makeScale(x1 - x0, y1 - y0, z1 - z0).setPosition((x0 + x1) / 2, y0, (z0 + z1) / 2);
    towers.setMatrixAt(i, m); towers.setColorAt(i, pick(TONES));
  });
  towers.castShadow = towers.receiveShadow = true; scene.add(towers);

  // Trees along every pavement.
  for (let i = XI[0]; i <= XI[1]; i++) for (let z = zMin; z < zMax; z += between(10, 13)) {
    if (Math.abs(((z % B) + B) % B - 0) < 12 || Math.abs(((z % B) + B) % B - B) < 12) continue;
    for (const side of [-1, 1]) if (random() < 0.85) trees.push([i * B + side * (ROAD / 2 + WALK * 0.55), z + between(-1, 1), between(2.2, 3.1)]);
  }
  for (let j = ZI[0] + 1; j <= ZI[1]; j++) for (let x = xMin; x < xMax; x += between(10, 13)) {
    const r = ((x % B) + B) % B; if (r < 12 || r > B - 12) continue;
    for (const side of [-1, 1]) if (random() < 0.85) trees.push([x + between(-1, 1), j * B + side * (ROAD / 2 + WALK * 0.55), between(2.2, 3.1)]);
  }
  const crowns = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 2), new THREE.MeshStandardMaterial({ roughness: 0.95 }), trees.length);
  const trunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.16, 0.24, 1, 6).translate(0, 0.5, 0), new THREE.MeshStandardMaterial({ color: '#a08d7a', roughness: 1 }), trees.length);
  const GREENS = ['#7cc98d', '#90d39f', '#69b97c', '#a3dbae', '#86cf8b'].map((c) => new THREE.Color(c));
  trees.forEach(([x, z, r], i) => {
    const trunk = r * 1.25;
    m.makeScale(r, r * 0.92, r).setPosition(x, trunk + r * 0.8, z); crowns.setMatrixAt(i, m); crowns.setColorAt(i, pick(GREENS));
    m.makeScale(1, trunk + r * 0.5, 1).setPosition(x, 0, z); trunks.setMatrixAt(i, m);
  });
  crowns.castShadow = crowns.receiveShadow = true; trunks.castShadow = true;
  scene.add(crowns, trunks);
}

// MARK: The film's camera

export const busS = (t) => 26 + 12.5 * t;
/** Where 新聯威茶餐廳 is, a short walk off the route. */
export const SHOP = V(160 + 22, 0, -470);

export function createReelCity(canvas, width, height, lang = 'hans') {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(1); renderer.setSize(width, height, false);
  renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  scene.background = HAZE.clone();
  scene.fog = new THREE.FogExp2(HAZE.clone(), 0.0003);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.55;
  const sky = new THREE.Mesh(new THREE.SphereGeometry(5000, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    vertexShader: 'varying vec3 p; void main(){ p=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: 'varying vec3 p; void main(){ float h=normalize(p).y; vec3 c=mix(vec3(.914,.937,.965),vec3(.70,.82,.95),smoothstep(.02,.5,h)); gl_FragColor=vec4(c,1.); #include <colorspace_fragment> }',
  }));
  scene.add(sky);
  scene.add(new THREE.HemisphereLight('#ffffff', '#cdd4df', 1.25));
  const sun = new THREE.DirectionalLight('#fff4e6', 3.3), SUN = V(-0.55, 1, 0.42).normalize();
  sun.castShadow = true; sun.shadow.mapSize.set(4096, 4096); sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.6; sun.shadow.radius = 3;
  scene.add(sun, sun.target);
  buildCity(scene);

  const casing = routeRibbon(9.5, 0.14, '#ffffff', 1), line = routeRibbon(6.2, 0.18, '#e3242b', 2);
  scene.add(casing.mesh, line.mesh);
  // Stops along the way: white dots ringed in red, as the app draws them.
  const stopGeometry = new THREE.CylinderGeometry(1, 1, 0.3, 32);
  const stops = [];
  for (let s = 70; s < ROUTE - 40; s += 150) {
    const group = new THREE.Group(), a = along(s);
    const ring = new THREE.Mesh(stopGeometry, new THREE.MeshBasicMaterial({ color: '#e3242b', fog: false })); ring.scale.set(4.6, 1, 4.6); ring.position.y = 0.3;
    const dot = new THREE.Mesh(stopGeometry, new THREE.MeshBasicMaterial({ color: '#ffffff', fog: false })); dot.scale.set(3, 1, 3); dot.position.y = 0.5;
    group.add(ring, dot); group.position.copy(a.point); scene.add(group); stops.push({ group, s });
  }
  const startDot = new THREE.Group();
  { const white = new THREE.Mesh(stopGeometry, new THREE.MeshBasicMaterial({ color: '#ffffff' })); white.scale.set(6, 1, 6); white.position.y = 0.4;
    const blue = new THREE.Mesh(stopGeometry, new THREE.MeshBasicMaterial({ color: '#0a84ff' })); blue.scale.set(4.4, 1, 4.4); blue.position.y = 0.6;
    startDot.add(white, blue); startDot.position.copy(along(0).point); scene.add(startDot); }

  const bus = makeBus(lang === 'en' ? '1  Star Ferry' : '1  尖沙咀碼頭'); scene.add(bus.group);
  bus.group.traverse((part) => { if (part.isMesh) part.receiveShadow = true; });
  // A little traffic: oncoming on the bus's street, and across the junctions.
  const traffic = [];
  const COLORS = ['#f4f4f6', '#1d1d22', '#c9ccd3', '#2b6fd6', '#f4f4f6', '#8a8f99'];
  for (let k = 0; k < 7; k++) { const car = makeCar(COLORS[k % COLORS.length], k % 3 === 2); scene.add(car.group); traffic.push({ ...car, kind: 'oncoming', meet: [7.9, 8.8, 9.6, 10.3, 15.2, 3.0, 16.0][k], speed: between(10, 13) }); }
  for (let k = 0; k < 10; k++) { const car = makeCar(COLORS[(k + 2) % COLORS.length], k % 4 === 1); scene.add(car.group); traffic.push({ ...car, kind: 'cross', z: [0, -1, -2, -3, 1, 2, -4, -5, -6, -7][k] * B, x0: between(-300, 600), dir: k % 2 ? 1 : -1, speed: between(9, 14) }); }
  for (const car of traffic) car.group.traverse((part) => { if (part.isMesh) { part.castShadow = true; } });

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 9000);
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(width, height, { type: THREE.HalfFloatType, samples: 4 }));
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new OutputPass());

  const busPoint = V(0, 0, 0);
  const poseOn = (object, point, tangent, wheels, travelled, facing = 1) => {
    object.position.set(point.x, 0, point.z);
    object.rotation.set(0, Math.atan2(-tangent.z * facing, tangent.x * facing), 0);
    for (const wheel of wheels) wheel.rotation.z = -travelled / 0.5;
  };

  // Poses: [eye, target, fov, roll]. Overviews look up the route from the south, the harbour at the top of the frame.
  // Framed so the whole route sits in the top half, above the chat.
  const centre = V(190, 0, -330);
  const overview = (t, from, to, look, angle0, angle1, dist0, dist1, h0, h1, fov) => {
    const k = smooth(from, to, t), a = lerp(angle0, angle1, k), d = lerp(dist0, dist1, k);
    return [V(look.x + Math.sin(a) * d, lerp(h0, h1, k), look.z + Math.cos(a) * d), look.clone(), fov, 0];
  };
  const chase = (t) => {
    const a = along(busS(t)), b = a.point;
    const off = (f, l, y) => b.clone().addScaledVector(a.tangent, f).addScaledVector(a.left, l).setY(y);
    return { a, b, off };
  };
  const shotO1 = (t) => overview(t, 2.4, 6.8, V(300, 0, 0), 0.28, 0.38, 920, 800, 1860, 1760, 44);
  const shotB = (t) => { const { off } = chase(t), k = clamp((t - 7.4) / 3.2); return [off(lerp(-28, -24, k), lerp(5, -6, k), lerp(16, 12, k)), off(-2, 0, lerp(-2, -3, k)), 50, 0]; };
  const shotC = (t) => { const { off } = chase(t), k = clamp((t - 11.1) / 2.9); return [off(lerp(32, 20, k), -5, lerp(1.4, 1.6, k)), off(0, 0, lerp(1.2, 0.6, k)), 42, 0]; };
  const shotO2 = (t) => overview(t, 14.5, 18, V(170, 0, -60), -0.3, -0.18, 900, 820, 2050, 1950, 44);
  const mix = (p, q, k) => {
    const e = p[0].clone().lerp(q[0], k);
    e.y = Math.exp(lerp(Math.log(p[0].y), Math.log(q[0].y), k));
    return [e, p[1].clone().lerp(q[1], k), lerp(p[2], q[2], k), lerp(p[3], q[3], k)];
  };
  function poseAt(t) {
    if (t < 2.8) { // Down out of the sky, turning as it falls.
      const k = outCubic((t - 1.55) / 1.25), o = shotO1(2.8), top = [V(300, 5200, -80), V(300.01, 0, -81), 40, -1.9];
      return mix(top, o, k);
    }
    if (t < 6.8) return shotO1(t);
    if (t < 7.4) return mix(shotO1(6.8), shotB(7.4), inOut((t - 6.8) / 0.6));
    if (t < 10.6) return shotB(t);
    if (t < 11.1) return mix(shotB(10.6), shotC(11.1), inOut((t - 10.6) / 0.5));
    if (t < 14.0) return shotC(t);
    if (t < 14.5) return mix(shotC(14.0), shotO2(14.5), inOut((t - 14.0) / 0.5));
    if (t < 18.0) return shotO2(t);
    const k = inOut(clamp((t - 18.0) / 0.6)), o = shotO2(18.0); // Up and away, spinning.
    return [o[0].clone().lerp(centre.clone().setY(2600), k), o[1].clone().lerp(centre.clone().add(V(0, 0, -300)), k), 44, k * 1.6];
  }

  const up = V(0, 1, 0), forward = V(0, 0, -1);
  function render(t) {
    const s = busS(t), a = along(s);
    poseOn(bus.group, a.point, a.tangent, bus.wheels, s);
    busPoint.copy(bus.group.position);
    for (const car of traffic) {
      if (car.kind === 'oncoming') { // Same street, other side, passing the bus at `meet`.
        const carS = busS(car.meet) - car.speed * (t - car.meet), p = along(carS, -LANE);
        poseOn(car.group, p.point, p.tangent, car.wheels, -carS, -1);
      } else {
        const x = car.x0 + car.dir * car.speed * t, lane = car.dir > 0 ? 3.5 : -3.5;
        poseOn(car.group, V(x, 0, car.z + lane), V(car.dir, 0, 0), car.wheels, x, 1);
      }
    }
    const [eye, target, fov, roll] = poseAt(t);
    camera.position.copy(eye);
    // Straight down has no up: lean on the route's direction, turned by the roll.
    const look = target.clone().sub(eye).normalize(), steep = smooth(0.85, 0.999, -look.y);
    const flatUp = forward.clone().applyAxisAngle(up, roll);
    camera.up.copy(up).lerp(flatUp, steep).normalize();
    camera.lookAt(target);
    if (roll && steep < 0.5) camera.rotateZ(roll * (1 - steep * 2) * 0.5);
    camera.fov = fov; camera.updateProjectionMatrix();

    const height = eye.y, far = smooth(30, 500, height);
    // Route and stops, drawn as the AI answers, and wide enough to read from up high.
    const reach = ROUTE * smooth(4.6, 6.1, t);
    line.show(reach); casing.show(reach);
    line.uniforms.uHalf.value = lerp(1.5, 17, far); casing.uniforms.uHalf.value = lerp(2.4, 25, far);
    // From high up, the line is drawn over the towers, as a map would.
    const onTop = far > 0.5;
    for (const m of [line.mesh.material, casing.mesh.material]) m.depthTest = !onTop;
    for (const stop of stops) stop.group.children.forEach((c) => { c.material.depthTest = !onTop; c.renderOrder = onTop ? 12 + c.position.y : 0; });
    startDot.children.forEach((c) => { c.material.depthTest = !onTop; c.renderOrder = onTop ? 12 + c.position.y : 0; });
    for (const stop of stops) { const k = clamp((reach - stop.s) / 60); stop.group.scale.setScalar((k > 0 ? 1 + 0.3 * Math.sin(k * Math.PI) : 0) * lerp(1, 3, far)); }
    startDot.scale.setScalar(lerp(1, 3, far) * (t > 2.6 ? 1 : 0));
    // Shadows follow what the camera is looking at.
    const span = lerp(70, 1100, smooth(20, 900, height)), focus = target.clone().setY(0);
    sun.position.copy(focus).addScaledVector(SUN, 2500); sun.target.position.copy(focus);
    const sc = sun.shadow.camera; sc.left = sc.bottom = -span; sc.right = sc.top = span; sc.near = 100; sc.far = 5200; sc.updateProjectionMatrix();
    composer.render();
    return height;
  }

  const project = (point) => { const p = point.clone().project(camera); return { x: (p.x + 1) / 2, y: (1 - p.y) / 2, front: p.z < 1 }; };
  return {
    render,
    /** Screen positions of the things the page labels: the bus, both ends of the route, the shop. */
    labels: () => ({ bus: project(busPoint.clone().setY(6)), start: project(along(0).point), end: project(along(ROUTE).point.setY(8)), shop: project(SHOP.clone().setY(4)) }),
  };
}
