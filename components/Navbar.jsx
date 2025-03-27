import Link from "next/link";

export default function Navbar() {
    return (
        <div className="overflow-x-auto whitespace-nowrap px-4 py-3 bg-white shadow-sm">
            <nav>
                <ul className="flex min-w-max gap-5 font-roboto text-base sm:text-lg pr-4">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/about" className="hover:underline">About</Link></li>
                    <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                    <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                    <li><Link href="/blog/worldbuilding" className="hover:underline">Basic</Link></li>
                    <li><Link href="/blog/disclaimer" className="hover:underline">Disclaimer</Link></li>
                </ul>
            </nav>
        </div>
    );
}
