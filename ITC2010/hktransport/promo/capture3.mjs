// One visit per language, so the shared Google map allowance is barely touched.
import { writeFileSync } from 'node:fs';
import { launch } from './cdp.mjs';
const SITE = 'https://hk.52-220-124-215.sslip.io/', sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const WORDS = {
  hant: { lang: 'zh', script: 'hant', food: '去吃茶餐廳', trip: '由竹園邨去尖沙咀碼頭', place: '尖沙咀' },
  en: { lang: 'en', script: 'hant', food: 'Find a cha chaan teng nearby', trip: 'From Chuk Yuen Estate to Tsim Sha Tsui Ferry Pier', place: 'Tsim Sha Tsui' },
};
const key = process.argv[2], w = WORDS[key], dir = `shots/${key}`;
const { send, run, close } = await launch(9337);
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 3, mobile: true });
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });
await send('Browser.grantPermissions', { origin: SITE.slice(0, -1), permissions: ['geolocation'] });
await send('Emulation.setGeolocationOverride', { latitude: 22.3020, longitude: 114.1720, accuracy: 15 });
const shot = async (name, clip) => { writeFileSync(`${dir}/${name}.png`, Buffer.from((await send('Page.captureScreenshot', { format: 'png', ...(clip ? { clip } : {}) })).data, 'base64')); console.log('shot', name); };
const say = (text) => run(`(()=>{const i=document.querySelector('#chat-input');i.focus();i.value=${JSON.stringify(text)};i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));i.blur()})()`);
const closeTrip = () => run(`[...document.querySelectorAll('#panel button.round')].find(b=>/關閉|关闭|close/i.test(b.getAttribute('aria-label')||'')).click()`);
await send('Page.navigate', { url: `${SITE}manifest.webmanifest` }); await sleep(1200);
await run(`localStorage.setItem('hkt.lang',${JSON.stringify(JSON.stringify(w.lang))});localStorage.setItem('hkt.script',${JSON.stringify(JSON.stringify(w.script))})`);
await send('Page.navigate', { url: SITE });
await run(`(async()=>{const t=performance.now();while(performance.now()-t<25000&&!(document.querySelector('#chat-input')&&document.querySelector('.gm-style')))await new Promise(r=>setTimeout(r,300))})()`);
await sleep(4000);
await sleep(6000);
await say(w.trip); await sleep(10000); await shot('04_plan');
await run(`[...document.querySelectorAll('#sheet .card')].find(c=>/直达|直達|Direct/i.test(c.innerText.slice(0,70))).querySelector('.tap').click()`);
await sleep(9000); await shot('05_route');
await run(`(()=>{const a=[...document.querySelectorAll('#map .leaflet-tooltip')];console.log(a.length);const paths=[...document.querySelectorAll('#map path.leaflet-interactive')].filter(p=>p.getAttribute('fill')==='#fff'||p.getAttribute('fill')==='#ffffff');const s=paths[Math.floor(paths.length*.6)];const r=s.getBoundingClientRect();for(const type of ['mousedown','mouseup','click'])s.dispatchEvent(new MouseEvent(type,{bubbles:true,clientX:r.x+r.width/2,clientY:r.y+r.height/2}))})()`);
await sleep(6000); await shot('06_stop');
await closeTrip(); await sleep(1500);
await run(`[...document.querySelectorAll('button')].find(b=>/^(路線|路线|Routes?)$/i.test(b.innerText.trim())).click()`); await sleep(900);
await run(`(()=>{const b=[...document.querySelectorAll('#panel input')].find(i=>i.offsetParent&&i.id!=='chat-input');b.value='74K';b.dispatchEvent(new Event('input',{bubbles:true}))})()`); await sleep(1000);
await run(`[...document.querySelectorAll('#sheet button.tap')].find(b=>/74K/.test(b.innerText)).click()`);
await sleep(16000); await shot('07_loop');
close();
