"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const ContactForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await resend.emails.send({
                from: 'UI ARTISAN <rayden@resend.dev>', // Your verified email address
                to: 'gaddariowen@gmail.com', // Recipient's email address
                subject: 'New Contact Form Submission',
                html: `<p><strong>Name:</strong> ${name}</p>
                       <p><strong>Email:</strong> ${email}</p>
                       <p><strong>Message:</strong></p>
                       <p>${message}</p>`,
            });

            console.log('Email sent:', response);
            setStatus('Email sent successfully!');

            // Reset form fields after submission
            setName('');
            setEmail('');
            setMessage('');

        } catch (error) {
            console.error('Error sending email:', error);
            setStatus('Failed to send email.');
        }
    };


    return (
        <form id='contactForm' onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 transform  transition duration-300">
            <h3 className="text-2xl font-semibold mb-6 text-blue-600 flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3" />Contact Us
            </h3>
            <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                <div className="relative">
                    <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <div className="relative">
                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                <div className="relative">
                    <FontAwesomeIcon icon={faComment} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                Send Message
            </button>
            {status && <p className="mt-4 text-sm font-semibold text-center text-blue-500">{status}</p>}

        </form >
    );
};

export default ContactForm;