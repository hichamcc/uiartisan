"use client";
import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TailwindClasses, generateColorClass, generateTextSizeClass, generateFontWeightClass, generateSpacingClass, generateBorderRadiusClass, generateBorderWidthClass } from '@/data/TailwindClasses';

const TailwindButtonGenerator: React.FC = () => {
    const [buttonText, setButtonText] = useState('Button');
    const [bgColor, setBgColor] = useState('orange');
    const [bgShade, setBgShade] = useState('500');
    const [textColor, setTextColor] = useState('white');
    const [textShade, setTextShade] = useState('');
    const [textSize, setTextSize] = useState('base');
    const [fontWeight, setFontWeight] = useState('medium');
    const [paddingX, setPaddingX] = useState('4');
    const [paddingY, setPaddingY] = useState('2');
    const [borderRadius, setBorderRadius] = useState('md');
    const [borderWidth, setBorderWidth] = useState('0');
    const [borderColor, setBorderColor] = useState('gray');
    const [borderShade, setBorderShade] = useState('300');
    const [hoverEffect, setHoverEffect] = useState(true);
    const [focusEffect, setFocusEffect] = useState(true);
    const [updateKey, setUpdateKey] = useState(0);

    const generateButtonClass = useCallback(() => {
        let classes = [
            generateColorClass('bg', bgColor, bgShade),
            generateColorClass('text', textColor, textShade),
            generateTextSizeClass(textSize),
            generateFontWeightClass(fontWeight),
            generateSpacingClass('p', 'x', paddingX),
            generateSpacingClass('p', 'y', paddingY),
            generateBorderRadiusClass(borderRadius),
            generateBorderWidthClass(borderWidth),
        ];

        if (borderWidth !== '0') {
            classes.push(generateColorClass('border', borderColor, borderShade));
        }

        if (hoverEffect) {
            classes.push(`hover:${generateColorClass('bg', bgColor, String(Number(bgShade) + 100))}`);
        }

        if (focusEffect) {
            classes.push('focus:outline-none focus:ring-2 focus:ring-offset-2');
            classes.push(`focus:${generateColorClass('ring', bgColor, '500')}`);
        }

        return classes.join(' ');
    }, [bgColor, bgShade, textColor, textShade, textSize, fontWeight, paddingX, paddingY, borderRadius, borderWidth, borderColor, borderShade, hoverEffect, focusEffect]);

    const generateHTML = useCallback(() => {
        return `<button class="${generateButtonClass()}">${buttonText}</button>`;
    }, [generateButtonClass, buttonText]);

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const updatePreview = () => {
        setUpdateKey(prev => prev + 1);
    };

    const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (value: any) => {
        setter(value);
        updatePreview();
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Tailwind Button Generator</h2>

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
                        <div className="grid grid-cols-2 gap-2">
                            <select
                                value={bgColor}
                                onChange={(e) => handleChange(setBgColor)(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                {TailwindClasses.colors.map((color: any) => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>
                            <select
                                value={bgShade}
                                onChange={(e) => setBgShade(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                {TailwindClasses.colorShades.map((shade: any) => (
                                    <option key={shade} value={shade}>{shade}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Text Color</label>
                        <div className="grid grid-cols-2 gap-2">
                            <select
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                {TailwindClasses.colors.map((color: any) => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>
                            <select
                                value={textShade}
                                onChange={(e) => setTextShade(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Default</option>
                                {TailwindClasses.colorShades.map((shade: any) => (
                                    <option key={shade} value={shade}>{shade}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Text Size</label>
                        <select
                            value={textSize}
                            onChange={(e) => setTextSize(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            {TailwindClasses.textSizes.map((size: any) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Font Weight</label>
                        <select
                            value={fontWeight}
                            onChange={(e) => setFontWeight(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            {TailwindClasses.fontWeights.map((weight: any) => (
                                <option key={weight} value={weight}>{weight}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Padding</label>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs text-gray-500">Horizontal</label>
                                <select
                                    value={paddingX}
                                    onChange={(e) => setPaddingX(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    {TailwindClasses.spacing.map((space: any) => (
                                        <option key={space} value={space}>{space}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500">Vertical</label>
                                <select
                                    value={paddingY}
                                    onChange={(e) => setPaddingY(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    {TailwindClasses.spacing.map((space: any) => (
                                        <option key={space} value={space}>{space}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Radius</label>
                        <select
                            value={borderRadius}
                            onChange={(e) => setBorderRadius(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            {TailwindClasses.borderRadius.map((radius: any) => (
                                <option key={radius} value={radius}>{radius}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Width</label>
                        <select
                            value={borderWidth}
                            onChange={(e) => setBorderWidth(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            {TailwindClasses.borderWidths.map((width: any) => (
                                <option key={width} value={width}>{width}</option>
                            ))}
                        </select>
                    </div>

                    {borderWidth !== '0' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Border Color</label>
                            <div className="grid grid-cols-2 gap-2">
                                <select
                                    value={borderColor}
                                    onChange={(e) => setBorderColor(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    {TailwindClasses.colors.map((color: any) => (
                                        <option key={color} value={color}>{color}</option>
                                    ))}
                                </select>
                                <select
                                    value={borderShade}
                                    onChange={(e) => setBorderShade(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    {TailwindClasses.colorShades.map((shade: any) => (
                                        <option key={shade} value={shade}>{shade}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={hoverEffect}
                                onChange={(e) => setHoverEffect(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Hover Effect</span>
                        </label>
                    </div>

                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={focusEffect}
                                onChange={(e) => setFocusEffect(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Focus Effect</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white overflow-hidden">
                    <button key={updateKey} className={generateButtonClass()}>{buttonText}</button>
                </div>

                <div className="mt-8">
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
    );
};

export default TailwindButtonGenerator;