"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faAlignLeft, faSpinner, faCheckCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const SuggestComponentForm = () => {
    const [componentName, setComponentName]               = useState('');
    const [componentDescription, setComponentDescription] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/suggest-component', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ componentName, componentDescription }),
            });
            const data = await response.json();
            if (data.success) {
                setStatus('success');
                setComponentName('');
                setComponentDescription('');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="component-name" className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Component Name
                </label>
                <div className="relative">
                    <FontAwesomeIcon icon={faCube} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-3.5 h-3.5 pointer-events-none" />
                    <input
                        type="text"
                        id="component-name"
                        name="component-name"
                        value={componentName}
                        onChange={(e) => setComponentName(e.target.value)}
                        placeholder="e.g. Date Picker"
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition"
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="component-description" className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Description
                </label>
                <div className="relative">
                    <FontAwesomeIcon icon={faAlignLeft} className="absolute left-3.5 top-3.5 text-zinc-400 w-3.5 h-3.5 pointer-events-none" />
                    <textarea
                        id="component-description"
                        name="component-description"
                        rows={4}
                        value={componentDescription}
                        onChange={(e) => setComponentDescription(e.target.value)}
                        placeholder="Describe what this component should do…"
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition resize-none"
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
                {status === 'loading' ? (
                    <><FontAwesomeIcon icon={faSpinner} spin className="w-4 h-4" /> Submitting…</>
                ) : (
                    <><FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" /> Submit Suggestion</>
                )}
            </button>

            {status === 'success' && (
                <p className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4" />
                    Suggestion received — thank you!
                </p>
            )}
            {status === 'error' && (
                <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
            )}
        </form>
    );
};

export default SuggestComponentForm;
