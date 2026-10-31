# Cloudflare Pages — GitHub asset synchronization (build-time)

## Incident (2026-10-31)

A Pages build on commit `a9bf07733caf75856f88155f59149349192b3eba` failed before Next.js:

```text
npm ci && npm run build
prebuild -> npm run assets:sync
GitHub API /commits/main is rate limited (HTTP 403) for anonymous access
```

**Cause:** `tools/sync-first-party-assets.mjs` calls the public GitHub API for the resource repository's current commit and verified tree. The request was anonymous, so GitHub's shared anonymous quota was exhausted. This is **not** a Markdown or NCCM V6.5 test failure.

## Mandatory one-time Cloudflare configuration

1. Open **Cloudflare Dashboard → Workers & Pages → reltroner-studio-cf → Settings → Variables and Secrets** (the UI may say *Environment variables*).
2. Create a **fine-grained GitHub personal access token** scoped only to the public repository `Reltroner/reltroner-studio-resource`. Grant the minimum read-only permissions for repository **Contents: Read** (plus mandatory read-only metadata); do **not** grant write, Actions admin, or account-wide scopes. Follow the owning GitHub organization's token approval policy.
3. Under **Production**, add the **encrypted build-time secret** named exactly `GITHUB_TOKEN`; set its value to that token.
4. Under **Preview**, add the same secret (or a separate equally scoped token), also named exactly `GITHUB_TOKEN`. A preview build **also** runs `assets:sync` and must not consume anonymous API quota.
5. Redeploy the appropriate failed build. Check that its log ends with `[assets] PASS: ...; GitHub API authenticated`, then that `npm run build`, static export, and `assets:verify` complete successfully.

Never send the secret in chat, insert it into `package.json`, put it in a committed `.env` / `wrangler.toml`, print it in logs, or expose it through `NEXT_PUBLIC_*`. It is exclusively a **build-time** secret. The client confines the bearer token to requests targeting `api.github.com`; byte downloads from `raw.githubusercontent.com` remain anonymous and are integrity-checked using Git blob hashes and SHA-256.

## Protected behavior

- A Cloudflare Production **or Preview** build missing `GITHUB_TOKEN` now stops **before any GitHub request** and says exactly which Cloudflare setting must be configured.
- A bad token (401/403) fails closed, with no retry using anonymous credentials.
- Requests that are rate-limited retry only inside the bounded wait. Token rate limit exhaustion is reported without exposing the credential.
- The build **does not** fall back to a potentially outdated `resource-snapshot.json`, disable `assets:sync`, or bypass manifest/export integrity verification.
- Local development may still use anonymous GitHub API access, but will fail if its rate limit is exhausted. A local token may be set as a noncommitted environment variable if necessary.

### Verification commands

```bash
node --test tests/cloudflare-assets-auth-preflight.test.mjs
npm run assets:sync
npm run build
```

The second and third commands need network access and a valid build token in Cloudflare; GitHub Actions credential-safety tests intentionally use only mocked network requests. **A green GitHub Actions check does not prove Cloudflare's secret has been configured or that its deployment succeeded.**

Sources: https://developers.cloudflare.com/pages/configuration/build-configuration/ and https://developers.cloudflare.com/pages/functions/bindings/
