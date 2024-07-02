"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPlus, faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const FAQGenerator = () => {
    const [layout, setLayout] = useState('accordion');
    const [questionColor, setQuestionColor] = useState('#333333');
    const [answerColor, setAnswerColor] = useState('#666666');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [borderColor, setBorderColor] = useState('#e5e7eb');
    const [borderRadius, setBorderRadius] = useState(4);
    const [fontSize, setFontSize] = useState(16);
    const [iconType, setIconType] = useState('chevron');
    const [iconColor, setIconColor] = useState('#333333');
    const [animationDuration, setAnimationDuration] = useState(0.3);
    const [faqs, setFaqs] = useState([
        { question: 'What is FAQ?', answer: 'FAQ stands for Frequently Asked Questions. It\'s a list of common questions and answers about a specific topic.', isOpen: false },
        { question: 'Why use an FAQ section?', answer: 'An FAQ section helps users quickly find answers to common questions, reducing the need for customer support and improving user experience.', isOpen: false },
    ]);

    const generateCSS = () => {
        return `
.faq-container {
  max-width: 800px;
  margin: 0 auto;
  font-size: ${fontSize}px;
}

.faq-item {
  background-color: ${backgroundColor};
  border: 1px solid ${borderColor};
  border-radius: ${borderRadius}px;
  margin-bottom: 10px;
  overflow: hidden;
}

.faq-question {
  color: ${questionColor};
  padding: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color ${animationDuration}s ease;
}

.faq-question:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.faq-answer {
  color: ${answerColor};
  padding: 0 15px;
  max-height: 0;
  overflow: hidden;
  transition: max-height ${animationDuration}s ease, padding ${animationDuration}s ease;
}

.faq-answer.open {
  max-height: 1000px;
  padding: 15px;
}

.faq-icon {
  color: ${iconColor};
  transition: transform ${animationDuration}s ease;
}

.faq-icon.open {
  transform: rotate(180deg);
}

${layout === 'grid' ? `
@media (min-width: 768px) {
  .faq-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
` : ''}
`;
    };

    const generateHTML = () => {
        return `
<div class="faq-container${layout === 'grid' ? ' faq-grid' : ''}">
  ${faqs.map((faq, index) => `
  <div class="faq-item">
    <div class="faq-question" onclick="toggleFAQ(${index})">
      ${faq.question}
      <span class="faq-icon${faq.isOpen ? ' open' : ''}">
        ${iconType === 'chevron' ? '▼' : iconType === 'plus' ? '+' : '▶'}
      </span>
    </div>
    <div class="faq-answer${faq.isOpen ? ' open' : ''}">
      ${faq.answer}
    </div>
  </div>
  `).join('')}
</div>

<script>
function toggleFAQ(index) {
  const faqItems = document.querySelectorAll('.faq-item');
  const faqItem = faqItems[index];
  const answer = faqItem.querySelector('.faq-answer');
  const icon = faqItem.querySelector('.faq-icon');
  
  answer.classList.toggle('open');
  icon.classList.toggle('open');
}
</script>
`;
    };

    const handleCopyCode = (code: any) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const addFAQ = () => {
        setFaqs([...faqs, { question: 'New Question', answer: 'New Answer', isOpen: false }]);
    };

    const updateFAQ = (index: any, field: any, value: any) => {
        const updatedFAQs = [...faqs];
        updatedFAQs[index] = { ...updatedFAQs[index], [field]: value };
        setFaqs(updatedFAQs);
    };

    const removeFAQ = (index: any) => {
        setFaqs(faqs.filter((_, i) => i !== index));
    };

    const toggleFAQ = (index: any) => {
        const updatedFAQs = [...faqs];
        updatedFAQs[index].isOpen = !updatedFAQs[index].isOpen;
        setFaqs(updatedFAQs);
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto max-h-[95vh]">
                <h2 className="text-2xl font-bold mb-6">FAQ Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Layout</label>
                        <select
                            value={layout}
                            onChange={(e) => setLayout(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="accordion">Accordion</option>
                            <option value="grid">Grid</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Question Color</label>
                        <input
                            type="color"
                            value={questionColor}
                            onChange={(e) => setQuestionColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Answer Color</label>
                        <input
                            type="color"
                            value={answerColor}
                            onChange={(e) => setAnswerColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
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
                        <label className="block text-sm font-medium text-gray-700">Border Color</label>
                        <input
                            type="color"
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
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
                        <label className="block text-sm font-medium text-gray-700">Font Size (px)</label>
                        <input
                            type="number"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Icon Type</label>
                        <select
                            value={iconType}
                            onChange={(e) => setIconType(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="chevron">Chevron</option>
                            <option value="plus">Plus</option>
                            <option value="arrow">Arrow</option>
                        </select>
                    </div>
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
                        <label className="block text-sm font-medium text-gray-700">Animation Duration (s)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={animationDuration}
                            onChange={(e) => setAnimationDuration(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <h3 className="text-lg font-semibold mt-6">FAQ Items</h3>
                    {faqs.map((faq, index) => (
                        <div key={index} className="border p-4 rounded-md">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">FAQ Item {index + 1}</h4>
                                <button onClick={() => removeFAQ(index)} className="text-red-500">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={faq.question}
                                    onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                                    placeholder="Question"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <textarea
                                    value={faq.answer}
                                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                                    placeholder="Answer"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    rows="3"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addFAQ}
                        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add FAQ Item
                    </button>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-4 bg-white overflow-x-auto">
                    <style>{generateCSS()}</style>
                    <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />
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

export default FAQGenerator;