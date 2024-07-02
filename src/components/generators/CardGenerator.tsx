"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CardGenerator = () => {
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(420);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [borderRadius, setBorderRadius] = useState(8);
    const [borderWidth, setBorderWidth] = useState(1);
    const [borderColor, setBorderColor] = useState('#e5e7eb');
    const [boxShadow, setBoxShadow] = useState('0 4px 6px rgba(0, 0, 0, 0.1)');
    const [padding, setPadding] = useState(16);

    const [showImage, setShowImage] = useState(true);
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/300x200');
    const [imageHeight, setImageHeight] = useState(200);

    const [showTitle, setShowTitle] = useState(true);
    const [titleText, setTitleText] = useState('Card Title');
    const [titleColor, setTitleColor] = useState('#111827');
    const [titleFontSize, setTitleFontSize] = useState(24);
    const [titleFontWeight, setTitleFontWeight] = useState(700);

    const [showDescription, setShowDescription] = useState(true);
    const [descriptionText, setDescriptionText] = useState('This is a sample card description. You can customize it to fit your needs.');
    const [descriptionColor, setDescriptionColor] = useState('#4b5563');
    const [descriptionFontSize, setDescriptionFontSize] = useState(16);

    const [showButton, setShowButton] = useState(true);
    const [buttonText, setButtonText] = useState('Learn More');
    const [buttonBackgroundColor, setButtonBackgroundColor] = useState('#3b82f6');
    const [buttonTextColor, setButtonTextColor] = useState('#ffffff');
    const [buttonBorderRadius, setButtonBorderRadius] = useState(4);

    const [hoverEffect, setHoverEffect] = useState('shadow');
    const [hoverTransitionDuration, setHoverTransitionDuration] = useState(0.3);

    const [customBoxShadow, setCustomBoxShadow] = useState('');

    const boxShadowOptions = [
        { value: 'none', label: 'None' },
        { value: '0 4px 6px rgba(0, 0, 0, 0.1)', label: 'Light' },
        { value: '0 10px 15px rgba(0, 0, 0, 0.1)', label: 'Medium' },
        { value: '0 20px 25px rgba(0, 0, 0, 0.15)', label: 'Heavy' },
        { value: '0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1)', label: 'Layered' },
    ];



    const generateCSS = () => {
        return `
.card {
  width: ${width}px;
  height: ${height}px;
  background-color: ${backgroundColor};
  border-radius: ${borderRadius}px;
  border: ${borderWidth}px solid ${borderColor};
  box-shadow: ${boxShadow};
  padding: ${padding}px;
  overflow: hidden;
  transition: all ${hoverTransitionDuration}s ease-in-out;
}

${hoverEffect === 'shadow' ? `
.card:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}
` : hoverEffect === 'scale' ? `
.card:hover {
  transform: scale(1.05);
}
` : hoverEffect === 'border' ? `
.card:hover {
  border-color: #3b82f6;
}
` : ''}

.card-image {
  width: 100%;
  height: ${imageHeight}px;
  object-fit: cover;
  border-radius: ${borderRadius}px ${borderRadius}px 0 0;
  margin-bottom: ${padding}px;
}

.card-title {
  color: ${titleColor};
  font-size: ${titleFontSize}px;
  font-weight: ${titleFontWeight};
  margin-bottom: ${padding / 2}px;
}

.card-description {
  color: ${descriptionColor};
  font-size: ${descriptionFontSize}px;
  margin-bottom: ${padding}px;
}

.card-button {
  background-color: ${buttonBackgroundColor};
  color: ${buttonTextColor};
  border: none;
  border-radius: ${buttonBorderRadius}px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.card-button:hover {
  background-color: ${buttonBackgroundColor}dd;
}
`;
    };

    const generateHTML = () => {
        return `
<div class="card">
  ${showImage ? `<img src="${imageUrl}" alt="Card image" class="card-image">` : ''}
  ${showTitle ? `<h2 class="card-title">${titleText}</h2>` : ''}
  ${showDescription ? `<p class="card-description">${descriptionText}</p>` : ''}
  ${showButton ? `<button class="card-button">${buttonText}</button>` : ''}
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
                <h2 className="text-2xl font-bold mb-6">Card Generator</h2>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Card Dimensions</h3>
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

                    <h3 className="text-lg font-semibold">Card Styling</h3>
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
                        <label className="block text-sm font-medium text-gray-700">Border Radius (px)</label>
                        <input
                            type="number"
                            value={borderRadius}
                            onChange={(e) => setBorderRadius(Number(e.target.value))}
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
                        <label className="block text-sm font-medium text-gray-700">Box Shadow</label>
                        <select
                            value={boxShadowOptions.find(option => option.value === boxShadow)?.value || 'custom'}
                            onChange={(e) => {
                                if (e.target.value === 'custom') {
                                    setBoxShadow(customBoxShadow);
                                } else {
                                    setBoxShadow(e.target.value);
                                }
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            {boxShadowOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Padding (px)</label>
                        <input
                            type="number"
                            value={padding}
                            onChange={(e) => setPadding(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <h3 className="text-lg font-semibold">Image</h3>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={showImage}
                                onChange={(e) => setShowImage(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Show Image</span>
                        </label>
                    </div>
                    {showImage && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image Height (px)</label>
                                <input
                                    type="number"
                                    value={imageHeight}
                                    onChange={(e) => setImageHeight(Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </>
                    )}

                    <h3 className="text-lg font-semibold">Title</h3>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={showTitle}
                                onChange={(e) => setShowTitle(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Show Title</span>
                        </label>
                    </div>
                    {showTitle && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title Text</label>
                                <input
                                    type="text"
                                    value={titleText}
                                    onChange={(e) => setTitleText(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title Color</label>
                                <input
                                    type="color"
                                    value={titleColor}
                                    onChange={(e) => setTitleColor(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title Font Size (px)</label>
                                <input
                                    type="number"
                                    value={titleFontSize}
                                    onChange={(e) => setTitleFontSize(Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title Font Weight</label>
                                <input
                                    type="number"
                                    value={titleFontWeight}
                                    onChange={(e) => setTitleFontWeight(Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </>
                    )}

                    <h3 className="text-lg font-semibold">Description</h3>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={showDescription}
                                onChange={(e) => setShowDescription(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Show Description</span>
                        </label>
                    </div>
                    {showDescription && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description Text</label>
                                <textarea
                                    value={descriptionText}
                                    onChange={(e) => setDescriptionText(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    rows={3}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description Color</label>
                                    <input
                                        type="color"
                                        value={descriptionColor}
                                        onChange={(e) => setDescriptionColor(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description Font Size (px)</label>
                                    <input
                                        type="number"
                                        value={descriptionFontSize}
                                        onChange={(e) => setDescriptionFontSize(Number(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <h3 className="text-lg font-semibold">Button</h3>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={showButton}
                                onChange={(e) => setShowButton(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Show Button</span>
                        </label>
                    </div>
                    {showButton && (
                        <>
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
                                <label className="block text-sm font-medium text-gray-700">Button Background Color</label>
                                <input
                                    type="color"
                                    value={buttonBackgroundColor}
                                    onChange={(e) => setButtonBackgroundColor(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Button Text Color</label>
                                <input
                                    type="color"
                                    value={buttonTextColor}
                                    onChange={(e) => setButtonTextColor(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Button Border Radius (px)</label>
                                <input
                                    type="number"
                                    value={buttonBorderRadius}
                                    onChange={(e) => setButtonBorderRadius(Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </>
                    )}

                    <h3 className="text-lg font-semibold">Hover Effects</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hover Effect</label>
                        <select
                            value={hoverEffect}
                            onChange={(e) => setHoverEffect(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="none">None</option>
                            <option value="shadow">Shadow</option>
                            <option value="scale">Scale</option>
                            <option value="border">Border</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hover Transition Duration (s)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={hoverTransitionDuration}
                            onChange={(e) => setHoverTransitionDuration(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white min-h-[400px] flex items-center justify-center">
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

export default CardGenerator;