"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLaughBeam, faCode, faGamepad, faCubes } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { components, funnyComponents, gameComponents, readyUIComponents } from '../data/Components';

type ComponentType = 'ui' | 'funny' | 'game' | 'readyUI';

interface Tab {
    type: ComponentType;
    label: string;
    icon: IconDefinition;
    count: number;
}

const tabs: Tab[] = [
    { type: 'ui',      label: 'Generators', icon: faCode,      count: components.length },
    { type: 'readyUI', label: 'Tailwind',   icon: faCubes,     count: readyUIComponents.length },
    { type: 'funny',   label: 'Funny',      icon: faLaughBeam, count: funnyComponents.length },
    { type: 'game',    label: 'Games',      icon: faGamepad,   count: gameComponents.length },
];

const ComponentGrid: React.FC = () => {
    const [searchTerm, setSearchTerm]       = useState('');
    const [componentType, setComponentType] = useState<ComponentType>('ui');

    const getComponents = () => {
        switch (componentType) {
            case 'funny':   return funnyComponents;
            case 'game':    return gameComponents;
            case 'readyUI': return readyUIComponents;
            default:        return components;
        }
    };

    const filtered = getComponents().filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeTab = tabs.find(t => t.type === componentType)!;

    return (
        <section className="bg-white border-t border-zinc-100">
            <div className="max-w-7xl mx-auto py-16 px-6">

                {/* Section header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                    <div>
                        <h2 id="components" className="text-2xl font-bold text-zinc-900">
                            {activeTab.label}
                        </h2>
                        <p className="text-sm text-zinc-500 mt-0.5">
                            {filtered.length} component{filtered.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {tabs.map(tab => {
                            const active = componentType === tab.type;
                            return (
                                <button
                                    key={tab.type}
                                    onClick={() => { setComponentType(tab.type); setSearchTerm(''); }}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                                        active
                                            ? 'border-zinc-900 bg-zinc-900 text-white'
                                            : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={tab.icon} className="w-3.5 h-3.5" />
                                    {tab.label}
                                    <span className={`text-xs rounded-full px-1.5 py-0.5 font-medium ${
                                        active ? 'bg-zinc-700 text-zinc-300' : 'bg-zinc-100 text-zinc-500'
                                    }`}>
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-8 max-w-sm">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-3.5 h-3.5 pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Search components..."
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filtered.map((component, index) => (
                        <Link
                            key={index}
                            href={component.link}
                            className="group flex flex-col p-5 bg-white border border-zinc-200 rounded-xl hover:border-zinc-900 hover:shadow-md transition-all duration-200"
                        >
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-200 mb-4 shrink-0">
                                <FontAwesomeIcon icon={component.icon} className="w-4 h-4" />
                            </div>
                            <h3 className="text-sm font-semibold text-zinc-900 mb-1 leading-snug">
                                {component.name}
                            </h3>
                            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                                {component.description}
                            </p>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 text-zinc-400">
                        <p className="text-sm">No components match &ldquo;{searchTerm}&rdquo;</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-3 text-xs text-zinc-500 underline hover:text-zinc-900"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ComponentGrid;
