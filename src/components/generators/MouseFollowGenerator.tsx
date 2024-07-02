"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface FollowerStyles {
    width: number;
    height: number;
    backgroundColor: string;
    opacity: number;
    zIndex: number;
    followStyle: 'instant' | 'smooth' | 'delayed' | 'spring';
    delay: number;
    shape: 'circle' | 'square' | 'triangle' | 'star' | 'custom';
    customSVG: string;
}

const MouseFollowGenerator: React.FC = () => {
    const [styles, setStyles] = useState<FollowerStyles>({
        width: 20,
        height: 20,
        backgroundColor: '#3b82f6',
        opacity: 0.5,
        zIndex: 9999,
        followStyle: 'smooth',
        delay: 0.1,
        shape: 'circle',
        customSVG: '',
    });

    const previewRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const previewArea = previewRef.current;
        const follower = followerRef.current;

        if (!previewArea || !follower) return;

        let animationFrameId: number;
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        let velocityX = 0, velocityY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = previewArea.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const updatePosition = () => {
            switch (styles.followStyle) {
                case 'instant':
                    followerX = mouseX;
                    followerY = mouseY;
                    break;
                case 'smooth':
                    followerX += (mouseX - followerX) * styles.delay;
                    followerY += (mouseY - followerY) * styles.delay;
                    break;
                case 'delayed':
                    setTimeout(() => {
                        followerX = mouseX;
                        followerY = mouseY;
                    }, styles.delay * 1000);
                    break;
                case 'spring':
                    const springStrength = 0.1;
                    const friction = 0.8;
                    const dx = mouseX - followerX;
                    const dy = mouseY - followerY;
                    velocityX += dx * springStrength;
                    velocityY += dy * springStrength;
                    velocityX *= friction;
                    velocityY *= friction;
                    followerX += velocityX;
                    followerY += velocityY;
                    break;
            }

            follower.style.transform = `translate(${followerX - styles.width / 2}px, ${followerY - styles.height / 2}px)`;
            animationFrameId = requestAnimationFrame(updatePosition);
        };

        previewArea.addEventListener('mousemove', handleMouseMove);
        updatePosition();

        return () => {
            previewArea.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [styles]);

    const generateCSS = () => {
        let shapeCSS = '';
        switch (styles.shape) {
            case 'circle':
                shapeCSS = `border-radius: 50%;`;
                break;
            case 'square':
                shapeCSS = ``;
                break;
            case 'triangle':
                shapeCSS = `clip-path: polygon(50% 0%, 0% 100%, 100% 100%);`;
                break;
            case 'star':
                shapeCSS = `clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);`;
                break;
            case 'custom':
                // For custom SVG, we'll handle it differently in the HTML
                break;
        }

        return `
    .mouse-follower {
      width: ${styles.width}px;
      height: ${styles.height}px;
      background-color: ${styles.backgroundColor};
      opacity: ${styles.opacity};
      position: fixed;
      pointer-events: none;
      z-index: ${styles.zIndex};
      ${shapeCSS}
    }
    `;
    };

    const generateHTML = () => {
        if (styles.shape === 'custom') {
            return `
    <div class="mouse-follower">
      <svg width="${styles.width}" height="${styles.height}" viewBox="0 0 ${styles.width} ${styles.height}">
        ${styles.customSVG}
      </svg>
    </div>`;
        }
        return '<div class="mouse-follower"></div>';
    };

    const generateJS = () => {
        let jsCode = `
const follower = document.querySelector('.mouse-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
`;

        switch (styles.followStyle) {
            case 'instant':
                jsCode += `
document.addEventListener('mousemove', (e) => {
  follower.style.transform = \`translate(\${e.clientX - ${styles.width / 2}}px, \${e.clientY - ${styles.height / 2}}px)\`;
});
`;
                break;
            case 'smooth':
                jsCode += `
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updatePosition() {
  followerX += (mouseX - followerX) * ${styles.delay};
  followerY += (mouseY - followerY) * ${styles.delay};
  follower.style.transform = \`translate(\${followerX - ${styles.width / 2}}px, \${followerY - ${styles.height / 2}}px)\`;
  requestAnimationFrame(updatePosition);
}

updatePosition();
`;
                break;
            case 'delayed':
                jsCode += `
document.addEventListener('mousemove', (e) => {
  setTimeout(() => {
    follower.style.transform = \`translate(\${e.clientX - ${styles.width / 2}}px, \${e.clientY - ${styles.height / 2}}px)\`;
  }, ${styles.delay * 1000});
});
`;
                break;
            case 'spring':
                jsCode += `
let velocityX = 0, velocityY = 0;
const springStrength = 0.1;
const friction = 0.8;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updatePosition() {
  const dx = mouseX - followerX;
  const dy = mouseY - followerY;
  velocityX += dx * springStrength;
  velocityY += dy * springStrength;
  velocityX *= friction;
  velocityY *= friction;
  followerX += velocityX;
  followerY += velocityY;
  follower.style.transform = \`translate(\${followerX - ${styles.width / 2}}px, \${followerY - ${styles.height / 2}}px)\`;
  requestAnimationFrame(updatePosition);
}

updatePosition();
`;
                break;
        }

        return jsCode;
    };

    const renderFollower = () => {
        if (styles.shape === 'custom') {
            return (
                <div
                    ref={followerRef}
                    className="mouse-follower absolute"
                    style={{
                        width: styles.width,
                        height: styles.height,
                        opacity: styles.opacity,
                        zIndex: styles.zIndex,
                    }}
                >
                    <svg width={styles.width} height={styles.height} viewBox={`0 0 ${styles.width} ${styles.height}`}>
                        <g fill={styles.backgroundColor}>
                            {styles.customSVG}
                        </g>
                    </svg>
                </div>
            );
        }
        return (
            <div
                ref={followerRef}
                className="mouse-follower absolute"
                style={{
                    width: styles.width,
                    height: styles.height,
                    backgroundColor: styles.backgroundColor,
                    opacity: styles.opacity,
                    zIndex: styles.zIndex,
                    borderRadius: styles.shape === 'circle' ? '50%' : undefined,
                    clipPath:
                        styles.shape === 'triangle'
                            ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
                            : styles.shape === 'star'
                                ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                                : undefined,
                }}
            />
        );
    };


    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const updateStyle = (property: keyof FollowerStyles, value: number | string) => {
        setStyles({ ...styles, [property]: value });
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Mouse Follow Generator</h2>

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
                        <label className="block text-sm font-medium text-gray-700">Shape</label>
                        <select
                            value={styles.shape}
                            onChange={(e) => updateStyle('shape', e.target.value as FollowerStyles['shape'])}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="circle">Circle</option>
                            <option value="square">Square</option>
                            <option value="triangle">Triangle</option>
                            <option value="star">Star</option>
                            <option value="custom">Custom SVG</option>
                        </select>
                    </div>

                    {styles.shape === 'custom' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Custom SVG</label>
                            <textarea
                                value={styles.customSVG}
                                onChange={(e) => updateStyle('customSVG', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                rows={4}
                                placeholder="Paste your SVG code here"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Background Color</label>
                        <input
                            type="color"
                            value={styles.backgroundColor}
                            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Opacity</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={styles.opacity}
                            onChange={(e) => updateStyle('opacity', Number(e.target.value))}
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Z-Index</label>
                        <input
                            type="number"
                            value={styles.zIndex}
                            onChange={(e) => updateStyle('zIndex', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Follow Style</label>
                        <select
                            value={styles.followStyle}
                            onChange={(e) => updateStyle('followStyle', e.target.value as FollowerStyles['followStyle'])}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="instant">Instant</option>
                            <option value="smooth">Smooth</option>
                            <option value="delayed">Delayed</option>
                            <option value="spring">Spring</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Delay / Smoothness</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            max="1"
                            value={styles.delay}
                            onChange={(e) => updateStyle('delay', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div
                    ref={previewRef}
                    className="border p-4 bg-white overflow-hidden relative h-96"
                >
                    {renderFollower()}
                    <p className="text-white text-2xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        Move your mouse here
                    </p>
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
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold">Generated JavaScript</h2>
                            <button onClick={() => handleCopyCode(generateJS())} className="text-blue-600 hover:text-blue-800">
                                <FontAwesomeIcon icon={faCopy} className="mr-2" />
                                Copy
                            </button>
                        </div>
                        <SyntaxHighlighter language="javascript" style={vscDarkPlus} showLineNumbers>
                            {generateJS()}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MouseFollowGenerator;