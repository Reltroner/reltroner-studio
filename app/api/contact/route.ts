import { validateInquiry } from '@/lib/contact/schema';
import { contactService } from '@/lib/contact/service';
import { readFormRequest } from '@/lib/forms/request';

export async function POST(request: Request) {
  try {
    const checked = validateInquiry(await readFormRequest(request));
    if (!checked.input) return Response.json({ status: 'invalid', message: checked.error }, { status: 422 });
    return Response.json(await contactService.submit(checked.input), { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return Response.json({ status: 'rejected', message: 'The inquiry could not be validated. Please try again from this website.' }, { status: error instanceof Error && error.message === 'ORIGIN' ? 403 : 400 });
  }
}
