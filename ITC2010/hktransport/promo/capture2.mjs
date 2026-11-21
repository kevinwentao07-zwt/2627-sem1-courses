// The shots still missing: the loop with its map loaded, and the shop cards alone.
import { writeFileSync } from 'node:fs';
import { launch } from './cdp.mjs';
const SITE = 'https://hk.52-220-124-215.sslip.io/', sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { send, run, close } = await launch(9334);
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 3, mobile: true });
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });
await send('Browser.grantPermissions', { origin: SITE.slice(0, -1), permissions: ['geolocation'] });
await send('Emulation.setGeolocationOverride', { latitude: 22.3020, longitude: 114.1720, accuracy: 15 });
const ready = `(async()=>{const t=performance.now();while(performance.now()-t<25000&&!(document.querySelector('#chat-input')&&document.querySelector('.gm-style')))await new Promise(r=>setTimeout(r,300))})()`;
await send('Page.navigate', { url: SITE }); await sleep(1500);
await run(`localStorage.setItem('hkt.script', JSON.stringify('hans'))`);
await send('Page.navigate', { url: SITE }); await run(ready); await sleep(7000);
await run(`[...document.querySelectorAll('button')].find(b=>/路线/.test(b.innerText)&&b.innerText.length<8).click()`); await sleep(900);
await run(`(()=>{const b=[...document.querySelectorAll('#panel input')].find(i=>i.offsetParent&&i.id!=='chat-input');b.value='74K';b.dispatchEvent(new Event('input',{bubbles:true}))})()`); await sleep(1000);
await run(`[...document.querySelectorAll('#sheet button.tap')].find(b=>/74K/.test(b.innerText)).click()`);
await sleep(16000);
writeFileSync('shots/07_loop.png', Buffer.from((await send('Page.captureScreenshot', { format: 'png' })).data, 'base64'));
await send('Page.navigate', { url: SITE }); await run(ready); await sleep(6000);
await run(`(()=>{const i=document.querySelector('#chat-input');i.focus();i.value='去吃茶餐厅';i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));i.blur()})()`);
await sleep(14000);
for (let k = 0; k < 3; k++) {
  const box = await run(`(()=>{const c=[...document.querySelectorAll('#sheet .card')].filter(c=>/评分|★/.test(c.innerText))[${k}];c.scrollIntoView({block:'start'});const r=c.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,top:document.getElementById('panel').getBoundingClientRect().y}})()`);
  await sleep(500);
  const r = await run(`(()=>{const c=[...document.querySelectorAll('#sheet .card')].filter(c=>/评分|★/.test(c.innerText))[${k}];const r=c.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}})()`);
  writeFileSync(`shots/card${k}.png`, Buffer.from((await send('Page.captureScreenshot', { format: 'png', clip: { ...r, scale: 3 } })).data, 'base64'));
  console.log(k, JSON.stringify(r));
}
close();
