// TIMES=1,2 writes stills; otherwise draws the whole film, frame by frame, into ffmpeg.
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { launch } from './cdp.mjs';
import { serve } from './serve.mjs';
const FPS = 60, LENGTH = 44, LANG = process.env.LANG_CODE ?? 'hans', OUT = process.env.OUT ?? `hktransport_promo_${LANG}.mp4`;
const server = await serve(8792), { send, run, close } = await launch(9336);
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: `http://127.0.0.1:8792/index.html?lang=${LANG}` });
await run(`(async()=>{const t=performance.now();while(performance.now()-t<60000&&!window.ready)await new Promise(r=>setTimeout(r,200))})()`);
if (!await run('!!window.ready')) throw new Error('page not ready');
const frame = async (t, quality) => { await run(`renderAt(${t}); new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))`); return Buffer.from((await send('Page.captureScreenshot', { format: 'jpeg', quality })).data, 'base64'); };
if (process.env.TIMES) {
  await run('setSub(1)');
  for (const t of process.env.TIMES.split(',').map(Number)) writeFileSync(`shots/f_${t}.jpg`, await frame(t, 80));
} else {
  const ffmpeg = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', 'music.wav', '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '256k', '-shortest', '-movflags', '+faststart', OUT], { stdio: ['pipe', 'inherit', 'inherit'] });
  const started = Date.now(), total = FPS * LENGTH;
  let watchdog;
  for (let n = 0; n < total; n++) {
    clearTimeout(watchdog); watchdog = setTimeout(() => { console.log('stalled at', n); ffmpeg.kill(); close(); process.exit(3); }, 60000);
    const data = await frame(n / FPS, 96);
    if (!ffmpeg.stdin.write(data)) await new Promise((r) => ffmpeg.stdin.once('drain', r));
    if (n % 300 === 0) console.log(n, '/', total, Math.round((Date.now() - started) / 1000), 's');
  }
  clearTimeout(watchdog);
  ffmpeg.stdin.end();
  await new Promise((r) => ffmpeg.on('close', r));
}
close(); server.close();
