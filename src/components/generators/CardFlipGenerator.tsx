"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CardStyles {
    width: number;
    height: number;
    borderRadius: number;
    frontBgColor: string;
    backBgColor: string;
    frontTextColor: string;
    backTextColor: string;
    flipDuration: number;
    flipDirection: 'horizontal' | 'vertical';
}

const CardFlipGenerator: React.FC = () => {
    const [styles, setStyles] = useState<CardStyles>({
        width: 200,
        height: 300,
        borderRadius: 10,
        frontBgColor: '#3b82f6',
        backBgColor: '#2563eb',
        frontTextColor: '#ffffff',
        backTextColor: '#ffffff',
        flipDuration: 0.6,
        flipDirection: 'horizontal',
    });

    const [frontContent, setFrontContent] = useState('Front Content');
    const [backContent, setBackContent] = useState('Back Content');

    const generateCSS = () => {
        return `
.card-container {
  width: ${styles.width}px;
  height: ${styles.height}px;
  perspective: 1000px;
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform ${styles.flipDuration}s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.card-container:hover .card {
  transform: ${styles.flipDirection === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)'};
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${styles.borderRadius}px;
}

.card-front {
  background-color: ${styles.frontBgColor};
  color: ${styles.frontTextColor};
}

.card-back {
  background-color: ${styles.backBgColor};
  color: ${styles.backTextColor};
  transform: ${styles.flipDirection === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)'};
}
`;
    };

    const generateHTML = () => {
        return `
<div class="card-container">
  <div class="card">
    <div class="card-front">
      ${frontContent}
    </div>
    <div class="card-back">
      ${backContent}
    </div>
  </div>
</div>
`;
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const updateStyle = (property: keyof CardStyles, value: number | string) => {
        setStyles({ ...styles, [property]: value });
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Card Flip Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Width (px)</label>
                        <input
                            type="number"
                            value={styles.width}
                            onChange={(e) => updateStyle('width', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Height (px)</label>
                        <input
                            type="number"
                            value={styles.height}
                            onChange={(e) => updateStyle('height', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Radius (px)</label>
                        <input
                            type="number"
                            value={styles.borderRadius}
                            onChange={(e) => updateStyle('borderRadius', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Front Background Color</label>
                        <input
                            type="color"
                            value={styles.frontBgColor}
                            onChange={(e) => updateStyle('frontBgColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Back Background Color</label>
                        <input
                            type="color"
                            value={styles.backBgColor}
                            onChange={(e) => updateStyle('backBgColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Front Text Color</label>
                        <input
                            type="color"
                            value={styles.frontTextColor}
                            onChange={(e) => updateStyle('frontTextColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Back Text Color</label>
                        <input
                            type="color"
                            value={styles.backTextColor}
                            onChange={(e) => updateStyle('backTextColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Flip Duration (seconds)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={styles.flipDuration}
                            onChange={(e) => updateStyle('flipDuration', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Flip Direction</label>
                        <select
                            value={styles.flipDirection}
                            onChange={(e) => updateStyle('flipDirection', e.target.value as 'horizontal' | 'vertical')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="horizontal">Horizontal</option>
                            <option value="vertical">Vertical</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Front Content</label>
                        <textarea
                            value={frontContent}
                            onChange={(e) => setFrontContent(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Back Content</label>
                        <textarea
                            value={backContent}
                            onChange={(e) => setBackContent(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows={3}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white overflow-hidden flex justify-center items-center min-h-[400px]">
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

export default CardFlipGenerator;