// Owned headless Chrome integration QA through its built-in DevTools protocol.
// No dependency installation, user browser profile, or external form submission.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const output = process.argv[2];
if (!output || !path.isAbsolute(output)) throw new Error('Provide an absolute evidence directory');
await fs.mkdir(output, { recursive: true });
const origin = 'http://127.0.0.1:3107';
const targets = await (await fetch('http://127.0.0.1:9227/json/list')).json();
const target = targets.find(item => item.type === 'page' && (!item.url || item.url === 'about:blank' || item.url.startsWith(origin)));
if (!target) throw new Error('No owned Chrome test page');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
let sequence = 0;
const pending = new Map();
const requests = [];
const responses = [];
const exceptions = [];
const failedRequests = [];
const requestUrls = new Map();
const loadingScripts = new Set();
const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
socket.addEventListener('message', event => {
  const data = JSON.parse(event.data);
  if (data.id) {
    const task = pending.get(data.id);
    if (task) { pending.delete(data.id); clearTimeout(task.timeout); data.error ? task.reject(new Error(JSON.stringify(data.error))) : task.resolve(data.result); }
  }
  if (data.method === 'Network.requestWillBeSent') {
    requestUrls.set(data.params.requestId, data.params.request.url);
    requests.push({ url: data.params.request.url, method: data.params.request.method, type: data.params.type });
    if (data.params.request.url.startsWith(origin) && data.params.type === 'Script') loadingScripts.add(data.params.requestId);
  }
  if (data.method === 'Network.responseReceived') responses.push({ url: data.params.response.url, status: data.params.response.status, mimeType: data.params.response.mimeType, type: data.params.type });
  if (data.method === 'Network.loadingFinished' || data.method === 'Network.loadingFailed') loadingScripts.delete(data.params.requestId);
  if (data.method === 'Network.loadingFailed') failedRequests.push({ url: requestUrls.get(data.params.requestId), error: data.params.errorText, blockedReason: data.params.blockedReason });
  if (data.method === 'Runtime.exceptionThrown') exceptions.push(data.params.exceptionDetails.text + ': ' + (data.params.exceptionDetails.exception?.description || ''));
});
socket.addEventListener('close', () => {
  for (const task of pending.values()) { clearTimeout(task.timeout); task.reject(new Error('Owned Chrome target closed')); }
  pending.clear();
});
function command(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error('CDP command timeout: ' + method)); }, 20000);
    pending.set(id, { resolve, reject, timeout });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || 'Evaluation failed');
  return result.result.value;
}
async function until(expression, label, timeout = 15000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) { try { if (await evaluate(expression)) return; } catch {} await delay(100); }
  throw new Error('Timed out: ' + label);
}
async function navigate(route) {
  await command('Page.navigate', { url: origin + route });
  await until(`location.pathname === ${JSON.stringify(route)} && document.readyState === 'complete' && !!document.querySelector('main')`, route);
  await until(`!!document.querySelector('[aria-label="Open Reltroner Navigator"]')`, 'Navigator rendered');
  const deadline = Date.now() + 5000;
  while (loadingScripts.size && Date.now() < deadline) await delay(100);
  await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
  await until(`(() => {const e=document.querySelector('main > div');if(!e)return false;const s=getComputedStyle(e);return (s.filter==='none'||s.filter==='blur(0px)')&&Number(s.opacity)>=0.99;})()`, 'Main content visually settled without blur');
}
async function viewport(width, height, mobile = width < 768) {
  await command('Emulation.setDeviceMetricsOverride', { width, height, screenWidth: width, screenHeight: height, deviceScaleFactor: 1, mobile });
}
const virtualKeys = { Tab: 9, Escape: 27, Enter: 13, Home: 36, End: 35, ArrowDown: 40, ArrowUp: 38, ArrowRight: 39, ArrowLeft: 37, Equal: 187, Digit0: 48, NumpadAdd: 107, KeyK: 75, KeyA: 65 };
async function key(keyValue, code, modifiers = 0) {
  const keyCode = virtualKeys[code];
  const params = { key: keyValue, code, modifiers, ...(keyCode ? { windowsVirtualKeyCode: keyCode, nativeVirtualKeyCode: keyCode } : {}) };
  await command('Input.dispatchKeyEvent', { type: 'keyDown', ...params });
  await command('Input.dispatchKeyEvent', { type: 'keyUp', ...params });
}
async function click(selector) {
  const point = await evaluate(`(() => { const el=document.querySelector(${JSON.stringify(selector)}); if(!el) throw Error('Missing selector: '+${JSON.stringify(selector)}); el.scrollIntoView({block:'center',behavior:'instant'}); const r=el.getBoundingClientRect(); if(!r.width||!r.height) throw Error('Hidden control'); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`);
  await command('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point });
  await command('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point });
}
async function replaceInput(selector, text) {
  await evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (el) {
      el.scrollIntoView({ block: 'center', behavior: 'instant' });
      el.focus();
    }
  })()`);
  try { await click(selector); } catch {}
  await evaluate(`document.querySelector(${JSON.stringify(selector)})?.focus()`);
  await key('a', 'KeyA', 2);
  await command('Input.insertText', { text });
  await evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (el && el.value !== ${JSON.stringify(text)}) {
      const proto = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
      proto?.set?.call(el, ${JSON.stringify(text)});
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
  })()`);
}
const metricsExpression = `({innerWidth,innerHeight,dpr:devicePixelRatio,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,visualWidth:visualViewport?.width,visualScale:visualViewport?.scale})`;
async function screenshot(name) {
  const metrics = await evaluate(metricsExpression);
  const shot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true });
  const bytes = Buffer.from(shot.data, 'base64');
  const file = name + '.png';
  await fs.writeFile(path.join(output, file), bytes);
  const record = { file, ...metrics, pixelWidth: bytes.readUInt32BE(16), pixelHeight: bytes.readUInt32BE(20), sha256: createHash('sha256').update(bytes).digest('hex') };
  assert.equal(record.pixelWidth, Math.round(metrics.innerWidth * metrics.dpr), 'Screenshot CSS/PNG width correlation');
  assert.equal(record.pixelHeight, Math.round(metrics.innerHeight * metrics.dpr), 'Screenshot CSS/PNG height correlation');
  results.screenshots.push(record);
  return record;
}
async function assertFocusTrap(selector) {
  const focusables = `(() => {const root=document.querySelector(${JSON.stringify(selector)}); if(!root) throw Error('Missing focus scope'); return [...root.querySelectorAll('button,a[href],input,select,textarea,[tabindex]')].filter(el=>!el.disabled && el.tabIndex>=0 && el.getClientRects().length && !el.closest('[inert]'));})()`;
  const count = await evaluate(`(${focusables}).length`);
  assert.ok(count >= 2, 'Dialog has usable controls');
  await evaluate(`(${focusables}).at(-1).focus()`);
  await key('Tab', 'Tab');
  await until(`!!document.activeElement?.closest(${JSON.stringify(selector)})`, 'forward focus trap', 3000);
  const afterTab = await evaluate(`({tag:document.activeElement.tagName,label:document.activeElement.getAttribute('aria-label')||document.activeElement.textContent?.trim().slice(0,80),inside:!!document.activeElement.closest(${JSON.stringify(selector)})})`);
  await evaluate(`(${focusables})[0].focus()`);
  await key('Tab', 'Tab', 8);
  await until(`!!document.activeElement?.closest(${JSON.stringify(selector)})`, 'reverse focus trap', 3000);
  return { count, afterTab, afterShiftTab: await evaluate(`({tag:document.activeElement.tagName,inside:!!document.activeElement.closest(${JSON.stringify(selector)})})`) };
}
const results = { browser: (await command('Browser.getVersion')).product, mode: 'Owned headless Chrome; CDP CSS viewport emulation with DPR=1 and reduced motion', routes: [], screenshots: [], interactions: [], failures: [], exceptions, failedRequests, thirdParty: [], zoom: null };
async function check(name, work) {
  try { const value = await work(); results.interactions.push({ name, status: 'PASS', value }); }
  catch (error) {
    results.failures.push({ name, error: error.stack || String(error) }); console.log('QA FAIL ' + name + ': ' + error.message);
    // Cleanup does not promote a failed case; it prevents one stranded dialog from hiding later evidence.
    try { await key('Escape','Escape'); await key('Escape','Escape'); } catch {}
  }
}
const blockedProviders = ['*google-analytics.com*', '*googletagmanager.com*', '*doubleclick.net*', '*web3forms.com*', '*resend.com*', '*formspree.io*'];
const required = ['/', '/start/creators', '/start/readers', '/contact', '/blog/for-recruiters', '/blog', '/music', '/music/lenternow-light-between-the-streets', '/places', '/places/asthortera-core-world', '/privacy', '/newsletter/unsubscribe'];
try {
  await command('Page.enable'); await command('Runtime.enable'); await command('Network.enable');
  await command('Network.setBlockedURLs', { urls: blockedProviders });
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  for (const [width, height] of [[320,480],[375,812],[768,1024],[1440,900]]) {
    await viewport(width, height);
    for (const route of required) await check(`${width}×${height} ${route}`, async () => {
      await navigate(route);
      const metrics = await evaluate(`({...${metricsExpression},visibility:(()=>{const s=getComputedStyle(document.querySelector('main > div'));return{filter:s.filter,opacity:s.opacity,transform:s.transform,reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches};})(),h1:document.querySelectorAll('main h1').length,canonical:document.querySelector('link[rel=canonical]')?.href,title:document.title,headings:[...document.querySelectorAll('main h1,main h2,main h3,main h4')].map(e=>({level:Number(e.tagName.slice(1)),text:e.textContent.slice(0,100)})),overflow:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>1 && (r.right>innerWidth+1 || r.left < -1) && getComputedStyle(e).position!=='fixed';}).map(e=>{const r=e.getBoundingClientRect();let ancestor=e.parentElement,policy='none';while(ancestor && ancestor!==document.body && ancestor!==document.documentElement){const s=getComputedStyle(ancestor),a=ancestor.getBoundingClientRect();if(['auto','scroll'].includes(s.overflowX)&&ancestor.scrollWidth>ancestor.clientWidth){policy='nested-scroll';break;}if(['hidden','clip'].includes(s.overflowX)&&a.left>=-1&&a.right<=innerWidth+1){policy='component-clip';break;}ancestor=ancestor.parentElement;}return{tag:e.tagName,class:String(e.className),left:r.left,right:r.right,width:r.width,ancestorPolicy:policy,text:e.textContent.slice(0,60)};}),brokenImages:[...document.querySelectorAll('main img')].filter(e=>e.complete&&!e.naturalWidth).map(e=>({src:e.currentSrc,alt:e.alt}))})`);
      const response = responses.filter(item => item.url === origin + route && item.type === 'Document').at(-1);
      metrics.primaryNavigation = await evaluate(`(()=>{const nav=document.querySelector('nav[aria-label="Primary navigation"]');if(!nav||!nav.getClientRects().length||!nav.getBoundingClientRect().width)return null;const container=nav.closest('.shell-container');const rect=e=>{const r=e.getBoundingClientRect();return{left:r.left,right:r.right,top:r.top,bottom:r.bottom};};return{nav:rect(nav),brand:rect(container.querySelector('a[href="/"]')),apps:rect(container.querySelector('[aria-label="Switch Reltroner Apps"]')),links:[...nav.querySelectorAll('a')].map(e=>({text:e.textContent,...rect(e)}))};})()`);
      results.routes.push({ route, width, height, status: response?.status, ...metrics });
      assert.equal(metrics.innerWidth, width, 'CSS viewport width'); assert.equal(metrics.innerHeight, height, 'CSS viewport height'); assert.equal(metrics.dpr, 1, 'DPR');
      assert.equal(metrics.h1, 1, 'One page h1'); assert.ok(metrics.scrollWidth <= metrics.clientWidth, 'No horizontal overflow'); assert.equal(response?.status, 200, 'HTTP status');
      assert.equal(metrics.overflow.filter(item=>item.ancestorPolicy==='none').length,0,'No descendant content clipped by body/root overflow');
      if (metrics.primaryNavigation) {
        const { nav, brand, apps, links } = metrics.primaryNavigation;
        assert.ok(nav.left >= brand.right - 1, 'Desktop/tablet navigation clears brand');
        assert.ok(nav.right <= apps.left + 1, 'Desktop/tablet navigation clears Apps');
        assert.ok(links.every(link=>link.left>=brand.right-1&&link.right<=apps.left+1), 'Actual navigation links do not overlap brand or Apps');
      }
      assert.ok(metrics.canonical?.startsWith('https://www.reltroner.com/'), 'Canonical metadata');
      if (['/', '/start/creators', '/start/readers', '/contact', '/places/asthortera-core-world'].includes(route)) await screenshot(`${width}x${height}-${route === '/' ? 'home' : route === '/contact' ? 'contact' : route.startsWith('/start/') ? route.split('/').at(-1) : 'reading'}`);
      return { status: response.status, width: metrics.innerWidth, height: metrics.innerHeight, h1: metrics.h1, overflow: metrics.scrollWidth - metrics.clientWidth };
    });
    console.log(`QA viewport ${width}×${height}: routes measured`);
  }

  await viewport(1440,900); await navigate('/');
  await check('Desktop article has single Reading Path rail, zero Archive Explorer rail, and clears Navigator', async () => {
    await navigate('/places/asthortera-core-world');
    const readingRail = await evaluate(`!!document.querySelector('main nav[aria-label="Reading path"]')`);
    const archiveRail = await evaluate(`!!document.querySelector('main nav[aria-label="Archive explorer"]')`);
    assert.equal(readingRail, true, 'Reading path rail is present on desktop');
    assert.equal(archiveRail, false, 'Archive explorer rail is removed from desktop articles');

    const boundsExpression = `(()=>{const rail=document.querySelector('main aside');const launcher=document.querySelector('[aria-label="Open Reltroner Navigator"]');const r=rail.getBoundingClientRect(),l=launcher.getBoundingClientRect();return{rail:{top:r.top,bottom:r.bottom,height:r.height,maxHeight:getComputedStyle(rail).maxHeight},launcher:{top:l.top,bottom:l.bottom},scrollY,visibleLinks:[...rail.querySelectorAll('a')].filter(e=>{const x=e.getBoundingClientRect();return x.bottom>r.top&&x.top<r.bottom;}).map(e=>{const x=e.getBoundingClientRect();return{href:e.getAttribute('href'),top:x.top,bottom:x.bottom};})};})()`;
    await until(`(${boundsExpression}).rail.bottom<=(${boundsExpression}).launcher.top-12`, 'Initial rail clears Navigator');
    const initial = await evaluate(boundsExpression);
    assert.ok(initial.rail.bottom <= initial.launcher.top - 12, 'Initial desktop rail reserved launcher space');
    await evaluate(`window.scrollTo({top:650,behavior:'instant'})`);
    await until(`scrollY>0 && (${boundsExpression}).rail.bottom<=(${boundsExpression}).launcher.top-12`, 'Scrolled rail clears Navigator');
    const scrolled = await evaluate(boundsExpression);
    assert.ok(scrolled.rail.bottom <= scrolled.launcher.top - 12, 'Scrolled desktop rail reserved launcher space');
    assert.ok(scrolled.visibleLinks.every(link=>Math.min(link.bottom,scrolled.rail.bottom)<=scrolled.launcher.top-12), 'Visible source links clear launcher');
    await screenshot('1440x900-reading-rail-clearance');
    await navigate('/');
    return { initial, scrolled, minimumClearance: 12, singleRail: true };
  });
  await check('Homepage audience links and certificate section order', async () => {
    const value = await evaluate(`({creatorLinks:document.querySelectorAll('main a[href="/start/creators"]').length,readerLinks:document.querySelectorAll('main a[href="/start/readers"]').length,sectionOrder:[...document.querySelectorAll('main section')].map(e=>e.querySelector('h2')?.textContent).filter(Boolean),portfolioCopy:document.querySelector('#selected-work').textContent})`);
    assert.ok(value.creatorLinks >= 2); assert.ok(value.readerLinks >= 2);
    const index = value.sectionOrder.indexOf('Selected Work & Practice');
    assert.ok(index > 0 && value.sectionOrder[index+1] === 'Notes from the Studio' && value.sectionOrder[index+2] === 'Ready to explore?', 'Portfolio followed by Newsletter then final CTA');
    assert.match(value.portfolioCopy, /completion/i); assert.match(value.portfolioCopy, /participation/i);
    return value;
  });

  await check('Homepage DOM sequence: Newsletter before Ready to explore before Footer', async () => {
    await navigate('/');
    const order = await evaluate(`(()=>{
      const ns = document.querySelector('#newsletter');
      const cta = [...document.querySelectorAll('main section')].find(s => s.textContent.includes('Ready to explore'));
      const footer = document.querySelector('footer');
      return {
        newsletterBeforeCta: !!(ns && cta && (ns.compareDocumentPosition(cta) & Node.DOCUMENT_POSITION_FOLLOWING)),
        ctaBeforeFooter: !!(cta && footer && (cta.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING)),
      };
    })()`);
    assert.equal(order.newsletterBeforeCta, true, 'Newsletter occurs before final CTA');
    assert.equal(order.ctaBeforeFooter, true, 'Final CTA occurs before footer');
    return order;
  });

  await check('TDA article scroll positions, rail boundary, and clean heading entities', async () => {
    await navigate('/technologies/tda-twin-digital-atom');
    const literalEntityFound = await evaluate(`[...document.querySelectorAll('nav[aria-label="Reading path"] a, main h1, main h2, main h3')].some(e => e.textContent.includes('&#x26;') || e.textContent.includes('&amp;#x26;'))`);
    assert.equal(literalEntityFound, false, 'Literal &#x26; not present in headings');

    await evaluate(`window.scrollTo({top: 0, behavior: 'instant'})`);
    await delay(150);
    await screenshot('1440x900-tda-top');

    const middleScroll = await evaluate(`Math.round(document.querySelector('article').offsetHeight / 2)`);
    await evaluate(`window.scrollTo({top: ${middleScroll}, behavior: 'instant'})`);
    await delay(150);
    await screenshot('1440x900-tda-middle');

    await evaluate(`document.querySelector('.surface-glass')?.scrollIntoView({block: 'start', behavior: 'instant'})`);
    await delay(150);
    await screenshot('1440x900-tda-end-related');

    await evaluate(`document.querySelector('footer').scrollIntoView({block: 'start', behavior: 'instant'})`);
    await delay(150);
    const footerTop = await evaluate(`document.querySelector('footer').getBoundingClientRect().top`);
    const railsAboveFooter = await evaluate(`[...document.querySelectorAll('aside')].every(e => e.getBoundingClientRect().bottom <= ${footerTop} + 30)`);
    assert.equal(railsAboveFooter, true, 'Sticky rails do not extend into footer');
    await screenshot('1440x900-tda-footer');

    return { literalEntityFound: false, middleScroll, railsAboveFooter: true };
  });

  await check('1024x768 medium desktop: single Reading Path rail and no redundant archive buttons', async () => {
    await viewport(1024, 768);
    await navigate('/technologies/tda-twin-digital-atom');
    const railsCount = await evaluate(`[...document.querySelectorAll('aside')].filter(e => e.querySelector('nav[aria-label="Reading path"], nav[aria-label="Archive explorer"]') && getComputedStyle(e).display !== 'none').length`);
    assert.equal(railsCount, 1, 'Only one visible rail (Reading Path) on medium desktop');
    const archiveRail = await evaluate(`!!document.querySelector('nav[aria-label="Archive explorer"]')`);
    assert.equal(archiveRail, false, 'No Archive Explorer rail on medium desktop');
    const archiveButton = await evaluate(`!!document.querySelector('button[aria-controls$="-archive"]')`);
    assert.equal(archiveButton, false, 'No Explore archive button');
    const readingButton = await evaluate(`!!document.querySelector('button[aria-controls$="-reading"]')`);
    assert.equal(readingButton, false, 'No standalone Reading path button');
    await screenshot('1024x768-tda');

    await navigate('/');
    await screenshot('1024x768-home');
    await viewport(1440, 900);
    return { railsCount, noArchiveRail: true, noRedundantButtons: true };
  });

  let paletteRoutes = [];
  await check('Global Ctrl+K published search and Escape focus', async () => {
    await key('k','KeyK',2); await until(`!!document.querySelector('[cmdk-input]')`, 'Ctrl+K opened');
    await command('Input.insertText', { text: 'worldbuilding' });
    await until(`!!document.querySelector('[cmdk-item]')`, 'Published search results');
    paletteRoutes = await evaluate(`[...document.querySelectorAll('[cmdk-item]')].map(e=>e.getAttribute('data-value')).filter(Boolean)`);
    assert.ok(paletteRoutes.some(route => /^\/blog\/.+/.test(route)), 'Published article result');
    const focusTrap = await assertFocusTrap('[role="dialog"]');
    await key('Escape','Escape'); await until(`!document.querySelector('[cmdk-input]')`, 'Palette closed');
    return { routes: paletteRoutes, focusTrap, restoredFocus: await evaluate(`document.activeElement?.tagName`) };
  });
  await check('Navigator empty, disconnected, validation, search, reset and focus trap', async () => {
    await click('[aria-label="Open Reltroner Navigator"]'); await until(`!!document.querySelector('#reltroner-navigator-panel')`, 'Navigator opened');
    assert.equal(await evaluate(`document.body.textContent.includes('AI explanations are not connected in this prototype. Public knowledge navigation is available.')`), true);
    assert.equal(await evaluate(`document.querySelector('[role="log"]').querySelectorAll('article').length`), 0);
    assert.equal(await evaluate(`document.querySelector('#reltroner-navigator-panel input[value="explain"]').disabled`), true);
    assert.equal(await evaluate(`document.querySelector('#reltroner-navigator-panel form button[type="submit"]').disabled`), true);
    await evaluate(`document.querySelector('#navigator-input').form.requestSubmit()`);
    await until(`!!document.querySelector('#navigator-input-error')`, 'Empty-input validation');
    const focusTrap = await assertFocusTrap('#reltroner-navigator-panel');
    await replaceInput('#navigator-input', 'worldbuilding'); await click('#reltroner-navigator-panel form button[type="submit"]');
    await until(`document.querySelector('[role="log"]').textContent.includes('not an AI explanation')`, 'Navigator public results');
    const routes = await evaluate(`[...document.querySelectorAll('[role="log"] ol a')].map(e=>e.getAttribute('href'))`);
    assert.ok(routes.length > 0);
    const rankedPublicPalette = paletteRoutes.filter(route => /^\/(blog|characters|cultures|events|factions|items|laws|myths|organizations|philosophies|places|principles|series|statistics|technologies|research|music|video)\/.+/.test(route));
    assert.deepEqual(routes, rankedPublicPalette.slice(0, routes.length), 'Navigator and Ctrl+K share ranking');
    await screenshot('1440x900-navigator');
    await click('[aria-label="Reset Navigator conversation"]');
    assert.equal(await evaluate(`document.querySelector('[role="log"]').querySelectorAll('article').length`), 0);
    await replaceInput('#navigator-input', 'zz-no-public-evidence-991'); await click('#reltroner-navigator-panel form button[type="submit"]');
    await until(`document.querySelector('[role="log"]').textContent.includes('No published sources matched')`, 'Insufficient evidence');
    assert.equal(await evaluate(`document.querySelectorAll('[role="log"] ol a').length`), 0);
    await click('[aria-label="Reset Navigator conversation"]');
    await replaceInput('#navigator-input', 'worldbuilding'); await click('#reltroner-navigator-panel form button[type="submit"]');
    await until(`document.querySelector('[role="log"]').textContent.includes('not an AI explanation')`, 'Retained public search');
    await key('Escape','Escape'); await until(`!document.querySelector('#reltroner-navigator-panel')`, 'Navigator Escape');
    await until(`document.activeElement?.getAttribute('aria-label')==='Open Reltroner Navigator'`, 'Navigator focus return');
    return { focusTrap, sources: routes, insufficientEvidence: true, reset: true, focusReturn: true };
  });
  await check('Navigator page context and history survive client navigation', async () => {
    await click('[aria-label="Open Reltroner Navigator"]'); await until(`!!document.querySelector('#reltroner-navigator-panel')`, 'Navigator');
    await click('#reltroner-navigator-panel a[href="/start/creators"]');
    await until(`location.pathname==='/start/creators' && !document.querySelector('#reltroner-navigator-panel')`, 'Creator navigation');
    await click('[aria-label="Open Reltroner Navigator"]'); await until(`!!document.querySelector('#reltroner-navigator-panel')`, 'Navigator on Creator');
    assert.equal(await evaluate(`document.querySelector('#reltroner-navigator-panel').textContent.includes('Current page: Creator pathway')`), true);
    assert.ok(await evaluate(`document.querySelector('[role="log"]').querySelectorAll('article').length`) > 0, 'Session history retained');
    await key('k','KeyK',2); await until(`!!document.querySelector('[cmdk-input]') && !document.querySelector('#reltroner-navigator-panel')`, 'Modal handoff to Ctrl+K');
    await key('Escape','Escape');
    await navigate('/'); await click('[aria-label="Open Reltroner Navigator"]'); await until(`!!document.querySelector('#reltroner-navigator-panel')`, 'Navigator after reload');
    assert.equal(await evaluate(`document.querySelector('[role="log"]').querySelectorAll('article').length`), 0, 'Reload clears memory-only history');
    await key('Escape','Escape');
    return { pageContext: true, sessionHistory: true, refreshClearsHistory: true, modalHandoff: true };
  });

  await viewport(375,812); await navigate('/places/asthortera-core-world');
  await check('Mobile article standalone toolbar buttons are deleted', async () => {
    const readingPill = await evaluate(`!!document.querySelector('button[aria-controls$="-reading"]')`);
    const archivePill = await evaluate(`!!document.querySelector('button[aria-controls$="-archive"]')`);
    const pillTexts = await evaluate(`[...document.querySelectorAll('button')].some(b=>['reading path','explore archive'].includes(b.textContent.trim().toLowerCase()))`);
    assert.equal(readingPill, false, 'No standalone Reading path button');
    assert.equal(archivePill, false, 'No standalone Explore archive button');
    assert.equal(pillTexts, false, 'No pill text buttons in DOM');
    return { readingPill: false, archivePill: false, pillTexts: false };
  });

  await check('Mobile hamburger menu contains Reading Path with headings and anchor navigation', async () => {
    await click('[aria-label="Open navigation"]');
    await until(`!!document.querySelector('#mobile-navigation-drawer')`, 'Mobile drawer opened');
    const focusTrap = await assertFocusTrap('#mobile-navigation-drawer');
    const drawerHasReadingPath = await evaluate(`document.querySelector('#mobile-navigation-drawer').textContent.includes('On this page — Reading Path')`);
    assert.equal(drawerHasReadingPath, true, 'Drawer contains On this page — Reading Path');
    const anchors = await evaluate(`[...document.querySelectorAll('#mobile-navigation-drawer a[href^="#"]')].map(e=>({href:e.getAttribute('href'),text:e.textContent.trim(),target:!!document.getElementById(e.getAttribute('href').slice(1))}))`);
    assert.ok(anchors.length > 0, 'Headings rendered in hamburger drawer');
    assert.equal(anchors.every(a=>a.target), true, 'All heading anchors match DOM IDs');
    await screenshot('375x812-hamburger-reading-path');

    // Test anchor navigation
    await click('#mobile-navigation-drawer a[href^="#"]');
    await until(`!document.querySelector('#mobile-navigation-drawer') && location.hash===${JSON.stringify(anchors[0].href)}`, 'Drawer closed and hash updated');
    const anchorPosition = await evaluate(`document.getElementById(${JSON.stringify(anchors[0].href.slice(1))}).getBoundingClientRect().top`);

    // Reopen and test Escape
    await click('[aria-label="Open navigation"]');
    await until(`!!document.querySelector('#mobile-navigation-drawer')`, 'Reopen drawer');
    await key('Escape','Escape');
    await until(`!document.querySelector('#mobile-navigation-drawer')`, 'Escape closed drawer');
    await until(`document.activeElement?.getAttribute('aria-label')==='Open navigation'`, 'Focus returned to hamburger button');
    return { drawerHasReadingPath: true, headingCount: anchors.length, anchorPosition, focusTrap, focusReturn: true };
  });

  await check('Non-article routes do not display Reading Path in mobile hamburger', async () => {
    await navigate('/');
    await click('[aria-label="Open navigation"]');
    await until(`!!document.querySelector('#mobile-navigation-drawer')`, 'Home drawer');
    const homeHasReading = await evaluate(`document.querySelector('#mobile-navigation-drawer').textContent.includes('On this page — Reading Path')`);
    assert.equal(homeHasReading, false, 'Homepage hamburger has no Reading Path');
    await key('Escape','Escape');
    await until(`!document.querySelector('#mobile-navigation-drawer')`, 'Home drawer closed');

    await navigate('/series');
    await click('[aria-label="Open navigation"]');
    await until(`!!document.querySelector('#mobile-navigation-drawer')`, 'Series drawer');
    const seriesHasReading = await evaluate(`document.querySelector('#mobile-navigation-drawer').textContent.includes('On this page — Reading Path')`);
    assert.equal(seriesHasReading, false, 'Series hamburger has no Reading Path');
    await key('Escape','Escape');
    await until(`!document.querySelector('#mobile-navigation-drawer')`, 'Series drawer closed');
    return { homeHasReading: false, seriesHasReading: false };
  });

  await check('Collection page /series has no Archive Explorer card, reclaimed full width layout, and functional search', async () => {
    await navigate('/series');
    const archiveRail = await evaluate(`!!document.querySelector('main nav[aria-label="Archive explorer"]')`);
    assert.equal(archiveRail, false, 'No Archive Explorer card on /series');
    const archiveCards = await evaluate(`[...document.querySelectorAll('main aside, main section')].some(e=>e.textContent.includes('The same public index and ranking as Ctrl+K'))`);
    assert.equal(archiveCards, false, 'No redundant Archive Explorer card text');
    const searchInput = await evaluate(`!!document.querySelector('#series-search')`);
    assert.equal(searchInput, true, 'Series search input present');
    const briefing = await evaluate(`!!document.querySelector('.archive-rail') && document.querySelector('.archive-rail').textContent.includes('Archive Briefing')`);
    assert.equal(briefing, true, 'Archive Briefing present');

    // Test collection search
    await replaceInput('#series-search', 'boarding');
    await until(`document.querySelector('main').textContent.includes('matching records')`, 'Series search filtering');
    const matchingCount = await evaluate(`document.querySelectorAll('main a[href^="/series/"]').length`);
    assert.ok(matchingCount >= 1, 'Matching record found');
    await screenshot('375x812-series-search');

    await viewport(1440,900);
    await screenshot('1440x900-series-reclaimed-layout');
    await viewport(375,812);
    return { noArchiveRail: true, searchInput: true, briefing: true, matchingCount };
  });

  await check('Audit all 18 published collection routes: zero Archive Explorer cards, working search inputs', async () => {
    const collections = ['blog','characters','cultures','events','factions','items','laws','myths','organizations','philosophies','places','principles','series','statistics','technologies','research','music','video'];
    const results = [];
    for (const key of collections) {
      await navigate('/' + key);
      const hasArchiveExplorer = await evaluate(`!!document.querySelector('main nav[aria-label="Archive explorer"]')`);
      assert.equal(hasArchiveExplorer, false, `No Archive Explorer on /${key}`);
      const hasSearch = await evaluate(`!!document.querySelector('#${key}-search')`);
      assert.equal(hasSearch, true, `Search input present on /${key}`);
      results.push({ key, hasArchiveExplorer: false, hasSearch: true });
    }
    return { auditedCollections: results.length, allClean: true };
  });

  await check('Mobile navbar keyboard focus and Escape', async () => {
    await click('[aria-label="Open navigation"]'); await until(`!!document.querySelector('#mobile-navigation-drawer')`, 'Mobile navigation');
    const focusTrap = await assertFocusTrap('#mobile-navigation-drawer');
    assert.equal(await evaluate(`document.documentElement.scrollWidth<=document.documentElement.clientWidth`), true);
    await key('Escape','Escape'); await until(`!document.querySelector('#mobile-navigation-drawer')`, 'Navbar Escape');
    await until(`document.activeElement?.getAttribute('aria-label')==='Open navigation'`, 'Navbar focus return');
    return { focusTrap, focusReturn: true };
  });
  await check('Collection index has archive controls and no empty reading rail; shared collection results', async () => {
    await navigate('/blog');
    assert.equal(await evaluate(`document.querySelectorAll('button[aria-controls$="-reading"]').length`), 0);
    await replaceInput('#blog-search', 'worldbuilding');
    await until(`document.querySelector('main').textContent.includes('matching records')`, 'Collection filtering');
    const routes = await evaluate(`[...document.querySelectorAll('main a[href^="/blog/"]')].filter(e=>e.querySelector('article')).map(e=>e.getAttribute('href'))`);
    assert.ok(routes.length > 0);
    const orderedBlogPalette = paletteRoutes.filter(route=>route.startsWith('/blog/'));
    assert.deepEqual(routes, orderedBlogPalette.slice(0,routes.length));
    return { readingControls: 0, results: routes };
  });

  await check('Contact intents, invalid input, local-only preview and duplicate handling', async () => {
    await navigate('/contact');
    await click('input[name="inquiry-intent"][value="creative"]');
    assert.equal(await evaluate(`document.querySelector('input[name="inquiry-intent"]:checked').value`), 'creative');
    await key('ArrowRight','ArrowRight');
    assert.equal(await evaluate(`document.querySelector('input[name="inquiry-intent"]:checked').value`), 'learning');
    await click('form button[type="submit"]');
    await until(`document.querySelector('#contact-feedback').textContent.length>0`, 'Contact validation');
    assert.equal(await evaluate(`document.activeElement.id`), 'contact-name');
    await replaceInput('#contact-name','Synthetic Test'); await replaceInput('#contact-email','synthetic@example.test');
    await replaceInput('#contact-message','A synthetic local inquiry used only for prototype validation.');
    await click('input[name="privacyAcknowledged"]'); await click('form button[type="submit"]');
    await until(`document.querySelector('#contact-feedback').textContent.includes('Local prototype')`, 'Contact local result');
    const feedback = await evaluate(`document.querySelector('#contact-feedback').textContent`);
    assert.match(feedback,/has not been sent or accepted/);
    await click('form button[type="submit"]');
    await until(`document.querySelector('#contact-feedback').textContent.includes('already previewed')`, 'Contact duplicate prevention');
    return { intentKeyboard: true, invalidFocus: 'contact-name', feedback, duplicate: true };
  });
  await check('Contact local network-error and retry states', async () => {
    await replaceInput('#contact-message','A second synthetic local inquiry used only to validate network failure.');
    await command('Network.setBlockedURLs', { urls: [...blockedProviders, `${origin}/api/contact`] });
    try {
      await click('form button[type="submit"]'); await until(`document.querySelector('#contact-feedback').textContent.includes('could not be reached')`, 'Contact local endpoint blocked');
      assert.match(await evaluate(`document.querySelector('#contact-feedback').textContent`), /not sent/);
    } finally { await command('Network.setBlockedURLs', { urls: blockedProviders }); }
    await click('form button[type="submit"]'); await until(`document.querySelector('#contact-feedback').textContent.includes('Local prototype')`, 'Contact retry local result');
    return { inducedLocalNetworkFailure: true, retryValid: true };
  });
  await check('Newsletter validation, explicit opt-in, local-only and duplicate states', async () => {
    await navigate('/'); await click('#newsletter button[type="submit"]');
    await until(`document.querySelector('#newsletter-feedback').textContent.length>0`, 'Newsletter validation');
    await replaceInput('#newsletter-email','synthetic@example.test'); await click('#newsletter button[type="submit"]');
    assert.match(await evaluate(`document.querySelector('#newsletter-feedback').textContent`), /consent|choose|opt.in/i);
    await click('#newsletter input[type="checkbox"]'); await click('#newsletter button[type="submit"]');
    await until(`document.querySelector('#newsletter-feedback').textContent.includes('Local prototype')`, 'Newsletter local result');
    const feedback = await evaluate(`document.querySelector('#newsletter-feedback').textContent`);
    assert.match(feedback,/No subscription was created and no email was sent/);
    await click('#newsletter button[type="submit"]'); await until(`document.querySelector('#newsletter-feedback').textContent.includes('already previewed')`, 'Newsletter duplicate prevention');
    return { explicitConsent: true, feedback, duplicate: true };
  });
  await check('Newsletter local network-error and retry states', async () => {
    await replaceInput('#newsletter-email','second-synthetic@example.test');
    await command('Network.setBlockedURLs', { urls: [...blockedProviders, `${origin}/api/newsletter`] });
    try { await click('#newsletter button[type="submit"]'); await until(`document.querySelector('#newsletter-feedback').textContent.includes('could not be reached')`, 'Newsletter blocked local endpoint'); }
    finally { await command('Network.setBlockedURLs', { urls: blockedProviders }); }
    await click('#newsletter button[type="submit"]'); await until(`document.querySelector('#newsletter-feedback').textContent.includes('Local prototype')`, 'Newsletter retry local result');
    return { inducedLocalNetworkFailure: true, retryValid: true };
  });
  await check('Privacy rejection leaves public functionality and no analytics scripts', async () => {
    await navigate('/privacy'); await click('section[aria-labelledby="analytics-preferences"] button');
    await until(`document.body.textContent.includes('Optional analytics rejected')`, 'Reject analytics');
    assert.equal(await evaluate(`document.querySelectorAll('script[src*="googletagmanager"],script[src*="google-analytics"]').length`),0);
    await click('[aria-label="Open Reltroner Navigator"]'); await until(`!!document.querySelector('#reltroner-navigator-panel')`, 'Navigator after reject');
    await key('Escape','Escape');
    return { rejected: true, navigatorAvailable: true };
  });
  await check('404 has genuine unavailable state and working public routes', async () => {
    await navigate('/definitely-not-a-public-entry');
    const response = responses.filter(item=>item.url===`${origin}/definitely-not-a-public-entry`&&item.type==='Document').at(-1);
    assert.equal(response?.status,404);
    assert.equal(await evaluate(`document.querySelector('main').textContent.includes('This public page is unavailable')`),true);
    assert.ok(await evaluate(`document.querySelectorAll('main a[href="/start/creators"],main a[href="/start/readers"],main a[href="/"]').length`)>=3);
    return { status:response.status };
  });
  await check('Certificate CDN pixels and truthful alt text', async () => {
    await navigate('/'); await evaluate(`document.querySelector('#selected-work').scrollIntoView({block:'start',behavior:'instant'})`);
    await until(`document.querySelectorAll('#selected-work img').length===2 && [...document.querySelectorAll('#selected-work img')].every(e=>e.complete&&e.naturalWidth>0)`, 'Both certificate images', 20000);
    const images = await evaluate(`[...document.querySelectorAll('#selected-work img')].map(e=>({src:e.currentSrc,alt:e.alt,width:e.naturalWidth,height:e.naturalHeight}))`);
    assert.match(images[0].alt,/completion certificate/i); assert.match(images[1].alt,/participation certificate/i);
    assert.equal(images.every(image=>/@[a-f0-9]{40}\//.test(image.src)),true);
    await screenshot('375x812-certificates');
    return images.map(image=>{const network=responses.filter(response=>response.url===image.src).at(-1);assert.equal(network?.status,200,'Certificate CDN response');assert.match(network.mimeType,/^image\//,'Certificate image MIME');return{...image,network};});
  });
  await check('Injected certificate network failure produces accessible fallback', async () => {
    await command('Network.setBlockedURLs', { urls:[...blockedProviders,'*direktori-listing.webp*'] });
    try {
      await navigate('/'); await evaluate(`document.querySelector('#selected-work').scrollIntoView({block:'start',behavior:'instant'})`);
      await until(`document.querySelector('#selected-work').textContent.includes('Certificate preview temporarily unavailable')`, 'Certificate fallback');
      assert.equal(await evaluate(`!!document.querySelector('#selected-work [role="status"]')`),true);
      await screenshot('375x812-certificate-fallback');
      return { meaningfulFallback:true, sourceFault:'Chrome blocked direktori-listing.webp before navigation' };
    } finally { await command('Network.setBlockedURLs',{urls:blockedProviders}); }
  });
  await check('Injected article CDN network failure preserves meaningful local placeholder', async () => {
    await command('Network.setBlockedURLs',{urls:[...blockedProviders,'*cdn.jsdelivr.net*']});
    try {
      await navigate('/places/ilumineapolis');
      await evaluate(`document.querySelector('main img')?.scrollIntoView({block:'center',behavior:'instant'})`);
      await until(`!!document.querySelector('main img[src="/media-unavailable.svg"]')`,'Article image fallback');
      const image = await evaluate(`(()=>{const e=document.querySelector('main img[src="/media-unavailable.svg"]');return{src:e.src,alt:e.alt,loaded:e.complete&&e.naturalWidth>0};})()`);
      assert.match(image.alt,/unavailable/i); assert.equal(image.loaded,true);
      return image;
    } finally { await command('Network.setBlockedURLs',{urls:blockedProviders}); }
  });

  await check('200% browser zoom attempt with measured evidence', async () => {
    await command('Emulation.clearDeviceMetricsOverride');
    await navigate('/start/creators');
    await key('0','Digit0',2); await delay(200);
    const before = await evaluate(metricsExpression);
    for(let index=0;index<4;index++) { await key('+','Equal',10); await delay(100); }
    const after = await evaluate(metricsExpression);
    const verified = Math.abs(after.dpr/before.dpr-2)<0.05 && Math.abs(before.innerWidth/after.innerWidth-2)<0.05 && after.visualScale===1;
    results.zoom = { status:verified?'VERIFIED_200_PERCENT_BROWSER_ZOOM':'NOT_VERIFIED', method:'CDP Control+Shift+Equal browser accelerator attempt; no pinch/pageScale or CSS zoom applied', before, after };
    if(verified) {
      assert.ok(after.scrollWidth<=after.clientWidth);
      await screenshot('measured-200-percent-browser-zoom');
    } else {
      results.zoom.blocker='Owned headless Chrome did not expose a browser-level 200% zoom through the dispatched native key accelerators. A visible Chrome UI check is still required.';
    }
    await key('0','Digit0',2);
    await viewport(720,450,false); await navigate('/start/creators');
    const reflow=await evaluate(metricsExpression); assert.ok(reflow.scrollWidth<=reflow.clientWidth);
    results.zoom.reflowApproximation={label:'720×450 CSS reflow: half of 1440×900 dimensions, supplemental only; not browser 200% zoom',...reflow};
    return results.zoom;
  });
  await check('No optional analytics or live external provider submissions', async () => {
    await command('Network.setBlockedURLs',{urls:blockedProviders.filter(url=>!/google-analytics|googletagmanager|doubleclick/.test(url))});
    await navigate('/privacy'); await delay(350); await navigate('/blog/for-recruiters'); await delay(350);
    results.analyticsRequests=requests.filter(item=>/google-analytics|googletagmanager|doubleclick/.test(item.url));
    results.externalProviderPosts=requests.filter(item=>item.method==='POST'&&/web3forms|resend|formspree/.test(item.url));
    const cookieNames=await evaluate(`document.cookie.split(';').map(e=>e.trim().split('=')[0]).filter(Boolean)`);
    assert.equal(cookieNames.filter(name=>/^_ga(?:_|$)/.test(name)).length,0);
    assert.equal(await evaluate(`document.querySelectorAll('script[src*="googletagmanager"],script[src*="google-analytics"]').length`),0);
    assert.equal(results.analyticsRequests.length,0);
    assert.equal(results.externalProviderPosts.length,0);
    return { analyticsNetworkUnblockedAfterIndependentConsentTests:true, analyticsAttempts:0, analyticsCookieNames:[], externalProviderPosts:0 };
  });
  await check('No browser runtime exceptions', async () => {assert.equal(exceptions.length,0);return{exceptions:0};});
} catch(error) { results.failures.push({name:'Fatal browser protocol error',error:error.stack||String(error)}); }
finally {
  results.thirdParty=[...new Set(requests.filter(item=>!item.url.startsWith(origin)&&!item.url.startsWith('data:')).map(item=>item.url))];
  results.completedAt=new Date().toISOString();
  await fs.writeFile(path.join(output,'browser-qa.json'),JSON.stringify(results,null,2));
  await fs.writeFile(path.join(output,'screenshot-manifest.json'),JSON.stringify({browser:results.browser,mode:results.mode,screenshots:results.screenshots},null,2));
  socket.close();
}
if(results.failures.length) process.exitCode=1;
console.log(JSON.stringify({routes:results.routes.length,screenshots:results.screenshots.length,passedChecks:results.interactions.length,failures:results.failures,zoom:results.zoom,exceptions:results.exceptions,analyticsRequests:results.analyticsRequests},null,2));
