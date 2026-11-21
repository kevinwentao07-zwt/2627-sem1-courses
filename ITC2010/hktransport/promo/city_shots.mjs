import { writeFileSync } from 'node:fs';
import { launch } from './cdp.mjs';
import { serve } from './serve.mjs';
const server = await serve(8791), { send, run, close } = await launch(9335);
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: 'http://127.0.0.1:8791/city_test.html' });
await run(`(async()=>{const t=performance.now();while(performance.now()-t<40000&&!window.ok&&!window.err)await new Promise(r=>setTimeout(r,200))})()`);
console.log('err', await run('window.err||null'));
const out = process.env.OUT ?? 'shots/city';
for (const t of (process.env.TIMES ?? '0.4,2,3.6,5.8,8.2,10.6').split(',').map(Number)) {
  const t0 = Date.now();
  await run(`city.render(${t}); new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))`);
  const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
  writeFileSync(`${out}_${t}.jpg`, Buffer.from(data, 'base64')); console.log(t, Date.now() - t0, 'ms');
}
close(); server.close();
