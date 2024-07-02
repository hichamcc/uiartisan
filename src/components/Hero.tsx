// components/Hero.tsx
import React from 'react';
import Link from 'next/link';

const Hero: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-transparent to-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
            <div className="relative z-10">
                <div
                    className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
                    <svg className="h-[60rem] w-[100rem] flex-none stroke-blue-600 opacity-20" aria-hidden="true">
                        <defs>
                            <pattern id="e9033f3e-f665-41a6-84ef-756f6778e6fe" width="200" height="200" x="50%" y="50%"
                                patternUnits="userSpaceOnUse" patternTransform="translate(-100 0)">
                                <path d="M.5 200V.5H200" fill="none"></path>
                            </pattern>
                        </defs>
                        <svg x="50%" y="50%" className="overflow-visible fill-blue-50">
                            <path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" strokeWidth="0"></path>
                        </svg>
                        <rect width="100%" height="100%" strokeWidth="0" fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)">
                        </rect>
                    </svg>
                </div>
            </div>
            <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Welcome to
                        <span className="text-blue-600"> UI Artisan</span>
                    </h1>
                    <h2 className="mt-6 text-lg leading-8 text-gray-600">
                        Create stunning UI components with ease. Our generators help you design and
                        customize various elements for your web projects.
                    </h2>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="#components" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            Explore Components
                            {/* SVG arrow icon */}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;