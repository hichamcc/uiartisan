"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface DivStyles {
    backgroundColor: string;
    color: string;
    borderRadius: number;
    boxShadow: string;
    transform: string;
    width: number;
    height: number;
}

const boxShadowOptions = [
    { value: 'none', label: 'None' },
    { value: '0 2px 4px rgba(0, 0, 0, 0.1)', label: 'Soft' },
    { value: '0 4px 8px rgba(0, 0, 0, 0.1)', label: 'Medium' },
    { value: '0 8px 16px rgba(0, 0, 0, 0.1)', label: 'Hard' },
    { value: '0 12px 24px rgba(0, 0, 0, 0.2)', label: 'Harder' },
    { value: '0 16px 32px rgba(0, 0, 0, 0.25)', label: 'Extreme' },
];

const transformOptions = [
    { value: 'none', label: 'None' },
    { value: 'scale(1.05)', label: 'Scale Up' },
    { value: 'scale(0.95)', label: 'Scale Down' },
    { value: 'rotate(5deg)', label: 'Rotate' },
    { value: 'translateY(-10px)', label: 'Move Up' },
    { value: 'translateY(10px)', label: 'Move Down' },
];

const DivHoverGenerator: React.FC = () => {
    const [normalStyles, setNormalStyles] = useState<DivStyles>({
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        borderRadius: 4,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transform: 'none',
        width: 200,
        height: 100,
    });

    const [hoverStyles, setHoverStyles] = useState<DivStyles>({
        backgroundColor: '#2563eb',
        color: '#ffffff',
        borderRadius: 8,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transform: 'scale(1.05)',
        width: 200,
        height: 100,
    });

    const [transitionDuration, setTransitionDuration] = useState(0.3);
    const [transitionTiming, setTransitionTiming] = useState('ease');

    const generateCSS = () => {
        return `
.hover-div {
  background-color: ${normalStyles.backgroundColor};
  color: ${normalStyles.color};
  border-radius: ${normalStyles.borderRadius}px;
  box-shadow: ${normalStyles.boxShadow};
  transform: ${normalStyles.transform};
  width: ${normalStyles.width}px;
  height: ${normalStyles.height}px;
  transition: all ${transitionDuration}s ${transitionTiming};
}

.hover-div:hover {
  background-color: ${hoverStyles.backgroundColor};
  color: ${hoverStyles.color};
  border-radius: ${hoverStyles.borderRadius}px;
  box-shadow: ${hoverStyles.boxShadow};
  transform: ${hoverStyles.transform};
  width: ${hoverStyles.width}px;
  height: ${hoverStyles.height}px;
}
`;
    };

    const generateHTML = () => {
        return `
<div class="hover-div">
  Hover me!
</div>
`;
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const updateStyle = (state: 'normal' | 'hover', property: keyof DivStyles, value: string | number) => {
        if (state === 'normal') {
            setNormalStyles({ ...normalStyles, [property]: value });
        } else {
            setHoverStyles({ ...hoverStyles, [property]: value });
        }
    };

    const StyleControl: React.FC<{
        label: string;
        property: keyof DivStyles;
        type: 'color' | 'number' | 'select';
        options?: { value: string; label: string }[];
        min?: number;
        max?: number;
        step?: number;
    }> = ({ label, property, type, options, min, max, step }) => (
        <div className="grid grid-cols-2 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="grid grid-cols-2 gap-2">
                {type === 'select' ? (
                    <>
                        <select
                            value={normalStyles[property]}
                            onChange={(e) => updateStyle('normal', property, e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            {options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <select
                            value={hoverStyles[property]}
                            onChange={(e) => updateStyle('hover', property, e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            {options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </>
                ) : (
                    <>
                        <input
                            type={type}
                            value={normalStyles[property]}
                            onChange={(e) => updateStyle('normal', property, type === 'number' ? Number(e.target.value) : e.target.value)}
                            min={min}
                            max={max}
                            step={step}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <input
                            type={type}
                            value={hoverStyles[property]}
                            onChange={(e) => updateStyle('hover', property, type === 'number' ? Number(e.target.value) : e.target.value)}
                            min={min}
                            max={max}
                            step={step}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">DIV Hover Generator</h2>

                <div className="space-y-4">
                    <StyleControl label="Background Color" property="backgroundColor" type="color" />
                    <StyleControl label="Text Color" property="color" type="color" />
                    <StyleControl label="Border Radius" property="borderRadius" type="number" min={0} max={50} />
                    <StyleControl label="Box Shadow" property="boxShadow" type="select" options={boxShadowOptions} />
                    <StyleControl label="Transform" property="transform" type="select" options={transformOptions} />
                    <StyleControl label="Width" property="width" type="number" min={50} max={500} />
                    <StyleControl label="Height" property="height" type="number" min={50} max={500} />

                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="text-sm font-medium text-gray-700">Transition Duration</label>
                        <input
                            type="number"
                            value={transitionDuration}
                            onChange={(e) => setTransitionDuration(Number(e.target.value))}
                            min={0}
                            max={2}
                            step={0.1}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="text-sm font-medium text-gray-700">Transition Timing</label>
                        <select
                            value={transitionTiming}
                            onChange={(e) => setTransitionTiming(e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="ease">Ease</option>
                            <option value="linear">Linear</option>
                            <option value="ease-in">Ease In</option>
                            <option value="ease-out">Ease Out</option>
                            <option value="ease-in-out">Ease In Out</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white overflow-hidden relative h-64 flex items-center justify-center">
                    <style>{generateCSS()}</style>
                    <div className="hover-div flex items-center justify-center">
                        Hover me!
                    </div>
                </div>

                <div className="mt-8 space-y-8">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold">Generated HTML</h2>
                            <button onClick={() => handleCopyCode(generateHTML())} className="text-blue-600 hover:text-blue-800">
                                <FontAwesomeIcon icon={faCopy} className="mr-2" />
                                Copy
                            </button>
                        </div>
                        <SyntaxHighlighter language="html" style={vscDarkPlus} showLineNumbers>
                            {generateHTML()}
                        </SyntaxHighlighter>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold">Generated CSS</h2>
                            <button onClick={() => handleCopyCode(generateCSS())} className="text-blue-600 hover:text-blue-800">
                                <FontAwesomeIcon icon={faCopy} className="mr-2" />
                                Copy
                            </button>
                        </div>
                        <SyntaxHighlighter language="css" style={vscDarkPlus} showLineNumbers>
                            {generateCSS()}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DivHoverGenerator;

