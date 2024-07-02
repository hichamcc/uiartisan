import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const OverenthusiasticSubmitButton: React.FC = () => {
    const [enthusiasm, setEnthusiasm] = useState(0);
    const [message, setMessage] = useState("Submit");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [copiedHTML, setCopiedHTML] = useState(false);
    const [copiedCSS, setCopiedCSS] = useState(false);
    const [copiedJS, setCopiedJS] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const enthusiasmLevels = [
        { threshold: 0, message: "Submit" },
        { threshold: 0.2, message: "Oh! Hello there!" },
        { threshold: 0.4, message: "You're getting closer!" },
        { threshold: 0.6, message: "I'm so excited!" },
        { threshold: 0.8, message: "PLEASE CLICK ME!" },
        { threshold: 1, message: "YAAAAAAY!!!" }
    ];

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const buttonCenterX = rect.left + rect.width / 2;
            const buttonCenterY = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2));
            const activationDistance = Math.max(rect.width, rect.height) * 2; // Activation area is 2 times the button's largest dimension

            if (distance < activationDistance) {
                const newEnthusiasm = 1 - (distance / activationDistance);
                setEnthusiasm(newEnthusiasm);

                for (let i = enthusiasmLevels.length - 1; i >= 0; i--) {
                    if (newEnthusiasm >= enthusiasmLevels[i].threshold) {
                        setMessage(enthusiasmLevels[i].message);
                        break;
                    }
                }
            } else {
                setEnthusiasm(0);
                setMessage("Submit");
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleSubmit = () => {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 2000);
    };


    const htmlCode = `
<button id="enthusiastic-button" class="submit-button">
    <span class="button-text">Submit</span>
    <span class="button-icon">📨</span>
</button>
`.trim();

    const cssCode = `
.submit-button {
    position: relative;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
}

.submit-button:hover {
    transform: scale(1.1);
}

.button-text {
    position: relative;
    z-index: 1;
}

.button-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    opacity: 0;
    transition: all 0.3s ease;
}

.submit-button.excited .button-icon {
    opacity: 1;
    animation: bounce 0.5s infinite alternate;
}

@keyframes bounce {
    from { transform: translate(-50%, -50%) scale(1); }
    to { transform: translate(-50%, -50%) scale(1.2); }
}
`.trim();

    const jsCode = `
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('enthusiastic-button');
    const buttonText = button.querySelector('.button-text');
    const enthusiasmLevels = [
        { threshold: 0, message: "Submit" },
        { threshold: 0.2, message: "Oh! Hello there!" },
        { threshold: 0.4, message: "You're getting closer!" },
        { threshold: 0.6, message: "I'm so excited!" },
        { threshold: 0.8, message: "PLEASE CLICK ME!" },
        { threshold: 1, message: "YAAAAAAY!!!" }
    ];

    document.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const distance = Math.sqrt(Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2));
        const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));
        const enthusiasm = 1 - Math.min(distance / maxDistance, 1);

        button.style.transform = \`scale(\${1 + enthusiasm * 0.1})\`;
        button.style.backgroundColor = \`hsl(\${enthusiasm * 60}, 100%, 50%)\`;

        for (let i = enthusiasmLevels.length - 1; i >= 0; i--) {
            if (enthusiasm >= enthusiasmLevels[i].threshold) {
                buttonText.textContent = enthusiasmLevels[i].message;
                break;
            }
        }

        if (enthusiasm > 0.8) {
            button.classList.add('excited');
        } else {
            button.classList.remove('excited');
        }
    });

    button.addEventListener('click', () => {
        buttonText.textContent = "SUBMITTED!!!";
        button.disabled = true;
        setTimeout(() => {
            buttonText.textContent = "Submit";
            button.disabled = false;
        }, 2000);
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
            <h2 className="text-2xl font-bold mb-6">Overenthusiastic Submit Button Component</h2>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Demo</h3>
                <div className="flex justify-center items-center h-40 bg-white rounded-lg">
                    <button
                        ref={buttonRef}
                        className="relative px-6 py-3 text-lg bg-green-500 text-white border-none rounded-md cursor-pointer transition-all duration-300 overflow-hidden"
                        style={{
                            transform: `scale(${1 + enthusiasm * 0.1})`,
                            backgroundColor: enthusiasm > 0 ? `hsl(${enthusiasm * 60}, 100%, 50%)` : '#22c55e',
                        }}
                        onClick={handleSubmit}
                        disabled={isSubmitted}
                    >
                        <span className="relative z-10">{isSubmitted ? "SUBMITTED!!!" : message}</span>
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl transition-opacity duration-300 ${enthusiasm > 0.8 ? 'opacity-100 animate-bounce' : 'opacity-0'}`}
                        />
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
                    <li>Add the HTML to your page where you want the Overenthusiastic Submit Button to appear.</li>
                    <li>Include the CSS in your stylesheet or within a &lt;style&gt; tag in your HTML.</li>
                    <li>Add the JavaScript to a &lt;script&gt; tag at the end of your &lt;body&gt; or in an external .js file.</li>
                    <li>This is a humorous component and should be used sparingly to avoid confusing users.</li>
                    <li>Consider adding sound effects for extra enthusiasm (but be mindful of accessibility concerns).</li>
                </ul>
            </div>
        </div>
    );
};

export default OverenthusiasticSubmitButton;