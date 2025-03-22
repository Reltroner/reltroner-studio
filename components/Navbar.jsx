import Link from "next/link";
export default function Navbar() {
    return (
        <div>
            <nav>
                <ul className="flex gap-5 font-roboto text-lg">
                    <li><Link href="/" className="flex gap-2 hover:underline ">Home</Link></li>
                    <li><Link href="/about" className="flex gap-2 hover:underline">About</Link></li>
                    <li><Link href="/blog" className="flex gap-2 hover:underline">Blog</Link></li>
                    <li><Link href="/contact" className="flex gap-2 hover:underline">Contact</Link></li>
                    <li><Link href="/blog/worldbuilding" className="flex gap-2 hover:underline">Basic</Link></li>
                    <li><Link href="/blog/pi" className="flex gap-2 hover:underline">Pi Day</Link></li>
                </ul>
            </nav>
        </div>
    );
}