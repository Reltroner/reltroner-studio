# Newsletter and contact release controls

Both integrations are opt-in and disabled by default. No welcome email, Broadcast,
contact test submission, plan purchase or upgrade runs during builds or tests.

## Private deployment configuration

Configure Preview and Production separately before their builds. Never commit real
keys or include `RESEND_API_KEY` in a `NEXT_PUBLIC_` variable.

| Variable | Scope | Meaning |
| --- | --- | --- |
| `RESEND_API_KEY` | Server only | Resend key with Contacts read/write and Segment access. A sending-only key fails closed. |
| `RESEND_SEGMENT_ID` | Server only | Owner-approved Studio marketing segment UUID. |
| `RESEND_NEWSLETTER_ENABLED` | Server only | Exact `true` selects live Contacts persistence. Anything else returns the existing local prototype response without provider calls. |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Public, build time | Existing Web3Forms form UUID. This identifier is intentionally visible in the browser. |
| `NEXT_PUBLIC_WEB3FORMS_ENABLED` | Public, build time | Exact `true` enables browser-direct submission; otherwise local preview only. |

The newsletter flag is an operator activation gate, **not evidence** of external
protection. Set it only after all the following have been independently verified:

- Resend Free marketing plan, current contact quota, no automatic paid overages,
  approved segment, and key permissions. The documented free allowance is 1,000
  marketing contacts; unsubscribed contacts still count. The provider must enforce
  the account's hard stop. The app does not implement a global contact counter.
- A published Vercel WAF rule for **POST `/api/newsletter`**, e.g. deny requests
  beyond 3 per 60 seconds per IP. Verify the project's free rule entitlement before
  publishing, preserve existing rules, and do not activate a paid add-on. Vercel's
  edge counters apply across function instances but are region-scoped; distributed
  attackers can exceed a per-IP threshold. This is abuse reduction, not identity
  verification or a globally serialized quota. No in-memory Map is presented as
  serverless-wide protection. No new database is needed.
- Deployed privacy disclosures and Resend-managed Broadcast unsubscribe settings.
  Marketing messages must include `{{{RESEND_UNSUBSCRIBE_URL}}}`. Preview the
  dashboard template and verify domain status before sending any future Broadcast.
- Account automations must not send welcome email on Contact/Segment creation.
  No automation, `/emails` or `/broadcasts` call exists in this application.

Missing/malformed keys or provider permission errors return failure, never a success
claim. Disabled service remains visibly a preview. Newsletter rendering is generated
at build time, so rebuild after changing its flag as well.

## Persistence and unsubscribe

The server validates explicit consent, normalizes email, and reads the global
Contact first. Existing suppressed contacts are rejected without mutation, even
with a checked checkbox. Existing active segment members are deduplicated. An
active nonmember can join the approved segment through the supported membership
endpoint. New contacts use `POST /contacts` with segment membership. The app never
sets `unsubscribed:false`, changes Topics, or sends email. A creation conflict is
reconciled by reading state, never by blindly retrying a mutation. Acceptance
requires matching active Contact readback and confirmed Segment membership.

The provider is the source of truth across requests/instances. Requests are bounded
to seven provider operations and eight seconds. Native transport is paced to avoid
exceeding Resend's default two requests/second within one request; simultaneous
instances can still hit the team's quota and receive safe 429 feedback. No automatic
retry occurs on rejection, quota, timeout or indeterminate mutation results.

`delivered:false` means no email delivery was attempted, and `verified:false` means
email ownership has not been verified. Neither prevents a confirmed Contact save.
Consent is required for every submission; durable double opt-in evidence is not
implemented. Do not describe this as a verified email address.

The website `/newsletter/unsubscribe` is an informational page, not a mutation
endpoint or a success page. Resend's protected link in each Broadcast manages
unsubscribe. Raw email addresses and contact IDs cannot authorize website preference
changes. A manual data request goes to the Studio; suppression must be preserved.

## Contact

Verify the existing Web3Forms Free account, recipient ownership, site configuration
and spam protection before enabling. Free currently allows 250 submissions/month;
exhaustion must stop submissions rather than upgrade. Its public key does not
prevent spam. The existing hidden honeypot and validation remain; no visible CAPTCHA
or server-side Web3Forms proxy is introduced. Do not configure auto-responses or
newsletter enrollment.

The browser posts directly to `https://api.web3forms.com/submit`. HTTP success and
literal `success:true` are both required. Errors and malformed bodies cannot become
acceptance. Acceptance does not establish mailbox delivery. `/api/contact` remains
an isolated prototype contract; it does not proxy Web3Forms.

## Verification and rollback

Automated tests use injected transports and synthetic `.test` addresses only. Do
not call provider POST endpoints during release validation. Owner manual QA should
check one consented signup, persisted segment membership, duplicate behavior,
provider-managed unsubscribe and suppression, plus one contact inquiry and actual
recipient inbox delivery. Sending a newsletter requires separate explicit approval.

Run the full Node test suite, typecheck, build and browser QA; verify old faction
URLs respond with HTTP 308. Vercel uses `npm ci` and the updated npm lockfile;
the historical `bun.lock` is not the deployment installer.

If any provider/account/WAF/environment gate is unverified, keep activation off and
block production promotion. To disable an activated release, set both activation
flags false and rebuild/redeploy. For a code rollback, promote the last verified
production deployment, checking its matching environment values first. Do not alter
DNS or the protected primary worktree.

## Owner GUI configuration, without sharing credentials with the IDE

1. Open the existing [Vercel project](https://vercel.com/reltroner/reltroner-studio).
   Confirm the `reltroner` team remains on Hobby. Under **Settings → Git**, confirm
   the production branch is `main`. Do not import or create another project.
2. Open **Settings → Environment Variables**. Review only names, environment
   targets and whether values are present. Add the five variables from the table
   above privately, for **Preview** and **Production**. Leave both activation flags
   `false` until the remaining gates below pass. Keep the Resend key server-only;
   the Web3Forms identifier is public by design. Do not export values or post
   screenshots containing them. Legacy Analytics, Formspree and reCAPTCHA variables
   do not configure these integrations; leave unrelated settings unchanged.
3. In the existing Resend account, open **Contacts → Segments**, identify the
   approved Studio segment, and place its ID in Vercel privately. Under **API Keys**,
   use an existing key with Contacts/Segments read and write permissions; a key
   restricted to email sending is insufficient. Verify the marketing Free plan,
   current quota and disabled paid overages in the account's billing/usage settings.
   Under **Automations**, confirm Contact/Segment changes do not trigger email.
4. Under Resend **Domains**, confirm an already verified sending domain before
   any newsletter sending. Under **Broadcasts**, inspect the intended template's
   protected unsubscribe link and approved recipient Segment. Do not click Send or
   send a test Broadcast during configuration. The website preferences page is only
   guidance; Resend's managed link performs the actual unsubscribe.
5. In the existing Web3Forms dashboard, select the existing form/access key and
   confirm the verified recipient, Free plan and remaining monthly allowance.
   Check the website URL, if available for that form, against
   `https://www.reltroner.com`. Review the included spam controls without enabling
   paid features or visible CAPTCHA. Place its existing access key privately in
   Vercel's public identifier variable. Do not generate an inquiry during setup.
6. In Vercel **Firewall → Rules**, inspect current rules and the included Hobby
   entitlement. Configure the newsletter POST rate rule described above, review
   its exact match/threshold/action, and publish only if it stays within the free
   entitlement. If that is unavailable or would replace a necessary existing rule,
   keep newsletter activation blocked. Do not purchase another rule or service.
7. Record only the variable names, Preview/Production scopes, presence, provider
   account verification and WAF rule metadata. Once source validation and these
   gates pass, the authorized release workflow can enable both flags before the
   respective builds, commit/push, verify the exact-SHA Preview, and then promote
   through `main`. No build or deployed SHA is inferred from local source alone.

### Separate IDE connection authorization

`BLOCKED_EXTERNAL_AUTH` describes this agent session's Vercel context, not the
owner's working ChatGPT connection or the state of the Vercel account. Do not
disconnect an already working connection merely because this context returns 403.

In the ChatGPT/Codex host supplying this session, open **Plugins → Installed →
Vercel** and open its connection settings. If that context offers reconnect or
reauthorize, select the existing Vercel identity with access to team `reltroner`
and project `reltroner-studio`, choosing read-only access where offered. Do not
create another account/project or broaden access beyond this task. The exact
connection controls depend on the host; if only the already-working ChatGPT
connection appears, stop there and use that context to verify metadata instead.
The plugin permission setting controls approval behavior, not Vercel OAuth scopes,
so changing it cannot repair the reported team-scope error.

The current agent has no OAuth reconnect tool and no available browser session.
Owner interaction is required for an account authorization prompt. Never pass a
provider API key or a Vercel token through chat to work around the connection.
See [official plugin guidance](https://learn.chatgpt.com/docs/plugins).

Official contracts: [Contacts](https://resend.com/docs/api-reference/contacts/create-contact),
[Segments](https://resend.com/docs/api-reference/contacts/add-contact-to-segment),
[Broadcasts](https://resend.com/docs/dashboard/broadcasts/introduction),
[Managed unsubscribe](https://resend.com/docs/dashboard/contacts/managing-unsubscribe-list),
[Resend pricing](https://resend.com/pricing),
[Web3Forms API](https://docs.web3forms.com/getting-started/api-reference),
[Web3Forms pricing](https://web3forms.com/pricing),
[Vercel rate limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting).
