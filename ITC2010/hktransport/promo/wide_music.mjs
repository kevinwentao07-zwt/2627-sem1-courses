// The 16:9 film's track: same synth voices as music.mjs, built around the dive's speed changes.
import { writeFileSync } from 'node:fs';
const RATE = 44100, LENGTH = 25.6, N = Math.floor(RATE * LENGTH), BEAT = 0.5, BAR = 2;
const L = new Float32Array(N), R = new Float32Array(N), sendL = new Float32Array(N), sendR = new Float32Array(N);
let seed = 7; const noise = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2147483648 - 1; };
const put = (i, v, pan = 0, send = 0) => { if (i < 0 || i >= N) return; const l = v * (1 - Math.max(0, pan)), r = v * (1 + Math.min(0, pan)); L[i] += l; R[i] += r; sendL[i] += l * send; sendR[i] += r * send; };
const hz = (m) => 440 * 2 ** ((m - 69) / 12);
function kick(t, v = 0.9) { const s = Math.floor(t * RATE), n = RATE * 0.28; let ph = 0; for (let i = 0; i < n; i++) { const x = i / RATE; ph += (2 * Math.PI * (48 + 120 * Math.exp(-x * 34))) / RATE; put(s + i, Math.sin(ph) * Math.exp(-x * 12) * v); } }
function clap(t, v = 0.3) { const s = Math.floor(t * RATE), n = RATE * 0.16; let lp = 0; for (let i = 0; i < n; i++) { const x = i / RATE, e = Math.exp(-x * 26) + (x < 0.02 ? 0.6 : 0); const w = noise(); const hp = w - lp; lp += 0.25 * (w - lp); put(s + i, hp * e * v, 0, 0.3); } }
function hat(t, v = 0.11, pan = 0.2) { const s = Math.floor(t * RATE), n = RATE * 0.05; let lp = 0; for (let i = 0; i < n; i++) { const w = noise(), hp = w - lp; lp += 0.5 * (w - lp); put(s + i, hp * Math.exp(-(i / RATE) * 90) * v, pan); } }
function bass(t, m, d, v = 0.3) { const s = Math.floor(t * RATE), n = Math.floor(RATE * d), f = hz(m); for (let i = 0; i < n; i++) { const x = i / RATE, e = Math.min(1, x * 200) * Math.min(1, (d - x) * 40); const ph = 2 * Math.PI * f * x; put(s + i, (Math.sin(ph) + 0.35 * Math.sin(2 * ph + Math.sin(ph))) * e * v); } }
function pluck(t, m, v = 0.16, pan = 0, send = 0.45) { const s = Math.floor(t * RATE), n = RATE * 0.5, f = hz(m); for (let i = 0; i < n; i++) { const x = i / RATE, e = Math.exp(-x * 8.5) * Math.min(1, x * 900); const ph = 2 * Math.PI * f * x; put(s + i, Math.sin(ph + 1.7 * Math.exp(-x * 14) * Math.sin(ph * 2)) * e * v, pan, send); } }
function chord(t, notes, d, v = 0.05, send = 0.5) { const s = Math.floor(t * RATE), n = Math.floor(RATE * d); notes.forEach((m, k) => { for (const det of [-0.004, 0.004]) { const f = hz(m) * (1 + det); for (let i = 0; i < n; i++) { const x = i / RATE, e = Math.min(1, x * 30) * Math.min(1, (d - x) * 14); const ph = (f * x) % 1; put(s + i, (2 * ph - 1) * 0.55 * e * v, det > 0 ? 0.45 : -0.45, send); } } }); }
function whoosh(t, d = 0.9, v = 0.16, up = true) { const n = Math.floor(RATE * d), s = Math.floor(t * RATE); let lp = 0; for (let i = 0; i < n; i++) { const k = i / n, c = up ? k : 1 - k; lp += (0.02 + 0.5 * c * c) * (noise() - lp); put(s + i, lp * Math.sin(Math.PI * k) ** 2 * v * 3, Math.sin(k * 6) * 0.5, 0.4); } }
function impact(t, v = 0.7) { kick(t, 1); const s = Math.floor(t * RATE), n = RATE * 1.1; for (let i = 0; i < n; i++) { const x = i / RATE; put(s + i, Math.sin(2 * Math.PI * 41 * x) * Math.exp(-x * 3.6) * v); } }
const tick = (t) => pluck(t, 96, 0.05, 0.3, 0.1);

function pop(t, v = 0.2, base = 520) { const s = Math.floor(t * RATE), n = RATE * 0.11; let ph = 0; for (let i = 0; i < n; i++) { const x = i / RATE; ph += (2 * Math.PI * (base + 900 * (x / 0.11))) / RATE; put(s + i, Math.sin(ph) * Math.exp(-x * 34) * v, 0.15, 0.35); } }
const chime = (t, base = 84) => [0, 4, 7, 12].forEach((d, k) => pluck(t + k * 0.06, base + d, 0.12, k % 2 ? 0.3 : -0.3, 0.7));
function sub(t, m, d, v = 0.3) { const s = Math.floor(t * RATE), n = Math.floor(RATE * d), f = hz(m); for (let i = 0; i < n; i++) { const x = i / RATE, e = Math.min(1, x * 8) * Math.min(1, (d - x) * 3); put(s + i, Math.sin(2 * Math.PI * f * x) * e * v); } }
function wind(t, d, v = 0.05) { const s = Math.floor(t * RATE), n = Math.floor(RATE * d); let lp = 0; for (let i = 0; i < n; i++) { const k = i / n; lp += 0.03 * (noise() - lp); put(s + i, lp * Math.sin(Math.PI * k) * v * 6, Math.sin(k * 4) * 0.6, 0.6); } }

const HARMONY = [[45, [57, 60, 64, 69]], [41, [57, 60, 65, 69]], [48, [55, 60, 64, 67]], [43, [55, 59, 62, 67]]]; // Am F C G
const HOOK = [[0, 76], [0.5, 79], [1, 81], [1.5, 79], [2.5, 76], [3, 74], [3.5, 72]];
const ARP = [0, 2, 1, 3, 2, 1, 3, 2];
const at = (t) => HARMONY[Math.floor(t / BAR) % 4];
const groove = (from, to, { kicks = 0.9, claps = 0.3, hats = 0.12, bassV = 0.2, arp = 0.085, pads = 0.04 } = {}) => {
  for (let t = from; t < to - 0.01; t += BEAT) {
    const [root, notes] = at(t), b = Math.round((t % BAR) / BEAT);
    if (kicks) kick(t, kicks);
    if (claps && (b === 1 || b === 3)) clap(t, claps);
    if (hats) { hat(t + 0.25, hats); hat(t + 0.125, hats * 0.4, -0.2); hat(t + 0.375, hats * 0.4, -0.2); }
    if (bassV) { bass(t + 0.25, root, 0.2, bassV); bass(t, root, 0.1, bassV * 0.8); }
    if (arp) for (const o of [0, 0.25]) pluck(t + o, notes[ARP[(b * 2 + o * 4) % 8]] + 12, arp, o ? 0.45 : -0.45);
    if (pads && b === 0) chord(t, notes, Math.min(BAR, to - t) - 0.05, pads);
  }
};

// The icon.
for (let k = 0; k < 4; k++) pluck(k * 0.35, [69, 72, 76, 81][k], 0.07, k % 2 ? 0.3 : -0.3, 0.6);
pop(0.2, 0.22, 600); kick(1.0, 0.45);
// Falling: faster and faster through the icon, a rush through the cloud, then the floor drops out.
for (const t of [1.4, 1.6, 1.75, 1.85, 1.92, 1.97]) pluck(t, 88, 0.06, 0.2, 0.3);
whoosh(1.35, 0.7, 0.14); whoosh(1.95, 0.6, 0.24); wind(1.9, 0.7, 0.07);
impact(2.5, 0.6); sub(2.5, 33, 1.1, 0.28);
// The hang over the harbour: half time, air, a bell or two.
chord(2.5, [45, 57, 64, 69, 72, 76], 1.1, 0.045, 0.85); wind(2.5, 1.1, 0.035);
for (const [d, m] of [[0.1, 88], [0.45, 84], [0.8, 91]]) pluck(2.5 + d, m, 0.09, d > 0.4 ? 0.4 : -0.4, 0.9);
// The swoop: a roll that tightens into the hit.
for (let k = 0; k < 12; k++) clap(3.5 + k * 0.042, 0.06 + k * 0.012);
whoosh(3.45, 0.6, 0.22, false); impact(4.0, 0.5);
// Between the towers: the groove arrives, filtered and quick.
groove(4.0, 5.0, { kicks: 0.7, claps: 0.18, hats: 0.12, bassV: 0.14, arp: 0.075, pads: 0 });
whoosh(4.95, 0.65, 0.18); impact(5.6, 0.3);
// First question.
groove(5.6, 10.0, { kicks: 0.5, claps: 0, hats: 0.07, bassV: 0.1, arp: 0.055, pads: 0.022 });
const typing = (from, to, chars) => { for (let k = 0; k < chars; k++) tick(from + (k / chars) * (to - from)); };
typing(5.9, 6.7, 13); pop(6.8, 0.2, 520);
for (const t of [7.05, 7.2, 7.35]) tick(t);
chime(7.45);
for (let k = 0; k < 9; k++) pluck(7.5 + k * 0.16, [69, 72, 76, 79, 81, 84, 88, 91, 93][k], 0.07, k % 2 ? 0.4 : -0.4, 0.6);
pop(8.0, 0.16, 680); pop(8.6, 0.16, 760);
// Down to the bus, a held breath in slow motion, then everything at once.
whoosh(9.95, 0.7, 0.22); impact(10.6, 0.55); sub(10.6, 33, 0.5, 0.25); wind(10.6, 0.45, 0.05);
groove(11.0, 17.2, {});
for (const t of [11.0, 13.0, 15.0]) for (const [d, m] of HOOK) if (t + d < 17.1) pluck(t + d, m + 12, 0.13, 0, 0.55);
whoosh(13.7, 0.65, 0.16); kick(14.3, 0.9); pop(14.35, 0.14, 820);
whoosh(17.1, 0.65, 0.18, false);
// Second question.
groove(17.6, 21.2, { kicks: 0.5, claps: 0, hats: 0.07, bassV: 0.1, arp: 0.055, pads: 0.022 });
typing(18.0, 18.7, 8); pop(18.8, 0.2, 520);
for (const t of [19.05, 19.2, 19.35]) tick(t);
chime(19.45, 81); pop(19.6, 0.22, 640);
// Up through the sky and out.
whoosh(21.15, 0.75, 0.22); wind(21.2, 0.6, 0.06);
chord(21.86, [45, 57, 60, 64, 69, 76], 3.6, 0.05, 0.8); bass(21.86, 33, 2.2, 0.3); impact(21.86, 0.45);
for (const [d, m] of [[0.5, 81], [1.0, 84], [1.5, 88], [2.5, 93]]) pluck(21.86 + d, m, 0.17, 0, 0.8);

for (const [source, target, offset] of [[sendL, L, 0], [sendR, R, 113]]) for (const [ms, gain] of [[97, 0.5], [163, 0.42], [241, 0.34], [353, 0.26], [487, 0.18]]) {
  const delay = Math.floor((ms * RATE) / 1000) + offset, line = new Float32Array(N);
  for (let i = delay; i < N; i++) line[i] = source[i - delay] + line[i - delay] * 0.42;
  for (let i = 0; i < N; i++) target[i] += line[i] * gain * 0.5;
}
const fade = (i) => { const t = i / RATE; return Math.min(1, t / 0.02) * Math.min(1, Math.max(0, (LENGTH - 0.1 - t) / 1.8)); };
const out = Buffer.alloc(44 + N * 4);
out.write('RIFF', 0); out.writeUInt32LE(36 + N * 4, 4); out.write('WAVEfmt ', 8); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(2, 22); out.writeUInt32LE(RATE, 24); out.writeUInt32LE(RATE * 4, 28); out.writeUInt16LE(4, 32); out.writeUInt16LE(16, 34); out.write('data', 36); out.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) for (const [k, c] of [[0, L], [1, R]]) out.writeInt16LE(Math.round(Math.tanh(c[i] * 0.85) * fade(i) * 30000), 44 + i * 4 + k * 2);
writeFileSync('wide_music.wav', out);
