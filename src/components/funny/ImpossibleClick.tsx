"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ImpossibleClickButton: React.FC = () => {
    const [copiedHTML, setCopiedHTML] = useState(false);
    const [copiedCSS, setCopiedCSS] = useState(false);
    const [copiedJS, setCopiedJS] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        const container = containerRef.current;

        if (!button || !container) return;

        const moveButton = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            let newX = Math.random() * (containerRect.width - rect.width);
            let newY = Math.random() * (containerRect.height - rect.height);

            button.style.transform = `translate(${newX}px, ${newY}px)`;
        };

        button.addEventListener('mouseover', moveButton);

        return () => {
            button.removeEventListener('mouseover', moveButton);
        };
    }, []);

    const handleClick = () => {
        setClickCount(prevCount => prevCount + 1);
    };

    const htmlCode = `
<div id="impossible-click-container">
    <button id="impossible-button">Click me!</button>
    <p id="click-count">Clicks: 0</p>
</div>
`.trim();

    const cssCode = `
#impossible-click-container {
    position: relative;
    width: 300px;
    height: 200px;
    border: 2px solid #ccc;
    overflow: hidden;
}

#impossible-button {
    position: absolute;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease-out;
}

#click-count {
    position: absolute;
    bottom: 10px;
    left: 10px;
    margin: 0;
}
`.trim();

    const jsCode = `
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('impossible-button');
    const container = document.getElementById('impossible-click-container');
    const clickCounter = document.getElementById('click-count');
    let clicks = 0;

    if (!button || !container || !clickCounter) return;

    const moveButton = () => {
        const rect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        let newX = Math.random() * (containerRect.width - rect.width);
        let newY = Math.random() * (containerRect.height - rect.height);

        button.style.transform = \`translate(\${newX}px, \${newY}px)\`;
    };

    button.addEventListener('mouseover', moveButton);

    button.addEventListener('click', () => {
        clicks++;
        clickCounter.textContent = \`Clicks: \${clicks}\`;
    });
});
`.trim();

    const copyToClipboard = (text: string, setCopiedState: React.Dispatch<React.SetStateAction<boolean>>) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedState(true);
            setTimeout(() => setCopiedState(false), 2000);
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Impossible Click Button Component</h2>

            <div className="mb-8">
                <div
                    ref={containerRef}
                    className="relative w-[100%] h-[300px] border-2 bg-white rounded-md shadow-md border-gray-300 overflow-hidden"
                >
                    <button
                        ref={buttonRef}
                        className="absolute px-5 py-2 bg-green-500 text-white border-none cursor-pointer transition-transform duration-200 ease-out"
                        onClick={handleClick}
                    >
                        Click me!
                    </button>
                    <p className="absolute bottom-2 left-2 m-0">Clicks: {clickCount}</p>
                </div>
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">HTML</h3>
                    <button
                        onClick={() => copyToClipboard(htmlCode, setCopiedHTML)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    >
                        <FontAwesomeIcon icon={copiedHTML ? faCheck : faCopy} className="mr-2" />
                        {copiedHTML ? 'Copied!' : 'Copy HTML'}
                    </button>
                </div>
                <SyntaxHighlighter language="html" style={vscDarkPlus} showLineNumbers>
                    {htmlCode}
                </SyntaxHighlighter>
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">CSS</h3>
                    <button
                        onClick={() => copyToClipboard(cssCode, setCopiedCSS)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    >
                        <FontAwesomeIcon icon={copiedCSS ? faCheck : faCopy} className="mr-2" />
                        {copiedCSS ? 'Copied!' : 'Copy CSS'}
                    </button>
                </div>
                <SyntaxHighlighter language="css" style={vscDarkPlus} showLineNumbers>
                    {cssCode}
                </SyntaxHighlighter>
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">JavaScript</h3>
                    <button
                        onClick={() => copyToClipboard(jsCode, setCopiedJS)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    >
                        <FontAwesomeIcon icon={copiedJS ? faCheck : faCopy} className="mr-2" />
                        {copiedJS ? 'Copied!' : 'Copy JavaScript'}
                    </button>
                </div>
                <SyntaxHighlighter language="javascript" style={vscDarkPlus} showLineNumbers>
                    {jsCode}
                </SyntaxHighlighter>
            </div>

            <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                <p className="font-bold">Note:</p>
                <ul className="list-disc list-inside">
                    <li>Add the HTML to your page where you want the impossible click button to appear.</li>
                    <li>Include the CSS in your stylesheet or within a &lt;style&gt; tag in your HTML.</li>
                    <li>Add the JavaScript to a &lt;script&gt; tag at the end of your &lt;body&gt; or in an external .js file.</li>
                    <li>You can adjust the container size, button style, and movement behavior to fit your needs.</li>
                    <li>This component is meant for entertainment purposes and should be used sparingly to avoid frustrating users.</li>
                </ul>
            </div>
        </div>
    );
};

export default ImpossibleClickButton;