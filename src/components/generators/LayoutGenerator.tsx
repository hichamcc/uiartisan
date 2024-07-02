"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDesktop, faTablet, faMobile } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const LayoutGenerator = () => {
    const [rowCount, setRowCount] = useState(1);
    const [columnCounts, setColumnCounts] = useState([1]);
    const [layoutType, setLayoutType] = useState('flex');
    const [verticalGap, setVerticalGap] = useState(10);
    const [horizontalGap, setHorizontalGap] = useState(10);
    const [rowHeight, setRowHeight] = useState(100);
    const [animation, setAnimation] = useState('none');
    const [viewportWidth, setViewportWidth] = useState('100%');

    useEffect(() => {
        setColumnCounts(Array(rowCount).fill(1));
    }, [rowCount]);

    const generateHTML = () => {
        let html = `<div class="layout ${layoutType}">`;
        for (let i = 0; i < rowCount; i++) {
            html += `\n  <div class="row">`;
            for (let j = 0; j < columnCounts[i]; j++) {
                html += `\n    <div class="cell">Row ${i + 1}, Cell ${j + 1}</div>`;
            }
            html += `\n  </div>`;
        }
        html += '\n</div>';
        return html;
    };

    const generateCSS = () => {
        let css = `
.layout {
  gap: ${verticalGap}px;
}

.row {
  gap: ${horizontalGap}px;
  min-height: ${rowHeight}px;
}

.cell {
  background-color: #e0e0e0;
  padding: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .row {
    flex-wrap: wrap;
  }
  .cell {
    flex-basis: calc(50% - ${horizontalGap / 2}px);
  }
}

@media (max-width: 480px) {
  .cell {
    flex-basis: 100%;
  }
}
`;

        if (layoutType === 'flex') {
            css += `
.layout {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
}

.cell {
  flex: 1;
}
`;
        } else if (layoutType === 'grid') {
            css += `
.layout {
  display: grid;
  grid-template-rows: repeat(${rowCount}, auto);
}

.row {
  display: grid;
  grid-template-columns: repeat(${Math.max(...columnCounts)}, 1fr);
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .row {
    grid-template-columns: 1fr;
  }
}
`;
        }

        if (animation !== 'none') {
            css += `
@keyframes ${animation} {
  from { opacity: 0; transform: ${animation === 'slideIn' ? 'translateY(20px)' : animation === 'zoomIn' ? 'scale(0.9)' : 'none'}; }
  to { opacity: 1; transform: none; }
}

.row {
  animation: ${animation} 0.5s ease-out;
}
`;
        }

        return css;
    };

    const handleCopyCode = (code: any) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    return (
        <>

            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Parameters Side */}
                <div className="w-full md:w-1/4 p-8 bg-white shadow-md overflow-y-auto">
                    <h1 className="text-3xl font-bold mb-6">Layout Generator</h1>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="rowCount" className="block mb-1 font-semibold">Number of Rows:</label>
                            <input
                                type="number"
                                id="rowCount"
                                min="1"
                                value={rowCount}
                                onChange={(e) => setRowCount(Math.max(1, parseInt(e.target.value)))}
                                className="border p-2 w-full"
                            />
                        </div>

                        <div id="columnInputs" className="space-y-4">
                            {columnCounts.map((count, index) => (
                                <div key={index}>
                                    <label htmlFor={`columnCount-${index}`} className="block mb-1 font-semibold">Columns for Row {index + 1}:</label>
                                    <input
                                        type="number"
                                        id={`columnCount-${index}`}
                                        min="1"
                                        value={count}
                                        onChange={(e) => {
                                            const newCounts = [...columnCounts];
                                            newCounts[index] = Math.max(1, parseInt(e.target.value));
                                            setColumnCounts(newCounts);
                                        }}
                                        className="border p-2 w-full"
                                    />
                                </div>
                            ))}
                        </div>

                        <div>
                            <label htmlFor="layoutType" className="block mb-2 font-semibold">Layout Type:</label>
                            <select
                                id="layoutType"
                                value={layoutType}
                                onChange={(e) => setLayoutType(e.target.value)}
                                className="border p-2 w-full"
                            >
                                <option value="flex">Flexbox</option>
                                <option value="grid">Grid</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">Customization:</label>
                            <div className="space-y-2">
                                <div>
                                    <label htmlFor="verticalGap" className="block">Vertical Gap (px):</label>
                                    <input
                                        type="number"
                                        id="verticalGap"
                                        min="0"
                                        value={verticalGap}
                                        onChange={(e) => setVerticalGap(Math.max(0, parseInt(e.target.value)))}
                                        className="border p-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="horizontalGap" className="block">Horizontal Gap (px):</label>
                                    <input
                                        type="number"
                                        id="horizontalGap"
                                        min="0"
                                        value={horizontalGap}
                                        onChange={(e) => setHorizontalGap(Math.max(0, parseInt(e.target.value)))}
                                        className="border p-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="rowHeight" className="block">Row Height (px):</label>
                                    <input
                                        type="number"
                                        id="rowHeight"
                                        min="0"
                                        value={rowHeight}
                                        onChange={(e) => setRowHeight(Math.max(0, parseInt(e.target.value)))}
                                        className="border p-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="animation" className="block">Row Animation:</label>
                                    <select
                                        id="animation"
                                        value={animation}
                                        onChange={(e) => setAnimation(e.target.value)}
                                        className="border p-2 w-full"
                                    >
                                        <option value="none">None</option>
                                        <option value="fadeIn">Fade In</option>
                                        <option value="slideIn">Slide In</option>
                                        <option value="zoomIn">Zoom In</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {/* Generate layout logic */ }}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full"
                        >
                            Generate Layout
                        </button>
                    </div>
                </div>

                {/* Preview and Code Side */}
                <div className="w-full md:w-3/4 p-8 bg-gray-50">
                    <h2 className="text-2xl font-bold mb-4">Preview</h2>
                    <div className="mb-4 flex space-x-4">
                        <button onClick={() => setViewportWidth('100%')} className="p-2 bg-white rounded shadow hover:bg-gray-100">
                            <FontAwesomeIcon icon={faDesktop} />
                        </button>
                        <button onClick={() => setViewportWidth('768px')} className="p-2 bg-white rounded shadow hover:bg-gray-100">
                            <FontAwesomeIcon icon={faTablet} />
                        </button>
                        <button onClick={() => setViewportWidth('375px')} className="p-2 bg-white rounded shadow hover:bg-gray-100">
                            <FontAwesomeIcon icon={faMobile} />
                        </button>
                    </div>
                    <div className="border p-4 bg-white min-h-[500px]" style={{ width: viewportWidth, margin: '0 auto', overflow: 'auto' }}>
                        <style>{generateCSS()}</style>
                        <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />
                    </div>

                    {/* Generated Code */}
                    <div className="mt-8 space-y-8">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold">Generated HTML</h2>
                                <button onClick={() => handleCopyCode(generateHTML())} className="text-blue-600 hover:text-blue-800">
                                    <FontAwesomeIcon icon={faCopy} className="mr-2" />
                                    Copy
                                </button>
                            </div>
                            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                                <SyntaxHighlighter language="html" style={vscDarkPlus} showLineNumbers>
                                    {generateHTML()}
                                </SyntaxHighlighter>
                            </pre>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold">Generated CSS</h2>
                                <button onClick={() => handleCopyCode(generateCSS())} className="text-blue-600 hover:text-blue-800">
                                    <FontAwesomeIcon icon={faCopy} className="mr-2" />
                                    Copy
                                </button>
                            </div>
                            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                                <SyntaxHighlighter language="css" style={vscDarkPlus} showLineNumbers>
                                    {generateCSS()}
                                </SyntaxHighlighter>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default LayoutGenerator;