"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ListStyles {
    listType: 'ul' | 'ol';
    markerType: string;
    markerColor: string;
    textColor: string;
    fontSize: number;
    lineHeight: number;
    itemSpacing: number;
}

const ListGenerator: React.FC = () => {
    const [listItems, setListItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);
    const [styles, setStyles] = useState<ListStyles>({
        listType: 'ul',
        markerType: 'disc',
        markerColor: '#3b82f6',
        textColor: '#333333',
        fontSize: 16,
        lineHeight: 1.5,
        itemSpacing: 0.5,
    });

    const markerTypes = {
        ul: ['disc', 'circle', 'square', 'none'],
        ol: ['decimal', 'lower-alpha', 'lower-roman', 'upper-alpha', 'upper-roman'],
    };

    const generateCSS = () => {
        return `
.custom-list {
  list-style-type: ${styles.markerType};
  color: ${styles.textColor};
  font-size: ${styles.fontSize}px;
  line-height: ${styles.lineHeight};
}

.custom-list li {
  margin-bottom: ${styles.itemSpacing}em;
}

.custom-list li::marker {
  color: ${styles.markerColor};
}
`;
    };

    const generateHTML = () => {
        return `
<${styles.listType} class="custom-list">
  ${listItems.map((item) => `  <li>${item}</li>`).join('\n')}
</${styles.listType}>
`;
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const addListItem = () => {
        setListItems([...listItems, `Item ${listItems.length + 1}`]);
    };

    const removeListItem = (index: number) => {
        setListItems(listItems.filter((_, i) => i !== index));
    };

    const updateListItem = (index: number, value: string) => {
        const newItems = [...listItems];
        newItems[index] = value;
        setListItems(newItems);
    };

    const updateStyle = (property: keyof ListStyles, value: string | number) => {
        setStyles({ ...styles, [property]: value });
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">List Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">List Type</label>
                        <select
                            value={styles.listType}
                            onChange={(e) => updateStyle('listType', e.target.value as 'ul' | 'ol')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="ul">Unordered List</option>
                            <option value="ol">Ordered List</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Marker Type</label>
                        <select
                            value={styles.markerType}
                            onChange={(e) => updateStyle('markerType', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            {markerTypes[styles.listType].map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Marker Color</label>
                        <input
                            type="color"
                            value={styles.markerColor}
                            onChange={(e) => updateStyle('markerColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Text Color</label>
                        <input
                            type="color"
                            value={styles.textColor}
                            onChange={(e) => updateStyle('textColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Font Size (px)</label>
                        <input
                            type="number"
                            value={styles.fontSize}
                            onChange={(e) => updateStyle('fontSize', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Line Height</label>
                        <input
                            type="number"
                            step="0.1"
                            value={styles.lineHeight}
                            onChange={(e) => updateStyle('lineHeight', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Item Spacing (em)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={styles.itemSpacing}
                            onChange={(e) => updateStyle('itemSpacing', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">List Items</label>
                        {listItems.map((item, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => updateListItem(index, e.target.value)}
                                    className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <button onClick={() => removeListItem(index)} className="ml-2 text-red-500">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        ))}
                        <button onClick={addListItem} className="mt-2 text-blue-500">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add Item
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-8 bg-white overflow-hidden">
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

export default ListGenerator;