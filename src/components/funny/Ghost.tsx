"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faGhost } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const FunnyGhostCursor: React.FC = () => {
    const [copiedHTML, setCopiedHTML] = useState(false);
    const [copiedCSS, setCopiedCSS] = useState(false);
    const [copiedJS, setCopiedJS] = useState(false);
    const demoRef = useRef<HTMLDivElement>(null);
    const ghostRef = useRef<HTMLDivElement>(null);
    const [ghostMessage, setGhostMessage] = useState('');
    const [audio] = useState(new Audio('/boo-sound.wav')); // Make sure to add this sound file to your public folder

    useEffect(() => {
        const demo = demoRef.current;
        const ghost = ghostRef.current;

        if (!demo || !ghost) return;

        let timeout: NodeJS.Timeout;
        let lastBooed = 0;

        const moveGhost = (e: MouseEvent) => {
            const rect = demo.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Add a slight delay for a trailing effect
            setTimeout(() => {
                ghost.style.left = `${x}px`;
                ghost.style.top = `${y}px`;
            }, 100);

            // Randomly change ghost's expression
            if (Math.random() < 0.05) {
                ghost.innerHTML = ['👻', '😱', '🙈', '😜', '🤪'][Math.floor(Math.random() * 5)];
            }

            // Occasionally make the ghost say something
            if (Math.random() < 0.01) {
                setGhostMessage(["Boo!", "I'm spooky!", "Wanna be friends?", "Got any snacks?", "I'm a friendly ghost!"][Math.floor(Math.random() * 5)]);
                clearTimeout(timeout);
                timeout = setTimeout(() => setGhostMessage(''), 2000);
            }

            // Occasionally play a "boo" sound
            if (Math.random() < 0.005 && Date.now() - lastBooed > 3000) {
                audio.play();
                lastBooed = Date.now();
            }
        };

        demo.addEventListener('mousemove', moveGhost);

        return () => {
            demo.removeEventListener('mousemove', moveGhost);
            clearTimeout(timeout);
        };
    }, [audio]);

    const htmlCode = `
<div id="funny-ghost-cursor-demo">
    <div id="funny-ghost-cursor">👻</div>
    <div id="ghost-message"></div>
</div>
<audio id="boo-sound" src="path/to/boo-sound.mp3"></audio>
`.trim();

    const cssCode = `
#funny-ghost-cursor-demo {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: white;
    overflow: hidden;
    cursor: none;
}

#funny-ghost-cursor {
    position: absolute;
    font-size: 30px;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: all 0.1s ease;
    z-index: 9999;
}

#ghost-message {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    pointer-events: none;
    transition: all 0.3s ease;
    z-index: 10000;
}
`.trim();

    const jsCode = `
document.addEventListener('DOMContentLoaded', () => {
    const demo = document.getElementById('funny-ghost-cursor-demo');
    const ghost = document.getElementById('funny-ghost-cursor');
    const message = document.getElementById('ghost-message');
    const audio = document.getElementById('boo-sound');

    if (!demo || !ghost || !message || !audio) return;

    let timeout;
    let lastBooed = 0;

    const moveGhost = (e) => {
        const rect = demo.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setTimeout(() => {
            ghost.style.left = \`\${x}px\`;
            ghost.style.top = \`\${y}px\`;
        }, 100);

        if (Math.random() < 0.05) {
            ghost.innerHTML = ['👻', '😱', '🙈', '😜', '🤪'][Math.floor(Math.random() * 5)];
        }

        if (Math.random() < 0.01) {
            message.textContent = ["Boo!", "I'm spooky!", "Wanna be friends?", "Got any snacks?", "I'm a friendly ghost!"][Math.floor(Math.random() * 5)];
            message.style.left = \`\${x}px\`;
            message.style.top = \`\${y - 30}px\`;
            clearTimeout(timeout);
            timeout = setTimeout(() => message.textContent = '', 2000);
        }

        if (Math.random() < 0.005 && Date.now() - lastBooed > 3000) {
            audio.play();
            lastBooed = Date.now();
        }
    };

    demo.addEventListener('mousemove', moveGhost);
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
            <h2 className="text-2xl font-bold mb-6">Funny Ghost Cursor Component</h2>

            <div className="mb-8">
                <div
                    ref={demoRef}
                    className="relative w-full h-[300px] bg-white overflow-hidden cursor-none border shadow-lg rounded-md border-gray-300"
                >
                    <div
                        ref={ghostRef}
                        className="absolute text-3xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out z-50"
                    >
                        👻
                    </div>
                    {ghostMessage && (
                        <div className="absolute bg-white bg-opacity-80 px-2 py-1 rounded text-sm pointer-events-none transition-all duration-300 ease-out z-50" style={{
                            left: ghostRef.current ? ghostRef.current.style.left : 0,
                            top: ghostRef.current ? `calc(${ghostRef.current.style.top} - 30px)` : 0
                        }}>
                            {ghostMessage}
                        </div>
                    )}
                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400">
                        Move your cursor here for a spooky surprise!
                    </p>
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
                    <li>Add the HTML to your page where you want the funny ghost cursor to appear.</li>
                    <li>Include the CSS in your stylesheet or within a &lt;style&gt; tag in your HTML.</li>
                    <li>Add the JavaScript to a &lt;script&gt; tag at the end of your &lt;body&gt; or in an external .js file.</li>
                    <li>Make sure to add a 'boo-sound.mp3' file (or change the audio file path in the code).</li>
                    <li>Adjust the ghost's behaviors, messages, and sounds to fit your desired level of humor.</li>
                </ul>
            </div>
        </div>
    );
};

export default FunnyGhostCursor;