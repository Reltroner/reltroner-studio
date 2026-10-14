'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { PublicContentEntry } from '@/lib/content/taxonomy';
import { resolveAssistantContext } from '@/lib/assistant/context';
import { MAX_ASSISTANT_HISTORY, MAX_ASSISTANT_INPUT, requestsPrivilegedAccess, validateAssistantInput } from '@/lib/assistant/guardrails';
import { createNavigationResponse } from '@/lib/assistant/retrieval';
import { AI_DISCONNECTED_NOTICE, type AssistantIntent, type AssistantMessageRecord, type AssistantResponse } from '@/lib/assistant/types';
import AssistantLauncher from './AssistantLauncher';
import AssistantPanel from './AssistantPanel';

/** No provider is connected by default. Public navigation never calls an inference endpoint. */
export default function AssistantRoot({ entries, providerAvailable = false }: { entries: PublicContentEntry[]; providerAvailable?: boolean }) {
  const pathname = usePathname() || '/';
  const context = useMemo(() => resolveAssistantContext(pathname, entries), [pathname, entries]);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessageRecord[]>([]);
  const [busy, setBusy] = useState(false);
  const nextMessageId = useRef(0);
  const pending = useRef(false);
  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const closeForSearch = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey)) closeForSearch();
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('reltroner:command-palette:open', closeForSearch);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('reltroner:command-palette:open', closeForSearch);
    };
  }, []);

  const close = () => {
    setOpen(false);
    // Headless UI restores focus automatically; this also covers closing via route links.
    requestAnimationFrame(() => launcherRef.current?.focus({ preventScroll: true }));
  };

  const openSearch = () => {
    setOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      window.dispatchEvent(new Event('reltroner:command-palette:open'));
    }));
  };

  const navigateReadingPath = (id: string) => {
    setOpen(false);
    // Finish dialog focus restoration before focusing the actual article heading.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const heading = document.getElementById(id);
      if (!heading) return;
      window.history.pushState(null, '', `#${encodeURIComponent(id)}`);
      heading.scrollIntoView({ block: 'start', behavior: 'instant' });
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }));
  };

  const appendResponse = (response: AssistantResponse) => {
    const record: AssistantMessageRecord = { id: `navigator-${++nextMessageId.current}`, role: 'assistant', content: response.message, status: response.status, sources: response.sources };
    setMessages((current) => [...current, record].slice(-40));
  };

  const submit = async (value: string, intent: AssistantIntent) => {
    if (pending.current) return;
    const input = validateAssistantInput(value);
    if (!input.valid) { appendResponse({ status: 'rejected', message: 'error' in input ? input.error : 'Invalid input.', sources: [] }); return; }
    const query = input.query;
    pending.current = true;
    setBusy(true);
    const history = messages.slice(-MAX_ASSISTANT_HISTORY).map(({ role, content }) => ({ role, content: content.slice(0, MAX_ASSISTANT_INPUT) }));
    const userMessage: AssistantMessageRecord = { id: `navigator-${++nextMessageId.current}`, role: 'user', content: query };
    setMessages((current) => [...current, userMessage].slice(-40));
    try {
      if (requestsPrivilegedAccess(query)) {
        appendResponse({ status: 'rejected', message: 'Navigator can search published public knowledge only. It cannot access private records, credentials, databases, or execute commands.', sources: [] });
      } else if (intent === 'navigate') {
        appendResponse(createNavigationResponse(entries, query));
      } else if (!providerAvailable) {
        appendResponse({ status: 'disabled', message: AI_DISCONNECTED_NOTICE, sources: [] });
      } else {
        const controller = new AbortController();
        abortRef.current = controller;
        const timeout = setTimeout(() => controller.abort(), 15_000);
        try {
          const response = await fetch('/api/assistant', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
            body: JSON.stringify({ query, intent, pathname, history }),
          });
          const result = await response.json() as AssistantResponse;
          const validStatuses = ['navigation', 'answer', 'insufficient_evidence', 'disabled', 'rejected', 'rate_limited', 'quota_exhausted', 'error'];
          if (typeof result.message !== 'string' || !validStatuses.includes(result.status) || !Array.isArray(result.sources)) throw new Error('Invalid explanation response');
          const allowedSources = new Map(entries.filter((entry) => entry.published === true).map((entry) => [entry.id, entry.canonicalRoute]));
          result.sources = result.sources.filter((source) => allowedSources.get(source.id) === source.route && source.route.startsWith('/'));
          appendResponse(result);
        } finally {
          clearTimeout(timeout);
          abortRef.current = null;
        }
      }
    } catch {
      appendResponse({ status: 'error', message: 'The explanation service could not be reached. Search published knowledge or use the pathway links while it is unavailable.', sources: [] });
    } finally {
      pending.current = false;
      setBusy(false);
    }
  };

  return (
    <>
      <AssistantLauncher open={open} onOpen={() => setOpen(true)} buttonRef={launcherRef} />
      <AssistantPanel key={pathname} open={open} onClose={close} onReset={() => setMessages([])} context={context} messages={messages} busy={busy} providerAvailable={providerAvailable} onSubmit={submit} onOpenSearch={openSearch} onReadingNavigate={navigateReadingPath} />
    </>
  );
}
