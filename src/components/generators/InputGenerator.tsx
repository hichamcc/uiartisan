"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDesktop, faTablet, faMobile } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const InputGenerator = () => {
    const [isErrorState, setIsErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('This field is required');
    // Basic Input Properties
    const [inputType, setInputType] = useState('text');
    const [placeholder, setPlaceholder] = useState('Enter text here');
    const [label, setLabel] = useState('Input Label');
    const [defaultValue, setDefaultValue] = useState('');
    const [isRequired, setIsRequired] = useState(false);

    // Styling
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(40);
    const [borderRadius, setBorderRadius] = useState(4);
    const [borderWidth, setBorderWidth] = useState(1);
    const [borderColor, setBorderColor] = useState('#cccccc');
    const [borderStyle, setBorderStyle] = useState('solid');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#000000');
    const [fontSize, setFontSize] = useState(16);
    const [padding, setPadding] = useState(8);

    // Focus State
    const [focusBorderColor, setFocusBorderColor] = useState('#3b82f6');
    const [focusBackgroundColor, setFocusBackgroundColor] = useState('#ffffff');
    const [focusTextColor, setFocusTextColor] = useState('#000000');

    // Hover State
    const [hoverBorderColor, setHoverBorderColor] = useState('#999999');
    const [hoverBackgroundColor, setHoverBackgroundColor] = useState('#f9fafb');

    // Error State
    const [errorBorderColor, setErrorBorderColor] = useState('#ef4444');
    const [errorBackgroundColor, setErrorBackgroundColor] = useState('#fef2f2');
    const [errorTextColor, setErrorTextColor] = useState('#ef4444');

    // Validation
    const [minLength, setMinLength] = useState(0);
    const [maxLength, setMaxLength] = useState(100);
    const [pattern, setPattern] = useState('');
    const [patternPreset, setPatternPreset] = useState('custom');

    const patternPresets = {
        custom: { label: 'Custom', pattern: '' },
        email: { label: 'Email', pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$' },
        password: { label: 'Password (8+ chars, 1 uppercase, 1 lowercase, 1 number)', pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' },
        username: { label: 'Username (alphanumeric, 3-16 chars)', pattern: '[a-zA-Z0-9]{3,16}$' },
        url: { label: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
        phoneUS: { label: 'US Phone Number', pattern: '\\(?\\d{3}\\)?[-.]?\\d{3}[-.]?\\d{4}' },
        zipUS: { label: 'US Zip Code', pattern: '\\d{5}(-\\d{4})?' },
        ipv4: { label: 'IPv4 Address', pattern: '((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)' },
        creditCard: { label: 'Credit Card Number', pattern: '\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}' },
        date: { label: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
    };

    useEffect(() => {
        if (patternPreset !== 'custom') {
            setPattern(patternPresets[patternPreset].pattern);
        }
    }, [patternPreset]);

    // Accessibility
    const [ariaLabel, setAriaLabel] = useState('');
    const [ariaDescribedBy, setAriaDescribedBy] = useState('');

    // Additional Features
    const [isAutofocus, setIsAutofocus] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    // Icon
    const [hasIcon, setHasIcon] = useState(false);
    const [iconPosition, setIconPosition] = useState('left');

    // Animation
    const [hasAnimation, setHasAnimation] = useState(false);
    const [animationType, setAnimationType] = useState('none');

    const [viewportWidth, setViewportWidth] = useState('100%');

    const generateCSS = () => {
        return `
.custom-input {
  width: ${width}px;
  height: ${height}px;
  border-radius: ${borderRadius}px;
  border: ${borderWidth}px ${borderStyle} ${borderColor};
  background-color: ${backgroundColor};
  color: ${textColor};
  font-size: ${fontSize}px;
  padding: ${padding}px;
  ${hasIcon ? `padding-${iconPosition}: ${padding + 20}px;` : ''}
}

.custom-input:focus {
  border-color: ${focusBorderColor};
  background-color: ${focusBackgroundColor};
  color: ${focusTextColor};
  outline: none;
}

.custom-input:hover {
  border-color: ${hoverBorderColor};
  background-color: ${hoverBackgroundColor};
}

.custom-input.error {
  border-color: ${errorBorderColor};
  background-color: ${errorBackgroundColor};
  color: ${errorTextColor};
}

.error-message {
  color: ${errorTextColor};
  font-size: 14px;
  margin-top: 5px;
}

${hasAnimation ? `
.custom-input {
  transition: all 0.3s ease;
}

@keyframes ${animationType} {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.custom-input {
  animation: ${animationType} 0.5s ease-out;
}
` : ''}

.input-container {
  position: relative;
  display: inline-block;
}

.input-icon {
  position: absolute;
  top: 50%;
  ${iconPosition}: 10px;
  transform: translateY(-50%);
  color: ${textColor};
}

.custom-label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
`;
    };



    const generateHTML = () => {
        let html = '';
        if (label) {
            html += `<label for="customInput" class="custom-label">${label}</label>\n`;
        }
        html += '<div class="input-container">\n';
        if (hasIcon) {
            html += `  <span class="input-icon">📌</span>\n`;
        }
        html += `  <input
    id="customInput"
    type="${inputType}"
    class="custom-input${isErrorState ? ' error' : ''}"
    placeholder="${placeholder}"
    ${defaultValue ? `value="${defaultValue}"` : ''}
    ${isRequired ? 'required' : ''}
    ${minLength > 0 ? `minlength="${minLength}"` : ''}
    ${maxLength > 0 ? `maxlength="${maxLength}"` : ''}
    ${pattern ? `pattern="${pattern}"` : ''}
    ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
    ${ariaDescribedBy ? `aria-describedby="${ariaDescribedBy}"` : ''}
    ${isAutofocus ? 'autofocus' : ''}
    ${isReadOnly ? 'readonly' : ''}
    ${isDisabled ? 'disabled' : ''}
  />\n`;
        if (isErrorState) {
            html += `  <div class="error-message">${errorMessage}</div>\n`;
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
            {/* Parameters Side */}
            <div className="w-full md:w-1/4 p-8 bg-white shadow-md overflow-y-auto max-h-[95vh]">
                <h2 className="text-2xl font-bold mb-6">Input Parameters</h2>
                <div className="space-y-4">
                    {/* Basic Input Properties */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Input Type</label>
                        <select
                            value={inputType}
                            onChange={(e) => setInputType(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="text">Text</option>
                            <option value="password">Password</option>
                            <option value="email">Email</option>
                            <option value="number">Number</option>
                            <option value="tel">Telephone</option>
                            <option value="url">URL</option>
                            <option value="date">Date</option>
                            <option value="time">Time</option>
                            <option value="datetime-local">DateTime Local</option>
                            <option value="month">Month</option>
                            <option value="week">Week</option>
                            <option value="color">Color</option>
                            <option value="file">File</option>
                            <option value="range">Range</option>
                            <option value="search">Search</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Placeholder</label>
                        <input
                            type="text"
                            value={placeholder}
                            onChange={(e) => setPlaceholder(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Label</label>
                        <input
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Default Value</label>
                        <input
                            type="text"
                            value={defaultValue}
                            onChange={(e) => setDefaultValue(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isRequired}
                                onChange={(e) => setIsRequired(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Required</span>
                        </label>
                    </div>

                    {/* Styling */}
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
                        <label className="block text-sm font-medium text-gray-700">Border Style</label>
                        <select
                            value={borderStyle}
                            onChange={(e) => setBorderStyle(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                            <option value="double">Double</option>
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
                    {/* Focus State */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Focus Border Color</label>
                        <input
                            type="color"
                            value={focusBorderColor}
                            onChange={(e) => setFocusBorderColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Focus Background Color</label>
                        <input
                            type="color"
                            value={focusBackgroundColor}
                            onChange={(e) => setFocusBackgroundColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Focus Text Color</label>
                        <input
                            type="color"
                            value={focusTextColor}
                            onChange={(e) => setFocusTextColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    {/* Hover State */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hover Border Color</label>
                        <input
                            type="color"
                            value={hoverBorderColor}
                            onChange={(e) => setHoverBorderColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hover Background Color</label>
                        <input
                            type="color"
                            value={hoverBackgroundColor}
                            onChange={(e) => setHoverBackgroundColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    {/* Error State */}
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isErrorState}
                                onChange={(e) => setIsErrorState(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Show Error State</span>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Error Border Color</label>
                        <input
                            type="color"
                            value={errorBorderColor}
                            onChange={(e) => setErrorBorderColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Error Background Color</label>
                        <input
                            type="color"
                            value={errorBackgroundColor}
                            onChange={(e) => setErrorBackgroundColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Error Text Color</label>
                        <input
                            type="color"
                            value={errorTextColor}
                            onChange={(e) => setErrorTextColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    {/* Validation */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Min Length</label>
                        <input
                            type="number"
                            value={minLength}
                            onChange={(e) => setMinLength(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Max Length</label>
                        <input
                            type="number"
                            value={maxLength}
                            onChange={(e) => setMaxLength(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pattern Preset</label>
                        <select
                            value={patternPreset}
                            onChange={(e) => setPatternPreset(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            {Object.entries(patternPresets).map(([key, { label }]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pattern</label>
                        <input
                            type="text"
                            value={pattern}
                            onChange={(e) => {
                                setPattern(e.target.value);
                                setPatternPreset('custom');
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    {/* Accessibility */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Aria Label</label>
                        <input
                            type="text"
                            value={ariaLabel}
                            onChange={(e) => setAriaLabel(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Aria Described By</label>
                        <input
                            type="text"
                            value={ariaDescribedBy}
                            onChange={(e) => setAriaDescribedBy(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    {/* Additional Features */}
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isAutofocus}
                                onChange={(e) => setIsAutofocus(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Autofocus</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isReadOnly}
                                onChange={(e) => setIsReadOnly(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Read Only</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isDisabled}
                                onChange={(e) => setIsDisabled(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Disabled</span>
                        </label>
                    </div>

                    {/* Icon */}
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={hasIcon}
                                onChange={(e) => setHasIcon(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Has Icon</span>
                        </label>
                    </div>
                    {hasIcon && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Icon Position</label>
                            <select
                                value={iconPosition}
                                onChange={(e) => setIconPosition(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                    )}

                    {/* Animation */}
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={hasAnimation}
                                onChange={(e) => setHasAnimation(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Has Animation</span>
                        </label>
                    </div>
                    {hasAnimation && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Animation Type</label>
                            <select
                                value={animationType}
                                onChange={(e) => setAnimationType(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="fadeIn">Fade In</option>
                                <option value="slideIn">Slide In</option>
                                <option value="bounceIn">Bounce In</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>

            {/* Preview and Code Side */}
            <div className="w-full md:w-3/4 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>

                <div className="border p-4 bg-white min-h-[200px]" style={{ width: viewportWidth, margin: '0 auto' }}>
                    <style>{generateCSS()}</style>
                    <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />
                </div>

                {/* Generated Code */}
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

export default InputGenerator;