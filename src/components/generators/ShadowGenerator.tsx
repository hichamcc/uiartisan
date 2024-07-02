"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const ShadowDivGenerator = () => {
    const [shadows, setShadows] = useState([
        { offsetX: 5, offsetY: 5, blur: 10, spread: 0, color: '#00000040', inset: false }
    ]);
    const [divWidth, setDivWidth] = useState(200);
    const [divHeight, setDivHeight] = useState(200);
    const [divBackgroundColor, setDivBackgroundColor] = useState('#ffffff');
    const [divBorderRadius, setDivBorderRadius] = useState(0);
    const [divRotation, setDivRotation] = useState(0);
    const [divScale, setDivScale] = useState(1);
    const [hoverEffect, setHoverEffect] = useState(false);
    const [hoverTransition, setHoverTransition] = useState(0.3);
    const [hoverScale, setHoverScale] = useState(1.05);

    const addShadow = () => {
        setShadows([...shadows, { offsetX: 0, offsetY: 0, blur: 10, spread: 0, color: '#00000040', inset: false }]);
    };

    const removeShadow = (index) => {
        setShadows(shadows.filter((_, i) => i !== index));
    };

    const updateShadow = (index, property, value) => {
        const newShadows = [...shadows];
        newShadows[index][property] = value;
        setShadows(newShadows);
    };

    const generateBoxShadow = () => {
        return shadows.map(shadow =>
            `${shadow.inset ? 'inset ' : ''}${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
        ).join(', ');
    };

    const generateCSS = () => {
        let css = `
.shadow-div {
  width: ${divWidth}px;
  height: ${divHeight}px;
  background-color: ${divBackgroundColor};
  border-radius: ${divBorderRadius}px;
  box-shadow: ${generateBoxShadow()};
  transform: rotate(${divRotation}deg) scale(${divScale});
`;

        if (hoverEffect) {
            css += `
  transition: all ${hoverTransition}s ease-in-out;
}

.shadow-div:hover {
  transform: rotate(${divRotation}deg) scale(${divScale * hoverScale});
`;
        }

        css += '}';
        return css;
    };

    const generateHTML = () => {
        return '<div class="shadow-div"></div>';
    };

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto max-h-[95vh]">
                <h2 className="text-2xl font-bold mb-6">Shadow DIV Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">DIV Width (px)</label>
                        <input
                            type="number"
                            value={divWidth}
                            onChange={(e) => setDivWidth(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">DIV Height (px)</label>
                        <input
                            type="number"
                            value={divHeight}
                            onChange={(e) => setDivHeight(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Background Color</label>
                        <input
                            type="color"
                            value={divBackgroundColor}
                            onChange={(e) => setDivBackgroundColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Radius (px)</label>
                        <input
                            type="number"
                            value={divBorderRadius}
                            onChange={(e) => setDivBorderRadius(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rotation (deg)</label>
                        <input
                            type="number"
                            value={divRotation}
                            onChange={(e) => setDivRotation(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Scale</label>
                        <input
                            type="number"
                            step="0.1"
                            value={divScale}
                            onChange={(e) => setDivScale(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={hoverEffect}
                                onChange={(e) => setHoverEffect(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Enable Hover Effect</span>
                        </label>
                    </div>

                    {hoverEffect && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hover Transition (s)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={hoverTransition}
                                    onChange={(e) => setHoverTransition(Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hover Scale</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={hoverScale}
                                    onChange={(e) => setHoverScale(Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </>
                    )}
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4">Shadows</h3>
                {shadows.map((shadow, index) => (
                    <div key={index} className="mb-6 p-4 border rounded">
                        <h4 className="font-bold mb-2">Shadow {index + 1}</h4>
                        <div className="space-y-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Offset X (px)</label>
                                <input
                                    type="number"
                                    value={shadow.offsetX}
                                    onChange={(e) => updateShadow(index, 'offsetX', Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Offset Y (px)</label>
                                <input
                                    type="number"
                                    value={shadow.offsetY}
                                    onChange={(e) => updateShadow(index, 'offsetY', Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Blur (px)</label>
                                <input
                                    type="number"
                                    value={shadow.blur}
                                    onChange={(e) => updateShadow(index, 'blur', Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Spread (px)</label>
                                <input
                                    type="number"
                                    value={shadow.spread}
                                    onChange={(e) => updateShadow(index, 'spread', Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Color</label>
                                <input
                                    type="color"
                                    value={shadow.color}
                                    onChange={(e) => updateShadow(index, 'color', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={shadow.inset}
                                        onChange={(e) => updateShadow(index, 'inset', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Inset</span>
                                </label>
                            </div>
                        </div>
                        <button
                            onClick={() => removeShadow(index)}
                            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                        >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            Remove Shadow
                        </button>
                    </div>
                ))}
                <button
                    onClick={addShadow}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Shadow
                </button>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white min-h-[300px] flex items-center justify-center">
                    <style>{generateCSS()}</style>
                    <div className="shadow-div"></div>
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

export default ShadowDivGenerator;