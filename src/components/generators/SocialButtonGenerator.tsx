"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube, faPinterest, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const socialIcons: { [key: string]: any } = {
    facebook: faFacebook,
    twitter: faTwitter,
    instagram: faInstagram,
    linkedin: faLinkedin,
    youtube: faYoutube,
    pinterest: faPinterest,
    tiktok: faTiktok,
};

const SimpleSocialMediaButtons: React.FC = () => {
    const [buttons, setButtons] = useState([
        { platform: 'facebook', url: 'https://facebook.com/' },
        { platform: 'twitter', url: 'https://twitter.com/' },
        { platform: 'instagram', url: 'https://instagram.com/' },
    ]);
    const [iconColor, setIconColor] = useState('#ffffff');
    const [iconSize, setIconSize] = useState(24);
    const [spacing, setSpacing] = useState(16);

    const generateCSS = () => {
        return `
.social-icons {
    display: flex;
    justify-content: center;
    align-items: center;
}

.social-icon {
    color: ${iconColor};
    font-size: ${iconSize}px;
    margin: 0 ${spacing / 2}px;
    transition: opacity 0.3s ease;
}

.social-icon:hover {
    opacity: 0.8;
}
`;
    };

    const generateHTML = () => {
        return `
<div class="social-icons">
${buttons.map(button => `    <a href="${button.url}" class="social-icon" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-${button.platform}"></i>
    </a>`).join('\n')}
</div>
`;
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const addButton = () => {
        setButtons([...buttons, { platform: 'facebook', url: 'https://facebook.com/' }]);
    };

    const removeButton = (index: number) => {
        setButtons(buttons.filter((_, i) => i !== index));
    };

    const updateButton = (index: number, field: 'platform' | 'url', value: string) => {
        const newButtons = [...buttons];
        newButtons[index][field] = value;
        setButtons(newButtons);
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Simple Social Media Buttons</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Icon Color</label>
                        <input
                            type="color"
                            value={iconColor}
                            onChange={(e) => setIconColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Icon Size (px)</label>
                        <input
                            type="number"
                            value={iconSize}
                            onChange={(e) => setIconSize(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Spacing (px)</label>
                        <input
                            type="number"
                            value={spacing}
                            onChange={(e) => setSpacing(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Buttons</label>
                        {buttons.map((button, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex items-center mb-2">
                                    <select
                                        value={button.platform}
                                        onChange={(e) => updateButton(index, 'platform', e.target.value)}
                                        className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        {Object.keys(socialIcons).map((platform) => (
                                            <option key={platform} value={platform}>{platform}</option>
                                        ))}
                                    </select>
                                    <button onClick={() => removeButton(index)} className="ml-2 text-red-500">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                                <input
                                    type="url"
                                    value={button.url}
                                    onChange={(e) => updateButton(index, 'url', e.target.value)}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="https://example.com"
                                />
                            </div>
                        ))}
                        <button onClick={addButton} className="mt-2 text-blue-500">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add Button
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-8 bg-gray-800 overflow-hidden">
                    <style>{generateCSS()}</style>
                    <div className="social-icons">
                        {buttons.map((button, index) => (
                            <a key={index} href={button.url} className="social-icon" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={socialIcons[button.platform]} style={{ fontSize: `${iconSize}px`, margin: `0 ${spacing / 2}px` }} />
                            </a>
                        ))}
                    </div>
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

export default SimpleSocialMediaButtons;