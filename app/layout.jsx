import Link from "next/link";
import './global.css';
import Navbar from "@/components/Navbar";
import { roboto } from "./fonts";

export default function Layout({ children }) {
    return (
        <html lang="en" className={roboto.variable}>
            <head>
            <title>Reltroner Studio</title>
                    <link rel="icon" href="/images/reltroner-studio.png" type="image/png" />
                    {/*  jika punya .ico: */}
                    {/* <link rel="icon" href="/reltroner-logo.ico" type="image/x-icon" /> */}
            </head>
            <body className="bg-slate-100 px-5 py-5 flex flex-col min-h-screen">
                <header>
                    <Navbar />
                </header>
                <main className="py-5 grow">{children}</main>
                <footer className="border-t pt-4 pb-6 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} Reltroner Studio. All rights reserved.
                    <br />
                    Built with ❤️ in Asthortera.
                </footer>
            </body>
        </html>
    );
}
