// A dusk street in Hong Kong for the bus to run through. Everything is seeded,
// so a moment in the film always looks the same however often it is drawn.
import * as THREE from 'three';
import { EffectComposer } from './lib/EffectComposer.js';
import { RenderPass } from './lib/RenderPass.js';
import { UnrealBloomPass } from './lib/UnrealBloomPass.js';
import { OutputPass } from './lib/OutputPass.js';
import { Reflector } from './lib/Reflector.js';
import { RoomEnvironment } from './lib/RoomEnvironment.js';

let seed = 20261106;
const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const pick = (list) => list[Math.floor(random() * list.length)];
const between = (a, b) => a + random() * (b - a);
const smooth = (a, b, x) => { const k = Math.max(0, Math.min(1, (x - a) / (b - a))); return k * k * k * (k * (6 * k - 15) + 10); };
const lerp = (a, b, k) => a + (b - a) * k;

const ROAD = 15, WALK = 3.5, SKY = new THREE.Color('#141d4d');
const FONT = '"PingFang HK","PingFang SC",sans-serif';

// MARK: The road

const curve = new THREE.CatmullRomCurve3([[-30, 120], [0, 40], [0, -90], [25, -170], [75, -230], [90, -310], [60, -390], [60, -480], [95, -560], [95, -660], [60, -760]]
  .map(([x, z]) => new THREE.Vector3(x, 0, z)), false, 'catmullrom', 0.5);
curve.arcLengthDivisions = 2000;
const LENGTH = curve.getLength();
const along = (s) => {
  const u = Math.max(0, Math.min(1, s / LENGTH));
  const point = curve.getPointAt(u), tangent = curve.getTangentAt(u);
  return { point, tangent, left: new THREE.Vector3(tangent.z, 0, -tangent.x) };
};
const place = (s, side, y = 0) => { const a = along(s); return a.point.clone().addScaledVector(a.left, side).setY(y); };
const nearRoad = (x, z) => { let best = 1e9; for (let s = 0; s < LENGTH; s += 8) { const p = along(s).point; best = Math.min(best, Math.hypot(p.x - x, p.z - z)); } return best; };

function ribbon(from, to, leftEdge, rightEdge, y, step = 2, flat = false) {
  const positions = [], uvs = [], index = [];
  let row = 0;
  for (let s = from; s <= to; s += step, row++) {
    const a = place(s, leftEdge), b = place(s, rightEdge);
    if (flat) positions.push(a.x, -a.z, 0, b.x, -b.z, 0); else positions.push(a.x, y, a.z, b.x, y, b.z);
    uvs.push(0, s / 12, 1, s / 12);
    if (row) { const k = (row - 1) * 2; index.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(index);
  geometry.computeVertexNormals();
  return geometry;
}

function canvasTexture(width, height, draw, srgb = true) {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  draw(canvas.getContext('2d'), width, height);
  const texture = new THREE.CanvasTexture(canvas);
  if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

const markings = () => canvasTexture(512, 512, (c, w, h) => {
  c.fillStyle = '#000'; c.fillRect(0, 0, w, h);
  const lane = (x, dash) => { c.fillStyle = '#c9ccd6'; for (let y = 0; y < h; y += dash ? 256 : 512) c.fillRect(x * w - 3, y, 6, dash ? 128 : 512); };
  lane(0.25, true); lane(0.75, true);
  c.fillStyle = '#e8b53a'; c.fillRect(w / 2 - 9, 0, 5, h); c.fillRect(w / 2 + 4, 0, 5, h);
  c.fillStyle = '#e8b53a'; c.fillRect(10, 0, 5, h); c.fillRect(w - 15, 0, 5, h);
}, false);

const roadShader = {
  name: 'WetRoad',
  uniforms: { color: { value: null }, tDiffuse: { value: null }, textureMatrix: { value: null }, tMarks: { value: null }, uFog: { value: SKY.clone() }, uFogDensity: { value: 0.003 } },
  vertexShader: `uniform mat4 textureMatrix; varying vec4 vProj; varying vec2 vUv; varying vec3 vWorld; varying float vDepth;
    void main(){ vUv=uv; vProj=textureMatrix*vec4(position,1.0); vec4 w=modelMatrix*vec4(position,1.0); vWorld=w.xyz; vec4 m=viewMatrix*w; vDepth=-m.z; gl_Position=projectionMatrix*m; }`,
  fragmentShader: `uniform sampler2D tDiffuse; uniform sampler2D tMarks; uniform vec3 uFog; uniform float uFogDensity;
    varying vec4 vProj; varying vec2 vUv; varying vec3 vWorld; varying float vDepth;
    float hash(vec2 p){ return fract(sin(dot(p,vec2(41.3,289.1)))*43758.5453); }
    float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f); return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
    void main(){
      vec2 uv=vProj.xy/vProj.w;
      float wet=noise(vWorld.xz*.35)*.6+noise(vWorld.xz*1.7)*.4;
      vec2 ripple=(vec2(noise(vWorld.xz*2.3),noise(vWorld.zx*2.9))-.5)*.006;
      vec3 r=vec3(0.); float total=0.;
      for(int i=-6;i<=6;i++){ float k=float(i); float g=exp(-k*k/18.); r+=texture2D(tDiffuse,uv+ripple+vec2(k*.0012,k*.0065)).rgb*g; total+=g; }
      r/=total;
      vec3 view=normalize(cameraPosition-vWorld);
      float fresnel=.16+.84*pow(1.-max(view.y,0.),3.);
      vec3 asphalt=vec3(.018,.02,.03)*(.7+.6*noise(vWorld.xz*6.));
      float mark=texture2D(tMarks,vUv).r;
      vec3 c=asphalt+r*fresnel*mix(.45,.95,wet)+vec3(mark)*.2+vec3(.9,.85,.7)*mark*.1;
      float fog=1.-exp(-pow(vDepth*uFogDensity,2.));
      gl_FragColor=vec4(mix(c,uFog,fog),1.);
      #include <colorspace_fragment>
    }`,
};

// MARK: Buildings

function facade(tone, warmth) {
  const columns = 12, floors = 16, size = 1024, cw = size / columns, ch = size / floors, lit = [];
  const map = canvasTexture(size, size, (c) => {
    c.fillStyle = tone; c.fillRect(0, 0, size, size);
    for (let y = 0; y < floors; y++) for (let x = 0; x < columns; x++) {
      c.fillStyle = '#0c101c'; c.fillRect(x * cw + 13, y * ch + 13, cw - 26, ch - 24);
      c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(x * cw + 8, y * ch + ch - 9, cw - 16, 3);
      if (random() < 0.16) { c.fillStyle = '#8b8f9c'; c.fillRect(x * cw + cw * 0.3, y * ch + ch - 19, cw * 0.4, 12); } // Air conditioners.
      if (random() < 0.42) lit.push([x, y, pick(warmth), between(0.25, 1)]);
    }
  });
  const glow = canvasTexture(size, size, (c) => {
    c.fillStyle = '#000'; c.fillRect(0, 0, size, size);
    for (const [x, y, color, level] of lit) {
      c.globalAlpha = level; c.fillStyle = color; c.fillRect(x * cw + 13, y * ch + 13, cw - 26, ch - 24);
      c.globalAlpha = 1; c.fillStyle = 'rgba(0,0,0,.45)'; c.fillRect(x * cw + cw / 2 - 1.5, y * ch + 13, 3, ch - 24);
    }
  });
  return new THREE.MeshStandardMaterial({ map, emissive: 0xffffff, emissiveMap: glow, emissiveIntensity: 0.9, roughness: 0.6, metalness: 0.1 });
}

function towerGeometry(width, height, depth) {
  const geometry = new THREE.BoxGeometry(width, height, depth), uv = geometry.attributes.uv, u0 = Math.floor(random() * 12) / 12, v0 = Math.floor(random() * 16) / 16;
  for (let face = 0; face < 6; face++) {
    const across = face < 2 ? depth : width, up = face === 2 || face === 3 ? depth : height;
    for (let k = 0; k < 4; k++) {
      const i = face * 4 + k;
      uv.setXY(i, u0 + (uv.getX(i) * across) / 30, v0 + (uv.getY(i) * up) / 46);
    }
  }
  return geometry;
}

const SHOPS = ['茶餐廳', '燒味飯店', '金舖', '涼茶', '藥房', '士多', '粥麵', '海味', '眼鏡', '時裝', '書局', '麵包', '花店', '電器'];
const shopfronts = () => canvasTexture(4096, 256, (c, w, h) => {
  let x = 0;
  while (x < w) {
    const width = between(200, 380), color = pick(['#ff4d6d', '#ffb703', '#2ec4b6', '#4cc9f0', '#f72585', '#fb8500', '#90e0ef', '#ffd166']);
    c.fillStyle = '#10121c'; c.fillRect(x, 0, width, h);
    c.fillStyle = color; c.fillRect(x + 4, 6, width - 8, 74);
    c.fillStyle = '#10121c'; c.font = `800 52px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(pick(SHOPS), x + width / 2, 44);
    const inside = c.createLinearGradient(0, 90, 0, h); inside.addColorStop(0, '#fff3cf'); inside.addColorStop(1, '#ffb45c');
    c.fillStyle = inside; c.fillRect(x + 8, 90, width - 16, h - 96);
    c.fillStyle = 'rgba(20,20,30,.55)'; for (let k = 0; k < 4; k++) c.fillRect(x + between(14, width - 50), between(130, 190), between(16, 40), between(30, 70));
    x += width;
  }
});

const NEON = ['#ff2d55', '#ff9f0a', '#30d158', '#40c8e0', '#bf5af2', '#ffd60a', '#ff375f', '#64d2ff'];
const SIGNS = ['茶餐廳', '大押', '金行', '涼茶舖', '麻雀', '燒臘', '海鮮酒家', '找換', '浴室', '跌打', '冰室', '粥麵', '旅館', '時鐘酒店', '士多', '酒樓'];
function signTexture(text, isTall) {
  const color = pick(NEON), w = isTall ? 256 : 1024, h = isTall ? 1024 : 256;
  return canvasTexture(w, h, (c) => {
    c.fillStyle = '#0a0b14'; c.fillRect(0, 0, w, h);
    c.strokeStyle = color; c.lineWidth = 12; c.shadowColor = color; c.shadowBlur = 24; c.strokeRect(14, 14, w - 28, h - 28);
    c.fillStyle = '#fff'; c.shadowBlur = 32; c.textAlign = 'center'; c.textBaseline = 'middle';
    const chars = [...text], size = Math.min(isTall ? 190 : 170, ((isTall ? h : w) - 80) / chars.length);
    c.font = `900 ${size}px ${FONT}`;
    chars.forEach((char, i) => {
      const k = (i + 0.5) / chars.length;
      c.fillStyle = color; c.fillText(char, isTall ? w / 2 : 40 + k * (w - 80), isTall ? 40 + k * (h - 80) : h / 2);
      c.fillStyle = 'rgba(255,255,255,.75)'; c.shadowBlur = 0; c.fillText(char, isTall ? w / 2 : 40 + k * (w - 80), isTall ? 40 + k * (h - 80) : h / 2); c.shadowBlur = 32;
    });
  });
}

function buildStreet(scene) {
  const towers = [facade('#39405c', ['#ffd9a0', '#ffc774', '#fff1d6']), facade('#4a3f55', ['#ffcf8a', '#ff9d6c', '#fff1d6']), facade('#2c3a55', ['#bfe4ff', '#ffe3b3', '#ffffff']), facade('#54505a', ['#ffe0ad', '#ffd08a', '#c9e8ff'])];
  const shops = new THREE.MeshBasicMaterial({ map: shopfronts(), toneMapped: true, color: new THREE.Color(1.15, 1.15, 1.15) });
  const signs = [...SIGNS.map((text) => signTexture(text, true)), ...SIGNS.map((text) => signTexture(text, false))];
  const signMaterials = signs.map((map) => new THREE.MeshBasicMaterial({ map, color: new THREE.Color(1.7, 1.7, 1.7) }));
  const dark = new THREE.MeshStandardMaterial({ color: '#23263a', roughness: 0.8 });
  const roof = new THREE.MeshStandardMaterial({ roughness: 0.9, map: canvasTexture(512, 512, (c, w, h) => {
    c.fillStyle = '#2b2f4a'; c.fillRect(0, 0, w, h); c.strokeStyle = '#555b7e'; c.lineWidth = 16; c.strokeRect(0, 0, w, h);
    for (let k = 0; k < 7; k++) { const x = between(50, 400), y = between(50, 400), a = between(40, 110), b = between(40, 110); c.fillStyle = pick(['#3b4062', '#454a6e', '#20233a']); c.fillRect(x, y, a, b); c.fillStyle = '#6a6f96'; c.fillRect(x, y, a, 6); }
  }) });
  for (const side of [1, -1]) {
    for (const row of [0, 1, 2, 3, 4, 5]) {
      for (let s = 0; s < LENGTH;) {
        const width = between(11, 19), depth = between(16, 24), height = row === 0 ? between(32, 95) : between(55, 150);
        const offset = ROAD / 2 + WALK + depth / 2 + row * 30, center = place(s + width / 2, side * offset), a = along(s + width / 2);
        s += width + between(0.3, 1.6);
        if (nearRoad(center.x, center.z) < offset - 2.5) continue;
        const yaw = Math.atan2(a.tangent.x, a.tangent.z);
        const wall = pick(towers), tower = new THREE.Mesh(towerGeometry(width, height, depth), [wall, wall, roof, roof, wall, wall]);
        tower.position.set(center.x, height / 2, center.z); tower.rotation.y = yaw + Math.PI / 2 * 0 ; tower.rotation.y = yaw + Math.PI / 2;
        scene.add(tower);
        if (row) continue;
        // Shops along the pavement, and the signs that reach out over the road.
        const front = place(s - width / 2, side * (ROAD / 2 + WALK + 0.15));
        const shop = new THREE.Mesh(new THREE.PlaneGeometry(width, 5), shops.clone());
        shop.material.map = shops.map.clone(); shop.material.map.repeat.set(width / 40, 1); shop.material.map.offset.x = random(); shop.material.map.needsUpdate = true;
        shop.position.copy(front).setY(2.5); shop.rotation.y = yaw + (side > 0 ? Math.PI / 2 : -Math.PI / 2);
        scene.add(shop);
        const awning = new THREE.Mesh(new THREE.BoxGeometry(width, 0.25, 1.8), dark);
        awning.position.copy(place(s - width / 2, side * (ROAD / 2 + WALK - 0.8))).setY(5.2); awning.rotation.y = yaw + Math.PI / 2;
        scene.add(awning);
        for (let k = 0, count = 1 + Math.floor(random() * 3); k < count; k++) {
          const isTall = random() < 0.6, index = Math.floor(random() * SIGNS.length) + (isTall ? 0 : SIGNS.length);
          const w = isTall ? between(1.8, 2.6) : between(7, 10), h = isTall ? w * 4 : w / 4;
          const reach = side * (ROAD / 2 + WALK - (isTall ? 1.2 : w / 2 - 0.4));
          const sign = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.3), [dark, dark, dark, dark, signMaterials[index], signMaterials[index]]);
          const at = along(s - width * between(0.2, 0.8));
          sign.position.copy(at.point).addScaledVector(at.left, reach).setY(between(7.5, 26) + h / 2 * 0.3);
          sign.rotation.y = Math.atan2(at.tangent.x, at.tangent.z);
          scene.add(sign);
        }
      }
    }
  }
  // Pavements, lamps and the footbridges overhead.
  const pavement = new THREE.MeshStandardMaterial({ color: '#20222c', roughness: 0.7, emissive: '#1a1626', emissiveIntensity: 0.5 });
  for (const side of [1, -1]) {
    const a = side * ROAD / 2, b = side * (ROAD / 2 + WALK + 0.6);
    const walkway = new THREE.Mesh(ribbon(0, LENGTH, side > 0 ? b : a, side > 0 ? a : b, 0.18), pavement);
    scene.add(walkway);
  }
  const pole = new THREE.MeshStandardMaterial({ color: '#555a6c', metalness: 0.6, roughness: 0.4 });
  const lamp = new THREE.MeshBasicMaterial({ color: new THREE.Color(5, 3.8, 2.4) });
  const pool = new THREE.MeshBasicMaterial({
    map: canvasTexture(256, 256, (c) => { const g = c.createRadialGradient(128, 128, 0, 128, 128, 128); g.addColorStop(0, 'rgba(255,214,160,.5)'); g.addColorStop(1, 'rgba(255,214,160,0)'); c.fillStyle = g; c.fillRect(0, 0, 256, 256); }),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  for (let s = 10, k = 0; s < LENGTH; s += 26, k++) {
    const side = k % 2 ? 1 : -1, a = along(s), base = place(s, side * (ROAD / 2 + 0.9));
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 9.5), pole);
    stem.position.copy(base).setY(4.75); scene.add(stem);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 3), pole);
    const tip = place(s, side * (ROAD / 2 - 1.2));
    arm.position.copy(base).lerp(tip, 0.5).setY(9.5); arm.rotation.y = Math.atan2(a.left.x, a.left.z); scene.add(arm);
    const light = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 1.1), lamp);
    light.position.copy(tip).setY(9.42); light.rotation.y = arm.rotation.y; scene.add(light);
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(15, 15), pool);
    glow.rotation.x = -Math.PI / 2; glow.position.copy(tip).setY(0.05); scene.add(glow);
  }
  const bridgeGlass = new THREE.MeshStandardMaterial({ color: '#16233f', emissive: '#7fd4ff', emissiveIntensity: 0.9, roughness: 0.2, metalness: 0.5 });
  const bridgeFrame = new THREE.MeshStandardMaterial({ color: '#d7dbe6', roughness: 0.4, metalness: 0.4, emissive: '#3a4466', emissiveIntensity: 0.7 });
  for (const s of [255, 470]) {
    const a = along(s), span = ROAD + WALK * 2 + 6, yaw = Math.atan2(a.left.x, a.left.z);
    const glass = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.6, span), bridgeGlass);
    glass.position.copy(a.point).setY(8.2); glass.rotation.y = yaw; scene.add(glass);
    for (const y of [6.8, 9.6]) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.35, span + 0.3), bridgeFrame);
      beam.position.copy(a.point).setY(y); beam.rotation.y = yaw; scene.add(beam);
    }
  }
}

// MARK: Vehicles

function profile(points, radius = 0.35) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], i) => {
    const prev = points[(i + points.length - 1) % points.length], next = points[(i + 1) % points.length];
    const toward = ([ax, ay], [bx, by], d) => { const l = Math.hypot(bx - ax, by - ay), k = Math.min(d, l / 2) / l; return [ax + (bx - ax) * k, ay + (by - ay) * k]; };
    const a = toward([x, y], prev, radius), b = toward([x, y], next, radius);
    if (i === 0) shape.moveTo(...a); else shape.lineTo(...a);
    shape.quadraticCurveTo(x, y, ...b);
  });
  shape.closePath();
  return shape;
}

function shell(points, width, material, radius, inset = 0) {
  const geometry = new THREE.ExtrudeGeometry(profile(points, radius), { depth: width - 0.24 - inset * 2, bevelEnabled: true, bevelSize: 0.12, bevelThickness: 0.12, bevelSegments: 4, curveSegments: 8 });
  geometry.translate(0, 0, -(width - 0.24 - inset * 2) / 2);
  return new THREE.Mesh(geometry, material);
}

const rim = () => canvasTexture(256, 256, (c) => {
  c.fillStyle = '#0d0e12'; c.fillRect(0, 0, 256, 256);
  c.fillStyle = '#c4c8d2'; c.beginPath(); c.arc(128, 128, 84, 0, 7); c.fill();
  c.fillStyle = '#2b2e38'; for (let k = 0; k < 8; k++) { const a = (k / 8) * 6.283; c.beginPath(); c.arc(128 + Math.cos(a) * 56, 128 + Math.sin(a) * 56, 13, 0, 7); c.fill(); }
  c.fillStyle = '#6d7180'; c.beginPath(); c.arc(128, 128, 24, 0, 7); c.fill();
});
let rimMaterial;
function wheel(radius, width) {
  rimMaterial ??= new THREE.MeshStandardMaterial({ map: rim(), metalness: 0.6, roughness: 0.35 });
  const tyre = new THREE.MeshStandardMaterial({ color: '#0d0e12', roughness: 0.75 });
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 32), [tyre, rimMaterial, rimMaterial]);
  mesh.rotation.x = Math.PI / 2;
  const spinner = new THREE.Group(); spinner.add(mesh);
  return spinner;
}

const destination = (text) => canvasTexture(1024, 192, (c, w, h) => {
  c.fillStyle = '#050505'; c.fillRect(0, 0, w, h);
  c.fillStyle = '#ffb020'; c.shadowColor = '#ff9a00'; c.shadowBlur = 18; c.font = `800 128px ${FONT}`; c.textBaseline = 'middle';
  c.fillText(text, 26, h / 2 + 6);
});

let busSign = '';
// x runs nose to tail: the nose is at +6.
function buildBus() {
  const bus = new THREE.Group(), W = 2.55;
  const red = new THREE.MeshPhysicalMaterial({ color: '#e0121f', roughness: 0.32, metalness: 0.25, clearcoat: 1, clearcoatRoughness: 0.12 });
  const white = new THREE.MeshPhysicalMaterial({ color: '#f4f5f8', roughness: 0.35, clearcoat: 1 });
  const glass = new THREE.MeshPhysicalMaterial({ color: '#0b1020', roughness: 0.08, metalness: 0.6, clearcoat: 1 });
  const under = new THREE.MeshStandardMaterial({ color: '#14151b', roughness: 0.8 });
  const body = shell([[-6, 0.42], [6, 0.42], [6.02, 2.2], [5.8, 4.3], [-5.9, 4.42], [-6, 2.2]], W, red, 0.42);
  bus.add(body);
  // Bands of window, lit from inside, with people and seats against the light.
  const cabin = (y0) => canvasTexture(2048, 180, (c, w, h) => {
    const light = c.createLinearGradient(0, 0, 0, h); light.addColorStop(0, '#ffdca0'); light.addColorStop(0.3, '#c98f52'); light.addColorStop(1, '#3a2a2c');
    c.fillStyle = light; c.fillRect(0, 0, w, h);
    for (let x = 30; x < w; x += 122) {
      c.fillStyle = '#1b2748'; c.fillRect(x, h * 0.55, 62, h * 0.45);
      if (random() < 0.5) { c.fillStyle = '#20161a'; c.beginPath(); c.arc(x + 32, h * 0.42, 21, 0, 7); c.fill(); c.fillRect(x + 8, h * 0.56, 48, h); }
    }
  });
  for (const [y, h] of [[1.55, 0.95], [3.3, 0.85]]) {
    const inside = new THREE.MeshBasicMaterial({ map: cabin(y) });
    for (const side of [1, -1]) {
      const pane = new THREE.Mesh(new THREE.BoxGeometry(10.8, h, 0.02), inside);
      pane.position.set(-0.1, y, side * (W / 2 + 0.005)); bus.add(pane);
      for (let x = -5.3; x <= 5.2; x += 1.32) {
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.1, h + 0.04, 0.03), glass);
        pillar.position.set(x, y, side * (W / 2 + 0.015)); bus.add(pillar);
      }
      const sheen = new THREE.Mesh(new THREE.BoxGeometry(10.8, h, 0.01), new THREE.MeshPhysicalMaterial({ color: '#0b1020', transparent: true, opacity: 0.28, roughness: 0.06, metalness: 0.9 }));
      sheen.position.set(-0.1, y, side * (W / 2 + 0.022)); bus.add(sheen);
    }
  }
  const stripe = (y, h, material) => { for (const side of [1, -1]) { const band = new THREE.Mesh(new THREE.BoxGeometry(11.9, h, 0.02), material); band.position.set(0, y, side * (W / 2 + 0.005)); bus.add(band); } };
  stripe(0.82, 0.2, white); stripe(2.42, 0.14, white);
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.15, 2.2), glass); screen.position.set(6.16, 1.65, 0); bus.add(screen);
  const upper = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.78, 2.25), glass); upper.position.set(6.0, 3.32, 0); upper.rotation.z = -0.1; bus.add(upper);
  const signMap = destination(busSign); signMap.wrapS = signMap.wrapT = THREE.ClampToEdgeWrapping;
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 0.4), new THREE.MeshBasicMaterial({ map: signMap, color: new THREE.Color(2.4, 2.4, 2.4) }));
  sign.position.set(6.19, 2.5, 0); sign.rotation.y = Math.PI / 2; bus.add(sign);
  const side = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.6), new THREE.MeshBasicMaterial({ transparent: true, map: canvasTexture(1024, 180, (c, w, h) => { c.clearRect(0, 0, w, h); c.fillStyle = '#fff'; c.font = `700 120px -apple-system,"SF Pro Display",Helvetica,sans-serif`; c.textBaseline = 'middle'; c.fillText('hktransport', 10, h / 2 + 6); }) }));
  side.position.set(-1.4, 0.52 + 2.0 - 0.02, W / 2 + 0.02); side.scale.setScalar(0.5); bus.add(side);
  const lightMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(4, 3.8, 3.2) });
  const tail = new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 0.3, 0.3) });
  for (const z of [1, -1]) {
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 12), lightMaterial); head.position.set(6.16, 0.82, z * 0.95); head.scale.x = 0.5; bus.add(head);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 0.3), tail); back.position.set(-6.16, 1.25, z * 1.02); bus.add(back);
  }
  const rear = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.72, 2), glass); rear.position.set(-6.15, 3.3, 0); bus.add(rear);
  const grille = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.5, 1.5), under); grille.position.set(-6.15, 1.2, 0); bus.add(grille);
  const skirt = new THREE.Mesh(new THREE.BoxGeometry(11.9, 0.32, W - 0.1), under); skirt.position.y = 0.4; bus.add(skirt);
  const wheels = [];
  for (const x of [3.7, -2.6]) for (const z of [1, -1]) { const spinner = wheel(0.52, 0.34); spinner.position.set(x, 0.52, z * (W / 2 - 0.1)); bus.add(spinner); wheels.push(spinner); }
  // The pool its headlamps throw down the road.
  const beam = new THREE.Mesh(new THREE.PlaneGeometry(22, 8), new THREE.MeshBasicMaterial({
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    map: canvasTexture(512, 192, (c, w, h) => { c.fillStyle = '#000'; c.fillRect(0, 0, w, h); c.translate(0, h / 2); c.scale(1, h / 2 / w); const g = c.createRadialGradient(0, 0, 0, 0, 0, w); g.addColorStop(0, 'rgba(255,236,196,.42)'); g.addColorStop(1, 'rgba(255,236,196,0)'); c.fillStyle = g; c.fillRect(0, -w, w, w * 2); }),
  }));
  beam.rotation.x = -Math.PI / 2; beam.position.set(17, 0.08, 0); bus.add(beam);
  bus.traverse((part) => { if (part.isMesh && part.material !== beam.material) part.castShadow = true; });
  return { group: bus, wheels };
}

function buildCar(color, isVan) {
  const car = new THREE.Group(), W = 1.8;
  const paint = new THREE.MeshPhysicalMaterial({ color, roughness: 0.3, metalness: 0.3, clearcoat: 1 });
  const glass = new THREE.MeshPhysicalMaterial({ color: '#0a0f1c', roughness: 0.08, metalness: 0.7 });
  const low = isVan ? [[-3, 0.35], [3, 0.35], [3.05, 1], [2.6, 2.35], [-3, 2.4]] : [[-2.3, 0.35], [2.3, 0.35], [2.35, 0.95], [1.1, 1.02], [0.5, 1.5], [-1.1, 1.52], [-1.8, 1.02], [-2.3, 0.98]];
  car.add(shell(low, W, paint, isVan ? 0.3 : 0.16));
  const pane = new THREE.Mesh(new THREE.BoxGeometry(isVan ? 4.8 : 1.5, isVan ? 0.6 : 0.36, W + 0.02), glass);
  pane.position.set(isVan ? -0.1 : -0.25, isVan ? 1.7 : 1.24, 0); car.add(pane);
  const length = isVan ? 3 : 2.33;
  for (const z of [1, -1]) {
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 5.6, 4.6) })); head.position.set(length + 0.02, 0.72, z * 0.65); car.add(head);
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 0.36), new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 0.25, 0.25) })); tail.position.set(-length - 0.02, 0.76, z * 0.62); car.add(tail);
  }
  if (!isVan) { const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.14, 0.5), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 2.6, 1.6) })); lamp.position.set(-0.3, 1.6, 0); car.add(lamp); }
  const wheels = [];
  for (const x of [length * 0.62, -length * 0.62]) for (const z of [1, -1]) { const spinner = wheel(0.33, 0.22); spinner.position.set(x, 0.33, z * (W / 2 - 0.04)); car.add(spinner); wheels.push(spinner); }
  return { group: car, wheels };
}

// MARK: The film's camera

export const SHOT_LENGTH = 12;
const BUS_SPEED = 17, BUS_START = 120;
const LANE_IN = 1.9, LANE_OUT = 5.6;
const laneAt = (t) => lerp(lerp(lerp(LANE_IN, LANE_OUT, smooth(3.1, 3.9, t)), LANE_IN, smooth(5.4, 6.2, t)), LANE_OUT, smooth(8, 8.8, t));
const busS = (t) => BUS_START + BUS_SPEED * t;

export function createCity(canvas, width, height, lang = 'hans') {
  busSign = lang === 'en' ? '1  Star Ferry' : '1  尖沙咀碼頭';
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(1); renderer.setSize(width, height, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(SKY.clone(), 0.0035);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.5;
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1400, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    vertexShader: 'varying vec3 p; void main(){ p=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: 'varying vec3 p; void main(){ float h=normalize(p).y; vec3 c=mix(vec3(.95,.42,.34),vec3(.26,.2,.58),smoothstep(.0,.16,h)); c=mix(c,vec3(.06,.1,.3),smoothstep(.12,.5,h)); gl_FragColor=vec4(c,1.); }',
  }));
  scene.add(sky);
  scene.add(new THREE.HemisphereLight('#8fa6ff', '#ff9e7a', 1.25));
  const moon = new THREE.DirectionalLight('#ffd9c2', 1.1); moon.position.set(-60, 120, 40); scene.add(moon);

  const road = new Reflector(ribbon(0, LENGTH, -ROAD / 2, ROAD / 2, 0, 2, true), { shader: roadShader, textureWidth: 1024, textureHeight: 576, clipBias: 0.002, multisample: 2 });
  road.rotation.x = -Math.PI / 2;
  road.material.uniforms.tMarks.value = markings();
  road.material.side = THREE.DoubleSide;
  scene.add(road);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshStandardMaterial({ color: '#191c2c', roughness: 0.9 }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -0.3; scene.add(ground);
  buildStreet(scene);

  // The line the app draws, laid onto the real road.
  const routeLine = new THREE.Mesh(ribbon(BUS_START - 8, LENGTH - 30, LANE_IN + 1.1, LANE_IN - 1.1, 0.14), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uReach: { value: 0 }, uShow: { value: 1 } },
    vertexShader: 'varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: 'varying vec2 v; uniform float uReach,uShow; void main(){ float s=v.y*12.; float edge=1.-abs(v.x-.5)*2.; float a=smoothstep(0.,.35,edge)*step(s,uReach)*uShow; gl_FragColor=vec4(vec3(3.2,.28,.22)*a,a); }',
  }));
  scene.add(routeLine);

  const bus = buildBus(); scene.add(bus.group);
  const traffic = [
    { ...buildCar('#d9141e'), lane: LANE_IN, pass: 4.7, speed: 8, dir: 1 },
    { ...buildCar('#d9141e'), lane: LANE_OUT, pass: 7.1, speed: 9, dir: 1 },
    { ...buildCar('#1f9d55', true), lane: LANE_IN, pass: 10.6, speed: 8, dir: 1 },
    { ...buildCar('#d9141e'), lane: LANE_OUT, pass: 1.5, speed: 8, dir: 1 },
    { ...buildCar('#e9e9ee', true), lane: -LANE_IN, pass: 2.6, speed: 11, dir: -1 },
    { ...buildCar('#d9141e'), lane: -LANE_OUT, pass: 3.6, speed: 12, dir: -1 },
    { ...buildCar('#1f9d55', true), lane: -LANE_IN, pass: 3.95, speed: 11, dir: -1 },
    { ...buildCar('#d9141e'), lane: -LANE_OUT, pass: 7.8, speed: 12, dir: -1 },
    { ...buildCar('#d9141e'), lane: -LANE_OUT, pass: 8.1, speed: 12, dir: -1 },
    { ...buildCar('#2b6fd6'), lane: -LANE_OUT, pass: 9.4, speed: 11, dir: -1 },
  ];
  for (const car of traffic) scene.add(car.group);

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.3, 3000);
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(width, height, { type: THREE.HalfFloatType, samples: 4 }));
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(width / 2, height / 2), 0.32, 0.6, 0.95);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const pose = (object, s, lane, wheels, roll = 0, turn = 0, facing = 1) => {
    const a = along(s), at = a.point.clone().addScaledVector(a.left, lane);
    object.position.set(at.x, 0, at.z);
    object.rotation.set(0, 0, 0, 'YXZ');
    object.rotation.order = 'YXZ';
    object.rotation.y = Math.atan2(-a.tangent.z * facing, a.tangent.x * facing) + turn;
    object.rotation.x = roll;
    for (const wheel of wheels) wheel.rotation.z = -s * facing / 0.5;
  };
  const busPoint = new THREE.Vector3();
  const target = new THREE.Vector3(), eye = new THREE.Vector3();

  function setCamera(t, a, forward, left) {
    const bus = busPoint;
    const offset = (f, l, y) => bus.clone().addScaledVector(forward, f).addScaledVector(left, l).setY(y);
    let fov = 42;
    if (t < 3) { // Down from the map onto the street.
      const k = smooth(-1.1, 3, t);
      eye.copy(offset(lerp(-6, -21, k), lerp(0, -1.5, k), 260 * (7.2 / 260) ** k));
      target.copy(offset(lerp(10, 22, k), 0, lerp(0, 3.2, k)));
      fov = lerp(30, 46, k);
    } else if (t < 5) { // Riding behind it as it pulls out to overtake.
      const k = (t - 3) / 2;
      eye.copy(offset(-19 + 3 * k, -2.4 + 1.6 * k, 6.4 - 1.5 * k)); target.copy(offset(16, 0, 3));
      fov = 46;
    } else if (t < 7) { // Down by the wheels, the street streaking by.
      const k = (t - 5) / 2;
      eye.copy(offset(lerp(-11, 11, k), -9, 1)); target.copy(offset(lerp(-3, 3, k), 0, 2.2));
      fov = 40;
    } else if (t < 9) { // Waiting ahead, then swept past.
      const k = (t - 7) / 2;
      eye.copy(offset(lerp(34, 7, k * k * (3 - 2 * k)), 4.2, lerp(1.2, 2.2, k))); target.copy(offset(lerp(2, 5, k), 0, 2.1));
      fov = lerp(30, 48, k);
    } else { // Out through the signs and back up to the map.
      const k = smooth(9.1, 12.5, t);
      eye.copy(offset(lerp(-14, -4, k), lerp(4.5, 0, k), 5 * (260 / 5) ** k));
      target.copy(offset(lerp(10, 10, k), 0, lerp(4, 0, k)));
      fov = lerp(44, 30, k);
    }
    camera.position.copy(eye); camera.up.set(0, 1, 0);
    // Straight down has no up: lean on the road's direction there.
    if (eye.y > 60) camera.up.lerp(forward, smooth(60, 300, eye.y)).normalize();
    camera.lookAt(target);
    camera.fov = fov; camera.updateProjectionMatrix();
    return eye.y;
  }

  return {
    render(t) {
      const s = busS(t), lane = laneAt(t), dLane = (laneAt(t + 0.04) - laneAt(t - 0.04)) / 0.08;
      const a = along(s), dYaw = Math.atan2(dLane, BUS_SPEED), accel = (laneAt(t + 0.1) - 2 * lane + laneAt(t - 0.1)) / 0.01;
      pose(bus.group, s, lane, bus.wheels, accel * 0.0028, dYaw);
      busPoint.copy(bus.group.position);
      for (const car of traffic) {
        const meet = busS(car.pass), carS = meet + car.dir * car.speed * (t - car.pass);
        pose(car.group, carS, car.lane, car.wheels, 0, 0, car.dir);
      }
      const height = setCamera(t, a, a.tangent, a.left);
      const high = smooth(25, 170, height);
      routeLine.material.uniforms.uReach.value = lerp(BUS_START, LENGTH, smooth(-1.4, 0.6, t) * 0.8 + smooth(9.6, 11.5, t) * 0.2);
      routeLine.material.uniforms.uShow.value = 0.22 + 0.78 * high;
      const density = lerp(0.0042, 0.0012, high);
      scene.fog.density = density; road.material.uniforms.uFogDensity.value = density;
      composer.render();
      return height;
    },
    /** Where the bus's roof is on screen, for the label that rides above it. */
    label(t) {
      const point = busPoint.clone().setY(5.4).project(camera);
      return { x: (point.x + 1) / 2, y: (1 - point.y) / 2, isFront: point.z < 1 };
    },
    ready: Promise.resolve(),
  };
}

/** The red double-decker on its own, for other films to drive. */
export function makeBus(sign) { busSign = sign; return buildBus(); }
export function makeCar(color, isVan) { return buildCar(color, isVan); }
