// components/Layout.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush, faBars } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
                            <Link href="#components" className="hover:text-blue-200 transition duration-300">Components</Link>
                            <Link href="#contact" className="hover:text-blue-200 transition duration-300">Contact</Link>
                        </div>
                        <div className="md:hidden">
                            <button className="text-white focus:outline-none">
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow">{children}</main>

            <Footer />
        </div>
    );
};

export default Layout;


