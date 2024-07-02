"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ScrollStyles {
    containerHeight: number;
    itemWidth: number;
    itemHeight: number;
    itemSpacing: number;
    scrollSpeed: number;
    backgroundColor: string;
    direction: 'left' | 'right';
}

const InfiniteScrollGenerator: React.FC = () => {
    const [items, setItems] = useState<string[]>([
        'https://via.placeholder.com/150x50?text=Logo+1',
        'https://via.placeholder.com/150x50?text=Logo+2',
        'https://via.placeholder.com/150x50?text=Logo+3',
        'https://via.placeholder.com/150x50?text=Logo+4',
        'https://via.placeholder.com/150x50?text=Logo+5',
    ]);
    const [styles, setStyles] = useState<ScrollStyles>({
        containerHeight: 100,
        itemWidth: 150,
        itemHeight: 50,
        itemSpacing: 20,
        scrollSpeed: 20,
        backgroundColor: '#ffffff',
        direction: 'left',
    });

    const generateCSS = () => {
        const totalWidth = items.length * (styles.itemWidth + styles.itemSpacing);
        return `
.scroll-container {
  height: ${styles.containerHeight}px;
  background: ${styles.backgroundColor};
  overflow: hidden;
  position: relative;
}

.scroll-content {
  display: flex;
  position: absolute;
  animation: scroll ${totalWidth / styles.scrollSpeed}s linear infinite;
  animation-direction: ${styles.direction === 'left' ? 'normal' : 'reverse'};
}

.scroll-item {
  flex: 0 0 ${styles.itemWidth}px;
  height: ${styles.itemHeight}px;
  margin-right: ${styles.itemSpacing}px;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-${totalWidth}px);
  }
}
`;
    };

    const generateHTML = () => {
        return `
<div class="scroll-container">
  <div class="scroll-content">
    ${items.map((item) => `    <img src="${item}" alt="Logo" class="scroll-item" />`).join('\n')}
    ${items.map((item) => `    <img src="${item}" alt="Logo" class="scroll-item" />`).join('\n')}
  </div>
</div>
`;
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const addItem = () => {
        setItems([...items, `https://via.placeholder.com/150x50?text=Logo+${items.length + 1}`]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index] = value;
        setItems(newItems);
    };

    const updateStyle = (property: keyof ScrollStyles, value: number | string) => {
        setStyles({ ...styles, [property]: value });
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Infinite Scroll Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Container Height (px)</label>
                        <input
                            type="number"
                            value={styles.containerHeight}
                            onChange={(e) => updateStyle('containerHeight', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Item Width (px)</label>
                        <input
                            type="number"
                            value={styles.itemWidth}
                            onChange={(e) => updateStyle('itemWidth', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Item Height (px)</label>
                        <input
                            type="number"
                            value={styles.itemHeight}
                            onChange={(e) => updateStyle('itemHeight', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Item Spacing (px)</label>
                        <input
                            type="number"
                            value={styles.itemSpacing}
                            onChange={(e) => updateStyle('itemSpacing', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Scroll Speed (lower is slower)</label>
                        <input
                            type="number"
                            value={styles.scrollSpeed}
                            onChange={(e) => updateStyle('scrollSpeed', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Background Color</label>
                        <input
                            type="color"
                            value={styles.backgroundColor}
                            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Scroll Direction</label>
                        <select
                            value={styles.direction}
                            onChange={(e) => updateStyle('direction', e.target.value as 'left' | 'right')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Items (Logo URLs)</label>
                        {items.map((item, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => updateItem(index, e.target.value)}
                                    className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <button onClick={() => removeItem(index)} className="ml-2 text-red-500">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        ))}
                        <button onClick={addItem} className="mt-2 text-blue-500">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add Item
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border overflow-hidden py-4">
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

export default InfiniteScrollGenerator;