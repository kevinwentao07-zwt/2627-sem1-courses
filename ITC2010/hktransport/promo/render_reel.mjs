// The short films: FILM=reel (9:16, default) or FILM=wide (16:9). TIMES=1,2 writes stills to shots/<film>/; otherwise draws the whole film into ffmpeg.
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { launch } from './cdp.mjs';
import { serve } from './serve.mjs';
const FILM = process.env.FILM ?? 'reel', F = { reel: { page: 'reel.html', w: 1080, h: 1920, length: 22.5, music: 'reel_music.wav', port: 8793 }, wide: { page: 'wide.html', w: 1920, h: 1080, length: 25.5, music: 'wide_music.wav', port: 8794 } }[FILM];
const FPS = Number(process.env.FPS ?? 60), LENGTH = F.length, LANG = process.env.LANG_CODE ?? 'hans', OUT = process.env.OUT ?? `hktransport_${FILM}_${LANG}.mp4`;
const server = await serve(F.port), { send, run, close } = await launch(F.port + 544);
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: F.w, height: F.h, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: `http://127.0.0.1:${F.port}/${F.page}?lang=${LANG}` });
await run(`(async()=>{const t=performance.now();while(performance.now()-t<600000&&!window.ready&&!window.failed)await new Promise(r=>setTimeout(r,200))})()`);
if (!await run('!!window.ready')) { console.log(await run('String(window.failed)')); throw new Error('page not ready'); }
const frame = async (t, quality) => { await run(`renderAt(${t}); new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))`); return Buffer.from((await send('Page.captureScreenshot', { format: 'jpeg', quality })).data, 'base64'); };
if (process.env.TIMES) {
  mkdirSync(`shots/${FILM}`, { recursive: true });
  if (process.env.SUB) await run(`setSub(${process.env.SUB})`);
  for (const t of process.env.TIMES.split(',').map(Number)) { const at = Date.now(); writeFileSync(`shots/${FILM}/${LANG}_${t}.jpg`, await frame(t, 80)); console.log('still', t, Date.now() - at, 'ms'); }
} else {
  const ffmpeg = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', F.music, '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '256k', '-shortest', '-movflags', '+faststart', OUT], { stdio: ['pipe', 'inherit', 'inherit'] });
  console.log('page ready');
  const started = Date.now(), total = Math.round(FPS * LENGTH);
  let watchdog;
  for (let n = 0; n < total; n++) {
    clearTimeout(watchdog); watchdog = setTimeout(() => { console.log('stalled at', n); ffmpeg.kill(); close(); process.exit(3); }, 240000);
    const data = await frame(n / FPS, 95);
    if (!ffmpeg.stdin.write(data)) await new Promise((r) => ffmpeg.stdin.once('drain', r));
    if (n % 120 === 0) console.log(n, '/', total, Math.round((Date.now() - started) / 1000), 's');
  }
  clearTimeout(watchdog);
  ffmpeg.stdin.end();
  await new Promise((r) => ffmpeg.on('close', r));
}
close(); server.close();
