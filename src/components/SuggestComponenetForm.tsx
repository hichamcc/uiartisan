"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faAlignLeft, faPlusCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

const SuggestComponentForm = () => {
    const [componentName, setComponentName] = useState('');
    const [componentDescription, setComponentDescription] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/suggest-component', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ componentName, componentDescription }),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('Suggestion sent successfully!');
                // Reset form fields after submission
                setComponentName('');
                setComponentDescription('');
            } else {
                setStatus('Failed to send suggestion.');
            }
        } catch (error) {
            console.error('Error sending suggestion:', error);
            setStatus('Failed to send suggestion.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form id='contactForm' onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 transform transition duration-300">
            <h3 className="text-2xl font-semibold mb-6 text-green-600 flex items-center">
                <FontAwesomeIcon icon={faCube} className="mr-3" />Suggest a Component
            </h3>
            <div className="mb-6">
                <label htmlFor="component-name" className="block text-gray-700 font-bold mb-2">
                    Component Name
                </label>
                <div className="relative">
                    <FontAwesomeIcon icon={faCube} className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        id="component-name"
                        name="component-name"
                        value={componentName}
                        onChange={(e) => setComponentName(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="component-description" className="block text-gray-700 font-bold mb-2">
                    Description
                </label>
                <div className="relative">
                    <FontAwesomeIcon icon={faAlignLeft} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                        id="component-description"
                        name="component-description"
                        rows={4}
                        value={componentDescription}
                        onChange={(e) => setComponentDescription(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    ></textarea>
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
                disabled={isLoading}
            >
                {isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                ) : (
                    <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                )}
                {isLoading ? 'Submitting...' : 'Submit Suggestion'}
            </button>

            {status && <p className="mt-4 text-sm font-semibold text-center text-green-500">{status}</p>}
        </form>
    );
};

export default SuggestComponentForm;