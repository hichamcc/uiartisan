"use client";
import React, { useState } from 'react';
import { CodePanel, toTw } from './CodePanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CheckboxGenerator = () => {
    const [checkboxType, setCheckboxType] = useState('traditional');
    const [label, setLabel] = useState('Checkbox Label');
    const [checked, setChecked] = useState(false);
    const [size, setSize] = useState(20);
    const [borderWidth, setBorderWidth] = useState(2);
    const [borderRadius, setBorderRadius] = useState(4);
    const [borderColor, setBorderColor] = useState('#3b82f6');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [checkedColor, setCheckedColor] = useState('#3b82f6');
    const [checkColor, setCheckColor] = useState('#ffffff');
    const [labelColor, setLabelColor] = useState('#000000');
    const [fontSize, setFontSize] = useState(16);
    const [animationDuration, setAnimationDuration] = useState(0.2);
    const [buttonPadding, setButtonPadding] = useState(10);
    const [buttonBorderRadius, setButtonBorderRadius] = useState(4);

    const generateCSS = () => {
        if (checkboxType === 'traditional') {
            return `
.checkbox-container {
  display: flex;
  align-items: center;
  font-size: ${fontSize}px;
  color: ${labelColor};
  cursor: pointer;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-custom {
  position: relative;
  height: ${size}px;
  width: ${size}px;
  background-color: ${backgroundColor};
  border: ${borderWidth}px solid ${borderColor};
  border-radius: ${borderRadius}px;
  margin-right: 10px;
  transition: all ${animationDuration}s;
}

.checkbox-input:checked ~ .checkbox-custom {
  background-color: ${checkedColor};
  border-color: ${checkedColor};
}

.checkbox-custom:after {
  content: "";
  position: absolute;
  display: none;
  left: ${(size / 2) - (size / 10)}px;
  top: ${(size / 6) - (size / 20)}px;
  width: ${size / 3}px;
  height: ${size / 2}px;
  border: solid ${checkColor};
  border-width: 0 ${size / 10}px ${size / 10}px 0;
  transform: rotate(45deg);
}

.checkbox-input:checked ~ .checkbox-custom:after {
  display: block;
}

.checkbox-input:focus ~ .checkbox-custom {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
`;
        } else {
            return `
.checkbox-container {
  display: inline-block;
  font-size: ${fontSize}px;
  color: ${labelColor};
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-button {
  display: inline-block;
  padding: ${buttonPadding}px;
  background-color: ${backgroundColor};
  border: ${borderWidth}px solid ${borderColor};
  border-radius: ${buttonBorderRadius}px;
  color: ${borderColor};
  cursor: pointer;
  transition: all ${animationDuration}s;
}

.checkbox-input:checked ~ .checkbox-button {
  background-color: ${checkedColor};
  border-color: ${checkedColor};
  color: ${checkColor};
}

.checkbox-input:focus ~ .checkbox-button {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
`;
        }
    };

    const generateHTML = () => {
        if (checkboxType === 'traditional') {
            return `
<label class="checkbox-container">
  <input type="checkbox" class="checkbox-input" ${checked ? 'checked' : ''}>
  <span class="checkbox-custom"></span>
  ${label}
</label>
`;
        } else {
            return `
<label class="checkbox-container">
  <input type="checkbox" class="checkbox-input" ${checked ? 'checked' : ''}>
  <span class="checkbox-button">${label}</span>
</label>
`;
        }
    };

    const generateTailwind = () =>
        `<label class="flex items-center gap-2 cursor-pointer select-none text-[${fontSize}px] text-[${labelColor}]">
  <div class="relative flex items-center justify-center">
    <input type="checkbox" class="sr-only peer" />
    <div class="w-[${size}px] h-[${size}px] rounded-[${borderRadius}px] border-[${borderWidth}px] border-[${borderColor}] bg-[${backgroundColor}] peer-checked:bg-[${checkedColor}] peer-checked:border-[${checkedColor}] transition-all duration-[${Math.round(animationDuration * 1000)}ms]"></div>
    <svg class="absolute w-3 h-3 text-[${checkColor}] opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
  </div>
  ${label}
</label>`;

    const generateReact = () =>
        `import { useState } from 'react';\n\nexport function CustomCheckbox() {\n  const [checked, setChecked] = useState(false);\n  return (\n    <label className="flex items-center gap-2 cursor-pointer select-none text-[${fontSize}px] text-[${labelColor}]">\n      <div className="relative flex items-center justify-center">\n        <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} className="sr-only peer" />\n        <div className="w-[${size}px] h-[${size}px] rounded-[${borderRadius}px] border-[${borderWidth}px] border-[${borderColor}] bg-[${backgroundColor}] peer-checked:bg-[${checkedColor}] peer-checked:border-[${checkedColor}] transition-all duration-[${Math.round(animationDuration * 1000)}ms]" />\n        <svg className="absolute w-3 h-3 text-[${checkColor}] opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>\n      </div>\n      ${label}\n    </label>\n  );\n}`;

    const handleCopyCode = (code: any) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white border-r border-zinc-200 overflow-y-auto max-h-[95vh]">
                <h2 className="text-2xl font-bold mb-6">Checkbox Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Checkbox Type</label>
                        <select
                            value={checkboxType}
                            onChange={(e) => setCheckboxType(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        >
                            <option value="traditional">Traditional</option>
                            <option value="button">Button</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Label</label>
                        <input
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Checked by default</span>
                        </label>
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
                            value={checkboxType === 'traditional' ? borderRadius : buttonBorderRadius}
                            onChange={(e) => checkboxType === 'traditional' ? setBorderRadius(Number(e.target.value)) : setButtonBorderRadius(Number(e.target.value))}
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
                    {checkboxType === 'traditional' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Check Color</label>
                            <input
                                type="color"
                                value={checkColor}
                                onChange={(e) => setCheckColor(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                            />
                        </div>
                    )}
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
                        <label className="block text-sm font-medium text-gray-700">Animation Duration (s)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={animationDuration}
                            onChange={(e) => setAnimationDuration(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                        />
                    </div>
                    {checkboxType === 'button' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Button Padding (px)</label>
                            <input
                                type="number"
                                value={buttonPadding}
                                onChange={(e) => setButtonPadding(Number(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-400 focus:ring focus:ring-zinc-200 focus:ring-opacity-50"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-zinc-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white min-h-[100px] flex items-center justify-center">
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

export default CheckboxGenerator;