"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TextGradientGenerator = () => {
    const [text, setText] = useState('Gradient Text');
    const [fontSize, setFontSize] = useState(48);
    const [gradientColors, setGradientColors] = useState(['#ff0000', '#00ff00', '#0000ff']);
    const [gradientDirection, setGradientDirection] = useState('to right');
    const WebkitBackgroundClip = 'text';
    const color = 'transparent';
    const backgroundClip = 'text';
    const generateGradientCSS = () => {
        return `
.gradient-text {
  font-size: ${fontSize}px;
  background: linear-gradient(${gradientDirection}, ${gradientColors.join(', ')});
  -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}`.trim();
    };

    const generateHTML = () => {
        return `
<div class="gradient-text">${text}</div>`.trim();
    };

    const handleCopyCode = (code: any) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Text Gradient Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Text</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Font Size (px)</label>
                        <input
                            type="number"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            min="8"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gradient Colors</label>
                        {gradientColors.map((color, index) => (
                            <input
                                key={index}
                                type="color"
                                value={color}
                                onChange={(e) => {
                                    const newColors = [...gradientColors];
                                    newColors[index] = e.target.value;
                                    setGradientColors(newColors);
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-2"
                            />
                        ))}
                        <button
                            onClick={() => setGradientColors([...gradientColors, '#000000'])}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-200"
                        >
                            Add Color
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gradient Direction</label>
                        <select
                            value={gradientDirection}
                            onChange={(e) => setGradientDirection(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="to right">Left to Right</option>
                            <option value="to left">Right to Left</option>
                            <option value="to top">Bottom to Top</option>
                            <option value="to bottom">Top to Bottom</option>
                            <option value="to top right">Bottom Left to Top Right</option>
                            <option value="to top left">Bottom Right to Top Left</option>
                            <option value="to bottom right">Top Left to Bottom Right</option>
                            <option value="to bottom left">Top Right to Bottom Left</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white overflow-hidden relative" style={{ height: '200px' }}>
                    <div className="gradient-text" style={{
                        fontSize: `${fontSize}px`,
                        background: `linear-gradient(${gradientDirection}, ${gradientColors.join(', ')})`,

                    }}>
                        {text}
                    </div>
                </div>

                <div className="mt-8 space-y-8">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold">Generated CSS</h2>
                            <button onClick={() => handleCopyCode(generateGradientCSS())} className="text-blue-600 hover:text-blue-800">
                                <FontAwesomeIcon icon={faCopy} className="mr-2" />
                                Copy
                            </button>
                        </div>
                        <SyntaxHighlighter language="css" style={vscDarkPlus} showLineNumbers>
                            {generateGradientCSS()}
                        </SyntaxHighlighter>
                    </div>

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
                </div>
            </div>
        </div >
    );
};

export default TextGradientGenerator;
