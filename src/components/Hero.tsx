import React from 'react';
import Link from 'next/link';
import HeroAnimation from './HeroAnimation';

const Hero: React.FC = () => {
    return (
        <section className="relative bg-zinc-50 border-b border-zinc-200 overflow-hidden">
            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: 'radial-gradient(circle, #a1a1aa 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* ── Left: text ──────────────────────────────── */}
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-500 mb-8 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Free &amp; open source
                        </div>

                        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.05] mb-6">
                            Generate UI.<br />
                            <span className="text-emerald-600">Ship faster.</span>
                        </h1>

                        <p className="text-lg text-zinc-500 max-w-md mb-10 leading-relaxed">
                            Visual generators for buttons, cards, animations, and 30+ more components.
                            Configure, preview, copy — no install needed.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mb-16">
                            <Link
                                href="#components"
                                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
                            >
                                Browse components
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-zinc-200 pt-8">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-zinc-900">30+</span>
                                <span className="text-sm text-zinc-500">Generators</span>
                            </div>
                            <div className="hidden sm:block h-8 w-px bg-zinc-200" />
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-zinc-900">5</span>
                                <span className="text-sm text-zinc-500">Categories</span>
                            </div>
                            <div className="hidden sm:block h-8 w-px bg-zinc-200" />
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-zinc-900">0</span>
                                <span className="text-sm text-zinc-500">Install required</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Right: GSAP animation ────────────────────── */}
                    <HeroAnimation />
                </div>
            </div>
        </section>
    );
};

export default Hero;
