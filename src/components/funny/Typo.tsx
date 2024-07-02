"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DramaticTypoCorrector: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const [isShaking, setIsShaking] = useState(false);
    const [copiedHTML, setCopiedHTML] = useState(false);
    const [copiedCSS, setCopiedCSS] = useState(false);
    const [copiedJS, setCopiedJS] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [audio] = useState(new Audio('/dramatic-sound.wav')); // Add this sound file to your public folder

    const dramaticResponses = [
        "Oh, the horror! A typo!",
        "My eyes! They burn from this mistake!",
        "How could you do this to me?",
        "I can't believe what I'm seeing!",
        "Is this what heartbreak feels like?",
        "I may never recover from this typo..."
    ];

    const checkForTypos = (input: string) => {
        // This is a simplified typo check. In a real scenario, you'd want a more sophisticated spell-checker.
        const commonWords = ['the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'for'];
        const words = input.toLowerCase().split(' ');
        const lastWord = words[words.length - 1];

        if (lastWord.length > 2 && !commonWords.includes(lastWord)) {
            setIsShaking(true);
            setMessage(dramaticResponses[Math.floor(Math.random() * dramaticResponses.length)]);
            audio.play();
            setTimeout(() => setIsShaking(false), 500);
        } else {
            setMessage('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        checkForTypos(e.target.value);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const htmlCode = `
<div class="typo-corrector">
    <input type="text" id="dramatic-input" placeholder="Type something...">
    <p id="dramatic-message"></p>
</div>
<audio id="dramatic-sound" src="path/to/dramatic-sound.mp3"></audio>
`.trim();

    const cssCode = `
.typo-corrector {
    max-width: 300px;
    margin: 20px auto;
    text-align: center;
}

#dramatic-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 4px;
}

#dramatic-input.shake {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
}

#dramatic-message {
    color: #ff4136;
    font-style: italic;
    min-height: 20px;
}

@keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
}
`.trim();

    const jsCode = `
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('dramatic-input');
    const messageEl = document.getElementById('dramatic-message');
    const audio = document.getElementById('dramatic-sound');

    const dramaticResponses = [
        "Oh, the horror! A typo!",
        "My eyes! They burn from this mistake!",
        "How could you do this to me?",
        "I can't believe what I'm seeing!",
        "Is this what heartbreak feels like?",
        "I may never recover from this typo..."
    ];

    const commonWords = ['the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'for'];

    function checkForTypos(inputValue) {
        const words = inputValue.toLowerCase().split(' ');
        const lastWord = words[words.length - 1];
        
        if (lastWord.length > 2 && !commonWords.includes(lastWord)) {
            input.classList.add('shake');
            messageEl.textContent = dramaticResponses[Math.floor(Math.random() * dramaticResponses.length)];
            audio.play();
            setTimeout(() => input.classList.remove('shake'), 500);
        } else {
            messageEl.textContent = '';
        }
    }

    input.addEventListener('input', (e) => {
        checkForTypos(e.target.value);
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
            <h2 className="text-2xl font-bold mb-6">Dramatic Typo Corrector Component</h2>

            <div className="mb-8 bg-white shadow-md rounded-md p-8">
                <div className="max-w-sm mx-auto text-center ">
                    <p className="text-lg font-semibold mb-2">Try it out!</p>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className={`w-full p-2 text-lg border-2 border-gray-300 rounded ${isShaking ? 'animate-shake' : ''}`}
                        placeholder="Type something..."
                    />
                    <p className="mt-2 text-red-500 italic min-h-[20px]">{message}</p>
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
                    <li>Add the HTML to your page where you want the Dramatic Typo Corrector to appear.</li>
                    <li>Include the CSS in your stylesheet or within a &lt;style&gt; tag in your HTML.</li>
                    <li>Add the JavaScript to a &lt;script&gt; tag at the end of your &lt;body&gt; or in an external .js file.</li>
                    <li>Make sure to add a 'dramatic-sound.mp3' file (or change the audio file path in the code).</li>
                    <li>This is a humorous component and should be used sparingly to avoid frustrating users.</li>
                    <li>The typo detection is very simplistic. For a real application, consider using a proper spell-checking library.</li>
                </ul>
            </div>

            <style jsx>{`
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
                .animate-shake {
                    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>
        </div>
    );
};

export default DramaticTypoCorrector;