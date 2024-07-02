"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const SpinnerGenerator = () => {
    const [spinnerType, setSpinnerType] = useState('circle');
    const [size, setSize] = useState(50);
    const [borderWidth, setBorderWidth] = useState(5);
    const [primaryColor, setPrimaryColor] = useState('#3498db');
    const [secondaryColor, setSecondaryColor] = useState('#f3f3f3');
    const [animationDuration, setAnimationDuration] = useState(1);
    const [animationTimingFunction, setAnimationTimingFunction] = useState('linear');
    const [text, setText] = useState('');
    const [textPosition, setTextPosition] = useState('bottom');
    const [textColor, setTextColor] = useState('#000000');
    const [textSize, setTextSize] = useState(14);

    const generateCSS = () => {
        let css = `
.spinner-container {
  display: inline-flex;
  flex-direction: ${textPosition === 'bottom' || textPosition === 'top' ? 'column' : 'row'};
  align-items: center;
  justify-content: center;
}

.spinner-text {
  margin: ${textPosition === 'bottom' || textPosition === 'right' ? '10px 0 0 0' : '0 0 10px 0'};
  font-size: ${textSize}px;
  color: ${textColor};
}
`;

        switch (spinnerType) {
            case 'circle':
                css += `
.spinner {
  width: ${size}px;
  height: ${size}px;
  border: ${borderWidth}px solid ${secondaryColor};
  border-top: ${borderWidth}px solid ${primaryColor};
  border-radius: 50%;
  animation: spin ${animationDuration}s ${animationTimingFunction} infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
                break;
            case 'dots':
                css += `
.spinner {
  display: flex;
  align-items: center;
}

.dot {
  width: ${size / 5}px;
  height: ${size / 5}px;
  background-color: ${primaryColor};
  border-radius: 50%;
  margin: 0 ${size / 10}px;
  animation: bounce ${animationDuration}s ${animationTimingFunction} infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.1s;
}

.dot:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-${size / 5}px); }
}
`;
                break;
            case 'bars':
                css += `
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bar {
  width: ${size / 5}px;
  height: ${size}px;
  background-color: ${primaryColor};
  margin: 0 ${size / 20}px;
  animation: stretch ${animationDuration}s ${animationTimingFunction} infinite;
}

.bar:nth-child(2) {
  animation-delay: 0.1s;
}

.bar:nth-child(3) {
  animation-delay: 0.2s;
}

.bar:nth-child(4) {
  animation-delay: 0.3s;
}

@keyframes stretch {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.5); }
}
`;
                break;
            case 'dual-ring':
                css += `
.spinner {
  display: inline-block;
  width: ${size}px;
  height: ${size}px;
}

.spinner:after {
  content: " ";
  display: block;
  width: ${size * 0.8}px;
  height: ${size * 0.8}px;
  margin: ${size * 0.1}px;
  border-radius: 50%;
  border: ${borderWidth}px solid ${primaryColor};
  border-color: ${primaryColor} transparent ${primaryColor} transparent;
  animation: dual-ring ${animationDuration}s ${animationTimingFunction} infinite;
}

@keyframes dual-ring {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
                break;
            case 'ripple':
                css += `
.spinner {
  display: inline-block;
  position: relative;
  width: ${size}px;
  height: ${size}px;
}

.spinner div {
  position: absolute;
  border: ${borderWidth}px solid ${primaryColor};
  opacity: 1;
  border-radius: 50%;
  animation: ripple ${animationDuration}s ${animationTimingFunction} infinite;
}

.spinner div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes ripple {
  0% {
    top: ${size / 2 - borderWidth}px;
    left: ${size / 2 - borderWidth}px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: ${size - borderWidth * 2}px;
    height: ${size - borderWidth * 2}px;
    opacity: 0;
  }
}
`;
                break;
            case 'roller':
                css += `
.spinner {
  display: inline-block;
  position: relative;
  width: ${size}px;
  height: ${size}px;
}

.spinner div {
  animation: roller ${animationDuration}s ${animationTimingFunction} infinite;
  transform-origin: ${size / 2}px ${size / 2}px;
}

.spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  width: ${size * 0.1}px;
  height: ${size * 0.1}px;
  border-radius: 50%;
  background: ${primaryColor};
  margin: -${size * 0.05}px 0 0 -${size * 0.05}px;
}

.spinner div:nth-child(1) { transform: rotate(0deg); animation-delay: -0.875s; }
.spinner div:nth-child(2) { transform: rotate(45deg); animation-delay: -0.75s; }
.spinner div:nth-child(3) { transform: rotate(90deg); animation-delay: -0.625s; }
.spinner div:nth-child(4) { transform: rotate(135deg); animation-delay: -0.5s; }
.spinner div:nth-child(5) { transform: rotate(180deg); animation-delay: -0.375s; }
.spinner div:nth-child(6) { transform: rotate(225deg); animation-delay: -0.25s; }
.spinner div:nth-child(7) { transform: rotate(270deg); animation-delay: -0.125s; }
.spinner div:nth-child(8) { transform: rotate(315deg); animation-delay: 0s; }

@keyframes roller {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
`;
                break;
        }

        return css;
    };

    const generateHTML = () => {
        let html = '<div class="spinner-container">\n';

        if (textPosition === 'top' || textPosition === 'left') {
            html += text ? `  <div class="spinner-text">${text}</div>\n` : '';
        }

        switch (spinnerType) {
            case 'circle':
                html += '  <div class="spinner"></div>\n';
                break;
            case 'dots':
                html += '  <div class="spinner">\n    <div class="dot"></div>\n    <div class="dot"></div>\n    <div class="dot"></div>\n  </div>\n';
                break;
            case 'bars':
                html += '  <div class="spinner">\n    <div class="bar"></div>\n    <div class="bar"></div>\n    <div class="bar"></div>\n    <div class="bar"></div>\n  </div>\n';
                break;
            case 'dual-ring':
                html += '  <div class="spinner"></div>\n';
                break;
            case 'ripple':
                html += '  <div class="spinner">\n    <div></div>\n    <div></div>\n  </div>\n';
                break;
            case 'roller':
                html += '  <div class="spinner">\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n  </div>\n';
                break;
        }

        if (textPosition === 'bottom' || textPosition === 'right') {
            html += text ? `  <div class="spinner-text">${text}</div>\n` : '';
        }

        html += '</div>';
        return html;
    };

    const handleCopyCode = (code: any) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };


    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Spinner Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Spinner Type</label>
                        <select
                            value={spinnerType}
                            onChange={(e) => setSpinnerType(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="circle">Circle</option>
                            <option value="dots">Dots</option>
                            <option value="bars">Bars</option>
                            <option value="dual-ring">Dual Ring</option>
                            <option value="ripple">Ripple</option>
                            <option value="roller">Roller</option>
                        </select>
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
                    {spinnerType === 'circle' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Border Width (px)</label>
                            <input
                                type="number"
                                value={borderWidth}
                                onChange={(e) => setBorderWidth(Number(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Primary Color</label>
                        <input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    {spinnerType === 'circle' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
                            <input
                                type="color"
                                value={secondaryColor}
                                onChange={(e) => setSecondaryColor(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    )}
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
                        <label className="block text-sm font-medium text-gray-700">Animation Timing Function</label>
                        <select
                            value={animationTimingFunction}
                            onChange={(e) => setAnimationTimingFunction(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="linear">Linear</option>
                            <option value="ease">Ease</option>
                            <option value="ease-in">Ease In</option>
                            <option value="ease-out">Ease Out</option>
                            <option value="ease-in-out">Ease In Out</option>
                        </select>
                    </div>
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
                        <label className="block text-sm font-medium text-gray-700">Text Position</label>
                        <select
                            value={textPosition}
                            onChange={(e) => setTextPosition(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="top">Top</option>
                            <option value="right">Right</option>
                            <option value="bottom">Bottom</option>
                            <option value="left">Left</option>
                        </select>
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
                        <label className="block text-sm font-medium text-gray-700">Text Size (px)</label>
                        <input
                            type="number"
                            value={textSize}
                            onChange={(e) => setTextSize(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white min-h-[300px] flex items-center justify-center">
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

export default SpinnerGenerator;