import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

// The tracker reads the same public settings as a production build; nothing here loads or contacts Google.
const originalEnv = { ...process.env };
Object.assign(process.env, { NODE_ENV: 'production', NEXT_PUBLIC_ENABLE_ANALYTICS: 'true', NEXT_PUBLIC_GA_ID: 'G-TEST1234' });
const { ANALYTICS_CONSENT_KEY } = await import('../lib/privacy/analytics-consent.ts');
const { createPageViewTracker } = await import('../lib/gtag.js');
const ID = 'G-TEST1234';
const ORIGIN = 'https://www.reltroner.com';
const DENIED_ADS = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };

test.after(() => {
  delete globalThis.window;
  delete globalThis.document;
  process.env = originalEnv;
});

// A browser whose dataLayer records every gtag command, plus whether GA's opt-out flag was set at that moment.
function browser({ consent = 'granted', path = '/', title = 'Home', referrer = '', search = '' } = {}) {
  let stored = consent;
  const scripts = [];
  const pushed = [];
  const dataLayer = [];
  dataLayer.push = (args) => { pushed.push({ command: [...args], disabled: globalThis.window[`ga-disable-${ID}`] === true }); return Array.prototype.push.call(dataLayer, args); };
  globalThis.window = {
    location: { origin: ORIGIN, pathname: path, search },
    localStorage: { getItem: (key) => { if (stored === 'unavailable') throw new Error('SecurityError'); return key === ANALYTICS_CONSENT_KEY ? stored : null; } },
    dataLayer,
  };
  globalThis.document = { title, referrer, head: { appendChild: (script) => scripts.push(script) }, createElement: (tagName) => ({ tagName }) };
  return {
    scripts,
    pushed,
    sent: () => pushed.filter(({ command }) => command[0] === 'event' && command[1] === 'page_view').map(({ command }) => command[2]),
    commands: (name) => pushed.filter(({ command }) => command[0] === name).map(({ command }) => command),
    setConsent: (value) => { stored = value; },
    visit: (tracker, to, newTitle) => { globalThis.window.location.pathname = to; globalThis.window.location.search = ''; globalThis.document.title = newTitle; tracker.observe(to); },
  };
}

function started(options) {
  const b = browser(options);
  const tracker = createPageViewTracker();
  tracker.sync();
  tracker.observe(options?.path ?? '/');
  return { b, tracker };
}

test('no tag and no page views without an explicit grant', () => {
  for (const consent of [null, 'denied']) {
    const { b, tracker } = started({ consent });
    b.visit(tracker, '/about', 'About');
    tracker.sync();
    assert.equal(b.scripts.length, 0);
    assert.equal(globalThis.window.gtag, undefined);
    assert.deepEqual(b.pushed, []);
  }
});

test('stored consent loads the tag once and sends the initial page view once, after the tag is ready', () => {
  const { b } = started({ referrer: 'https://search.example/results?q=private+question' });
  assert.equal(b.scripts.length, 1);
  assert.equal(b.scripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${ID}`);
  assert.equal(b.scripts[0].async, true);
  assert.deepEqual(b.commands('config'), [['config', ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false }]]);
  assert.deepEqual(b.sent(), [], 'nothing is queued while the tag loads');
  b.scripts[0].onload();
  assert.deepEqual(b.sent(), [{ page_location: `${ORIGIN}/`, page_referrer: 'https://search.example/results', page_title: 'Home' }]);
});

test('granting consent on the current page sends one page view; repeated grants send none', () => {
  const { b, tracker } = started({ consent: null, path: '/about', title: 'About' });
  assert.equal(b.scripts.length, 0);
  b.setConsent('granted');
  tracker.sync();
  b.scripts[0].onload();
  tracker.sync();
  tracker.sync();
  assert.equal(b.scripts.length, 1);
  assert.deepEqual(b.sent().map((view) => view.page_location), [`${ORIGIN}/about`]);
});

test('each route change is one page view, revisits count again and duplicate lifecycle calls do not', () => {
  const { b, tracker } = started();
  b.scripts[0].onload();
  b.visit(tracker, '/about', 'About');
  tracker.observe('/about');
  tracker.sync();
  tracker.observe('/about');
  b.visit(tracker, '/explore', 'Explore');
  b.visit(tracker, '/about', 'About');
  assert.equal(b.scripts.length, 1);
  assert.equal(b.commands('config').length, 1);
  assert.deepEqual(b.sent(), [
    { page_location: `${ORIGIN}/`, page_referrer: '', page_title: 'Home' },
    { page_location: `${ORIGIN}/about`, page_referrer: `${ORIGIN}/`, page_title: 'About' },
    { page_location: `${ORIGIN}/explore`, page_referrer: `${ORIGIN}/about`, page_title: 'Explore' },
    { page_location: `${ORIGIN}/about`, page_referrer: `${ORIGIN}/explore`, page_title: 'About' },
  ]);
});

test('browser back and forward are counted like any other navigation', () => {
  const { b, tracker } = started();
  b.scripts[0].onload();
  b.visit(tracker, '/about', 'About');
  b.visit(tracker, '/', 'Home');
  b.visit(tracker, '/about', 'About');
  assert.deepEqual(b.sent().map((view) => view.page_location), [`${ORIGIN}/`, `${ORIGIN}/about`, `${ORIGIN}/`, `${ORIGIN}/about`]);
});

test('navigating while the tag loads sends only the current page, once, when the tag is ready', () => {
  const { b, tracker } = started();
  b.visit(tracker, '/about', 'About');
  b.visit(tracker, '/explore', 'Explore');
  assert.deepEqual(b.sent(), []);
  b.scripts[0].onload();
  assert.deepEqual(b.sent(), [{ page_location: `${ORIGIN}/explore`, page_referrer: `${ORIGIN}/about`, page_title: 'Explore' }]);
  b.visit(tracker, '/about', 'About');
  assert.equal(b.sent().length, 2);
});

test('revoking consent disables the tag, stops page views and never replays them', () => {
  const { b, tracker } = started();
  b.scripts[0].onload();
  b.setConsent('denied');
  tracker.sync();
  assert.equal(globalThis.window[`ga-disable-${ID}`], true);
  assert.deepEqual(b.commands('consent').at(-1), ['consent', 'update', { analytics_storage: 'denied', ...DENIED_ADS }]);
  b.visit(tracker, '/about', 'About');
  b.visit(tracker, '/explore', 'Explore');
  assert.equal(b.sent().length, 1);
  b.setConsent('granted');
  tracker.sync();
  assert.equal(globalThis.window[`ga-disable-${ID}`], false);
  assert.deepEqual(b.sent().slice(1), [{ page_location: `${ORIGIN}/explore`, page_referrer: `${ORIGIN}/about`, page_title: 'Explore' }]);
  b.visit(tracker, '/about', 'About');
  assert.equal(b.sent().length, 3);
  assert.equal(b.scripts.length, 1, 'the tag is not inserted or configured again');
  assert.equal(b.commands('config').length, 1);
  assert.ok(b.pushed.filter(({ command }) => command[0] === 'event').every(({ disabled }) => !disabled), 'no event is handed to the tag while it is disabled');
});

test('granting consent again on the same page sends that page once more, and only once', () => {
  const { b, tracker } = started();
  b.scripts[0].onload();
  b.setConsent('denied');
  tracker.sync();
  b.setConsent('granted');
  tracker.sync();
  tracker.sync();
  assert.deepEqual(b.sent().map((view) => view.page_location), [`${ORIGIN}/`, `${ORIGIN}/`]);
});

test('revoking consent while the tag loads cancels the pending page view', () => {
  const { b, tracker } = started();
  b.setConsent('denied');
  tracker.sync();
  b.scripts[0].onload();
  b.visit(tracker, '/about', 'About');
  assert.deepEqual(b.sent(), []);
  b.setConsent('granted');
  tracker.sync();
  assert.deepEqual(b.sent().map((view) => view.page_location), [`${ORIGIN}/about`]);
});

test('revoking and granting again before the tag loads still sends one page view', () => {
  const { b, tracker } = started();
  b.setConsent('denied');
  tracker.sync();
  b.setConsent('granted');
  tracker.sync();
  b.scripts[0].onload();
  assert.equal(b.scripts.length, 1);
  assert.deepEqual(b.sent().map((view) => view.page_location), [`${ORIGIN}/`]);
});

test('a tag that fails to load sends nothing and is not inserted again', () => {
  const { b, tracker } = started();
  b.scripts[0].onerror();
  b.visit(tracker, '/about', 'About');
  b.setConsent('denied');
  tracker.sync();
  b.setConsent('granted');
  tracker.sync();
  assert.equal(b.scripts.length, 1);
  assert.deepEqual(b.sent(), []);
});

test('advertising consent stays denied through grant, revoke and grant again', () => {
  const { b, tracker } = started();
  b.scripts[0].onload();
  b.setConsent('denied');
  tracker.sync();
  b.setConsent('granted');
  tracker.sync();
  const consent = b.commands('consent');
  assert.equal(consent.length, 3);
  for (const [, , settings] of consent) assert.deepEqual({ ad_storage: settings.ad_storage, ad_user_data: settings.ad_user_data, ad_personalization: settings.ad_personalization }, DENIED_ADS);
  assert.deepEqual(consent.map(([, kind, settings]) => `${kind}:${settings.analytics_storage}`), ['default:granted', 'update:denied', 'update:granted']);
});

test('development, disabled analytics, missing or invalid IDs and unavailable storage stay silent', () => {
  const cases = [
    ['development', () => { process.env.NODE_ENV = 'development'; }, undefined, 'granted'],
    ['analytics disabled', () => { process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'false'; }, undefined, 'granted'],
    ['missing ID', () => {}, '', 'granted'],
    ['invalid ID', () => {}, 'UA-12345-1', 'granted'],
    ['storage unavailable', () => {}, undefined, 'unavailable'],
  ];
  for (const [name, configure, measurementId, consent] of cases) {
    const env = { ...process.env };
    try {
      configure();
      const b = browser({ consent });
      const tracker = createPageViewTracker(measurementId);
      tracker.sync();
      tracker.observe('/');
      b.visit(tracker, '/about', 'About');
      tracker.sync();
      assert.equal(b.scripts.length, 0, name);
      assert.equal(globalThis.window.gtag, undefined, name);
      assert.deepEqual(b.pushed, [], name);
    } finally { process.env = env; }
  }
});

test('the page location keeps only campaign tags from the query string', () => {
  const { b } = started({ search: '?utm_source=newsletter&email=reader%40example.com&token=abc&utm_campaign=october' });
  b.scripts[0].onload();
  const [view] = b.sent();
  assert.equal(view.page_location, `${ORIGIN}/?utm_source=newsletter&utm_campaign=october`);
  assert.equal('page_path' in view, false);
  assert.doesNotMatch(JSON.stringify(b.pushed), /reader|token=|abc/);
});

test('GoogleAnalytics is the only page-view owner', async () => {
  const sources = [];
  for (const dir of ['app', 'components', 'lib']) {
    for (const file of await fs.readdir(dir, { recursive: true })) {
      if (/\.(js|jsx|ts|tsx)$/.test(file)) sources.push([path.join(dir, file).replaceAll('\\', '/'), await fs.readFile(path.join(dir, file), 'utf8')]);
    }
  }
  assert.deepEqual(sources.filter(([, text]) => text.includes('page_view')).map(([file]) => file), ['lib/gtag.js']);
  assert.deepEqual(sources.filter(([, text]) => text.includes('googletagmanager.com')).map(([file]) => file), ['lib/gtag.js']);
  assert.deepEqual(sources.filter(([, text]) => /\bpageViews\b/.test(text)).map(([file]) => file).sort(), ['components/GoogleAnalytics.jsx', 'lib/gtag.js']);
  const layout = sources.find(([file]) => file === 'app/layout.tsx')[1];
  assert.equal(layout.match(/<GoogleAnalytics \/>/g)?.length, 1);
  assert.doesNotMatch(layout, /RouteAnalytics/);
  const component = sources.find(([file]) => file === 'components/GoogleAnalytics.jsx')[1];
  assert.match(component, /pageViews\.observe\(pathname\)/);
});
