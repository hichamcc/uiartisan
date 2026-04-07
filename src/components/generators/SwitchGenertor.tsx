"use client";
import React, { useState } from 'react';
import { CodePanel, toTw } from './CodePanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SwitchGenerator = () => {
    const [width, setWidth] = useState(85);
    const [height, setHeight] = useState(34);
    const [borderRadius, setBorderRadius] = useState(17);
    const [onColor, setOnColor] = useState('#4ade80');
    const [offColor, setOffColor] = useState('#e5e7eb');
    const [handleColor, setHandleColor] = useState('#ffffff');
    const [handleSize, setHandleSize] = useState(26);
    const [labelOn, setLabelOn] = useState('ON');
    const [labelOff, setLabelOff] = useState('OFF');
    const [showLabels, setShowLabels] = useState(true);
    const [labelColor, setLabelColor] = useState('#ffffff');
    const [labelSize, setLabelSize] = useState(12);
    const [animationDuration, setAnimationDuration] = useState(0.3);
    const [checked, setChecked] = useState(false);

    const generateCSS = () => {
        const handleOffset = (height - handleSize) / 2;
        const switchWidth = showLabels ? width : height * 2;
        return `
    .switch {
      position: relative;
      display: inline-block;
      width: ${switchWidth}px;
      height: ${height}px;
    }
    
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${offColor};
      transition: ${animationDuration}s;
      border-radius: ${borderRadius}px;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: ${handleSize}px;
      width: ${handleSize}px;
      left: ${handleOffset}px;
      bottom: ${handleOffset}px;
      background-color: ${handleColor};
      transition: ${animationDuration}s;
      border-radius: 50%;
      z-index: 2;
    }
    
    input:checked + .slider {
      background-color: ${onColor};
    }
    
    input:checked + .slider:before {
      transform: translateX(${switchWidth - height}px);
    }
    
    .switch-labels {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: ${labelSize}px;
      font-family: Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 ${handleSize / 2}px;
      box-sizing: border-box;
      color: ${labelColor};
      pointer-events: none;
    }
    
    .switch-labels span {
      z-index: 1;
      opacity: 1;
      transition: opacity ${animationDuration}s;
    }
    
    .label-on {
      padding-right: ${handleSize / 2}px;
    }
    
    .label-off {
      padding-left: ${handleSize / 2}px;
    }
    
    input:checked + .slider + .switch-labels .label-off,
    input:not(:checked) + .slider + .switch-labels .label-on {
      opacity: 0;
    }
    `;
    };

    const generateHTML = () => {
        return `
    <label class="switch">
      <input type="checkbox" ${checked ? 'checked' : ''}>
      <span class="slider"></span>
      ${showLabels ? `
      <div class="switch-labels">
        <span class="label-on">${labelOn}</span>
        <span class="label-off">${labelOff}</span>
      </div>
      ` : ''}
    </label>
    `;
    };

    const translateX = width - handleSize - (height - handleSize);
    const handleOffset = Math.round((height - handleSize) / 2);

    const generateTailwind = () =>
        `<label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" class="sr-only peer" />
  <div class="relative w-[${width}px] h-[${height}px] bg-[${offColor}] peer-checked:bg-[${onColor}] rounded-[${borderRadius}px] transition-colors duration-[${Math.round(animationDuration * 1000)}ms]">
    ${showLabels ? `<span class="absolute right-3 top-1/2 -translate-y-1/2 text-[${labelSize}px] text-[${labelColor}] font-medium">${labelOn}</span>
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[${labelSize}px] text-[${labelColor}] font-medium peer-checked:opacity-0">${labelOff}</span>` : ''}
    <div class="absolute top-[${handleOffset}px] left-[${handleOffset}px] w-[${handleSize}px] h-[${handleSize}px] bg-[${handleColor}] rounded-full shadow transition-transform duration-[${Math.round(animationDuration * 1000)}ms] peer-checked:translate-x-[${translateX}px]"></div>
  </div>
</label>`;

    const generateReact = () =>
        `import { useState } from 'react';\n\nexport function Switch() {\n  const [on, setOn] = useState(false);\n  return (\n    <label className="relative inline-flex items-center cursor-pointer">\n      <input type="checkbox" checked={on} onChange={() => setOn(!on)} className="sr-only peer" />\n      <div className="relative w-[${width}px] h-[${height}px] bg-[${offColor}] peer-checked:bg-[${onColor}] rounded-[${borderRadius}px] transition-colors duration-[${Math.round(animationDuration * 1000)}ms]">\n        ${showLabels ? `<span className="absolute right-3 top-1/2 -translate-y-1/2 text-[${labelSize}px] text-[${labelColor}] font-medium">${labelOn}</span>\n        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[${labelSize}px] text-[${labelColor}] font-medium peer-checked:opacity-0">${labelOff}</span>` : ''}\n        <div className="absolute top-[${handleOffset}px] left-[${handleOffset}px] w-[${handleSize}px] h-[${handleSize}px] bg-[${handleColor}] rounded-full shadow transition-transform duration-[${Math.round(animationDuration * 1000)}ms] peer-checked:translate-x-[${translateX}px]" />\n      </div>\n    </label>\n  );\n}`;

    const handleCopyCode = (code: any) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white border-r border-zinc-200 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Switch Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Width (px)</label>
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Height (px)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Radius (px)</label>
                        <input
                            type="number"
                            value={borderRadius}
                            onChange={(e) => setBorderRadius(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ON Color</label>
                        <input
                            type="color"
                            value={onColor}
                            onChange={(e) => setOnColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">OFF Color</label>
                        <input
                            type="color"
                            value={offColor}
                            onChange={(e) => setOffColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Handle Color</label>
                        <input
                            type="color"
                            value={handleColor}
                            onChange={(e) => setHandleColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Handle Size (px)</label>
                        <input
                            type="number"
                            value={handleSize}
                            onChange={(e) => setHandleSize(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={showLabels}
                                onChange={(e) => setShowLabels(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Show Labels</span>
                        </label>
                    </div>
                    {showLabels && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">ON Label</label>
                                <input
                                    type="text"
                                    value={labelOn}
                                    onChange={(e) => setLabelOn(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">OFF Label</label>
                                <input
                                    type="text"
                                    value={labelOff}
                                    onChange={(e) => setLabelOff(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Label Color</label>
                                <input
                                    type="color"
                                    value={labelColor}
                                    onChange={(e) => setLabelColor(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Label Size (px)</label>
                                <input
                                    type="number"
                                    value={labelSize}
                                    onChange={(e) => setLabelSize(Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                                />
                            </div>
                        </>

                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Animation Duration (s)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={animationDuration}
                            onChange={(e) => setAnimationDuration(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-zinc-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white overflow-x-auto m-auto">
                    <style>{generateCSS()}</style>
                    <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />

                </div>

                <CodePanel
                    tailwind={[{ title: 'Tailwind', code: generateTailwind(), language: 'html' }]}
                    react={[{ title: 'React Component', code: generateReact(), language: 'tsx' }]}
                    css={[
                        { title: 'HTML', code: generateHTML(), language: 'html' },
                        { title: 'CSS', code: generateCSS(), language: 'css' },
                    ]}
                />
            </div>
        </div >
    );
};

export default SwitchGenerator;