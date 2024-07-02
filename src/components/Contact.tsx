// components/Contact.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faComment, faCube, faAlignLeft, faPaperPlane, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import SuggestComponentForm from './SuggestComponenetForm';
import ContactForm from './ContactForm';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Get in Touch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Us form */}
                    <div className="bg-white rounded-lg shadow-lg p-8 transform  transition duration-300">
                        <ContactForm />
                    </div>
                    {/* Suggest a Component form */}
                    <div className="bg-white rounded-lg shadow-lg p-8 transform  transition duration-300">

                        <SuggestComponentForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;