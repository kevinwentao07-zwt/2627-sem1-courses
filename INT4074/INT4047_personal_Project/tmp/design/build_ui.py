import json,re,html,math
from pathlib import Path
root=Path.cwd();out=root/'output/design';out.mkdir(parents=True,exist_ok=True)
cs=json.loads((root/'tmp/design/ui-captures.json').read_text());cs=[c for c in cs if c.get('tree') and '[MaxDepth]' not in json.dumps(c)];cs.sort(key=lambda c:c['name'])
def e(s):return html.escape(str(s),quote=True)
def color(c):
 m=re.match(r'rgba?\(([^)]+)\)',c or '')
 if not m:return c or 'none',1
 a=[float(x.strip()) for x in m[1].split(',')];return '#%02x%02x%02x'%tuple(int(x) for x in a[:3]),a[3] if len(a)>3 else 1
serial=0

def draw(n,clip=(0,0,390,844)):
 global serial
 if n.get('tag')=='TEXT':
  t=[]
  for l in n['lines']:
   if l['y']+l['h']<clip[1] or l['y']>clip[3]:continue
   text=l['text'];text=text.replace("')\">Privacy & data →",'Privacy & data →')
   family='Noto Sans TC' if re.search('[\u3400-\u9fff]',text) else 'SF Pro'
   t.append(f'<text x="{l["x"]:.2f}" y="{l["y"]+l["h"]*.79:.2f}" font-family="{family}" font-size="{n["size"]}" font-weight="{n["weight"]}" fill="{color(n["color"])[0]}" data-name="{e(text.strip())}">{e(text)}</text>')
  return ''.join(t)
 x,y,w,h=[n.get(k,0) for k in ['x','y','w','h']]
 if x+w<clip[0] or x>clip[2] or y+h<clip[1] or y>clip[3]:return ''
 serial+=1;name=e(str(n.get('name','')).strip()[:100]);s=f'<g id="n{serial}" data-name="{name}">'
 if 'svg' in n:
  svg=n['svg'];svg=re.sub(r'<svg[^>]*>',f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="0 0 24 24" fill="none" stroke="{color(n["color"])[0]}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',svg,count=1);return s+svg+'</g>'
 bg,alpha=color(n.get('bg'));alpha=.98 if n.get('tag')=='NAV' else alpha;border,ba=color(n.get('border'));bw=n.get('borderWidth',0)
 if alpha>0 or bw>0:
  s+=f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{min(n.get("radius",0),h/2)}" fill="{bg if alpha else "none"}" fill-opacity="{alpha}" stroke="{border if bw else "none"}" stroke-opacity="{ba}" stroke-width="{bw}"/>'
 if n.get('borderBottomWidth',0) and not bw:s+=f'<path d="M{x},{y+h}h{w}" stroke="{color(n["borderBottom"])[0]}" stroke-opacity="{color(n["borderBottom"])[1]}" stroke-width="{n["borderBottomWidth"]}"/>'
 if n.get('name')=='切換學習提醒':s+=f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h/2}" fill="#3c6352"/><circle cx="{x+w-h/2}" cy="{y+h/2}" r="{h/2-4}" fill="white"/>'
 if 'value' in n:s+=f'<text x="{x+n.get("paddingLeft",0)}" y="{y+h/2+n["size"]*.34}" fill="{color(n["color"])[0]}" font-family="SF Pro" font-size="{n["size"]}">{e(n["value"])}</text>'
 childclip=clip
 clipped=n.get('overflow') in ['auto','hidden','scroll']
 if n.get('overflow') in ['auto','hidden','scroll']:
  cid=f'clip{serial}';s+=f'<defs><clipPath id="{cid}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{n.get("radius",0)}"/></clipPath></defs><g clip-path="url(#{cid})">';childclip=(max(x,clip[0]),max(y,clip[1]),min(x+w,clip[2]),min(y+h,clip[3]))
 for ch in n.get('children',[]):s+=draw(ch,childclip)
 if clipped:s+='</g>'
 return s+'</g>'
parts=[]
for i,c in enumerate(cs):
 content=draw(c['tree']);name=c['name'];svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844">{content}</svg>';(out/f'ui-{i+1:02}.svg').write_text(svg)
 x=60+(i%4)*450;y=180+(i//4)*950
 parts.append(f'<g id="screen-{i+1}" data-name="{e(name)}" transform="translate({x},{y})"><text x="0" y="-26" font-family="SF Pro" font-size="16" font-weight="600" fill="#3c6352">{e(name)}</text>{content}</g>')
board='<svg xmlns="http://www.w3.org/2000/svg" width="1860" height="4020" viewBox="0 0 1860 4020"><rect width="1860" height="4020" fill="#e9ece5"/><text x="60" y="76" font-family="SF Pro" font-size="36" font-weight="700" fill="#29312d">ICT Learning Companion — Updated UI</text><text x="60" y="114" font-family="SF Pro" font-size="18" fill="#657360">Module A · Learn / Explore / Check · browser-local learning history · 12 October 2026</text>'+''.join(parts)+'</svg>'
(out/'ict-ui-updated.svg').write_text(board)
print('Created',len(cs),'vector screens')
