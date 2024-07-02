"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TabStyles {
    backgroundColor: string;
    textColor: string;
    activeBackgroundColor: string;
    activeTextColor: string;
    fontSize: number;
    padding: number;
    borderRadius: number;
}

const TabsGenerator: React.FC = () => {
    const [tabs, setTabs] = useState<{ title: string; content: string }[]>([
        { title: 'Tab 1', content: 'Content for Tab 1' },
        { title: 'Tab 2', content: 'Content for Tab 2' },
    ]);
    const [activeTab, setActiveTab] = useState(0);
    const [styles, setStyles] = useState<TabStyles>({
        backgroundColor: '#f3f4f6',
        textColor: '#374151',
        activeBackgroundColor: '#3b82f6',
        activeTextColor: '#ffffff',
        fontSize: 16,
        padding: 12,
        borderRadius: 8,
    });

    const generateCSS = () => {
        return `
.tabs-container {
  display: flex;
  flex-direction: column;
}

.tabs-header {
  display: flex;
  overflow-x: auto;
}

.tab {
  background-color: ${styles.backgroundColor};
  color: ${styles.textColor};
  font-size: ${styles.fontSize}px;
  padding: ${styles.padding}px;
  border-radius: ${styles.borderRadius}px ${styles.borderRadius}px 0 0;
  cursor: pointer;
  margin-right: 4px;
}

.tab.active {
  background-color: ${styles.activeBackgroundColor};
  color: ${styles.activeTextColor};
}

.tab-content {
  background-color: ${styles.backgroundColor};
  padding: ${styles.padding}px;
  border-radius: 0 0 ${styles.borderRadius}px ${styles.borderRadius}px;
}
`;
    };

    const generateHTML = () => {
        return `
<div class="tabs-container">
  <div class="tabs-header">
    ${tabs.map((tab, index) => `    <div class="tab${index === activeTab ? ' active' : ''}" onclick="setActiveTab(${index})">${tab.title}</div>`).join('\n')}
  </div>
  <div class="tab-content">
    ${tabs[activeTab].content}
  </div>
</div>

<script>
function setActiveTab(index) {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  
  tabs.forEach((tab, i) => {
    if (i === index) {
      tab.classList.add('active');
      contents[i].style.display = 'block';
    } else {
      tab.classList.remove('active');
      contents[i].style.display = 'none';
    }
  });
}
</script>
`;
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const addTab = () => {
        const newTabIndex = tabs.length + 1;
        setTabs([...tabs, { title: `Tab ${newTabIndex}`, content: `Content for Tab ${newTabIndex}` }]);
    };

    const removeTab = (index: number) => {
        if (tabs.length > 1) {
            const newTabs = tabs.filter((_, i) => i !== index);
            setTabs(newTabs);
            if (activeTab >= newTabs.length) {
                setActiveTab(newTabs.length - 1);
            }
        }
    };

    const updateTab = (index: number, field: 'title' | 'content', value: string) => {
        const newTabs = [...tabs];
        newTabs[index][field] = value;
        setTabs(newTabs);
    };

    const updateStyle = (property: keyof TabStyles, value: string | number) => {
        setStyles({ ...styles, [property]: value });
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto max-h-[95h]">
                <h2 className="text-2xl font-bold mb-6">Tabs Generator</h2>

                <div className="space-y-4">
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
                        <label className="block text-sm font-medium text-gray-700">Text Color</label>
                        <input
                            type="color"
                            value={styles.textColor}
                            onChange={(e) => updateStyle('textColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Active Background Color</label>
                        <input
                            type="color"
                            value={styles.activeBackgroundColor}
                            onChange={(e) => updateStyle('activeBackgroundColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Active Text Color</label>
                        <input
                            type="color"
                            value={styles.activeTextColor}
                            onChange={(e) => updateStyle('activeTextColor', e.target.value)}
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
                        <label className="block text-sm font-medium text-gray-700">Padding (px)</label>
                        <input
                            type="number"
                            value={styles.padding}
                            onChange={(e) => updateStyle('padding', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Radius (px)</label>
                        <input
                            type="number"
                            value={styles.borderRadius}
                            onChange={(e) => updateStyle('borderRadius', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tabs</label>
                        {tabs.map((tab, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={tab.title}
                                        onChange={(e) => updateTab(index, 'title', e.target.value)}
                                        className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    <button onClick={() => removeTab(index)} className="ml-2 text-red-500">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                                <textarea
                                    value={tab.content}
                                    onChange={(e) => updateTab(index, 'content', e.target.value)}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    rows={3}
                                />
                            </div>
                        ))}
                        <button onClick={addTab} className="mt-2 text-blue-500">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add Tab
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-8 bg-white overflow-hidden">
                    <style>{generateCSS()}</style>
                    <div className="tabs-container">
                        <div className="tabs-header">
                            {tabs.map((tab, index) => (
                                <div
                                    key={index}
                                    className={`tab${index === activeTab ? ' active' : ''}`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {tab.title}
                                </div>
                            ))}
                        </div>
                        <div className="tab-content">
                            {tabs[activeTab].content}
                        </div>
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

export default TabsGenerator;