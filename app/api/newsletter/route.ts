import { validateSubscription } from '@/lib/newsletter/schema';
import { newsletterService } from '@/lib/newsletter/service';
import { readFormRequest } from '@/lib/forms/request';
import { randomUUID } from 'node:crypto';

export async function POST(request: Request) {
  try {
    // Browser-only same-origin form: missing Origin is not an automation bypass.
    if (!request.headers.get('origin')) throw new Error('ORIGIN');
    const result = validateSubscription(await readFormRequest(request));
    if (!result.input) return Response.json({ status: 'invalid', message: result.error }, { status: 422 });
    const requestId = randomUUID();
    const feedback = await newsletterService.subscribe(result.input, requestId);
    const status = feedback.status === 'quota-error' ? 429 : feedback.status === 'network-error' ? 503 : feedback.status === 'rejected' ? 502 : feedback.status === 'invalid' ? 422 : 200;
    return Response.json(feedback, { status, headers: { 'Cache-Control': 'no-store', 'X-Request-Id': requestId } });
  } catch (error) {
    return Response.json({ status: 'rejected', message: 'The request could not be validated. Try again from this website.' }, { status: error instanceof Error && error.message === 'ORIGIN' ? 403 : 400 });
  }
}
