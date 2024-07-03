"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const RatingGenerator = () => {
    const [ratingType, setRatingType] = useState('star');
    const [maxRating, setMaxRating] = useState(5);
    const [size, setSize] = useState(24);
    const [activeColor, setActiveColor] = useState('#fbbf24');
    const [inactiveColor, setInactiveColor] = useState('#d1d5db');
    const [spacing, setSpacing] = useState(4);
    const [animationDuration, setAnimationDuration] = useState(0.2);
    const [showValue, setShowValue] = useState(true);
    const [labelText, setLabelText] = useState('Rate this:');
    const [labelColor, setLabelColor] = useState('#000000');
    const [fontSize, setFontSize] = useState(16);
    const [initialRating, setInitialRating] = useState(0);
    const [readOnly, setReadOnly] = useState(false);

    const generateCSS = () => {
        return `
.rating-container {
  display: inline-flex;
  align-items: center;
  font-size: ${fontSize}px;
}

.rating-label {
  margin-right: 10px;
  color: ${labelColor};
}

.rating {
  display: inline-flex;
  gap: ${spacing}px;
}

.rating-item {
  font-size: ${size}px;
  color: ${inactiveColor};
  cursor: ${readOnly ? 'default' : 'pointer'};
  transition: color ${animationDuration}s ease-in-out;
}

.rating-item.active {
  color: ${activeColor};
}

.rating-item:hover {
  ${!readOnly ? `color: ${activeColor};` : ''}
}

.rating-value {
  margin-left: 10px;
  font-weight: bold;
}
`;
    };

    const generateHTML = () => {
        const items = Array.from({ length: maxRating }, (_, index) => {
            if (ratingType === 'star') {
                return `<span class="rating-item${index < initialRating ? ' active' : ''}">${index < initialRating ? '★' : '☆'}</span>`;
            } else {
                return `<span class="rating-item${index < initialRating ? ' active' : ''}">${index + 1}</span>`;
            }
        });

        return `
<div class="rating-container">
  ${labelText ? `<span class="rating-label">${labelText}</span>` : ''}
  <div class="rating">
    ${items.join('\n    ')}
  </div>
  ${showValue ? `<span class="rating-value">${initialRating}</span>` : ''}
</div>
`;
    };

    const handleCopyCode = (code: any) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto max-h-[95vh]">
                <h2 className="text-2xl font-bold mb-6">Rating Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rating Type</label>
                        <select
                            value={ratingType}
                            onChange={(e) => setRatingType(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="star">Star</option>
                            <option value="number">Number</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Max Rating</label>
                        <input
                            type="number"
                            value={maxRating}
                            onChange={(e) => setMaxRating(Math.max(1, parseInt(e.target.value)))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Size (px)</label>
                        <input
                            type="number"
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Active Color</label>
                        <input
                            type="color"
                            value={activeColor}
                            onChange={(e) => setActiveColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Inactive Color</label>
                        <input
                            type="color"
                            value={inactiveColor}
                            onChange={(e) => setInactiveColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Spacing (px)</label>
                        <input
                            type="number"
                            value={spacing}
                            onChange={(e) => setSpacing(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Animation Duration (s)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={animationDuration}
                            onChange={(e) => setAnimationDuration(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={showValue}
                                onChange={(e) => setShowValue(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Show Value</span>
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Label Text</label>
                        <input
                            type="text"
                            value={labelText}
                            onChange={(e) => setLabelText(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Label Color</label>
                        <input
                            type="color"
                            value={labelColor}
                            onChange={(e) => setLabelColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Font Size (px)</label>
                        <input
                            type="number"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Initial Rating</label>
                        <input
                            type="number"
                            value={initialRating}
                            onChange={(e) => setInitialRating(Math.min(maxRating, Math.max(0, Number(e.target.value))))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={readOnly}
                                onChange={(e) => setReadOnly(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Read Only</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white min-h-[100px] flex items-center justify-center">
                    <style>{generateCSS()}</style>
                    <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />
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

export default RatingGenerator;