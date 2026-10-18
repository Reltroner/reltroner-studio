import Link from 'next/link';

export default function NotFound() {
  return <div className="editorial-shell px-4 py-16"><p className="text-sm text-blue-300">404</p><h1 className="mt-3 text-4xl font-bold">This public page is unavailable.</h1><p className="mt-5 leading-7 text-slate-300">The address may have changed, or the entry may not be published. Search the public archive or choose a starting path.</p><div className="mt-8 flex flex-wrap gap-4"><Link className="rs-action-primary" href="/">Return home</Link><Link className="inline-flex min-h-12 items-center text-blue-300 underline" href="/readers">Start as a reader</Link><Link className="inline-flex min-h-12 items-center text-blue-300 underline" href="/creators">Start as a creator</Link></div></div>;
}
