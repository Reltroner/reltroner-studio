import type { EpistemicClassification } from '@/lib/content/taxonomy';

export const AI_DISCONNECTED_NOTICE =
  'AI explanations are not connected in this prototype. Public knowledge navigation is available.';

export type AssistantIntent = 'navigate' | 'explain';
export type AssistantResponseStatus =
  | 'navigation'
  | 'answer'
  | 'insufficient_evidence'
  | 'disabled'
  | 'rejected'
  | 'rate_limited'
  | 'quota_exhausted'
  | 'error';

export interface AssistantContext {
  pathname: string;
  documentId?: string;
  collection?: string;
  title: string;
  classification: EpistemicClassification | null;
}

export interface AssistantSource {
  id: string;
  title: string;
  route: string;
  collection: string;
  classification: EpistemicClassification | null;
  needsEditorialReview: boolean;
  excerpt: string;
  revision: string;
}

export interface AssistantMessageRecord {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  status?: AssistantResponseStatus;
  sources?: AssistantSource[];
}

export interface AssistantRequest {
  query: string;
  intent: AssistantIntent;
  pathname: string;
  history: Pick<AssistantMessageRecord, 'role' | 'content'>[];
}

export interface AssistantResponse {
  status: AssistantResponseStatus;
  message: string;
  sources: AssistantSource[];
  retryAfterSeconds?: number;
}

export interface AssistantProviderRequest {
  question: string;
  systemInstructions: string;
  context: AssistantContext;
  evidence: AssistantSource[];
  history: AssistantRequest['history'];
  maxOutputCharacters: number;
  signal: AbortSignal;
}

export interface AssistantProviderResult {
  answer: string;
  citedSourceIds: string[];
}

/** A server-only inference seam. It deliberately exposes no tools or credentials. */
export interface AssistantProviderAdapter {
  id: string;
  enabled: boolean;
  budget: {
    verifiedZeroIncrementalSpend: boolean;
    hardStopOnQuota: boolean;
    maxRequestsPerWindow: number;
    windowMilliseconds: number;
  };
  generate(request: AssistantProviderRequest): Promise<AssistantProviderResult>;
}
