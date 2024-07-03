import React from 'react';
import Link from 'next/link';

const Sponsors: React.FC = () => {
    return (
        <section id="sponsors" className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-8 text-center">Our Sponsors</h2>
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-8">Be part of our journey in creating amazing UI tools!</p>
                    <Link href="#contactForm" className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                        Become Our First Sponsor
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Sponsors;
