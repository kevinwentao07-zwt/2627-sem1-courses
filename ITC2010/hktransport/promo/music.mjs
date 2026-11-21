// An original, upbeat 120 BPM backing track, synthesised so nothing needs licensing.
import { writeFileSync } from 'node:fs';
const RATE = 44100, LENGTH = 44.5, N = Math.floor(RATE * LENGTH), BEAT = 0.5, BAR = 2;
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

const HARMONY = [[48, [60, 64, 67, 72]], [43, [59, 62, 67, 71]], [45, [60, 64, 69, 72]], [41, [60, 65, 69, 72]]]; // C G Am F
const HOOK = [[0, 76], [0.5, 79], [1, 84], [1.5, 83], [2.5, 79], [3, 81], [3.5, 79]];
const HOOK2 = [[0, 72], [0.5, 76], [1, 79], [2, 77], [2.5, 76], [3, 74], [3.5, 72]];
const ARP = [0, 2, 1, 3, 2, 1, 3, 2];
for (let bar = 0; bar < 20; bar++) {
  const t = bar * BAR, [root, notes] = HARMONY[bar % 4], drop = t >= 18 && t < 30, late = t >= 35, hasBeat = t >= 4 && t < 39, intro = t < 4;
  for (let b = 0; b < 4; b++) {
    const at = t + b * BEAT;
    if (hasBeat) kick(at);
    if (intro) { if (b === 0 || b === 2) clap(at, 0.16); pluck(at, notes[b] + 12, 0.1, b % 2 ? 0.3 : -0.3); }
    if (hasBeat && (b === 1 || b === 3)) clap(at, 0.3);
    if (hasBeat) { hat(at + 0.25, 0.13); hat(at + 0.125, 0.05, -0.2); hat(at + 0.375, 0.05, -0.2); }
    if (hasBeat) { bass(at + 0.25, root, 0.2); bass(at, root, 0.1, 0.16); if (b === 3) bass(at + 0.375, root + 12, 0.1, 0.2); }
  }
  if (hasBeat) ARP.forEach((n, k) => { for (const o of [0, 1]) if (o === 0 || k % 2) pluck(t + k * 0.25 + o * 0.125, notes[n] + 12, drop || late ? 0.1 : 0.085, k % 2 ? 0.45 : -0.45); });
  if (drop || late) chord(t, notes, 1.95, 0.045);
  if (t >= 8 && t < 18) chord(t, notes, 1.9, 0.02);
}
for (let phrase = 4; phrase < 39; phrase += 4) { const hook = phrase >= 18 && phrase < 30 || phrase >= 34 ? HOOK : (phrase / 4) % 2 ? HOOK2 : HOOK; for (const [d, m] of hook) pluck(phrase + d, m + (phrase >= 18 && phrase < 30 ? 12 : 0), 0.15, 0, 0.55); }
for (const d of [0, 0.5, 1, 2]) pluck(39 + d, [84, 88, 91, 96][[0, 0.5, 1, 2].indexOf(d)], 0.2, 0, 0.8);
chord(39, [48, 60, 64, 67, 72, 79], 4.6, 0.05, 0.8); bass(39, 36, 2.2, 0.32); impact(39, 0.45);
// Moments in the picture.
for (const at of [1, 2, 3]) kick(at, 0.55);
impact(4, 0.35); whoosh(3.2, 0.85); whoosh(5.6, 0.5, 0.08); whoosh(13.6, 0.45, 0.08); whoosh(15.6, 0.45, 0.08); whoosh(16.9, 1.9, 0.2); impact(18.5, 0.75); whoosh(29.1, 1.7, 0.16, false); whoosh(32.6, 0.45, 0.08); whoosh(34.5, 0.55, 0.12); impact(35, 0.4); whoosh(38.2, 0.85, 0.14);
function pop(t, v = 0.2, base = 520) { const s = Math.floor(t * RATE), n = RATE * 0.11; let ph = 0; for (let i = 0; i < n; i++) { const x = i / RATE; ph += (2 * Math.PI * (base + 900 * (x / 0.11))) / RATE; put(s + i, Math.sin(ph) * Math.exp(-x * 34) * v, 0.15, 0.35); } }
[4.5, 4.75, 6.25, 6.75, 6.875, 7, 7.125, 12, 12.5, 13, 14.25, 14.5, 14.75, 31.25, 31.5, 33.9, 34.3, 34.5, 35, 35.5, 36, 36.5, 37, 37.5].forEach((at, k) => pop(at, 0.2, 480 + (k % 4) * 90));
for (const at of [21.1, 25.1]) whoosh(at, 0.7, 0.09, false);
for (let k = 0; k < 5; k++) tick(8.3 + k * 0.125);
for (const at of [9.5, 10, 10.5]) pop(at, 0.22, 620);

// A small hall: a few comb delays over what was sent.
for (const [source, target, offset] of [[sendL, L, 0], [sendR, R, 113]]) for (const [ms, gain] of [[97, 0.5], [163, 0.42], [241, 0.34], [353, 0.26], [487, 0.18]]) {
  const delay = Math.floor((ms * RATE) / 1000) + offset, line = new Float32Array(N);
  for (let i = delay; i < N; i++) line[i] = source[i - delay] + line[i - delay] * 0.42;
  for (let i = 0; i < N; i++) target[i] += line[i] * gain * 0.5;
}
const fade = (i) => { const t = i / RATE; return Math.min(1, t / 0.02) * Math.min(1, Math.max(0, (LENGTH - 0.15 - t) / 1.5)); };
const out = Buffer.alloc(44 + N * 4);
out.write('RIFF', 0); out.writeUInt32LE(36 + N * 4, 4); out.write('WAVEfmt ', 8); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(2, 22); out.writeUInt32LE(RATE, 24); out.writeUInt32LE(RATE * 4, 28); out.writeUInt16LE(4, 32); out.writeUInt16LE(16, 34); out.write('data', 36); out.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) for (const [k, c] of [[0, L], [1, R]]) out.writeInt16LE(Math.round(Math.tanh(c[i] * 0.85) * fade(i) * 30000), 44 + i * 4 + k * 2);
writeFileSync('music.wav', out);
