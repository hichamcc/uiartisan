"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faComment, faPaperPlane, faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ContactForm = () => {
    const [name, setName]       = useState('');
    const [email, setEmail]     = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/resend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });
            const data = await response.json();
            if (data.success) {
                setStatus('success');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <form id="contactForm" onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Name
                </label>
                <div className="relative">
                    <FontAwesomeIcon icon={faUser} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-3.5 h-3.5 pointer-events-none" />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition"
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Email
                </label>
                <div className="relative">
                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-3.5 h-3.5 pointer-events-none" />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition"
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Message
                </label>
                <div className="relative">
                    <FontAwesomeIcon icon={faComment} className="absolute left-3.5 top-3.5 text-zinc-400 w-3.5 h-3.5 pointer-events-none" />
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What's on your mind?"
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
                    <><FontAwesomeIcon icon={faSpinner} spin className="w-4 h-4" /> Sending…</>
                ) : (
                    <><FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" /> Send Message</>
                )}
            </button>

            {status === 'success' && (
                <p className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4" />
                    Message sent — thanks!
                </p>
            )}
            {status === 'error' && (
                <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
            )}
        </form>
    );
};

export default ContactForm;
