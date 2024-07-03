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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Head>
                <title>UI Artisan</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <nav className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold">
                                UI Artisan
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="hover:text-blue-200 transition duration-300">Home</Link>
                            <Link href="/#components" className="hover:text-blue-200 transition duration-300">Components</Link>
                            <Link href="/#contact" className="hover:text-blue-200 transition duration-300">Contact</Link>
                        </div>
                        <div className="md:hidden">
                            <button className="text-white focus:outline-none" onClick={toggleMenu}>
                                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                            </button>
                        </div>
                    </div>
                    {isMenuOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <Link href="/" className="block hover:text-blue-200 transition duration-300 py-2">Home</Link>
                                <Link href="#components" className="block hover:text-blue-200 transition duration-300 py-2">Components</Link>
                                <Link href="#contact" className="block hover:text-blue-200 transition duration-300 py-2">Contact</Link>
                            </div>
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


