"use client";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Format = 'tailwind' | 'react' | 'css';

interface Block {
    title: string;
    code: string;
    language: string;
}

interface Props {
    css: Block[];
    tailwind: Block[];
    react: Block[];
}

const FORMATS: { id: Format; label: string; note?: string }[] = [
    { id: 'tailwind', label: 'Tailwind', note: 'recommended' },
    { id: 'react',    label: 'React / JSX' },
    { id: 'css',      label: 'CSS' },
];

export function CodePanel({ css, tailwind, react }: Props) {
    const [format, setFormat] = useState<Format>('tailwind');
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (code: string, key: string) => {
        navigator.clipboard.writeText(code);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    const blocks = format === 'css' ? css : format === 'tailwind' ? tailwind : react;

    return (
        <div className="mt-8 space-y-6">
            {/* Format switcher */}
            <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-zinc-200">
                <span className="text-xs text-zinc-400 shrink-0 mr-1">Output format</span>
                {FORMATS.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setFormat(f.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            format === f.id
                                ? 'bg-zinc-900 text-white'
                                : 'border border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900'
                        }`}
                    >
                        {f.label}
                        {f.note && (
                            <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-normal ${
                                format === f.id
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'bg-emerald-50 text-emerald-600'
                            }`}>
                                {f.note}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Code blocks */}
            {blocks.map((block, i) => {
                const key = `${format}-${i}`;
                const isCopied = copied === key;
                return (
                    <div key={key}>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-semibold text-zinc-700">{block.title}</h3>
                            <button
                                onClick={() => handleCopy(block.code, key)}
                                className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                            >
                                <FontAwesomeIcon
                                    icon={isCopied ? faCheck : faCopy}
                                    className={`w-3.5 h-3.5 ${isCopied ? 'text-emerald-500' : ''}`}
                                />
                                {isCopied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <SyntaxHighlighter language={block.language} style={vscDarkPlus} showLineNumbers>
                            {block.code}
                        </SyntaxHighlighter>
                    </div>
                );
            })}
        </div>
    );
}

/** Convert a CSS value to a Tailwind arbitrary-value safe string (spaces → underscores, strips spaces after commas) */
export const toTw = (v: string) => v.replace(/,\s+/g, ',').replace(/ /g, '_');
