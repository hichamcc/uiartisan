"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroAnimation = () => {
    const cardRef   = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const fill1Ref  = useRef<HTMLDivElement>(null);
    const fill2Ref  = useRef<HTMLDivElement>(null);
    const fill3Ref  = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ── Entry ──────────────────────────────────────────────
            gsap.from(cardRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                delay: 0.2,
            });

            gsap.from('.h-anim', {
                y: 16,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out',
                delay: 0.6,
            });

            // ── Gentle float loop ──────────────────────────────────
            gsap.to(cardRef.current, {
                y: -14,
                duration: 3.2,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: 1.2,
            });

            // ── Button color morph: zinc → amber → zinc ────────────
            gsap.to(buttonRef.current, {
                backgroundColor: '#10b981',
                duration: 2.4,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: 1.8,
            });

            // ── Slider fills ───────────────────────────────────────
            gsap.to(fill1Ref.current, {
                width: '82%',
                duration: 2.6,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: 2.0,
            });
            gsap.to(fill2Ref.current, {
                width: '62%',
                duration: 3.0,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: 2.4,
            });
            gsap.to(fill3Ref.current, {
                width: '72%',
                duration: 2.8,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: 2.2,
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative flex items-center justify-center py-8 lg:py-0">
            {/* Decorative blobs */}
            <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-emerald-100 opacity-70 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-zinc-200 opacity-60 blur-3xl pointer-events-none" />

            {/* Main card */}
            <div
                ref={cardRef}
                className="relative w-full max-w-xs sm:max-w-sm bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden"
            >
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-50 border-b border-zinc-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                    <span className="ml-3 text-xs font-medium text-zinc-400">Button Generator</span>
                </div>

                {/* Preview area */}
                <div
                    className="h-anim flex items-center justify-center px-6 py-10 border-b border-zinc-100"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #e4e4e7 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                    }}
                >
                    <button
                        ref={buttonRef}
                        className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold shadow-lg select-none"
                        style={{ backgroundColor: '#18181b' }}
                        tabIndex={-1}
                    >
                        Click me
                    </button>
                </div>

                {/* Sliders */}
                <div className="px-5 py-4 space-y-3.5 border-b border-zinc-100">
                    <div className="h-anim">
                        <div className="flex justify-between text-[11px] text-zinc-400 mb-1.5">
                            <span>Background</span><span className="font-mono">#18181b</span>
                        </div>
                        <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
                            <div ref={fill1Ref} className="h-full bg-zinc-900 rounded-full" style={{ width: '65%' }} />
                        </div>
                    </div>
                    <div className="h-anim">
                        <div className="flex justify-between text-[11px] text-zinc-400 mb-1.5">
                            <span>Border Radius</span><span className="font-mono">8px</span>
                        </div>
                        <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
                            <div ref={fill2Ref} className="h-full bg-emerald-500 rounded-full" style={{ width: '40%' }} />
                        </div>
                    </div>
                    <div className="h-anim">
                        <div className="flex justify-between text-[11px] text-zinc-400 mb-1.5">
                            <span>Shadow</span><span className="font-mono">Medium</span>
                        </div>
                        <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
                            <div ref={fill3Ref} className="h-full bg-zinc-400 rounded-full" style={{ width: '55%' }} />
                        </div>
                    </div>
                </div>

                {/* Code snippet */}
                <div className="h-anim mx-4 my-4 rounded-lg bg-zinc-950 px-4 py-3 font-mono text-[11px] leading-5">
                    <span className="text-emerald-400">.button</span>
                    <span className="text-zinc-500"> {'{'}</span><br />
                    <span className="ml-3 text-zinc-400">background</span>
                    <span className="text-zinc-600">: </span>
                    <span className="text-emerald-400">#18181b</span>
                    <span className="text-zinc-500">;</span><br />
                    <span className="ml-3 text-zinc-400">border-radius</span>
                    <span className="text-zinc-600">: </span>
                    <span className="text-emerald-400">8px</span>
                    <span className="text-zinc-500">;</span><br />
                    <span className="text-zinc-500">{'}'}</span>
                </div>
            </div>
        </div>
    );
};

export default HeroAnimation;
