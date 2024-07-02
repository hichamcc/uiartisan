"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const TooltipGenerator = () => {
    const [tooltipText, setTooltipText] = useState('This is a tooltip');
    const [triggerText, setTriggerText] = useState('Hover me');
    const [position, setPosition] = useState('top');
    const [backgroundColor, setBackgroundColor] = useState('#333333');
    const [textColor, setTextColor] = useState('#ffffff');
    const [fontSize, setFontSize] = useState(14);
    const [padding, setPadding] = useState(8);
    const [borderRadius, setBorderRadius] = useState(4);
    const [arrowSize, setArrowSize] = useState(5);
    const [maxWidth, setMaxWidth] = useState(200);
    const [showDelay, setShowDelay] = useState(0);
    const [hideDelay, setHideDelay] = useState(0);
    const [animation, setAnimation] = useState('fade');
    const [animationDuration, setAnimationDuration] = useState(0.3);

    const generateCSS = () => {
        return `
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-trigger {
  cursor: pointer;
}

.tooltip {
  position: absolute;
  background-color: ${backgroundColor};
  color: ${textColor};
  font-size: ${fontSize}px;
  padding: ${padding}px;
  border-radius: ${borderRadius}px;
  max-width: ${maxWidth}px;
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition: opacity ${animationDuration}s, visibility ${animationDuration}s${animation === 'none' ? '' : `, transform ${animationDuration}s`};
}

.tooltip::after {
  content: "";
  position: absolute;
  border-style: solid;
  border-width: ${arrowSize}px;
}

.tooltip-top {
  min-width: 120px;
  bottom: calc(100% + ${arrowSize}px);
  left: 50%;
  transform: translateX(-50%) ${animation === 'slide' ? 'translateY(-10px)' : ''};
}

.tooltip-top::after {
  top: 100%;
  left: 50%;
  margin-left: -${arrowSize}px;
  border-color: ${backgroundColor} transparent transparent transparent;
}

.tooltip-bottom {
  top: calc(100% + ${arrowSize}px);
  left: 50%;
  transform: translateX(-50%) ${animation === 'slide' ? 'translateY(10px)' : ''};
}

.tooltip-bottom::after {
  bottom: 100%;
  left: 50%;
  margin-left: -${arrowSize}px;
  border-color: transparent transparent ${backgroundColor} transparent;
}

.tooltip-left {
  right: calc(100% + ${arrowSize}px);
  top: 50%;
  transform: translateY(-50%) ${animation === 'slide' ? 'translateX(-10px)' : ''};
}

.tooltip-left::after {
  left: 100%;
  top: 50%;
  margin-top: -${arrowSize}px;
  border-color: transparent transparent transparent ${backgroundColor};
}

.tooltip-right {
  left: calc(100% + ${arrowSize}px);
  top: 50%;
  transform: translateY(-50%) ${animation === 'slide' ? 'translateX(10px)' : ''};
}

.tooltip-right::after {
  right: 100%;
  top: 50%;
  margin-top: -${arrowSize}px;
  border-color: transparent ${backgroundColor} transparent transparent;
}

.tooltip-container:hover .tooltip {
  opacity: 1;
  visibility: visible;
  ${animation === 'slide' ? 'transform: translateX(-50%) translateY(0);' : ''}
}

.tooltip-container:hover .tooltip-left,
.tooltip-container:hover .tooltip-right {
  ${animation === 'slide' ? 'transform: translateY(-50%) translateX(0);' : ''}
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

${animation === 'fade' ? `
.tooltip-container:hover .tooltip {
  animation: fadeIn ${animationDuration}s forwards;
}
` : animation === 'scale' ? `
.tooltip-container:hover .tooltip {
  animation: scaleIn ${animationDuration}s forwards;
}
` : ''}
`;
    };

    const generateHTML = () => {
        return `
<div class="tooltip-container">
  <span class="tooltip-trigger">${triggerText}</span>
  <div class="tooltip tooltip-${position}">${tooltipText}</div>
</div>
`;
    };

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto max-h-[95vh]">
                <h2 className="text-2xl font-bold mb-6">Tooltip Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tooltip Text</label>
                        <input
                            type="text"
                            value={tooltipText}
                            onChange={(e) => setTooltipText(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Trigger Text</label>
                        <input
                            type="text"
                            value={triggerText}
                            onChange={(e) => setTriggerText(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <select
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
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
                        <label className="block text-sm font-medium text-gray-700">Text Color</label>
                        <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
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
                        <label className="block text-sm font-medium text-gray-700">Padding (px)</label>
                        <input
                            type="number"
                            value={padding}
                            onChange={(e) => setPadding(Number(e.target.value))}
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
                        <label className="block text-sm font-medium text-gray-700">Arrow Size (px)</label>
                        <input
                            type="number"
                            value={arrowSize}
                            onChange={(e) => setArrowSize(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Max Width (px)</label>
                        <input
                            type="number"
                            value={maxWidth}
                            onChange={(e) => setMaxWidth(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Show Delay (ms)</label>
                        <input
                            type="number"
                            value={showDelay}
                            onChange={(e) => setShowDelay(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hide Delay (ms)</label>
                        <input
                            type="number"
                            value={hideDelay}
                            onChange={(e) => setHideDelay(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Animation</label>
                        <select
                            value={animation}
                            onChange={(e) => setAnimation(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="none">None</option>
                            <option value="fade">Fade</option>
                            <option value="scale">Scale</option>
                            <option value="slide">Slide</option>
                        </select>
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

export default TooltipGenerator;