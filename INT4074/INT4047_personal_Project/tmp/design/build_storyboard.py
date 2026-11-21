from pathlib import Path
import html,math,json,xml.etree.ElementTree as ET,textwrap
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A3,landscape,A4
R=Path.cwd();D=R/'output/design';P=R/'output/pdf';D.mkdir(exist_ok=True);P.mkdir(exist_ok=True)
W,H=1700,1150
C={'ink':'#29332e','green':'#3c6352','muted':'#718176','bg':'#f8f9f5','process':'#ffffff','io':'#e4eddf','decision':'#f1eadc','store':'#e8e5f1','future':'#f1f2ef'}
figma='https://www.figma.com/design/RZ7EY1OfYBUPXosK3EeBtr?node-id=14-6'
pages=[]
def page(title,sub):
 p={'title':title,'sub':sub,'nodes':[],'edges':[],'notes':[]};pages.append(p);return p
def node(p,id,x,y,text,kind='process',w=350,h=110):
 p['nodes'].append(dict(id=id,x=x,y=y,w=w,h=h,text=text,kind=kind));return id
def edge(p,a,b,pts,label='',lp=None,dashed=False):p['edges'].append(dict(a=a,b=b,pts=pts,label=label,lp=lp,dashed=dashed))
def note(p,x,y,text,size=18):p['notes'].append((x,y,text,size))
p=page('01 / A learning journey with a clear return path','Storyboard · navigation and screen transitions · I = learner input · O = software output')
node(p,'start',65,155,'START\nOpen the browser preview','terminal',310,90)
node(p,'home',65,290,'O: Home [UI 01]\nJourney, level and points')
node(p,'learn',65,440,'I: Tap Learn\nO: Curriculum library [UI 02]','io')
node(p,'module',65,590,'I: Select Module A\nO: Four topics [UI 03–04]','io')
node(p,'topic',65,740,'I: Select A1 / A2 / A3 / A4\nO: Textbook lesson list [UI 05]','io')
node(p,'lesson',65,890,'I: Select a micro-lesson\nO: Restore its saved session','io')
for a,b,y1,y2 in [('start','home',245,290),('home','learn',400,440),('learn','module',550,590),('module','topic',700,740),('topic','lesson',850,890)]:edge(p,a,b,[(240,y1),(240,y2)])
node(p,'learnstep',625,890,'O: Learn [UI 06]\nThree key ideas + one situation')
node(p,'explore',625,740,'I: Manipulate the example\nO: Explore response [UI 07]','io')
node(p,'check',625,590,'I: Open Check [UI 08–09]\nO: 6–10 graded practice items','io')
node(p,'a',625,440,'A / Continue on page 02\nSubmit, feedback and persistence','terminal')
edge(p,'lesson','learnstep',[(415,945),(625,945)],'Open lesson',(480,927))
edge(p,'learnstep','explore',[(800,890),(800,850)],'Explore',(817,873));edge(p,'explore','check',[(800,740),(800,700)],'Check',(817,723));edge(p,'check','a',[(800,590),(800,550)])
node(p,'plan',1215,155,'I: Tap Plan\nO: Next lesson / review [UI 10]','io')
node(p,'settings',1215,305,'I: Tap Settings\nO: Study preferences [UI 11]','io')
node(p,'return',1215,455,'I: Tap Learn again\nO: Restore the previous Learn view\nwith its step and scroll position','io',350,130)
node(p,'records',1215,705,'I: Open learning notes\nO: Learning history [UI 12–13]','io')
node(p,'b',1215,890,'C / Continue on page 03\nLearning record and JSON export','terminal')
edge(p,'plan','return',[(1565,210),(1610,210),(1610,520),(1565,520)])
edge(p,'settings','return',[(1390,415),(1390,455)])
edge(p,'return','learnstep',[(1390,585),(1390,640),(1120,640),(1120,945),(975,945)],'Return to last Learn view',(1115,680))
edge(p,'records','b',[(1390,815),(1390,890)])
note(p,650,175,'NAVIGATION RULES',21)
note(p,650,220,'Switching the main tab preserves the Learn view.')
note(p,650,256,'Explicit Back moves up the curriculum hierarchy.')
note(p,650,292,'Submitting an answer keeps the current scroll position.')
note(p,650,328,'Next question begins at the top of the question view.')
note(p,65,1048,'Scope: Module A has 30 micro-lessons and 242 items. Home, Plan and account details include demonstration content.',18)

p=page('02 / One question, feedback and durable history','Storyboard · assessment and failure branches · objective marking and written self-assessment remain separate')
node(p,'question',90,150,'A / O: Present a question\nFoundation → application → challenge','io',360)
node(p,'answer',90,305,'I: Answer + Submit\nOptional confidence and hint','io',360)
node(p,'valid',90,460,'Valid answer?\nNon-empty; numeric if required','decision',360,125)
node(p,'invalid',640,460,'O: Prompt for a valid answer\nNo attempt is recorded','io',360,125)
node(p,'type',90,655,'Written explanation?','decision',360,125)
node(p,'objective',640,655,'Grade objective response\nMCQ / number / reference match',w=360,h=125)
node(p,'written',90,865,'Record raw written response\ncorrect = null; pending review',w=360,h=125)
node(p,'prepare',640,865,'Create an attempt event\nKeep answer, time, hint and retry flags',w=360,h=125)
node(p,'persist',1200,865,'Write to browser-local history\nIndexedDB → localStorage fallback','store',360,125)
node(p,'saved',1200,655,'Save succeeded?','decision',360,125)
node(p,'failure',640,150,'O: Storage error + retry guidance\nRetain draft; roll back this attempt','io',360,125)
node(p,'feedback',1200,460,'O: Feedback in the same position\nWritten: reference points + optional\nself-assessment, saved separately','io',360,125)
node(p,'more',1200,305,'More questions?\nI: Next / Finish','decision',360,125)
node(p,'finish',1200,150,'B / Continue on page 03\nFinish the practice session','terminal',360,110)
edge(p,'question','answer',[(270,260),(270,305)])
edge(p,'answer','valid',[(270,415),(270,460)])
edge(p,'valid','invalid',[(450,522),(640,522)],'No',(525,502))
edge(p,'invalid','answer',[(820,460),(820,365),(450,365)],'Correct input',(510,345))
edge(p,'valid','type',[(270,585),(270,655)],'Yes',(292,623))
edge(p,'type','objective',[(450,717),(640,717)],'No',(533,700))
edge(p,'type','written',[(270,780),(270,865)],'Yes',(292,820))
edge(p,'written','prepare',[(450,927),(640,927)])
edge(p,'objective','prepare',[(820,780),(820,865)])
edge(p,'prepare','persist',[(1000,927),(1200,927)])
edge(p,'persist','saved',[(1380,865),(1380,780)])
edge(p,'saved','feedback',[(1380,655),(1380,585)],'Yes',(1400,624))
edge(p,'saved','failure',[(1380,655),(1380,620),(1080,620),(1080,210),(1000,210)],'No',(1100,585))
edge(p,'failure','answer',[(640,210),(535,210),(535,275),(270,275),(270,305)],'Retry after storage is available',(535,295))
edge(p,'feedback','answer',[(1560,522),(1630,522),(1630,1050),(35,1050),(35,360),(90,360)],'I: Retry a wrong objective answer (a new attempt)',(450,1075))
edge(p,'feedback','more',[(1380,460),(1380,430)],'I: Next',(1400,450))
edge(p,'more','question',[(1200,367),(1120,367),(1120,137),(270,137),(270,150)],'Yes: advance to next item; start at the top',(510,129))
edge(p,'more','finish',[(1380,305),(1380,260)],'No',(1400,289))
note(p,480,1025,'Hint opens and retries are recorded separately from an unassisted first answer. No data is sent to AI.',18)

p=page('03 / Complete, review and export the evidence','Storyboard · results and I/O · browser-local storage is implemented; remote AI analysis is a future extension')
node(p,'end',70,150,'B / Practice session finished','terminal',360,90)
node(p,'explored',70,305,'Explore step visited?','decision',360,130)
node(p,'explore',70,495,'I: Return to Explore\nO: Interactive learning example','io',360,125)
node(p,'complete',635,305,'Complete the lesson\nFirst completion: +60 XP / +30 points\nRepeat practice: no extra reward',w=410,h=130)
node(p,'result',635,495,'O: Session result\nFirst-answer score, active time and\nquestion-by-question review','io',410,125)
node(p,'record',635,680,'C / I: Open complete learning record\nO: Topic summaries + review links\n[UI 12–13]','io',410,125)
node(p,'export',1210,680,'I: Export learning data (JSON)\nRead all saved events and sessions','io',360,125)
node(p,'read',1210,495,'Full history readable?','decision',360,125)
node(p,'download',1210,305,'O: Download versioned JSON\nEvents + question definitions +\ncurrent and archived sessions','io',360,130)
node(p,'fail',1210,880,'O: Export error / retry\nDo not download incomplete history','io',360,115)
node(p,'future',1210,150,'FUTURE / manual hand-off\nAI or teacher analysis of exported data','future',360,100)
node(p,'store',70,760,'Browser-local learning history\nQuestion ID / source / difficulty\nAnswer / marking / timestamps\nHint / confidence / active time\nFirst attempt / retries / self-assessment','store',420,225)
edge(p,'end','explored',[(250,240),(250,305)])
edge(p,'explored','explore',[(250,435),(250,495)],'No',(270,475))
edge(p,'explored','complete',[(430,370),(635,370)],'Yes',(510,350))
edge(p,'explore','complete',[(430,557),(535,557),(535,395),(635,395)],'Visit Explore',(465,589))
edge(p,'complete','result',[(840,435),(840,495)],'Persist completion',(860,475))
edge(p,'result','record',[(840,620),(840,680)],'I: View records',(860,658))
edge(p,'record','export',[(1045,742),(1210,742)],'Export',(1100,720))
edge(p,'export','read',[(1390,680),(1390,620)])
edge(p,'read','download',[(1390,495),(1390,435)],'Yes',(1410,478))
edge(p,'read','fail',[(1570,557),(1620,557),(1620,935),(1570,935)],'No',(1630,755))
edge(p,'fail','export',[(1390,880),(1390,805)],'Retry',(1410,848))
edge(p,'download','future',[(1390,305),(1390,250)],'Not connected',(1410,285),True)
edge(p,'store','record',[(490,873),(570,873),(570,775),(635,775)],'O: Read summaries',(520,925))
edge(p,'store','export',[(490,950),(1140,950),(1140,790),(1210,790)],'Read complete event history',(640,975))
note(p,665,170,'EVIDENCE RULES',21)
note(p,665,205,'Written self-assessment is not an official DSE mark.')
note(p,665,238,'Accuracy is shown with its question sample size.')
note(p,665,271,'No login, cloud sync or automatic AI analysis yet.')
note(p,665,880,'Completion save failure: roll back progress and rewards, then retry.',17)
note(p,665,1042,'Navigating away preserves Learn position; active question timing pauses until the view becomes visible again.',18)


def poly(n):
 x,y,w,h=n['x'],n['y'],n['w'],n['h'];k=n['kind']
 if k=='decision':return [(x+w/2,y),(x+w,y+h/2),(x+w/2,y+h),(x,y+h/2)]
 if k=='io':return [(x+22,y),(x+w,y),(x+w-22,y+h),(x,y+h)]
 return None

def svg_page(p):
 out=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="{C["green"]}"/></marker></defs><rect width="1700" height="1150" fill="{C["bg"]}"/><text x="65" y="62" font-family="Arial" font-size="34" font-weight="700" fill="{C["ink"]}">{html.escape(p["title"])}</text><text x="65" y="96" font-family="Arial" font-size="19" fill="{C["muted"]}">{html.escape(p["sub"])}</text>']
 for ed in p['edges']:
  pts=' '.join(f'{x},{y}' for x,y in ed['pts']);out.append(f'<polyline points="{pts}" fill="none" stroke="{C["green"]}" stroke-width="2" marker-end="url(#arrow)"'+(' stroke-dasharray="8 6"' if ed['dashed'] else '')+'/>')
 for n in p['nodes']:
  x,y,w,h=n['x'],n['y'],n['w'],n['h'];k=n['kind'];fill=C.get(k,C['process']);out.append(f'<g id="{n["id"]}">');points=poly(n)
  if points:out.append(f'<polygon points="'+ ' '.join(f'{x},{y}' for x,y in points)+f'" fill="{fill}" stroke="#b3c0b0" stroke-width="1.5"/>')
  else:out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h/2 if k=="terminal" else 16}" fill="{fill}" stroke="#b3c0b0" stroke-width="1.5"'+(' stroke-dasharray="8 6"' if k=='future' else '')+'/>')
  if k=='store':out.append(f'<path d="M{x+3},{y+25} Q{x+w/2},{y+48} {x+w-3},{y+25}" fill="none" stroke="#b3c0b0"/>')
  lines=n['text'].split('\n');start=y+h/2-(len(lines)-1)*14+7
  for i,l in enumerate(lines):out.append(f'<text x="{x+w/2}" y="{start+i*28}" text-anchor="middle" font-family="Arial" font-size="{20 if i==0 else 18}" font-weight="{600 if i==0 else 400}" fill="{C["ink"]}">{html.escape(l)}</text>')
  out.append('</g>')
 for ed in p['edges']:
  if ed['label']:
   x,y=ed['lp'];lw=len(ed['label'])*8.5;out.append(f'<rect x="{x-4}" y="{y-18}" width="{lw+8}" height="25" rx="4" fill="{C["bg"]}"/><text x="{x}" y="{y}" font-family="Arial" font-size="17" fill="{C["green"]}">{html.escape(ed["label"])}</text>')
 for x,y,t,size in p['notes']:out.append(f'<text x="{x}" y="{y}" font-family="Arial" font-size="{size}" fill="{C["muted"]}">{html.escape(t)}</text>')
 out.append('<text x="65" y="1120" font-family="Arial" font-size="17" fill="#718176">Symbols: pill = start / connector · rectangle = process · parallelogram = I/O · diamond = decision · cylinder = stored data · dashed = future</text></svg>')
 return ''.join(out)
for i,p in enumerate(pages): (D/f'ict-storyboard-{i+1:02}.svg').write_text(svg_page(p))

# An editable, multi-page diagrams.net document.
mx=ET.Element('mxfile',host='app.diagrams.net',version='24.7.17',type='device')
for i,p in enumerate(pages):
 di=ET.SubElement(mx,'diagram',id=f'ict-{i+1}',name=p['title']);mod=ET.SubElement(di,'mxGraphModel',dx=str(W),dy=str(H),grid='1',gridSize='10',page='1',pageScale='1',pageWidth=str(W),pageHeight=str(H));rr=ET.SubElement(mod,'root');ET.SubElement(rr,'mxCell',id='0');ET.SubElement(rr,'mxCell',id='1',parent='0')
 for n in p['nodes']:
  shape={'decision':'rhombus','io':'parallelogram','store':'cylinder','terminal':'rectangle','future':'rectangle'}.get(n['kind'],'rectangle');sty=f'shape={shape};rounded=1;whiteSpace=wrap;html=0;fontFamily=Arial;fontSize=20;fillColor={C.get(n["kind"],C["process"])};strokeColor=#b3c0b0;'+('dashed=1;' if n['kind']=='future' else '')
  ce=ET.SubElement(rr,'mxCell',id=n['id'],value=n['text'],style=sty,vertex='1',parent='1');ET.SubElement(ce,'mxGeometry',x=str(n['x']),y=str(n['y']),width=str(n['w']),height=str(n['h']),**{'as':'geometry'})
 for j,ed in enumerate(p['edges']):
  src=next(n for n in p['nodes'] if n['id']==ed['a']);dst=next(n for n in p['nodes'] if n['id']==ed['b']);start,end=ed['pts'][0],ed['pts'][-1];attach=f'exitX={(start[0]-src["x"])/src["w"]};exitY={(start[1]-src["y"])/src["h"]};entryX={(end[0]-dst["x"])/dst["w"]};entryY={(end[1]-dst["y"])/dst["h"]};exitPerimeter=0;entryPerimeter=0;'
  ce=ET.SubElement(rr,'mxCell',id=f'edge{j}',source=ed['a'],target=ed['b'],value=ed['label'],style=attach+'edgeStyle=none;rounded=0;endArrow=block;html=0;fontSize=17;strokeColor=#3c6352;'+('dashed=1;' if ed['dashed'] else ''),edge='1',parent='1')
  ge=ET.SubElement(ce,'mxGeometry',relative='1',**{'as':'geometry'});a=ed['pts'][0];b=ed['pts'][-1];ET.SubElement(ge,'mxPoint',x=str(a[0]),y=str(a[1]),**{'as':'sourcePoint'});ET.SubElement(ge,'mxPoint',x=str(b[0]),y=str(b[1]),**{'as':'targetPoint'});ar=ET.SubElement(ge,'Array',**{'as':'points'})
  for x,y in ed['pts'][1:-1]:ET.SubElement(ar,'mxPoint',x=str(x),y=str(y))
 # Heading, legend and annotations are editable text boxes.
 for j,(x,y,t,sz) in enumerate([(65,62,p['title'],34),(65,96,p['sub'],19),*p['notes'],(65,1120,'I = learner input | O = software output | Dashed = future extension',17)]):
  ce=ET.SubElement(rr,'mxCell',id=f'text{j}',value=t,style=f'text;html=0;align=left;fontFamily=Arial;fontSize={sz};fontColor=#29332e;',vertex='1',parent='1');ET.SubElement(ce,'mxGeometry',x=str(x),y=str(y-sz),width='1550',height=str(sz+15),**{'as':'geometry'})
(D/'ict-storyboard.drawio').write_bytes(ET.tostring(mx,encoding='utf-8',xml_declaration=True))

# PDF uses the same geometry as the SVG; text and paths stay vector-based.
cv=canvas.Canvas(str(P/'ict-storyboard-io.pdf'),pagesize=landscape(A3));pw,ph=landscape(A3);scale=min((pw-36)/W,(ph-36)/H)
def pdftext(x,y,t,size=20,bold=False,center=False):
 cv.setFillColor(HexColor(C['ink']));cv.setFont('Helvetica-Bold' if bold else 'Helvetica',size);(cv.drawCentredString if center else cv.drawString)(x,H-y,t)
def pathline(points,fill=None,close=False):
 pp=cv.beginPath();pp.moveTo(points[0][0],H-points[0][1]);[pp.lineTo(x,H-y) for x,y in points[1:]]
 if close:pp.close()
 if fill:cv.setFillColor(HexColor(fill))
 cv.drawPath(pp,stroke=1,fill=int(bool(fill)))
for p in pages:
 cv.saveState();cv.translate(18,(ph-H*scale)/2);cv.scale(scale,scale);cv.setFillColor(HexColor(C['bg']));cv.rect(0,0,W,H,stroke=0,fill=1)
 pdftext(65,62,p['title'],34,True);pdftext(65,96,p['sub'],19)
 cv.setStrokeColor(HexColor(C['green']));cv.setLineWidth(2)
 for ed in p['edges']:
  cv.setDash([8,6] if ed['dashed'] else []);pathline(ed['pts']);a,b=ed['pts'][-2:];dx=b[0]-a[0];dy=b[1]-a[1];le=math.hypot(dx,dy);ux,uy=dx/le,dy/le;pathline([b,(b[0]-ux*12-uy*5,b[1]-uy*12+ux*5),(b[0]-ux*12+uy*5,b[1]-uy*12-ux*5)],C['green'],True)
 cv.setDash([])
 for n in p['nodes']:
  x,y,w,h=n['x'],n['y'],n['w'],n['h'];k=n['kind'];fill=C.get(k,C['process']);cv.setStrokeColor(HexColor('#b3c0b0'));cv.setLineWidth(1.5);cv.setFillColor(HexColor(fill));points=poly(n)
  if points:pathline(points,fill,True)
  else:
   cv.setDash([8,6] if k=='future' else []);cv.roundRect(x,H-y-h,w,h,h/2 if k=='terminal' else 16,stroke=1,fill=1);cv.setDash([])
  if k=='store':
   pp=cv.beginPath();pp.moveTo(x+3,H-y-25);pp.curveTo(x+w/3,H-y-46,x+w*2/3,H-y-46,x+w-3,H-y-25);cv.drawPath(pp)
  lines=n['text'].split('\n');start=y+h/2-(len(lines)-1)*14+7
  for i,t in enumerate(lines):pdftext(x+w/2,start+i*28,t,20 if i==0 else 18,i==0,True)
 for ed in p['edges']:
  if ed['label']:
   x,y=ed['lp'];cv.setFillColor(HexColor(C['bg']));cv.rect(x-4,H-y-7,len(ed['label'])*8.5+8,25,stroke=0,fill=1);pdftext(x,y,ed['label'],17)
 for x,y,t,sz in p['notes']:pdftext(x,y,t,sz)
 pdftext(65,1120,'Symbols: start / connector | process | I/O | decision | stored data | dashed = future extension',17)
 cv.restoreState();cv.showPage()
cv.save()

# Standalone local viewer, with zoom and downloadable editing/export files.
(D/'ict-storyboard.html').write_text('''<!doctype html><html lang="en"><meta charset="utf-8"><title>ICT Learning Companion · Storyboard & I/O</title><style>*{box-sizing:border-box}body{margin:0;background:#e9ece5;color:#29332e;font:16px system-ui}header{padding:25px 4vw;background:#f8f9f5;border-bottom:1px solid #cbd3c7}h1{font-size:29px;margin:0 0 10px}p{margin:8px 0;line-height:1.6}a{color:#3c6352}nav{display:flex;gap:20px;flex-wrap:wrap;margin-top:18px}section{padding:30px 4vw}button{background:#3c6352;color:white;border:0;border-radius:12px;padding:11px 18px;cursor:pointer}.sheet{overflow:auto;margin:22px 0;background:white;border-radius:18px;border:1px solid #cbd3c7}img{display:block;width:100%;min-width:850px}body.zoom img{width:1700px}h2{font-size:21px}footer{padding:20px 4vw}</style><header><h1>ICT Learning Companion · Storyboard & I/O</h1><p>Three English flowcharts documenting the current Module A prototype. I = learner input; O = software output.</p><nav><a href="../pdf/ict-storyboard-io.pdf">Download PDF</a><a href="ict-storyboard.drawio" download>Editable diagrams.net file</a><a href="'''+figma+'''" target="_blank">Updated Figma UI</a><button onclick="document.body.classList.toggle('zoom')">Toggle full-size diagrams</button></nav></header>'''+''.join(f'<section><h2>{html.escape(p["title"])}</h2><div class="sheet"><img src="ict-storyboard-{i+1:02}.svg" alt="{html.escape(p["title"])} flowchart"></div></section>' for i,p in enumerate(pages))+'''<footer><p>Open the .drawio file in diagrams.net using File → Open From → Device. All nodes, arrows and annotations are editable.</p><p>Prototype status: browser-local history and JSON export are implemented; automated AI analysis and cloud accounts are future work.</p></footer></html>''')

# Submission link sheet and a low-fidelity wireframe companion.
cv=canvas.Canvas(str(P/'ict-design-links.pdf'),pagesize=A4);pw,ph=A4
cv.setTitle('ICT Learning Companion — Design links')
def tx(x,y,s,size=12,bold=False):cv.setFont('Helvetica-Bold' if bold else 'Helvetica',size);cv.setFillColor(HexColor(C['ink']));cv.drawString(x,ph-y,s)
cv.setFillColor(HexColor('#e9ece5'));cv.rect(0,ph-150,pw,150,fill=1,stroke=0);tx(42,64,'ICT Learning Companion',26,True);tx(42,98,'Design submission · updated UI, storyboard and I/O',13);tx(42,125,'INT4047 · Module A prototype · 12 October 2026',11)
y=198
for title,lines,url in [
 ('1. Updated UI in Figma',['14 screens on page: 04 · Refined — Neutral & Mint','Board: 05 · Module A & Unified UI — 12 Oct 2026','Editable text and vector graphics; Inter + Noto Sans HK.'],figma),
 ('2. Storyboard with I/O',['Three English flowcharts: navigation, assessment, results and export.','PDF: ict-storyboard-io.pdf','Editable source: ../design/ict-storyboard.drawio'], 'ict-storyboard-io.pdf'),
 ('3. Standalone storyboard viewer',['Local HTML with zoom, SVG flowcharts and download links.','File: ../design/ict-storyboard.html','Open the supplied files together; no public hosting has been created.'],'../design/ict-storyboard.html'),
 ('4. Wireframe companion',['Page 2 contains a low-fidelity framework for the six central views.','The supplied UI and storyboard show the current prototype behavior.'],None)]:
 tx(42,y,title,16,True);y+=29
 for l in lines:tx(42,y,l.replace('·','/').replace('—','-'),10.5);y+=20
 if url:tx(42,y,'Open linked artifact',11,True);cv.linkURL(url,(42,ph-y-4,230,ph-y+13),relative=0,thickness=0);y+=24
 y+=22
tx(42,796,'Local links require the accompanying files. Upload them with this PDF for submission.',9)
cv.showPage();tx(42,50,'Wireframe companion',24,True);tx(42,80,'Low-fidelity framework / six core views',12)
wireframes=[('Home',['Profile / level / points','Current journey card','Learning path map','Monthly challenge']),('Learn',['Curriculum tabs + search','Module A / B / C / D / E','Module A topic cards','Lesson list + search']),('Learn / Explore',['Back / textbook reference','Lesson title + progress','Learn | Explore | Check','Key ideas / interactive lab','Continue / return link']),('Check',['Shared lesson header','Difficulty + item progress','Question + answer input','Confidence / hint / Submit','Feedback / Next / retry']),('Plan',['Weekly strip','Next lesson / review card','Start lesson / view records','Daily rhythm','Due for review']),('Learning record',['Latest-session metrics','Review suggestions','Topic progress summaries','Export JSON / question bank','Storage status'])]
for i,(name,rows) in enumerate(wireframes):
 x=42+(i%2)*265;y0=120+(i//2)*222;cv.setStrokeColor(HexColor('#9ba69a'));cv.setFillColor(HexColor('#fafbf8'));cv.roundRect(x,ph-y0-200,245,200,12,stroke=1,fill=1);tx(x+14,y0+27,name,13,True)
 for j,label in enumerate(rows):
  yy=y0+48+j*24;cv.setFillColor(HexColor('#ecefe8'));cv.roundRect(x+14,ph-yy-19,217,19,4,stroke=0,fill=1);tx(x+23,yy+13,label,9)
 tx(x+18,y0+187,'Home     Learn     Plan     Settings',9)
cv.save()
(D/'README.md').write_text('''# Design artifacts\n\nUpdated Figma UI: '''+figma+'''\n\n- `ict-storyboard.html`: standalone viewer (serve this folder with the project server).\n- `ict-storyboard-01.svg` to `03.svg`: vector flowcharts with English I/O labels.\n- `ict-storyboard.drawio`: editable diagrams.net source. Open from Device.\n- `../pdf/ict-storyboard-io.pdf`: three-page vector PDF.\n- `../pdf/ict-design-links.pdf`: clickable artifact links and low-fidelity wireframes.\n- `ict-ui-updated.svg`: local vector source for the 14-screen Figma board.\n\nThe Figma board uses Inter and Noto Sans HK because local SF Pro and Noto Sans TC were unavailable in the browser editor. Text and vector shapes remain editable. It is a grouped UI redraw rather than an auto-layout component library. Account/notification and automatic AI features remain prototypes or future work; the learning history is stored locally and can be exported.\n\nKeep the design and pdf folders together for relative links. Local files are not public URLs; upload the storyboard PDF/source alongside the link sheet when submitting.\n''')
print('Created 3 flowcharts, editable .drawio, HTML viewer and 2 PDFs')
