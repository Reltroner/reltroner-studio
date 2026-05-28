import NavLinks from "@/components/layout/NavLinks";
import { NAV_ITEMS } from "@/lib/constants/routes";

export default function Navbar() {
    return (
        <div className="px-4 py-3 text-black dark:text-white">
            <div className="shell-container">
                <nav className="surface-glass px-3 py-3" aria-label="Primary navigation">
                    <NavLinks items={NAV_ITEMS} />
                </nav>
            </div>
        </div>
    );
}
