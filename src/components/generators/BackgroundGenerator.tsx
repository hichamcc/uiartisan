"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BackgroundGenerator = () => {
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [gradientType, setGradientType] = useState('linear');
    const [gradientAngle, setGradientAngle] = useState(90);
    const [colorStops, setColorStops] = useState([
        { color: '#3b82f6', position: 0 },
        { color: '#8b5cf6', position: 100 }
    ]);

    const generateCSS = () => {
        const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
        const stopsString = sortedStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');

        if (gradientType === 'linear') {
            return `background-color: ${backgroundColor};
background-image: linear-gradient(${gradientAngle}deg, ${stopsString});`;
        } else {
            return `background-color: ${backgroundColor};
background-image: radial-gradient(circle, ${stopsString});`;
        }
    };

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const addColorStop = () => {
        if (colorStops.length < 5) {
            const newPosition = Math.min(100, colorStops[colorStops.length - 1].position + 20);
            setColorStops([...colorStops, { color: '#ffffff', position: newPosition }]);
        }
    };

    const removeColorStop = (index) => {
        if (colorStops.length > 2) {
            setColorStops(colorStops.filter((_, i) => i !== index));
        }
    };

    const updateColorStop = (index, field, value) => {
        const newStops = [...colorStops];
        newStops[index] = { ...newStops[index], [field]: value };
        setColorStops(newStops);
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Background Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Background Color</label>
                        <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gradient Type</label>
                        <select
                            value={gradientType}
                            onChange={(e) => setGradientType(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="linear">Linear</option>
                            <option value="radial">Radial</option>
                        </select>
                    </div>

                    {gradientType === 'linear' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gradient Angle (deg)</label>
                            <input
                                type="number"
                                value={gradientAngle}
                                onChange={(e) => setGradientAngle(Number(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Color Stops</label>
                        {colorStops.map((stop, index) => (
                            <div key={index} className="flex items-center space-x-2 mt-2">
                                <input
                                    type="color"
                                    value={stop.color}
                                    onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                                    className="w-10 h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <input
                                    type="number"
                                    value={stop.position}
                                    onChange={(e) => updateColorStop(index, 'position', Number(e.target.value))}
                                    min="0"
                                    max="100"
                                    className="w-16 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {colorStops.length > 2 && (
                                    <button onClick={() => removeColorStop(index)} className="text-red-500">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                )}
                            </div>
                        ))}
                        {colorStops.length < 5 && (
                            <button onClick={addColorStop} className="mt-2 text-blue-500">
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                Add Color Stop
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white overflow-hidden relative">
                    <div
                        style={{
                            width: '100%',
                            height: '400px',
                            backgroundColor,
                            backgroundImage: gradientType === 'linear'
                                ? `linear-gradient(${gradientAngle}deg, ${colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`
                                : `radial-gradient(circle, ${colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`
                        }}
                    ></div>
                </div>

                <div className="mt-8 space-y-8">
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

export default BackgroundGenerator;