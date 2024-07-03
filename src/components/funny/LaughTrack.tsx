"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughSquint, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AudioHandler = () => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isLaughing, setIsLaughing] = useState(false);

    useEffect(() => {
        // Create Audio object only on client-side
        setAudio(new Audio('/laugh-track.wav'));
    }, []);

    useEffect(() => {
        if (!audio) return;

        const handleEnded = () => setIsLaughing(false);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audio]);

    const playLaugh = useCallback(() => {
        if (audio) {
            setIsLaughing(true);
            audio.play().catch(error => console.error("Audio playback failed", error));
        }
    }, [audio]);

    return { isLaughing, playLaugh };
};

const LaughTrackWithCode: React.FC = () => {
    const { isLaughing, playLaugh } = AudioHandler();
    const [copiedHTML, setCopiedHTML] = useState(false);
    const [copiedCSS, setCopiedCSS] = useState(false);


    const htmlCode = `
<div class="laugh-track-container">
    <button class="laugh-button" id="laughButton">
        <i class="fas fa-laugh-squint laugh-icon"></i>
        <span id="buttonText">Click for Laughs!</span>
    </button>
</div>

<script src="https://kit.fontawesome.com/your-font-awesome-kit.js" crossorigin="anonymous"></script>
<script>
    const laughButton = document.getElementById('laughButton');
    const buttonText = document.getElementById('buttonText');
    const audio = new Audio('/laugh-track.mp3');

    laughButton.addEventListener('click', playLaugh);

    function playLaugh() {
        laughButton.classList.add('laughing');
        buttonText.textContent = "HA HA HA!";
        laughButton.disabled = true;
        audio.play();

        audio.onended = function() {
            laughButton.classList.remove('laughing');
            buttonText.textContent = "Click for Laughs!";
            laughButton.disabled = false;
        };
    }
</script>`.trim();

    const cssCode = `
.laugh-track-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.laugh-button {
    background-color: #fbbf24;
    color: #1f2937;
    border: none;
    border-radius: 9999px;
    padding: 1rem 2rem;
    font-size: 1.25rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.laugh-button:hover {
    background-color: #f59e0b;
    transform: scale(1.05);
}
.laugh-button.laughing {
    animation: shake 0.5s infinite;
}
.laugh-icon {
    font-size: 1.5rem;
}
@keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
}`.trim();

    const copyToClipboard = (text: string, setCopiedState: React.Dispatch<React.SetStateAction<boolean>>) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedState(true);
            setTimeout(() => setCopiedState(false), 2000);
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Laugh Track Component</h2>

            <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
                <div className="laugh-track-container">
                    <button
                        className={`laugh-button ${isLaughing ? 'laughing' : ''}`}
                        onClick={playLaugh}
                        disabled={isLaughing}
                    >
                        <FontAwesomeIcon icon={faLaughSquint} className="laugh-icon" />
                        {isLaughing ? "HA HA HA!" : "Click for Laughs!"}
                    </button>
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

            <div>
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

            <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                <p className="font-bold">Note:</p>
                <ul className="list-disc list-inside">
                    <li>Replace 'your-font-awesome-kit.js' with your actual Font Awesome kit URL.</li>
                    <li>Ensure you have a 'laugh-track.mp3' file in the same directory as your HTML file.</li>
                    <li>You may need to adjust the paths to match your project structure.</li>
                </ul>
            </div>

            <style jsx>{`
                .laugh-track-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 200px;
                }
                .laugh-button {
                    background-color: #fbbf24;
                    color: #1f2937;
                    border: none;
                    border-radius: 9999px;
                    padding: 1rem 2rem;
                    font-size: 1.25rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .laugh-button:hover {
                    background-color: #f59e0b;
                    transform: scale(1.05);
                }
                .laugh-button.laughing {
                    animation: shake 0.5s infinite;
                }
                .laugh-icon {
                    font-size: 1.5rem;
                }
                @keyframes shake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    10% { transform: translate(-1px, -2px) rotate(-1deg); }
                    20% { transform: translate(-3px, 0px) rotate(1deg); }
                    30% { transform: translate(3px, 2px) rotate(0deg); }
                    40% { transform: translate(1px, -1px) rotate(1deg); }
                    50% { transform: translate(-1px, 2px) rotate(-1deg); }
                    60% { transform: translate(-3px, 1px) rotate(0deg); }
                    70% { transform: translate(3px, 1px) rotate(-1deg); }
                    80% { transform: translate(-1px, -1px) rotate(1deg); }
                    90% { transform: translate(1px, 2px) rotate(0deg); }
                    100% { transform: translate(1px, -2px) rotate(-1deg); }
                }
            `}</style>
        </div>
    );
};

export default LaughTrackWithCode;