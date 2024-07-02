"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDesktop, faTablet, faMobile } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const ButtonGenerator = () => {

    const shadowOptions = [
        { value: 'none', label: 'None' },
        { value: '0 2px 4px rgba(0, 0, 0, 0.1)', label: 'Light' },
        { value: '0 4px 6px rgba(0, 0, 0, 0.1)', label: 'Medium' },
        { value: '0 8px 12px rgba(0, 0, 0, 0.1)', label: 'Heavy' },
        { value: '0 12px 24px rgba(0, 0, 0, 0.2)', label: 'Extra Heavy' },
    ];

    const hoverEffectOptions = [
        { value: 'none', label: 'None' },
        { value: 'brightness(110%)', label: 'Brighten' },
        { value: 'brightness(90%)', label: 'Darken' },
        { value: 'scale(1.05)', label: 'Scale Up' },
        { value: 'scale(0.95)', label: 'Scale Down' },
    ];

    const focusOutlineOptions = [
        { value: 'none', label: 'None' },
        { value: '2px solid #60A5FA', label: 'Blue' },
        { value: '2px solid #10B981', label: 'Green' },
        { value: '2px solid #EF4444', label: 'Red' },
        { value: '2px dashed #6B7280', label: 'Gray Dashed' },
    ];


    const [buttonText, setButtonText] = useState('Click me');
    const [bgColor, setBgColor] = useState('#3B82F6');
    const [textColor, setTextColor] = useState('#FFFFFF');
    const [borderRadius, setBorderRadius] = useState(4);
    const [shadow, setShadow] = useState('0 2px 4px rgba(0, 0, 0, 0.1)');
    const [hoverEffect, setHoverEffect] = useState('brightness(110%)');
    const [hoverBgColor, setHoverBgColor] = useState('#2563EB');
    const [hoverTextColor, setHoverTextColor] = useState('#FFFFFF');
    const [width, setWidth] = useState(120);
    const [height, setHeight] = useState(40);
    const [fontWeight, setFontWeight] = useState(500);
    const [borderWidth, setBorderWidth] = useState(0);
    const [borderColor, setBorderColor] = useState('#000000');
    const [textTransform, setTextTransform] = useState('none');
    const [transitionSpeed, setTransitionSpeed] = useState(0.3);
    const [focusOutline, setFocusOutline] = useState('2px solid #60A5FA');
    const [viewportWidth, setViewportWidth] = useState('100%');

    const generateCSS = () => {
        return `
.custom-button {
  background-color: ${bgColor};
  color: ${textColor};
  border-radius: ${borderRadius}px;
  box-shadow: ${shadow};
  width: ${width}px;
  height: ${height}px;
  font-weight: ${fontWeight};
  border: ${borderWidth}px solid ${borderColor};
  text-transform: ${textTransform};
  transition: all ${transitionSpeed}s;
}

.custom-button:hover {
  background-color: ${hoverBgColor};
  color: ${hoverTextColor};
  filter: ${hoverEffect};
}

.custom-button:focus {
  outline: ${focusOutline};
}
`;
    };

    const generateHTML = () => {
        return `<button class="custom-button">${buttonText}</button>`;
    };

    const handleCopyCode = (code: any) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    return (
        <div className="flex flex-col md:flex-row">
            {/* Parameters Side */}
            <div className="w-full md:w-1/4 p-8 bg-white shadow-md overflow-y-scroll max-h-[calc(100vh-56px)]">
                <h2 className="text-2xl font-bold mb-6">Button Parameters</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Button Text</label>
                        <input
                            type="text"
                            value={buttonText}
                            onChange={(e) => setButtonText(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Background Color</label>
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Text Color</label>
                        <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Radius (px)</label>
                        <input
                            type="number"
                            value={borderRadius}
                            onChange={(e) => setBorderRadius(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Shadow</label>
                        <select
                            value={shadow}
                            onChange={(e) => setShadow(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            {shadowOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hover Effect</label>
                        <select
                            value={hoverEffect}
                            onChange={(e) => setHoverEffect(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            {hoverEffectOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hover Background Color</label>
                        <input
                            type="color"
                            value={hoverBgColor}
                            onChange={(e) => setHoverBgColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hover Text Color</label>
                        <input
                            type="color"
                            value={hoverTextColor}
                            onChange={(e) => setHoverTextColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Width (px)</label>
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Height (px)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Font Weight</label>
                        <input
                            type="number"
                            value={fontWeight}
                            onChange={(e) => setFontWeight(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Width (px)</label>
                        <input
                            type="number"
                            value={borderWidth}
                            onChange={(e) => setBorderWidth(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Color</label>
                        <input
                            type="color"
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Text Transform</label>
                        <select
                            value={textTransform}
                            onChange={(e) => setTextTransform(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="none">None</option>
                            <option value="uppercase">Uppercase</option>
                            <option value="lowercase">Lowercase</option>
                            <option value="capitalize">Capitalize</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Transition Speed (s)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={transitionSpeed}
                            onChange={(e) => setTransitionSpeed(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Focus Outline</label>
                        <select
                            value={focusOutline}
                            onChange={(e) => setFocusOutline(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            {focusOutlineOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Preview and Code Side */}
            <div className="w-full md:w-3/4 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>

                <div className="border p-4 bg-white min-h-[200px] flex items-center justify-center" style={{ width: viewportWidth, margin: '0 auto' }}>
                    <style>{generateCSS()}</style>
                    <button className="custom-button">{buttonText}</button>
                </div>

                {/* Generated Code */}
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

export default ButtonGenerator;