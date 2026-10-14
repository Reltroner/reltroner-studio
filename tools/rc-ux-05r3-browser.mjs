// Local screenshot and interaction evidence using an owned Chrome test profile.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
export const origin = process.env.RC_QA_ORIGIN || 'http://localhost:3000';
export const output = path.resolve('artifacts/rc-ux-05r3-20261013');
await fs.mkdir(output, { recursive: true });
const port = process.env.RC_QA_CDP_PORT || '9227';
const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const target = targets.find(t=>t.type==='page' && (t.url==='about:blank'||/^http:\/\/(localhost|127\.0\.0\.1):3000/.test(t.url)));
if(!target) throw new Error('Owned local QA tab not found');
const socket=new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true});});
const tasks=new Map();let sequence=0;
export const events={requests:[],responses:[],headers:[],failures:[],exceptions:[],consoleErrors:[]};
const requestUrls=new Map();
socket.addEventListener('message',event=>{
  const data=JSON.parse(event.data);
  if(data.id){const task=tasks.get(data.id);if(task){tasks.delete(data.id);clearTimeout(task.timer);data.error?task.reject(new Error(JSON.stringify(data.error))):task.resolve(data.result);}}
  const p=data.params;
  if(data.method==='Network.requestWillBeSent'){requestUrls.set(p.requestId,p.request.url);events.requests.push({id:p.requestId,url:p.request.url,method:p.request.method,type:p.type,headers:{Referer:p.request.headers.Referer||p.request.headers.referer}});}
  if(data.method==='Network.requestWillBeSentExtraInfo')events.headers.push({id:p.requestId,referer:p.headers.Referer||p.headers.referer});
  if(data.method==='Network.responseReceived')events.responses.push({id:p.requestId,url:p.response.url,status:p.response.status,mime:p.response.mimeType,type:p.type,headers:Object.fromEntries(Object.entries(p.response.headers).filter(([key])=>/content-type|content-length|content-range|accept-ranges|referrer-policy|content-security-policy/i.test(key)))});
  if(data.method==='Network.loadingFailed')events.failures.push({url:requestUrls.get(p.requestId),error:p.errorText,blockedReason:p.blockedReason});
  if(data.method==='Runtime.exceptionThrown')events.exceptions.push(p.exceptionDetails);
  if(data.method==='Runtime.consoleAPICalled'&&p.type==='error')events.consoleErrors.push(p.args.map(a=>a.value||a.description));
});
export function command(method,params={},sessionId){return new Promise((resolve,reject)=>{const id=++sequence;const timer=setTimeout(()=>{tasks.delete(id);reject(new Error(method+' timed out'));},30000);tasks.set(id,{resolve,reject,timer});socket.send(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})}));});}
export async function evaluate(expression){const r=await command('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||JSON.stringify(r.exceptionDetails));return r.result.value;}
export const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
export async function until(expression,label,timeout=60000){const deadline=Date.now()+timeout;while(Date.now()<deadline){if(await evaluate(expression))return;await delay(100);}throw Error('Timed out: '+label);}
export async function viewport(width,height){await command('Emulation.setDeviceMetricsOverride',{width,height,screenWidth:width,screenHeight:height,deviceScaleFactor:1,mobile:width<768});}
export async function navigate(route){await command('Page.navigate',{url:origin+route});await until(`document.readyState==='complete' && location.pathname===${JSON.stringify(route==='/factions/beluftrner'?'/factions/beluftner':route.split('#')[0])} && !!document.querySelector('main') && !!document.querySelector('[aria-label="Open Reltroner Navigator"]')`,route);await evaluate('document.fonts.ready');await delay(400);}
export async function click(selector){const p=await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e)throw Error('Missing selector');e.scrollIntoView({block:'center',behavior:'instant'});const r=e.getBoundingClientRect();if(!r.width||!r.height)throw Error('Hidden control');return{x:r.x+r.width/2,y:r.y+r.height/2};})()`);for(const type of ['mousePressed','mouseReleased'])await command('Input.dispatchMouseEvent',{type,button:'left',clickCount:1,...p});}
export async function key(key,code,virtualKey,modifiers=0){for(const type of ['keyDown','keyUp'])await command('Input.dispatchKeyEvent',{type,key,code,windowsVirtualKeyCode:virtualKey,nativeVirtualKeyCode:virtualKey,modifiers});}
export async function snapshot(name){await delay(100);const r=await command('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await fs.writeFile(path.join(output,name+'.png'),Buffer.from(r.data,'base64'));return name+'.png';}
export const domExpression=`(()=>{
 const box=e=>e?e.getBoundingClientRect().toJSON():null;
 const style=e=>{if(!e)return null;const s=getComputedStyle(e);return{display:s.display,position:s.position,top:s.top,width:s.width,height:s.height,maxWidth:s.maxWidth,padding:s.padding,margin:s.margin,gap:s.gap,gridTemplateColumns:s.gridTemplateColumns,justifyContent:s.justifyContent,flexWrap:s.flexWrap,scrollMarginTop:s.scrollMarginTop,aspectRatio:s.aspectRatio,backgroundImage:s.backgroundImage};};
 const mobile=document.querySelector('nav[aria-label="Mobile primary navigation"]');
 const body=document.querySelector('[id^="archive-article-body"]');const rail=document.querySelector('main nav[aria-label="Reading path"]');
 const video=document.querySelector('video');const iframe=document.querySelector('main iframe');const crumb=document.querySelector('main nav[aria-label="Breadcrumb"]');
 return{pathname:location.pathname,title:document.title,buildScripts:[...document.scripts].map(e=>e.getAttribute('src')).filter(Boolean),viewport:{innerWidth,innerHeight,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,dpr:devicePixelRatio,scrollY},mobileHeader:{count:document.querySelectorAll('nav[aria-label="Mobile primary navigation"]').length,html:mobile?.parentElement.outerHTML,box:box(mobile?.parentElement),style:style(mobile?.parentElement),focusables:mobile?[...mobile.querySelectorAll('a,button')].map(e=>({label:e.getAttribute('aria-label'),box:box(e),tabIndex:e.tabIndex})):[]},main:{box:box(document.querySelector('main')),style:style(document.querySelector('main'))},desktopNav:{count:document.querySelectorAll('nav[aria-label="Primary navigation"]').length,style:style(document.querySelector('nav[aria-label="Primary navigation"]')?.closest('header')?.firstElementChild)},navigatorLaunchers:document.querySelectorAll('[aria-label="Open Reltroner Navigator"]').length,rail:{count:rail?1:0,html:rail?.parentElement.outerHTML,box:box(rail?.parentElement),style:style(rail?.parentElement),grid:style(rail?.parentElement.parentElement)},article:{box:box(document.querySelector('main article.surface-card')),body:box(body),style:style(body)},breadcrumb:{html:crumb?.outerHTML,box:box(crumb),group:box(crumb?.querySelector('ol')),style:style(crumb),title:box(document.querySelector('main h1'))},media:{video:video?{html:video.outerHTML,src:video.currentSrc,readyState:video.readyState,networkState:video.networkState,error:video.error?{code:video.error.code,message:video.error.message}:null,duration:Number.isFinite(video.duration)?video.duration:null,box:box(video),style:style(video),mp4:video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'),webm:video.canPlayType('video/webm; codecs="vp9, opus"')}:null,iframe:iframe?{html:iframe.outerHTML,src:iframe.src,referrerPolicy:iframe.referrerPolicy,box:box(iframe),style:style(iframe)}:null,unsupportedText:body?.textContent.includes('Your browser does not support the video tag.'),html:body?.innerHTML.slice(0,6000)},mediaQueries:{mobile:matchMedia('(max-width:767px)').matches,md:matchMedia('(min-width:768px)').matches,lg:matchMedia('(min-width:1024px)').matches,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches}};
})()`;
await command('Page.enable');await command('Runtime.enable');await command('Network.enable');
await command('Network.setCacheDisabled',{cacheDisabled:true});
await command('Network.setBlockedURLs',{urls:['*googletagmanager.com*','*google-analytics.com*','*doubleclick.net*','*api.web3forms.com*','*api.resend.com*','*formspree.io*']});
await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
export async function close(){socket.close();}

if(process.argv[2]==='baseline'){
 const results=[];
 try {
   for(const [route,width,height] of [['/factions/beluftrner',320,480],['/factions/beluftner',320,480],['/start/creators',320,480],['/philosophies',320,480],['/philosophies',1440,900],['/series',1440,900],['/technologies/tda-twin-digital-atom',1440,900],['/factions/beluftner',1440,900],['/music/hargenbor-paradise-by-the-waves',375,812],['/music/hargenbor-paradise-by-the-waves',1440,900]]){
     await viewport(width,height);await navigate(route);
     const name=route.slice(1).replaceAll('/','-')+'-'+width+'x'+height;
     const positions=[{name:'top',y:0}];
     if(route==='/factions/beluftner'){
       const y=await evaluate(`(()=>{const e=document.querySelector('video');return e?Math.round(e.getBoundingClientRect().top+scrollY-100):700;})()`);
       positions.push({name:'media',y},{name:'middle',y:Math.round(await evaluate('document.documentElement.scrollHeight/2'))},{name:'bottom',y:Math.max(0,await evaluate('document.documentElement.scrollHeight-innerHeight'))});
     }
     if(route.includes('/music/'))positions.push({name:'media',y:await evaluate(`Math.round(document.querySelector('main iframe').getBoundingClientRect().top+scrollY-80)`)});
     for(const p of positions){await evaluate(`scrollTo({top:${p.y},behavior:'instant'})`);await delay(500);const dom=await evaluate(domExpression);const screenshot=await snapshot('before-'+name+'-'+p.name);results.push({requestedRoute:route,width,height,position:p,actualY:dom.viewport.scrollY,screenshot,dom});console.log(screenshot);}
   }
   // Document exact response bytes from a served JS asset and the matching local build file.
   const script=results[0].dom.buildScripts.find(s=>s.startsWith('/_next/static/')&&!s.includes('font'));
   const response=await fetch(origin+script);const served=Buffer.from(await response.arrayBuffer());const local=await fs.readFile(path.join('.next',script.slice('/_next/'.length).split('?')[0]));
   results.push({provenance:{script,servedBytes:served.length,localBytes:local.length,identical:served.equals(local),buildId:(await fs.readFile('.next/BUILD_ID','utf8')).trim()}});
 } finally {await fs.writeFile(path.join(output,'before.json'),JSON.stringify({results,events},null,2));await close();}
}
