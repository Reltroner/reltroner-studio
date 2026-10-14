import NavLinks from "@/components/layout/NavLinks";
import EcosystemAppSwitcher from "@/components/navigation/EcosystemAppSwitcher";
import { topNavigation } from "@/lib/constants/navigation";

export default function Navbar() {
  const navItems = topNavigation.filter(item => item.name !== 'Apps');

  return (
    <div className="px-4 pt-[38px] pb-0 text-slate-50">
      <div className="shell-container grid grid-cols-1 items-center">
        {/* Top-level Navigation */}
        <div className="col-start-1 row-start-1 flex min-w-0 justify-center px-24">
          <nav className="surface-glass px-2 py-1.5" aria-label="Primary navigation">
            <NavLinks items={navItems} />
          </nav>
        </div>

        {/* Right Controls */}
        <div className="col-start-1 row-start-1 flex min-w-0 items-center justify-self-end">
          <EcosystemAppSwitcher />
        </div>
      </div>
    </div>
  );
}
