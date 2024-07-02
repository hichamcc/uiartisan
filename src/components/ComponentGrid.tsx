"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLaughBeam } from '@fortawesome/free-solid-svg-icons';
import { components, funnyComponents } from '../data/Components';

const ComponentGrid: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFunny, setShowFunny] = useState(false);

    const currentComponents = showFunny ? funnyComponents : components;

    const filteredComponents = currentComponents.filter(component =>
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-8">
                <h2 id="components" className="text-3xl font-bold text-center">
                    {showFunny ? 'Funny Components' : 'UI Components'}
                </h2>
                <button
                    onClick={() => setShowFunny(!showFunny)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
                >
                    <FontAwesomeIcon icon={faLaughBeam} className="mr-2" />
                    {showFunny ? 'Switch to UI' : 'Switch to Funny'}
                </button>
            </div>

            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        id="componentSearch"
                        placeholder={`Search ${showFunny ? 'funny' : 'UI'} components...`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-gray-400" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredComponents.map((component, index) => (
                    <Link key={index} href={component.link} className="bg-white p-6 shadow-md rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-300 flex flex-col items-center text-center">
                        <div className="text-4xl mb-4 text-blue-600">
                            <FontAwesomeIcon icon={component.icon} />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{component.name}</h2>
                        <p className="text-gray-600">{component.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ComponentGrid;