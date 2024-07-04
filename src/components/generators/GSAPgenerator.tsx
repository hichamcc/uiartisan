"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gsap from 'gsap';

interface AnimationProps {
    x: number;
    y: number;
    rotation: number;
    scale: number;
    opacity: number;
    duration: number;
    ease: any;
}

const GSAPGenerator: React.FC = () => {
    const [htmlCode, setHtmlCode] = useState<string>('<div class="box" style="width: 50px; height: 50px; background-color: #3b82f6;" ></div>');
    const [selector, setSelector] = useState<string>('.box');
    const [animationProps, setAnimationProps] = useState<AnimationProps>({
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power1.out'
    });

    const gsapRequirementsNotice = `
    To use this GSAP animation in your project:
    
    1. Include the GSAP library in your HTML:
       <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
    
    2. Ensure you have the HTML element with the correct selector in your markup.
    
    3. Copy and paste the generated code into your JavaScript file or <script> tag.
    
    4. For React projects:
       - Install GSAP: npm install gsap
       - Import GSAP: import gsap from 'gsap'
    
    Note: GSAP may require a license for commercial use. Check https://greensock.com/licensing/ for details.
        `.trim();

    const [generatedCode, setGeneratedCode] = useState<string>('');
    const previewRef = useRef<HTMLDivElement>(null);

    const easeOptions = [
        'none', 'power1.in', 'power1.out', 'power1.inOut',
        'power2.in', 'power2.out', 'power2.inOut',
        'power3.in', 'power3.out', 'power3.inOut',
        'power4.in', 'power4.out', 'power4.inOut',
        'back.in', 'back.out', 'back.inOut',
        'elastic.in', 'elastic.out', 'elastic.inOut',
        'bounce.in', 'bounce.out', 'bounce.inOut',
        'slow', 'expoScale'
    ];

    useEffect(() => {
        generateCode();
    }, [animationProps, selector]);

    useEffect(() => {
        if (previewRef.current) {
            previewRef.current.innerHTML = htmlCode;
        }
    }, [htmlCode]);

    const generateCode = () => {
        const code = `
gsap.to("${selector}", {
    x: ${animationProps.x},
    y: ${animationProps.y},
    rotation: ${animationProps.rotation},
    scale: ${animationProps.scale},
    opacity: ${animationProps.opacity},
    duration: ${animationProps.duration},
    ease: "${animationProps.ease}"
});
        `.trim();
        setGeneratedCode(code);
    };

    const handleInputChange = (prop: keyof AnimationProps, value: number | string) => {
        setAnimationProps(prev => ({ ...prev, [prop]: value }));
    };

    const playAnimation = () => {
        if (previewRef.current) {
            const element = previewRef.current.querySelector(selector);
            if (element) {
                gsap.to(element, {
                    x: animationProps.x,
                    y: animationProps.y,
                    rotation: animationProps.rotation,
                    scale: animationProps.scale,
                    opacity: animationProps.opacity,
                    duration: animationProps.duration,
                    ease: animationProps.ease as gsap.EaseFunction,
                });
            }
        }
    };

    const resetAnimation = () => {
        if (previewRef.current) {
            const element = previewRef.current.querySelector(selector);
            if (element) {
                gsap.set(element, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    opacity: 1,
                });
            }
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText(generatedCode);
        // Optionally, add a toast notification here
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto max-h-[95vh]">
                <h2 className="text-2xl font-bold mb-6">GSAP Animation Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">HTML</label>
                        <textarea
                            value={htmlCode}
                            onChange={(e) => setHtmlCode(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows={5}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Selector</label>
                        <input
                            type="text"
                            value={selector}
                            onChange={(e) => setSelector(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    {Object.entries(animationProps).map(([prop, value]) => (
                        <div key={prop}>
                            <label className="block text-sm font-medium text-gray-700">
                                {prop.charAt(0).toUpperCase() + prop.slice(1)}
                            </label>
                            {prop === 'ease' ? (
                                <select
                                    value={value as string}
                                    onChange={(e) => handleInputChange(prop as keyof AnimationProps, e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    {easeOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="number"
                                    value={value as number}
                                    onChange={(e) => handleInputChange(prop as keyof AnimationProps, Number(e.target.value))}
                                    step={prop === 'duration' || prop === 'scale' ? 0.1 : 1}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <button
                        onClick={playAnimation}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    >
                        <FontAwesomeIcon icon={faPlay} className="mr-2" />
                        Play Animation
                    </button>
                </div>

                <div className="mt-4">
                    <button
                        onClick={resetAnimation}
                        className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white overflow-hidden h-64 relative">
                    <div ref={previewRef}></div>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-semibold">Generated GSAP Code</h2>
                        <button onClick={copyCode} className="text-blue-600 hover:text-blue-800">
                            <FontAwesomeIcon icon={faCopy} className="mr-2" />
                            Copy
                        </button>
                    </div>
                    <SyntaxHighlighter language="javascript" style={vscDarkPlus} showLineNumbers>
                        {generatedCode}
                    </SyntaxHighlighter>
                </div>

                <div className="mt-8 bg-yellow-100 border-l-4 border-yellow-500 p-4">
                    <h3 className="text-lg font-semibold mb-2">GSAP Requirements</h3>
                    <SyntaxHighlighter language="markdown" style={vscDarkPlus}>
                        {gsapRequirementsNotice}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default GSAPGenerator;