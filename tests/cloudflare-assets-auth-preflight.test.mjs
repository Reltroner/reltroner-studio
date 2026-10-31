import test from 'node:test';
import assert from 'node:assert/strict';
import { createGithubClient } from '../tools/sync-resource-manifest.mjs';

const TOKEN = 'ghp_fixture_readonly_0123456789abcdef';
const api = 'https://api.github.com/repos/Reltroner/reltroner-studio-resource/commits/main';

test('Cloudflare Production and Preview require GITHUB_TOKEN before any HTTP request', async () => {
  for (const env of [
    { CF_PAGES: '1', CF_PAGES_BRANCH: 'main' },
    { CF_PAGES: '1', CF_PAGES_BRANCH: 'feature/preview' },
    { CF_PAGES: '1' },
    { CF_PAGES_BRANCH: 'feature/preview' },
    { CF_PAGES_BRANCH: 'main', GITHUB_TOKEN: '  ' }
  ]) {
    let calls = 0;
    assert.throws(
      () => createGithubClient({ env, fetchImpl: async () => { calls++; throw Error('NO_NETWORK'); } }),
      /GITHUB_TOKEN is required for Cloudflare Pages builds \(Production AND Preview\)/
    );
    assert.equal(calls, 0);
  }
});
test('Cloudflare main and preview authenticate API calls, but never leak a token to raw assets', async () => {
  for (const branch of ['main', 'feature/preview']) {
    const requests = [];
    const client = createGithubClient({
      env: { CF_PAGES: '1', CF_PAGES_BRANCH: branch, GITHUB_TOKEN: TOKEN },
      fetchImpl: async (url, options) => {
        requests.push({ url, headers: options.headers, redirect: options.redirect });
        if(url===api) return Response.json({ sha: 'a'.repeat(40) });
        return new Response(Buffer.from('asset'));
      }
    });
    assert.equal(client.authenticated,true);
    assert.equal(client.production,branch==='main');
    await client.json('/commits/main');
    await client.raw('a'.repeat(40),'landing-page-resource/images/example.webp',{ read: r => r.arrayBuffer() });
    assert.equal(requests.length,2);
    assert.equal(requests[0].headers.Authorization,'Bearer '+TOKEN);
    assert.equal(requests[1].headers.Authorization,undefined);
    assert.ok(requests.every(r=>r.redirect==='manual'));
    assert.ok(!JSON.stringify(client).includes(TOKEN));
  }
});
test('Local/offline code is still allowed to use the anonymous client', async () => {
  const requests=[];
  const client=createGithubClient({
    env:{},
    fetchImpl:async (url,options)=>{requests.push(options);return Response.json({sha:'b'.repeat(40)});}
  });
  assert.equal(client.authenticated,false);
  await client.json('/commits/main');
  assert.equal(requests[0].headers.Authorization,undefined);
});
test('Cloudflare credential errors do not disclose supplied secret material', () => {
  const invalid=TOKEN+'\r\nAuthorization: hostile';
  assert.throws(
    ()=>createGithubClient({env:{CF_PAGES:'1',CF_PAGES_BRANCH:'main',GITHUB_TOKEN:invalid}}),
    e=>e instanceof Error&&/cannot be sent in an HTTP header/.test(e.message)&&!e.message.includes(TOKEN)
  );
});
