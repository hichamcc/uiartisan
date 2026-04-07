"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-zinc-50 min-h-screen flex flex-col">
            <Head>
                <title>UI Artisan</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
                <nav className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2.5">
                            <span className="flex h-7 w-7 items-center justify-center rounded bg-emerald-500 text-xs font-bold text-zinc-950 select-none">
                                UI
                            </span>
                            <span className="text-lg font-semibold text-white tracking-tight">
                                Artisan
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
                                Home
                            </Link>
                            <Link href="/#components" className="text-sm text-zinc-400 hover:text-white transition-colors">
                                Components
                            </Link>
                            <Link href="/#contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
                                Contact
                            </Link>
                        </div>

                        <button
                            className="md:hidden text-zinc-400 hover:text-white focus:outline-none transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                        </button>
                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden border-t border-zinc-800 mt-4 pt-4 pb-2 space-y-1">
                            <Link
                                href="/"
                                className="block text-sm text-zinc-400 hover:text-white py-2 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/#components"
                                className="block text-sm text-zinc-400 hover:text-white py-2 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Components
                            </Link>
                            <Link
                                href="/#contact"
                                className="block text-sm text-zinc-400 hover:text-white py-2 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    )}
                </nav>
            </header>

            <main className="flex-grow">{children}</main>

            <Footer />
        </div>
    );
};

export default Layout;
