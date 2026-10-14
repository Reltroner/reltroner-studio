import Link from 'next/link';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 pt-12 pb-16 text-slate-400">
      <div className="shell-container mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block text-xl font-bold tracking-tight text-white hover:text-blue-300 focus-visible:rs-focus-ring rounded">
              Reltroner Studio
            </Link>
            <p className="max-w-sm text-sm leading-6 text-slate-300">
              A multi-disciplinary digital studio bridging autonomous software engineering, creative frameworks, and civilizational worldbuilding.
            </p>
            <p className="text-xs leading-5 text-slate-400">
              Public knowledge archive and digital ecosystem gateway for creators, readers, and engineering collaborators.
            </p>
          </div>

          {/* Group 1: Pathways */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-200">
              Getting Started
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/start/creators" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  For Creators
                </Link>
              </li>
              <li>
                <Link href="/start/readers" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  For Readers
                </Link>
              </li>
              <li>
                <Link href="/blog/for-recruiters" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  For Recruiters
                </Link>
              </li>
              <li>
                <Link href="/about" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  About Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Group 2: Public Knowledge */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-200">
              Knowledge Base
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/technologies" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  Technologies
                </Link>
              </li>
              <li>
                <Link href="/research" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  Research &amp; SaaS
                </Link>
              </li>
              <li>
                <Link href="/philosophies" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  Philosophies
                </Link>
              </li>
              <li>
                <Link href="/places" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  World Map &amp; Places
                </Link>
              </li>
              <li>
                <Link href="/characters" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  Characters
                </Link>
              </li>
              <li>
                <Link href="/blog" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  Journal Dossier
                </Link>
              </li>
            </ul>
          </div>

          {/* Group 3: Ecosystem & Engagement */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-200">
              Ecosystem &amp; Studio
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://lms.reltroner.com" target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  LMS Learning Grid ↗
                </a>
              </li>
              <li>
                <a href="https://hrm.reltroner.com" target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  HRM Management ↗
                </a>
              </li>
              <li>
                <Link href="/music" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  Music Releases
                </Link>
              </li>
              <li>
                <Link href="/video" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  Video Archive
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  Contact Studio
                </Link>
              </li>
              <li>
                <Link href="/#newsletter" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  Studio Newsletter
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="inline-flex min-h-8 items-center text-slate-300 hover:text-white transition focus-visible:rs-focus-ring rounded">
                  Privacy &amp; Analytics
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom separator & copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Reltroner Studio. All rights reserved.</p>
          <p className="text-center sm:text-right max-w-lg">
            Worldbuilding records represent creative fiction canon. Engineering case studies represent real-world software architecture.
          </p>
        </div>
      </div>
    </footer>
  );
}
