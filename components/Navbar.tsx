import Link from "next/link";
import NavLinks from "@/components/layout/NavLinks";
import EcosystemAppSwitcher from "@/components/navigation/EcosystemAppSwitcher";
import { topNavigation } from "@/lib/constants/navigation";

export default function Navbar() {
  const navItems = topNavigation.filter(item => item.name !== 'Apps');

  return (
    <div className="px-4 py-3 text-slate-50">
      <div className="shell-container grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Brand Area */}
        <div className="flex items-center justify-start min-w-0">
          <Link href="/" className="group flex shrink-0 items-baseline gap-2 min-w-0">
            <span className="text-lg font-semibold tracking-tight transition-colors group-hover:text-blue-400">
              Reltroner Studio
            </span>
          </Link>
        </div>

        {/* Top-level Navigation */}
        <div className="flex justify-center min-w-0">
          <nav className="surface-glass px-2 py-1.5" aria-label="Primary navigation">
            <NavLinks items={navItems} />
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex shrink-0 items-center justify-end gap-2 min-w-0">
          <EcosystemAppSwitcher />
        </div>
      </div>
    </div>
  );
}
