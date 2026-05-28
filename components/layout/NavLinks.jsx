'use client';

import Link from 'next/link';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { MOTION_EASE, MOTION_TIMINGS } from '@/lib/motion/config';

function isActivePath(pathname, href) {
  if (href === '/') {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLinks({ items, layout = 'desktop', onNavigate }) {
  const pathname = usePathname();
  const isMobile = layout === 'mobile';
  const activePillId = isMobile ? 'mobile-nav-active' : 'desktop-nav-active';

  return (
    <LazyMotion features={domAnimation} strict>
      <ul
        className={
          isMobile
            ? 'grid grid-cols-2 gap-2 sm:grid-cols-3'
            : 'flex flex-wrap justify-center gap-2'
        }
      >
        {items.map((item) => {
          const active = isActivePath(pathname, item.href);

          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                style={isMobile ? { minHeight: '44px' } : undefined}
                className={`relative inline-flex overflow-hidden ${
                  isMobile
                    ? 'items-center justify-start rounded-2xl px-4 py-3 text-sm'
                    : 'items-center justify-center rounded-full px-4 py-2 text-sm sm:text-[0.95rem]'
                } ${
                  active
                    ? 'text-slate-950 dark:text-white'
                    : 'text-gray-600 transition-colors duration-300 hover:text-slate-950 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                {active ? (
                  <m.span
                    layoutId={activePillId}
                    className={`absolute inset-0 ${
                      isMobile
                        ? 'rounded-2xl bg-slate-950/6 dark:bg-white/10'
                        : 'rounded-full bg-slate-950/6 dark:bg-white/10'
                    }`}
                    transition={{
                      duration: MOTION_TIMINGS.base,
                      ease: MOTION_EASE,
                    }}
                  />
                ) : null}
                <span className="relative z-10 truncate">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </LazyMotion>
  );
}