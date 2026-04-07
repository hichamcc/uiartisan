import React from 'react';
import ContactForm from './ContactForm';
import SuggestComponentForm from './SuggestComponenetForm';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="bg-zinc-50 border-t border-zinc-200 py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-zinc-900">Get in touch</h2>
                    <p className="text-sm text-zinc-500 mt-1">Have a question or want a new component? We&apos;d love to hear from you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact */}
                    <div className="bg-white rounded-xl border border-zinc-200 p-8">
                        <div className="mb-6">
                            <h3 className="text-base font-semibold text-zinc-900">Contact us</h3>
                            <p className="text-sm text-zinc-500 mt-1">Send a message and we&apos;ll get back to you.</p>
                        </div>
                        <ContactForm />
                    </div>

                    {/* Suggest */}
                    <div className="bg-white rounded-xl border border-zinc-200 p-8">
                        <div className="mb-6">
                            <h3 className="text-base font-semibold text-zinc-900">Suggest a component</h3>
                            <p className="text-sm text-zinc-500 mt-1">Missing something? Tell us what to build next.</p>
                        </div>
                        <SuggestComponentForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
