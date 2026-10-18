import NavLinks from "@/components/layout/NavLinks";
import Link from 'next/link';
import CommandPalette, { type CommandPaletteProps } from './layout/CommandPalette';
import MobileNavbar from './MobileNavbar';
import { topNavigation } from "@/lib/constants/navigation";

export default function Navbar({ pages }: CommandPaletteProps) {
  return (
    <header className="studio-nav">
      <div className="studio-wrap studio-desktop-nav">
        <Link href="/" className="studio-brand"><img src="/images/reltroner-smooth.webp" width="38" height="38" alt="" />Reltroner Studio</Link>
        <nav aria-label="Primary navigation"><NavLinks items={topNavigation} /></nav>
        <div className="studio-nav-actions"><CommandPalette pages={pages} /><Link href="/contact" className="studio-button">Let&apos;s Connect ↗</Link></div>
      </div>
      <MobileNavbar />
    </header>
  );
}
