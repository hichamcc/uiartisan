"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faInfoCircle, faCheckCircle, faExclamationTriangle, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface AlertStyle {
    type: 'info' | 'success' | 'warning' | 'error';
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    title: string;
    message: string;
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    iconColor: string;
    fontSize: number;
    padding: number;
    borderRadius: number;
    width: number;
    animationDuration: number;
}

const AlertNotificationGenerator: React.FC = () => {
    const [alertStyle, setAlertStyle] = useState<AlertStyle>({
        type: 'info',
        position: 'top-right',
        title: 'Information',
        message: 'This is an informational alert.',
        backgroundColor: '#e3f2fd',
        textColor: '#0d47a1',
        borderColor: '#2196f3',
        iconColor: '#2196f3',
        fontSize: 14,
        padding: 16,
        borderRadius: 4,
        width: 300,
        animationDuration: 0.3,
    });
    const [showAlert, setShowAlert] = useState(true);

    const alertIcons = {
        info: faInfoCircle,
        success: faCheckCircle,
        warning: faExclamationTriangle,
        error: faTimesCircle,
    };

    const generateCSS = () => {
        return `
.alert-container {
    position: fixed;
    ${alertStyle.position.split('-')[0]}: 20px;
    ${alertStyle.position.split('-')[1]}: 20px;
    z-index: 1000;
}

.alert {
    background-color: ${alertStyle.backgroundColor};
    color: ${alertStyle.textColor};
    border: 1px solid ${alertStyle.borderColor};
    border-radius: ${alertStyle.borderRadius}px;
    padding: ${alertStyle.padding}px;
    width: ${alertStyle.width}px;
    font-size: ${alertStyle.fontSize}px;
    display: flex;
    align-items: flex-start;
    animation: slideIn ${alertStyle.animationDuration}s ease-out;
}

.alert-icon {
    color: ${alertStyle.iconColor};
    font-size: ${alertStyle.fontSize * 1.5}px;
    margin-right: ${alertStyle.padding / 2}px;
}

.alert-content {
    flex-grow: 1;
}

.alert-title {
    font-weight: bold;
    margin-bottom: ${alertStyle.padding / 4}px;
}

.alert-close {
    color: ${alertStyle.textColor};
    opacity: 0.7;
    font-size: ${alertStyle.fontSize * 1.2}px;
    cursor: pointer;
    transition: opacity 0.2s;
}

.alert-close:hover {
    opacity: 1;
}

@keyframes slideIn {
    from {
        transform: translateX(${alertStyle.position.includes('right') ? '100%' : '-100%'});
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    to {
        transform: translateX(${alertStyle.position.includes('right') ? '100%' : '-100%'});
        opacity: 0;
    }
}

.alert.closing {
    animation: slideOut ${alertStyle.animationDuration}s ease-in forwards;
}
`;
    };

    const generateHTML = () => {
        return `
<div class="alert-container">
    <div class="alert">
        <div class="alert-icon">
            <i class="fas fa-${alertIcons[alertStyle.type].iconName}"></i>
        </div>
        <div class="alert-content">
            <div class="alert-title">${alertStyle.title}</div>
            <div class="alert-message">${alertStyle.message}</div>
        </div>
        <button class="alert-close" onclick="closeAlert(this)">
            <i class="fas fa-times"></i>
        </button>
    </div>
</div>

<script>
function closeAlert(button) {
    const alert = button.closest('.alert');
    alert.classList.add('closing');
    setTimeout(() => {
        alert.parentElement.remove();
    }, ${alertStyle.animationDuration * 1000});
}
</script>
`;
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const updateStyle = (property: keyof AlertStyle, value: string | number) => {
        setAlertStyle({ ...alertStyle, [property]: value });
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
        setTimeout(() => setShowAlert(true), alertStyle.animationDuration * 1000);
    };


    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Alert Notification Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Alert Type</label>
                        <select
                            value={alertStyle.type}
                            onChange={(e) => updateStyle('type', e.target.value as AlertStyle['type'])}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="info">Info</option>
                            <option value="success">Success</option>
                            <option value="warning">Warning</option>
                            <option value="error">Error</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <select
                            value={alertStyle.position}
                            onChange={(e) => updateStyle('position', e.target.value as AlertStyle['position'])}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="top-right">Top Right</option>
                            <option value="top-left">Top Left</option>
                            <option value="bottom-right">Bottom Right</option>
                            <option value="bottom-left">Bottom Left</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={alertStyle.title}
                            onChange={(e) => updateStyle('title', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            value={alertStyle.message}
                            onChange={(e) => updateStyle('message', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Background Color</label>
                        <input
                            type="color"
                            value={alertStyle.backgroundColor}
                            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Text Color</label>
                        <input
                            type="color"
                            value={alertStyle.textColor}
                            onChange={(e) => updateStyle('textColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Color</label>
                        <input
                            type="color"
                            value={alertStyle.borderColor}
                            onChange={(e) => updateStyle('borderColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Icon Color</label>
                        <input
                            type="color"
                            value={alertStyle.iconColor}
                            onChange={(e) => updateStyle('iconColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Font Size (px)</label>
                        <input
                            type="number"
                            value={alertStyle.fontSize}
                            onChange={(e) => updateStyle('fontSize', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Padding (px)</label>
                        <input
                            type="number"
                            value={alertStyle.padding}
                            onChange={(e) => updateStyle('padding', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Radius (px)</label>
                        <input
                            type="number"
                            value={alertStyle.borderRadius}
                            onChange={(e) => updateStyle('borderRadius', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Width (px)</label>
                        <input
                            type="number"
                            value={alertStyle.width}
                            onChange={(e) => updateStyle('width', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Animation Duration (s)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={alertStyle.animationDuration}
                            onChange={(e) => updateStyle('animationDuration', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-8 bg-white overflow-hidden relative" style={{ height: '400px' }}>
                    <style>{generateCSS()}</style>
                    {showAlert && (
                        <div className="alert-container" style={{ position: 'absolute' }}>
                            <div className={`alert ${!showAlert ? 'closing' : ''}`}>
                                <div className="alert-icon">
                                    <FontAwesomeIcon icon={alertIcons[alertStyle.type]} />
                                </div>
                                <div className="alert-content">
                                    <div className="alert-title">{alertStyle.title}</div>
                                    <div className="alert-message">{alertStyle.message}</div>
                                </div>
                                <button className="alert-close" onClick={handleCloseAlert}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                        </div>
                    )}
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

export default AlertNotificationGenerator;