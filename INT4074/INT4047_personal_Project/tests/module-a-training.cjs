const fs=require('fs'),vm=require('vm'),assert=require('assert'),{webcrypto}=require('crypto');
function makeContext(saved=null,full=false){
 const storage=new Map(saved?[['ict-preview-v1',saved]]:[]),nodes={};const node=id=>nodes[id]||(nodes[id]={_html:'',childNodes:[],get innerHTML(){return this._html},set innerHTML(v){this._html=v;this.childNodes=[{html:v}]},replaceChildren(...children){this.childNodes=children;this._html=children.map(n=>n.html||'').join('')},scrollTop:0,value:'',classList:{toggle(){},add(){}},focus(){},querySelectorAll(){return []}});
 const context=vm.createContext({console,TextEncoder,URLSearchParams,URL,Blob,crypto:webcrypto,performance,location:{search:''},localStorage:{getItem:k=>storage.get(k)||null,setItem(k,v){if(full)throw Error('quota');storage.set(k,v)}},document:{hidden:false,activeElement:null,getElementById:node,querySelector(){return {focus(){}}},querySelectorAll(){return []},addEventListener(){},body:{appendChild(){}},createElement(){return {click(){},remove(){}}}},window:{addEventListener(){}},setTimeout(){},clearTimeout(){},queueMicrotask(){}});
 const html=fs.readFileSync('ict-preview.html','utf8');vm.runInContext([...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1],context);
 for(const f of ['module-a.js','module-a-questions.js','module-a-training.js'])vm.runInContext(fs.readFileSync(f,'utf8'),context);
 context.check=(x,msg)=>assert(x,msg);return {context,storage};
}
(async()=>{
 const {context:c,storage}=makeContext();
 await vm.runInContext(`(async()=>{
 state.logged=true;aEnsureTraining();
 check(A_QUESTION_COUNT===242,'242 questions');check(Object.values(A_QUESTION_BANK).flat().filter(q=>q.source.kind==='past-paper').length===4,'4 verified past selections');
 const all=Object.values(A_QUESTION_BANK).flat();check(new Set(all.map(q=>q.id)).size===242,'stable unique IDs');
 check(aLessons.length===30,'30 concise lessons');check(aLessons[0].id==='A1.2','textbook begins with information systems');
 for(const topic of ['A1','A2','A3']){const covered=aTextbookSections[topic].flatMap(g=>g.ids);check(new Set(covered).size===aLessons.filter(l=>l.topic===topic).length,'section coverage '+topic);}
 aDigitInput('235');check(aLabState.digitCode==='235','valid three-digit input');check(aLab(aLessons.find(l=>l.id==='A2.6')).includes('2 + 3 + 5 + 0 = 10'),'check digit computed');aLabState={};
 for(const l of aLessons){check(l.points.length===3,'three learning points');if(l.topic!=='A4')check(l.points.join('').length<=160&&l.textbook,'concise textbook alignment');check(aLab(l).length>100,'real lab '+l.id);}
 for(const l of aLessons){const qs=aBankFor(l);check(qs.length===A_TRAINING_POLICY[l.id][0],'policy '+l.id);check(qs.every((q,i)=>!i||q.difficulty>=qs[i-1].difficulty),'ordered difficulty '+l.id);for(const q of qs){check(q.skills.length&&q.bankVersion,'metadata');check(q.options?Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length:true,'valid key');if(q.type==='mcq')check(aGradeAnswer(q,q.correct).correct,'MC key '+q.id);if(['short','number'].includes(q.type))for(const a of q.answers)check(aGradeAnswer(q,a).correct,'reference answer '+q.id);if(q.type==='written')check(aGradeAnswer(q,'reason').correct===null,'ungraded writing');}}
 const formula=all.find(q=>q.lessonId==='A4.1'&&q.type==='short');check(!aGradeAnswer(formula,'=AVERAGE(B2C2)').correct,'missing comma is not valid formula');
 openALesson('A3.3');await aSetStep(1);await aSetStep(2);const s=aActiveSession();check(s.questionIds.length===10,'10-question session');
 const q=aActiveQuestion(),r=s.responses[q.id];document.getElementById('content').scrollTop=320;aSelectChoice((q.correct+1)%q.options.length);check(document.getElementById('content').scrollTop===320,'selecting stays at current position');await aSubmit();check(document.getElementById('content').scrollTop===320,'submission preserves scroll');check(r.attempts.length===1&&!r.attempts[0].correct,'wrong attempt retained');check(!aRecord('A3.3').completed,'one answer cannot complete');await aSubmit();check(r.attempts.length===1,'duplicate submit blocked');
 aRetryQuestion();r.selectedChoice=q.correct;await aSubmit();check(r.attempts.length===2&&r.attempts[1].feedbackSeen,'retry distinguished');
 await aNextQuestion();check(document.getElementById('content').scrollTop===0,'new question begins at top');const second=aActiveQuestion();document.getElementById('content').scrollTop=280;await aShowHint();check(document.getElementById('content').scrollTop===280,'hint keeps position');s.responses[second.id].selectedChoice=second.correct;await aSubmit();check(s.responses[second.id].attempts[0].hintUsed,'hint retained');
 while(s.status!=='completed'){
   const question=aActiveQuestion(),response=s.responses[question.id];
   if(!response.feedbackVisible){if(question.type==='mcq')response.selectedChoice=question.correct;else document.getElementById('a-training-answer').value=question.type==='written'?'my own reasoning':question.answers[0];await aSubmit();}
   await aNextQuestion();
 }
 check(aRecord('A3.3').completed,'completion after full set and lab');check(aSessionStats(s).firstCorrect===8,'9 objective, one first wrong');check(aSessionStats(s).graded===9,'writing excluded');check(aSessionStats(s).unassistedGraded===8,'hint distinguished in denominator');check(aSessionStats(s).selfGraded===0,'no invented self-grade');
 const xp=state.xp;await aFinishSession();check(state.xp===xp,'reward not duplicated');
 const exportData=await aBuildTrainingExport();check(exportData.events.filter(e=>e.kind==='question_attempt').length===11,'all retry events retained');check(exportData.questionDefinitions.length===242,'export carries definitions');check(exportData.textbookAlignment.sections.A3.length===5,'export keeps textbook mappings');check(exportData.contentVersion===A_CONTENT_VERSION,'content version exported');check(exportData.events.find(e=>e.kind==='question_attempt').curriculumReference.section==='3.1','event carries textbook section');check(!('email' in exportData.learner),'export excludes account credentials');check(exportData.events.some(e=>e.kind==='hint_opened'),'hint event');
 await aRestartSession();check(aActiveSession().id!==s.id,'new round ID');check(aEnsureTraining().archivedSessions[s.id].responses[s.questionIds[0]].attempts.length===2,'previous session snapshot retained');const after=await aBuildTrainingExport();check(after.events.filter(e=>e.kind==='question_attempt').length===11,'history retained across new round');
 // Existing preview users keep the previously earned reward and legacy evidence.
 state.moduleA={lessons:{'A1.1':{completed:true,attempts:[{correct:true,at:'old'}]}},dse:{}};aEnsureTraining();check(aRecord('A1.1').legacyCompleted&&!aRecord('A1.1').completed,'migration does not call single question full training');check(aRecord('A1.1').rewardClaimed&&aRecord('A1.1').legacyAttempts.length===1,'legacy retained');await aPersistTraining();
 })()`,c);
 const navigation=makeContext();
 await vm.runInContext(`(async()=>{
 state.logged=true;openALesson('A2.1');await aSetStep(2);
 const content=document.getElementById('content'),original=content.childNodes[0],session=aActiveSession();content.scrollTop=210;
 goTab('learn');check(page==='aLesson'&&aStep===2&&content.childNodes[0]===original&&content.scrollTop===210,'active Learn click is a no-op');
 goTab('settings');check(!aTrainingClock,'leaving Check pauses its active timer');
 goTab('learn');check(page==='aLesson'&&aLessonId==='A2.1'&&aStep===2,'Learn returns to the same lesson and step');check(content.childNodes[0]===original&&content.scrollTop===210,'Learn restores original DOM and scroll');check(aActiveSession()===session&&aTrainingClock?.running,'same question session resumes timing');
 goTab('home');goTab('plan');goTab('learn');check(content.childNodes[0]===original&&content.scrollTop===210,'other tab navigation keeps Learn view');
 go('aTopic');go('learn');check(page==='learn','explicit Back still opens the library');
 openALesson('A2.1');await aSetStep(1);const explore=content.childNodes[0];content.scrollTop=180;goTab('settings');goTab('learn');check(aStep===1&&content.childNodes[0]===explore&&content.scrollTop===180,'Explore view returns intact');
 goTab('plan');openALesson('A1.1');check(aLessonId==='A1.1'&&aStep===0,'explicit lesson launch takes precedence');goTab('home');goTab('learn');check(aLessonId==='A1.1'&&aStep===0,'Learn remembers the newly opened lesson');
 })()`,navigation.context);
 const oldBank=JSON.parse(fs.readFileSync('data/module-a-question-bank-2026-10-10.1.json','utf8'));
 const currentBank=JSON.parse(vm.runInContext('JSON.stringify(Object.values(A_QUESTION_BANK).flat())',c));
 for(const q of oldBank.questions){const n=currentBank.find(n=>n.id===q.id);for(const field of ['q','type','options','correct','answers','rubric','maxScore','tolerance'])assert.deepStrictEqual(n[field],q[field],q.id+' compatible '+field);}
 const compatible=makeContext();vm.runInContext(`state.logged=true;const old=aStartSession('A1.2');old.bankVersion='2026-10-10.1';old.index=3;old.responses[old.questionIds[3]]={draft:'in progress',attempts:[]};const resumed=aStartSession('A1.2');check(resumed.id===old.id&&resumed.index===3,'compatible upgrade retains position');check(resumed.responses[old.questionIds[3]].draft==='in progress','upgrade keeps draft');check(aEnsureTraining().archivedSessions[old.id+'@2026-10-10.1'].bankVersion==='2026-10-10.1','prior version archived');`,compatible.context);
 const resumed=makeContext(storage.get('ict-preview-v1'));
 vm.runInContext(`check(aRecord('A1.1').legacyAttempts.length===1,'reload preserves history');`,resumed.context);
 const failure=makeContext(null,true);await vm.runInContext(`(async()=>{state.logged=true;openALesson('A1.1');await aSetStep(2);const q=aActiveQuestion(),r=aActiveSession().responses[q.id];r.selectedChoice=q.correct;await aSubmit();check(r.attempts.length===0&&!r.feedbackVisible,'failed save rolls back displayed completion');check(aTrainingMessage.includes('未能保存'),'storage failure visible');})()`,failure.context);
 console.log('PASS: Learn tab restores page, step, DOM and scroll; Check timing pauses and resumes; submission and hint scroll retained; new-question scroll resets; bank counts and keys; difficulty order; mixed marking; formula syntax; durable fallback; resume; first attempts vs retries/hints; completion and rewards; export; migration; full-storage failure.');
})().catch(e=>{console.error(e);process.exit(1)});
