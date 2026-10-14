// Targeted diagnostic on the owned local QA browser; no production/provider requests.
const origin = 'http://127.0.0.1:3107';
const target = (await (await fetch('http://127.0.0.1:9227/json/list')).json()).find(item=>item.type==='page' && item.url.startsWith(origin));
if(!target) throw new Error('Owned test target unavailable');
const socket=new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve=>socket.addEventListener('open',resolve,{once:true}));
let id=0; const tasks=new Map();
socket.addEventListener('message',event=>{const data=JSON.parse(event.data);if(data.id){const task=tasks.get(data.id);if(task){tasks.delete(data.id);data.error?task.reject(data.error):task.resolve(data.result);}}});
const cmd=(method,params={})=>new Promise((resolve,reject)=>{tasks.set(++id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>{const value=await cmd('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(value.exceptionDetails)throw new Error(JSON.stringify(value.exceptionDetails));return value.result.value;};
const delay=milliseconds=>new Promise(resolve=>setTimeout(resolve,milliseconds));
const key=async (key,code,virtualCode,modifiers=0)=>{for(const type of ['keyDown','keyUp'])await cmd('Input.dispatchKeyEvent',{type,key,code,windowsVirtualKeyCode:virtualCode,nativeVirtualKeyCode:virtualCode,modifiers});};
const click=async selector=>{const point=await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2};})()`);for(const type of ['mousePressed','mouseReleased'])await cmd('Input.dispatchMouseEvent',{type,button:'left',clickCount:1,...point});};
const state=()=>evaluate(`({pathname:location.pathname,active:{tag:document.activeElement.tagName,id:document.activeElement.id,text:document.activeElement.textContent?.slice(0,60)},open:[...document.querySelectorAll('dialog[open]')].map(e=>e.id),select:document.querySelector('dialog[open] select')?.value,events:window.qaDialogEvents})`);
const evidence={};
try {
  if(process.argv[2]==='visual-timeline') {
    await cmd('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    await cmd('Page.navigate',{url:origin+'/start/readers'});
    const samples=[];
    for(const wait of [0,100,200,300,500,1000]) {
      await delay(wait);
      samples.push({wait,measured:await evaluate(`({pathname:location.pathname,ready:document.readyState,time:performance.now(),reduceMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,style:document.querySelector('main > div')?.getAttribute('style'),filter:document.querySelector('main > div')&&getComputedStyle(document.querySelector('main > div')).filter,opacity:document.querySelector('main > div')&&getComputedStyle(document.querySelector('main > div')).opacity})`)});
    }
    console.log(JSON.stringify(samples,null,2));
  } else if(process.argv[2]==='visual') {
    const visual=await evaluate(`(()=>{const main=document.querySelector('main');const lineage=[];for(let e=main;e;e=e.parentElement){const s=getComputedStyle(e);lineage.push({tag:e.tagName,class:String(e.className),style:e.getAttribute('style'),filter:s.filter,backdrop:s.backdropFilter,zIndex:s.zIndex,position:s.position,opacity:s.opacity});}const filters=[...document.querySelectorAll('*')].filter(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return r.width&&r.height&&(s.filter!=='none'||s.backdropFilter!=='none');}).map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return{tag:e.tagName,class:String(e.className),style:e.getAttribute('style'),filter:s.filter,backdrop:s.backdropFilter,zIndex:s.zIndex,position:s.position,opacity:s.opacity,rect:{left:r.left,top:r.top,width:r.width,height:r.height}};});return{pathname:location.pathname,lineage,filters,dialogs:[...document.querySelectorAll('dialog[open],[role="dialog"],[cmdk-overlay]')].map(e=>({tag:e.tagName,id:e.id,class:String(e.className)})),atContentPoint:document.elementsFromPoint(innerWidth/2,Math.min(220,innerHeight/2)).map(e=>({tag:e.tagName,id:e.id,class:String(e.className)}))};})()`);
    console.log(JSON.stringify(visual,null,2));
    process.exitCode=0;
  } else {
  await cmd('Emulation.setDeviceMetricsOverride',{width:375,height:812,deviceScaleFactor:1,mobile:true});
  await cmd('Page.navigate',{url:origin+'/places/asthortera-core-world'});await delay(1200);
  await click('button[aria-controls$="-archive"]');await delay(150);
  await evaluate(`window.qaDialogEvents=[];document.addEventListener('keydown',e=>window.qaDialogEvents.push({key:e.key,target:e.target.tagName}),true);document.querySelector('dialog[open]').addEventListener('cancel',e=>window.qaDialogEvents.push({type:'cancel',defaultPrevented:e.defaultPrevented}));`);
  evidence.beforeSelect=await state();
  await click('dialog[open] select');await key('Home','Home',36);await key('Enter','Enter',13);await delay(150);
  evidence.afterSelect=await state();
  await click('dialog[open] input[type="search"]');await cmd('Input.insertText',{text:'worldbuilding'});await delay(200);
  evidence.afterSearch=await state();
  await key('Escape','Escape',27);await delay(300);evidence.firstEscape=await state();
  await key('Escape','Escape',27);await delay(300);evidence.secondEscape=await state();
  await cmd('Page.navigate',{url:origin+'/contact'});await delay(1000);
  for(const [selector,text] of [['#contact-name','Synthetic Test'],['#contact-email','synthetic@example.test'],['#contact-message','A synthetic local inquiry used only for production-prototype validation.']]){await click(selector);await cmd('Input.insertText',{text});}
  await click('input[name="privacyAcknowledged"]');await click('form button[type="submit"]');await delay(300);
  evidence.contactFeedback=await evaluate(`document.querySelector('#contact-feedback').textContent`);
  evidence.directContactResponse=await evaluate(`fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'Synthetic Test',email:'synthetic@example.test',message:'A synthetic local inquiry used only for prototype validation.',intent:'collaboration',privacyAcknowledged:true,website:''})}).then(async response=>({status:response.status,body:await response.json()}))`);
  evidence.directNewsletterResponse=await evaluate(`fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:'synthetic@example.test',consent:true})}).then(async response=>({status:response.status,body:await response.json()}))`);
  console.log(JSON.stringify(evidence,null,2));
  }
} finally {socket.close();}
