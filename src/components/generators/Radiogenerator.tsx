"use client";
import React, { useState } from 'react';
import { CodePanel, toTw } from './CodePanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RadioGenerator = () => {
    const [radioStyle, setRadioStyle] = useState('traditional');
    const [groupName, setGroupName] = useState('radioGroup');
    const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3']);
    const [selectedOption, setSelectedOption] = useState(0);
    const [size, setSize] = useState(20);
    const [borderWidth, setBorderWidth] = useState(2);
    const [borderRadius, setBorderRadius] = useState(50);
    const [borderColor, setBorderColor] = useState('#3b82f6');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [checkedColor, setCheckedColor] = useState('#3b82f6');
    const [labelColor, setLabelColor] = useState('#000000');
    const [fontSize, setFontSize] = useState(16);
    const [spacing, setSpacing] = useState(10);
    const [animationDuration, setAnimationDuration] = useState(0.2);
    const [layout, setLayout] = useState('vertical');

    const generateCSS = () => {
        if (radioStyle === 'traditional') {
            return `
    .radio-group {
      display: ${layout === 'vertical' ? 'flex' : 'inline-flex'};
      flex-direction: ${layout === 'vertical' ? 'column' : 'row'};
      gap: ${spacing}px;
    }
    
    .radio-container {
      display: flex;
      align-items: center;
      font-size: ${fontSize}px;
      color: ${labelColor};
      cursor: pointer;
    }
    
    .radio-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
    
    .radio-custom {
      position: relative;
      height: ${size}px;
      width: ${size}px;
      background-color: ${backgroundColor};
      border: ${borderWidth}px solid ${borderColor};
      border-radius: ${borderRadius}%;
      margin-right: 10px;
      transition: all ${animationDuration}s;
    }
    
    .radio-input:checked ~ .radio-custom {
      background-color: ${backgroundColor};
      border-color: ${checkedColor};
    }
    
    .radio-custom:after {
      content: "";
      position: absolute;
      display: none;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: ${size * 0.5}px;
      height: ${size * 0.5}px;
      border-radius: 50%;
      background: ${checkedColor};
    }
    
    .radio-input:checked ~ .radio-custom:after {
      display: block;
    }
    
    .radio-input:focus ~ .radio-custom {
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }
    `;
        } else {
            return `
    .radio-group {
      display: ${layout === 'vertical' ? 'flex' : 'inline-flex'};
      flex-direction: ${layout === 'vertical' ? 'column' : 'row'};
      gap: ${spacing}px;
    }
    
    .radio-container {
      display: inline-block;
      font-size: ${fontSize}px;
      color: ${labelColor};
    }
    
    .radio-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
    
    .radio-button {
      display: inline-block;
      padding: ${size * 0.5}px ${size}px;
      background-color: ${backgroundColor};
      border: ${borderWidth}px solid ${borderColor};
      border-radius: ${borderRadius}px;
      color: ${borderColor};
      cursor: pointer;
      transition: all ${animationDuration}s;
    }
    
    .radio-input:checked + .radio-button {
      background-color: ${checkedColor};
      border-color: ${checkedColor};
      color: ${backgroundColor};
    }
    
    .radio-input:focus + .radio-button {
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }
    `;
        }
    };

    const generateHTML = () => {
        if (radioStyle === 'traditional') {
            return `
    <div class="radio-group">
      ${options.map((option, index) => `
      <label class="radio-container">
        <input type="radio" name="${groupName}" class="radio-input" ${index === selectedOption ? 'checked' : ''}>
        <span class="radio-custom"></span>
        ${option}
      </label>`).join('\n  ')}
    </div>
    `;
        } else {
            return `
    <div class="radio-group">
      ${options.map((option, index) => `
      <label class="radio-container">
        <input type="radio" name="${groupName}" class="radio-input" ${index === selectedOption ? 'checked' : ''}>
        <span class="radio-button">${option}</span>
      </label>`).join('\n  ')}
    </div>
    `;
        }
    };

    const generateTailwind = () => {
        const opts = options.map((opt, i) =>
            `  <label class="flex items-center gap-2 cursor-pointer">\n    <div class="relative flex items-center justify-center">\n      <input type="radio" name="${groupName}" class="sr-only peer" ${i === selectedOption ? 'checked' : ''}/>\n      <div class="w-[${size}px] h-[${size}px] rounded-full border-[${borderWidth}px] border-[${borderColor}] bg-[${backgroundColor}] peer-checked:border-[${checkedColor}] transition-all"></div>\n      <div class="absolute w-[${Math.round(size * 0.4)}px] h-[${Math.round(size * 0.4)}px] rounded-full bg-[${checkedColor}] scale-0 peer-checked:scale-100 transition-transform"></div>\n    </div>\n    <span class="text-[${fontSize}px] text-[${labelColor}]">${opt}</span>\n  </label>`
        ).join('\n');
        return `<div class="${layout === 'vertical' ? 'flex flex-col' : 'flex flex-row flex-wrap'} gap-[${spacing}px]">\n${opts}\n</div>`;
    };

    const generateReact = () =>
        `import { useState } from 'react';\n\nconst options = ${JSON.stringify(options)};\n\nexport function RadioGroup() {\n  const [selected, setSelected] = useState(${selectedOption});\n  return (\n    <div className="${layout === 'vertical' ? 'flex flex-col' : 'flex flex-row flex-wrap'} gap-[${spacing}px]">\n      {options.map((opt, i) => (\n        <label key={i} className="flex items-center gap-2 cursor-pointer">\n          <div className="relative flex items-center justify-center">\n            <input type="radio" name="${groupName}" checked={selected === i} onChange={() => setSelected(i)} className="sr-only peer" />\n            <div className="w-[${size}px] h-[${size}px] rounded-full border-[${borderWidth}px] border-[${borderColor}] bg-[${backgroundColor}] peer-checked:border-[${checkedColor}] transition-all" />\n            <div className="absolute w-[${Math.round(size * 0.4)}px] h-[${Math.round(size * 0.4)}px] rounded-full bg-[${checkedColor}] scale-0 peer-checked:scale-100 transition-transform" />\n          </div>\n          <span className="text-[${fontSize}px] text-[${labelColor}]">{opt}</span>\n        </label>\n      ))}\n    </div>\n  );\n}`;

    const handleCopyCode = (code: any) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const handleOptionChange = (index: any, value: any) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, `Option ${options.length + 1}`]);
    };

    const removeOption = (index: any) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
        if (selectedOption >= newOptions.length) {
            setSelectedOption(newOptions.length - 1);
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white border-r border-zinc-200 overflow-y-auto max-h-[95vh]">
                <h2 className="text-2xl font-bold mb-6">Radio Button Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Radio Style</label>
                        <select
                            value={radioStyle}
                            onChange={(e) => setRadioStyle(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        >
                            <option value="traditional">Traditional</option>
                            <option value="modern">Modern (Button-like)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Group Name</label>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Options</label>
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center mt-2">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                                />
                                <button
                                    onClick={() => removeOption(index)}
                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    -
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addOption}
                            className="mt-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            + Add Option
                        </button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Selected Option</label>
                        <select
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        >
                            {options.map((_, index) => (
                                <option key={index} value={index}>Option {index + 1}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Size (px)</label>
                        <input
                            type="number"
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Width (px)</label>
                        <input
                            type="number"
                            value={borderWidth}
                            onChange={(e) => setBorderWidth(Number(e.target.value))}
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
                        <label className="block text-sm font-medium text-gray-700">Border Color</label>
                        <input
                            type="color"
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Background Color</label>
                        <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Checked Color</label>
                        <input
                            type="color"
                            value={checkedColor}
                            onChange={(e) => setCheckedColor(e.target.value)}
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
                        <label className="block text-sm font-medium text-gray-700">Font Size (px)</label>
                        <input
                            type="number"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Spacing (px)</label>
                        <input
                            type="number"
                            value={spacing}
                            onChange={(e) => setSpacing(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Layout</label>
                        <select
                            value={layout}
                            onChange={(e) => setLayout(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        >
                            <option value="vertical">Vertical</option>
                            <option value="horizontal">Horizontal</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-zinc-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white min-h-[200px] flex items-center justify-center">
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
        </div>
    );
};

export default RadioGenerator;