import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
export const serve = (port) => new Promise((ok) => { const s = createServer(async (q, r) => { try { const p = join(process.cwd(), decodeURI(q.url.split('?')[0])); const body = await readFile(p); r.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' }); r.end(body); } catch { r.writeHead(404); r.end(); } }); s.listen(port, '127.0.0.1', () => ok(s)); });
