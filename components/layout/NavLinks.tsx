'use client';

import Link from 'next/link';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { MOTION_EASE, MOTION_TIMINGS } from '@/lib/motion/config';

export interface NavLinkItem {
  name: string;
  href: string;
}

interface NavLinksProps {
  items: NavLinkItem[];
  layout?: 'desktop' | 'mobile';
  onNavigate?: () => void;
}

function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === '/') {
    return pathname === href;
  }
  // Avoid active state for anchor links when not on homepage
  if (href.startsWith('#')) {
    return false;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLinks({ items, layout = 'desktop', onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const isMobile = layout === 'mobile';
  const activePillId = isMobile ? 'mobile-nav-active' : 'desktop-nav-active';

  return (
    <LazyMotion features={domAnimation} strict>
      <ul
        className={
          isMobile
            ? 'grid grid-cols-2 gap-2 sm:grid-cols-3'
            : 'flex flex-wrap justify-center gap-1 sm:gap-2'
        }
      >
        {items.map((item) => {
          const active = isActivePath(pathname, item.href);

          return (
            <li key={item.name} className="relative">
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                style={isMobile ? { minHeight: '44px' } : undefined}
                className={`relative inline-flex overflow-hidden ${
                  isMobile
                    ? 'items-center justify-start rounded-2xl px-4 py-3 text-sm'
                    : 'items-center justify-center rounded-full px-3 sm:px-4 py-2 text-[0.85rem] sm:text-[0.95rem]'
                } ${
                  active
                    ? 'text-white font-medium'
                    : 'text-slate-300 transition-colors duration-300 hover:text-white'
                }`}
              >
                {active ? (
                  <m.span
                    layoutId={activePillId}
                    className={`absolute inset-0 ${
                      isMobile
                        ? 'rounded-2xl bg-white/10'
                        : 'rounded-full bg-white/10'
                    }`}
                    transition={{
                      duration: MOTION_TIMINGS.base,
                      ease: MOTION_EASE as any,
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
