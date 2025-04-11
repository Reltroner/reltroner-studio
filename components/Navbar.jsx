import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
    return (
        <div className="px-4 py-3 bg-white shadow-sm text-black dark:bg-gray-900 dark:text-white">
            <nav>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 font-roboto text-base sm:text-lg justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1
                    transition duration-300 ease-in-out">
                    {/* Primary Navigation */}
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/about" className="hover:underline">About</Link></li>
                    <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                    <li><Link href="/characters" className="hover:underline">Characters</Link></li>
                    <li><Link href="/series" className="hover:underline">Series</Link></li>
                    <li><Link href="/places" className="hover:underline">Places</Link></li>
                    <li><Link href="/cultures" className="hover:underline">Cultures</Link></li>

                    {/* Core Worldbuilding */}
                    <li><Link href="/philosophies" className="hover:underline">Philosophies</Link></li>
                    <li><Link href="/laws" className="hover:underline">Laws</Link></li>
                    <li><Link href="/technologies" className="hover:underline">Technologies</Link></li>
                    <li><Link href="/factions" className="hover:underline">Factions</Link></li>
                    <li><Link href="/myths" className="hover:underline">Myths</Link></li>

                    {/* Support & Structure */}
                    <li><Link href="/statistics" className="hover:underline">Statistics</Link></li>
                    <li><Link href="/organizations" className="hover:underline">Organizations</Link></li>
                    <li><Link href="/events" className="hover:underline">Events</Link></li>

                    {/* Professional & Footer */}
                    <li><Link href="/blog/for-recruiters" className="hover:underline">Portfolio</Link></li>
                    <li><Link href="/blog/reltroner" className="hover:underline">Principles</Link></li>
                    <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                    <li><Link href="/blog/disclaimer" className="hover:underline">Disclaimer</Link></li>
                </ul>
            </nav>
        </div>
    );
}


// Events → Untuk visualisasi perjalanan semesta: dari Battle of Reltronepolis hingga The Fall of Depeisit.

// Organizations → Misalnya: Henchoeway, Astralis Circle, Cosmeilian Council, dll.

// Media → Galeri ilustrasi, musik orisinal, atau mungkin audio naratif dari Nytherion.