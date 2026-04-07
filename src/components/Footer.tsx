import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-800 text-white">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2.5 mb-4">
                            <span className="flex h-7 w-7 items-center justify-center rounded bg-emerald-500 text-xs font-bold text-zinc-950 select-none">
                                UI
                            </span>
                            <span className="text-lg font-semibold text-white tracking-tight">Artisan</span>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                            Visual generators for the web. Configure, preview, and copy UI components into your project.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Navigation</h4>
                        <ul className="space-y-2.5">
                            <li>
                                <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/#components" className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    Components
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Follow</h4>
                        <div className="flex gap-4">
                            <a href="#" aria-label="Twitter" className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-white transition-colors">
                                <FontAwesomeIcon icon={faTwitter} className="w-3.5 h-3.5" />
                            </a>
                            <a href="#" aria-label="GitHub" className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-white transition-colors">
                                <FontAwesomeIcon icon={faGithub} className="w-3.5 h-3.5" />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-white transition-colors">
                                <FontAwesomeIcon icon={faLinkedin} className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-800 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-500">
                    <p>&copy; {new Date().getFullYear()} UI Artisan. All rights reserved.</p>
                    <p>
                        Created by{' '}
                        <a
                            href="https://www.codebyhicham.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-400 hover:text-white transition-colors underline underline-offset-2"
                        >
                            codebyhicham
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
