"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLaughBeam, faCode, faGamepad, faPaintBrush, faCubes } from '@fortawesome/free-solid-svg-icons';
import { components, funnyComponents, gameComponents, tailwindComponents, readyUIComponents } from '../data/Components';

type ComponentType = 'ui' | 'Tailwind' | 'funny' | 'game' | 'readyUI';

const ComponentGrid: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [componentType, setComponentType] = useState<ComponentType>('ui');

    const getComponents = () => {
        switch (componentType) {
            case 'Tailwind':
                return tailwindComponents;
            case 'funny':
                return funnyComponents;
            case 'game':
                return gameComponents;
            case 'readyUI':
                return readyUIComponents;
            default:
                return components;
        }
    };

    const currentComponents = getComponents();

    const filteredComponents = currentComponents.filter(component =>
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-8 flex-wrap">
                <h2 id="components" className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-0">
                    {componentType === 'ui' ? 'UI Components' :
                        componentType === 'Tailwind' ? 'Tailwind Components' :
                            componentType === 'funny' ? 'Funny Components' :
                                componentType === 'game' ? 'Game Components' :
                                    'Ready UI Components'}
                </h2>
                <div className="flex space-x-2 flex-wrap">
                    <button
                        onClick={() => setComponentType('ui')}
                        className={`px-4 py-2 rounded-md transition duration-300 flex items-center ${componentType === 'ui' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <FontAwesomeIcon icon={faCode} className="mr-2" />
                        UI Generator
                    </button>
                    <button
                        onClick={() => setComponentType('readyUI')}
                        className={`px-4 py-2 rounded-md transition duration-300 flex items-center ${componentType === 'readyUI' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <FontAwesomeIcon icon={faCubes} className="mr-2" />
                        Tailwind
                    </button>
                    <button
                        onClick={() => setComponentType('Tailwind')}
                        className={`hidden px-4 py-2 rounded-md transition duration-300 flex items-center ${componentType === 'Tailwind' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <FontAwesomeIcon icon={faPaintBrush} className="mr-2" />
                        Tailwind
                    </button>
                    <button
                        onClick={() => setComponentType('funny')}
                        className={`px-4 py-2 rounded-md transition duration-300 flex items-center ${componentType === 'funny' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <FontAwesomeIcon icon={faLaughBeam} className="mr-2" />
                        Funny
                    </button>
                    <button
                        onClick={() => setComponentType('game')}
                        className={`px-4 py-2 rounded-md transition duration-300 flex items-center ${componentType === 'game' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <FontAwesomeIcon icon={faGamepad} className="mr-2" />
                        Games
                    </button>

                </div>
            </div>

            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        id="componentSearch"
                        placeholder={`Search ${componentType} components...`}
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