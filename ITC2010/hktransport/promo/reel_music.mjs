// The reel's track: same synth voices as music.mjs, cut to the 22.5 s vertical film.
import { writeFileSync } from 'node:fs';
const RATE = 44100, LENGTH = 22.6, N = Math.floor(RATE * LENGTH), BEAT = 0.5, BAR = 2;
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

const HARMONY = [[45, [57, 60, 64, 69]], [41, [57, 60, 65, 69]], [48, [55, 60, 64, 67]], [43, [55, 59, 62, 67]]]; // Am F C G
const HOOK = [[0, 76], [0.5, 79], [1, 81], [1.5, 79], [2.5, 76], [3, 74], [3.5, 72]];
const ARP = [0, 2, 1, 3, 2, 1, 3, 2];
for (let bar = 0; bar < 10; bar++) {
  const t = bar * BAR, [root, notes] = HARMONY[bar % 4];
  const intro = t < 2, chat = (t >= 2 && t < 7) || (t >= 14 && t < 18), drive = t >= 7 && t < 14, end = t >= 18;
  for (let b = 0; b < 4; b++) {
    const at = t + b * BEAT;
    if (intro) pluck(at, notes[b] + 12, 0.08, b % 2 ? 0.3 : -0.3, 0.6);
    if (chat || drive) { kick(at, chat ? 0.55 : 0.9); hat(at + 0.25, chat ? 0.08 : 0.13); }
    if (drive && (b === 1 || b === 3)) clap(at, 0.3);
    if (drive) { hat(at + 0.125, 0.05, -0.2); hat(at + 0.375, 0.05, -0.2); bass(at + 0.25, root, 0.2); bass(at, root, 0.1, 0.16); }
    if (chat) bass(at, root, 0.4, 0.12);
  }
  if (chat || drive) ARP.forEach((n, k) => pluck(t + k * 0.25, notes[n] + 12, drive ? 0.085 : 0.06, k % 2 ? 0.45 : -0.45));
  if (chat) chord(t, notes, 1.9, 0.025);
  if (drive) chord(t, notes, 1.95, 0.04);
}
for (const at of [7.4, 11.4]) for (const [d, m] of HOOK) pluck(at + d, m + 12, 0.14, 0, 0.55);
// The end: one chord, the name, and air.
chord(18.75, [45, 57, 60, 64, 69, 76], 3.8, 0.05, 0.8); bass(18.75, 33, 2.2, 0.3); impact(18.75, 0.45);
for (const [d, m] of [[0, 81], [0.5, 84], [1, 88], [2, 93]]) pluck(19.15 + d, m, 0.18, 0, 0.8);

// Moments in the picture.
pop(0.2, 0.22, 600);                                   // The icon lands.
whoosh(1.45, 1.3, 0.2); impact(2.75, 0.55);            // Down through it into the map.
const typing = (from, to, chars) => { for (let k = 0; k < chars; k++) tick(from + (k / chars) * (to - from)); };
typing(3.05, 3.85, 13); pop(3.95, 0.2, 520);           // Asking.
for (const at of [4.2, 4.35, 4.5]) tick(at);
chime(4.62);                                           // The answer, and the route drawing itself.
for (let k = 0; k < 8; k++) pluck(4.7 + k * 0.17, [69, 72, 76, 79, 81, 84, 88, 91][k], 0.07, k % 2 ? 0.4 : -0.4, 0.6);
for (const at of [5.0, 5.3, 5.75]) pop(at, 0.14, 700);
whoosh(6.55, 0.85, 0.2); impact(7.15, 0.4);            // Down to the bus.
whoosh(10.45, 0.75, 0.16);                             // Round to the front.
whoosh(13.85, 0.75, 0.16, false);                      // Back up.
typing(14.8, 15.5, 8); pop(15.6, 0.2, 520);
for (const at of [15.85, 16.0, 16.15]) tick(at);
chime(16.25, 81); pop(16.4, 0.22, 640);
whoosh(17.85, 0.85, 0.2);                              // Up and out.

for (const [source, target, offset] of [[sendL, L, 0], [sendR, R, 113]]) for (const [ms, gain] of [[97, 0.5], [163, 0.42], [241, 0.34], [353, 0.26], [487, 0.18]]) {
  const delay = Math.floor((ms * RATE) / 1000) + offset, line = new Float32Array(N);
  for (let i = delay; i < N; i++) line[i] = source[i - delay] + line[i - delay] * 0.42;
  for (let i = 0; i < N; i++) target[i] += line[i] * gain * 0.5;
}
const fade = (i) => { const t = i / RATE; return Math.min(1, t / 0.02) * Math.min(1, Math.max(0, (LENGTH - 0.1 - t) / 1.6)); };
const out = Buffer.alloc(44 + N * 4);
out.write('RIFF', 0); out.writeUInt32LE(36 + N * 4, 4); out.write('WAVEfmt ', 8); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(2, 22); out.writeUInt32LE(RATE, 24); out.writeUInt32LE(RATE * 4, 28); out.writeUInt16LE(4, 32); out.writeUInt16LE(16, 34); out.write('data', 36); out.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) for (const [k, c] of [[0, L], [1, R]]) out.writeInt16LE(Math.round(Math.tanh(c[i] * 0.85) * fade(i) * 30000), 44 + i * 4 + k * 2);
writeFileSync('reel_music.wav', out);
