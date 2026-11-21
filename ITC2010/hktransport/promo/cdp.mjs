// Drives a headless Chrome over its debugging port, with nothing to install.
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
export async function launch(port, extra = []) {
  const profile = mkdtempSync(join(tmpdir(), 'promo-chrome-'));
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check',
    '--use-angle=metal', '--enable-gpu-rasterization', '--ignore-gpu-blocklist', '--hide-scrollbars', '--mute-audio', '--autoplay-policy=no-user-gesture-required', ...extra, 'about:blank'], { stdio: 'ignore' });
  let target;
  for (let i = 0; i < 100 && !target; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch {}
  }
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => { socket.onopen = r; });
  let id = 0; const waiting = new Map();
  socket.onmessage = ({ data }) => { const m = JSON.parse(data); if (m.id && waiting.has(m.id)) { const { ok, no } = waiting.get(m.id); waiting.delete(m.id); m.error ? no(new Error(m.error.message)) : ok(m.result); } };
  const send = (method, params = {}) => new Promise((ok, no) => { waiting.set(++id, { ok, no }); socket.send(JSON.stringify({ id, method, params })); });
  const run = async (expression) => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text); return r.result.value; };
  return { send, run, close: () => { socket.close(); chrome.kill(); } };
}
