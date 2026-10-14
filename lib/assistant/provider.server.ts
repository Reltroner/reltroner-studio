import 'server-only';
import { resolveAssistantContext } from './context';
import { ASSISTANT_SYSTEM_INSTRUCTIONS, MAX_ASSISTANT_OUTPUT, createAssistantRateLimiter, requestsPrivilegedAccess } from './guardrails';
import { createNavigationResponse, retrievePublicSources } from './retrieval';
import { AI_DISCONNECTED_NOTICE, type AssistantProviderAdapter, type AssistantRequest, type AssistantResponse } from './types';
import type { PublicContentEntry } from '@/lib/content/taxonomy';

/** No environment variable silently enables inference. An operator-reviewed adapter is required. */
export function getConfiguredAssistantProvider(): AssistantProviderAdapter | null {
  return null;
}

export class AssistantProviderError extends Error {
  constructor(public code: 'quota_exhausted' | 'rate_limited' | 'unavailable') {
    super(code);
  }
}

export function createAssistantService(provider: AssistantProviderAdapter | null = null) {
  const consumeBudget = createAssistantRateLimiter(
    provider?.budget.maxRequestsPerWindow || 1,
    provider?.budget.windowMilliseconds || 60_000,
    1,
  );

  return async function respond(request: AssistantRequest, entries: readonly PublicContentEntry[]): Promise<AssistantResponse> {
    if (requestsPrivilegedAccess(request.query)) {
      return { status: 'rejected', message: 'Navigator can search published public knowledge only. It cannot access private records, credentials, databases, or execute commands.', sources: [] };
    }
    if (request.intent === 'navigate') return createNavigationResponse(entries, request.query);
    if (!provider?.enabled || provider.budget.verifiedZeroIncrementalSpend !== true || provider.budget.hardStopOnQuota !== true
      || !Number.isInteger(provider.budget.maxRequestsPerWindow) || provider.budget.maxRequestsPerWindow < 1 || provider.budget.maxRequestsPerWindow > 100
      || !Number.isInteger(provider.budget.windowMilliseconds) || provider.budget.windowMilliseconds < 1000 || provider.budget.windowMilliseconds > 86_400_000) {
      return { status: 'disabled', message: AI_DISCONNECTED_NOTICE, sources: retrievePublicSources(entries, request.query) };
    }

    const evidence = retrievePublicSources(entries, request.query, { approvedEvidenceOnly: true, limit: 4 });
    if (!evidence.length) return { status: 'insufficient_evidence', message: 'There is not enough editorially classified public evidence for an AI explanation. Public navigation remains available.', sources: retrievePublicSources(entries, request.query) };
    const quota = consumeBudget('provider');
    if (!quota.allowed) return { status: 'quota_exhausted', message: 'The prototype explanation quota is exhausted. Public navigation remains available.', sources: evidence, retryAfterSeconds: quota.retryAfterSeconds };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);
    let rejectTimeout: ReturnType<typeof setTimeout>;
    const timedOut = new Promise<never>((_, reject) => {
      rejectTimeout = setTimeout(() => reject(new AssistantProviderError('unavailable')), 12_050);
    });
    try {
      const result = await Promise.race([
        provider.generate({
          question: request.query,
          systemInstructions: ASSISTANT_SYSTEM_INSTRUCTIONS,
          context: resolveAssistantContext(request.pathname, entries),
          evidence,
          history: request.history,
          maxOutputCharacters: MAX_ASSISTANT_OUTPUT,
          signal: controller.signal,
        }),
        timedOut,
      ]);
      if (!result || typeof result.answer !== 'string' || !result.answer.trim() || result.answer.length > MAX_ASSISTANT_OUTPUT || !Array.isArray(result.citedSourceIds)) {
        return { status: 'error', message: 'The explanation provider returned an invalid response. Use public navigation instead.', sources: evidence };
      }
      const approvedIds = new Set(evidence.map((source) => source.id));
      if (!result.citedSourceIds.length || result.citedSourceIds.some((id) => typeof id !== 'string' || !approvedIds.has(id))) {
        return { status: 'insufficient_evidence', message: 'The provider could not substantiate its explanation with the approved sources. Public navigation remains available.', sources: evidence };
      }
      return { status: 'answer', message: result.answer.trim(), sources: evidence.filter((source) => result.citedSourceIds.includes(source.id)) };
    } catch (error) {
      const status = error instanceof AssistantProviderError && error.code !== 'unavailable' ? error.code : 'error';
      return { status, message: status === 'quota_exhausted' ? 'The explanation quota is exhausted. Public navigation remains available.' : status === 'rate_limited' ? 'Explanations are temporarily rate limited. Public navigation remains available.' : 'AI explanations are temporarily unavailable. Public navigation remains available.', sources: evidence };
    } finally {
      clearTimeout(timeout);
      clearTimeout(rejectTimeout!);
    }
  };
}
