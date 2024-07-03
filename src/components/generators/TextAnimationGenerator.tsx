"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TextAnimationGenerator = () => {
  const [text, setText] = useState('Animate Me!');
  const [animationType, setAnimationType] = useState<AnimationType>('fade-in');
  const [duration, setDuration] = useState(1);
  const [delay, setDelay] = useState(0);
  const [iterationCount, setIterationCount] = useState<number | 'infinite'>(1);
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState('#000000');

  type AnimationType = 'fade-in' | 'slide-in' | 'bounce' | 'rotate' | 'pulse' | 'drop' | 'letter-rotate' | 'write';

  const animations: Record<AnimationType, string> = {
    'fade-in': `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }`,
    'slide-in': `
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }`,
    'bounce': `
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }`,
    'rotate': `
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }`,
    'pulse': `
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }`,
    'drop': `
        @keyframes drop {
          0% { transform: translateY(-100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }`,
    'letter-rotate': `
        @keyframes letter-rotate {
          from { transform: rotateX(0deg); }
          to { transform: rotateX(360deg); }
        }`,
    'write': `
        @keyframes write {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .animated-text::after {
          content: '|';
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }`,
  };

  interface CSSGeneratorProps {
    animationType: AnimationType;
    fontSize: number;
    fontColor: string;
    duration: number;
    delay: number;
    iterationCount: number | 'infinite';
    text: string;
  }

  const generateCSS = ({
    animationType,
    fontSize,
    fontColor,
    duration,
    delay,
    iterationCount,
    text
  }: CSSGeneratorProps): string => {
    return `
  ${animations[animationType]}
  
  .animated-text {
    font-size: ${fontSize}px;
    color: ${fontColor};
    ${animationType !== 'write' && animationType !== 'drop' && animationType !== 'letter-rotate' ? `
    animation: ${animationType} ${duration}s ${delay}s ${iterationCount} forwards;` : ''}
  }
  ${animationType === 'write' || animationType === 'drop' || animationType === 'letter-rotate' ? `
  .animated-letter {
    display: inline-block;
    animation: ${animationType} ${duration}s ${delay}s ${iterationCount} forwards;
  }
  ${animationType === 'write' ? `
  .animated-text {
    border-right: 0.1em solid ${fontColor};
    width: 0;
    animation: write ${duration}s steps(${text.length}) ${delay}s ${iterationCount} forwards;
  }` : ''}` : ''}`.trim();
  };

  const generateHTML = () => {
    return `
<div class="animated-text">
  ${animationType === 'write' || animationType === 'drop' || animationType === 'letter-rotate' ? text.split('').map((letter, index) => `
  <span class="animated-letter" style="animation-delay: ${index * 0.1}s;">
    ${letter}
  </span>`).join('') : text}
</div>`.trim();
  };

  const handleCopyCode = (code: any) => {
    navigator.clipboard.writeText(code);
    // Optionally, add a toast notification here
  };

  const css = generateCSS({
    animationType,
    fontSize,
    fontColor,
    duration,
    delay,
    iterationCount,
    text
  });

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [animationType, duration, delay, iterationCount, fontSize, fontColor]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Text Animation Generator</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Animation Type</label>
            <select
              value={animationType}
              onChange={(e: any) => setAnimationType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="fade-in">Fade In</option>
              <option value="slide-in">Slide In</option>
              <option value="bounce">Bounce</option>
              <option value="rotate">Rotate</option>
              <option value="pulse">Pulse</option>
              <option value="drop">Drop</option>
              <option value="letter-rotate">Letter Rotate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (seconds)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="0.1"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Delay (seconds)</label>
            <input
              type="number"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              min="0"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Iteration Count</label>
            <select
              value={iterationCount}
              onChange={(e: any) => setIterationCount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="infinite">Infinite</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Font Size (px)</label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              min="8"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Font Color</label>
            <input
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 p-8 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <div className="border p-4 bg-white overflow-hidden relative" style={{ height: '200px' }}>
          <div className={`animated-text ${animationType === 'write' || animationType === 'drop' || animationType === 'letter-rotate' ? '' : 'animated'}`} style={{
            fontSize: `${fontSize}px`,
            color: fontColor,
            animation: `${animationType !== 'write' && animationType !== 'drop' && animationType !== 'letter-rotate' ? `${animationType} ${duration}s ${delay}s ${iterationCount} forwards` : ''}`
          }}>
            {animationType === 'write' || animationType === 'drop' || animationType === 'letter-rotate' ? text.split('').map((letter, index) => (
              <span key={index} className="animated-letter" style={{ animationDelay: `${index * 0.1}s` }}>
                {letter}
              </span>
            )) : text}
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Generated CSS</h2>
              <button onClick={() => handleCopyCode(css)} className="text-blue-600 hover:text-blue-800">
                <FontAwesomeIcon icon={faCopy} className="mr-2" />
                Copy
              </button>
            </div>
            <SyntaxHighlighter language="css" style={vscDarkPlus} showLineNumbers>
              {css}
            </SyntaxHighlighter>
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default TextAnimationGenerator;


