"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CountUp from 'react-countup';

interface Stat {
    label: string;
    value: number;
    prefix: string;
    suffix: string;
}

interface CopyState {
    html: boolean;
    css: boolean;
}

const StatsGenerator: React.FC = () => {
    const [stats, setStats] = useState<Stat[]>([
        { label: 'Users', value: 10000, prefix: '', suffix: '+' },
        { label: 'Revenue', value: 1000000, prefix: '$', suffix: '' },
        { label: 'Rating', value: 4.8, prefix: '', suffix: '/5' },
    ]);
    const [layout, setLayout] = useState<'row' | 'column'>('row');
    const [bgColor, setBgColor] = useState<string>('#ffffff');
    const [textColor, setTextColor] = useState<string>('#000000');
    const [fontSize, setFontSize] = useState<number>(16);
    const [copied, setCopied] = useState<CopyState>({ html: false, css: false });
    const [animationDuration, setAnimationDuration] = useState<number>(2);

    const handleStatChange = (index: number, field: keyof Stat, value: string) => {
        const newStats = [...stats];
        if (field === 'value') {
            newStats[index][field] = parseFloat(value) || 0;
        } else {
            newStats[index][field] = value;
        }
        setStats(newStats);
    };

    const addStat = () => {
        setStats([...stats, { label: 'New Stat', value: 0, prefix: '', suffix: '' }]);
    };

    const removeStat = (index: number) => {
        setStats(stats.filter((_, i) => i !== index));
    };

    const generateHTML = (): string => {
        return `
<div class="stats-container">
    ${stats.map(stat => `
    <div class="stat">
        <div class="stat-value">${stat.prefix}<span class="count">${stat.value}</span>${stat.suffix}</div>
        <div class="stat-label">${stat.label}</div>
    </div>
    `).join('')}
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.0.8/countUp.min.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const countElements = document.querySelectorAll('.count');
        countElements.forEach(element => {
            const countUp = new CountUp(element, ${animationDuration});
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        });
    });
</script>
        `.trim();
    };

    const generateCSS = (): string => {
        return `
.stats-container {
    display: flex;
    flex-direction: ${layout};
    background-color: ${bgColor};
    color: ${textColor};
    font-size: ${fontSize}px;
    padding: 20px;
    justify-content: space-around;
    align-items: center;
}

.stat {
    text-align: center;
    margin: 10px;
}

.stat-value {
    font-size: 1.5em;
    font-weight: bold;
}

.stat-label {
    margin-top: 5px;
}
        `.trim();
    };

    const copyToClipboard = (text: string, type: 'html' | 'css') => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(prev => ({ ...prev, [type]: true }));
            setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000);
        });
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-4">
                <h2 className="text-2xl font-bold mb-4">Stats Configuration</h2>
                {stats.map((stat, index) => (
                    <div key={index} className="mb-4 p-4 border rounded">
                        <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                            className="w-full mb-2 p-2 border rounded"
                            placeholder="Label"
                        />
                        <div className="flex mb-2">
                            <input
                                type="text"
                                value={stat.prefix}
                                onChange={(e) => handleStatChange(index, 'prefix', e.target.value)}
                                className="w-1/4 p-2 border rounded-l"
                                placeholder="Prefix"
                            />
                            <input
                                type="number"
                                value={stat.value}
                                onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                                className="w-1/2 p-2 border-t border-b"
                                placeholder="Value"
                            />
                            <input
                                type="text"
                                value={stat.suffix}
                                onChange={(e) => handleStatChange(index, 'suffix', e.target.value)}
                                className="w-1/4 p-2 border rounded-r"
                                placeholder="Suffix"
                            />
                        </div>
                        <button onClick={() => removeStat(index)} className="text-red-500">Remove</button>
                    </div>
                ))}
                <button onClick={addStat} className="mb-4 p-2 bg-blue-500 text-white rounded">Add Stat</button>

                <div className="mb-4">
                    <label className="block mb-2">Layout</label>
                    <select
                        value={layout}
                        onChange={(e) => setLayout(e.target.value as 'row' | 'column')}
                        className="w-full p-2 border rounded"
                    >
                        <option value="row">Row</option>
                        <option value="column">Column</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Background Color</label>
                    <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Text Color</label>
                    <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Font Size (px)</label>
                    <input
                        type="number"
                        value={fontSize}
                        onChange={(e) => setFontSize(parseInt(e.target.value) || 16)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Animation Duration (seconds)</label>
                    <input
                        type="number"
                        value={animationDuration}
                        onChange={(e) => setAnimationDuration(parseFloat(e.target.value) || 2)}
                        className="w-full p-2 border rounded"
                        step="0.1"
                        min="0.1"
                    />
                </div>
            </div>

            <div className="w-full md:w-2/3 p-4">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="mb-8 p-4 border rounded" style={{ backgroundColor: bgColor, color: textColor, fontSize: `${fontSize}px` }}>
                    <div style={{ display: 'flex', flexDirection: layout, justifyContent: 'space-around', alignItems: 'center' }}>
                        {stats.map((stat, index) => (
                            <div key={index} style={{ textAlign: 'center', margin: '10px' }}>
                                <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                                    {stat.prefix}
                                    <CountUp
                                        end={stat.value}
                                        duration={animationDuration}
                                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                                    />
                                    {stat.suffix}
                                </div>
                                <div style={{ marginTop: '5px' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">HTML</h3>
                        <button
                            onClick={() => copyToClipboard(generateHTML(), 'html')}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                        >
                            <FontAwesomeIcon icon={copied.html ? faCheck : faCopy} className="mr-2" />
                            {copied.html ? 'Copied!' : 'Copy HTML'}
                        </button>
                    </div>
                    <SyntaxHighlighter language="html" style={vscDarkPlus} showLineNumbers>
                        {generateHTML()}
                    </SyntaxHighlighter>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">CSS</h3>
                        <button
                            onClick={() => copyToClipboard(generateCSS(), 'css')}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                        >
                            <FontAwesomeIcon icon={copied.css ? faCheck : faCopy} className="mr-2" />
                            {copied.css ? 'Copied!' : 'Copy CSS'}
                        </button>
                    </div>
                    <SyntaxHighlighter language="css" style={vscDarkPlus} showLineNumbers>
                        {generateCSS()}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default StatsGenerator;