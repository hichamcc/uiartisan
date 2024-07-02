"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPlus, faTrash, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TableStyle {
    borderColor: string;
    headerBackgroundColor: string;
    headerTextColor: string;
    rowEvenBackgroundColor: string;
    rowOddBackgroundColor: string;
    cellTextColor: string;
    fontSize: number;
    padding: number;
    borderWidth: number;
    borderRadius: number;
    hoverHighlight: boolean;
    stripedRows: boolean;
    responsiveTable: boolean;
}

interface TableData {
    headers: string[];
    rows: string[][];
}

const TableGenerator: React.FC = () => {
    const [tableStyle, setTableStyle] = useState<TableStyle>({
        borderColor: '#e5e7eb',
        headerBackgroundColor: '#f3f4f6',
        headerTextColor: '#111827',
        rowEvenBackgroundColor: '#ffffff',
        rowOddBackgroundColor: '#f9fafb',
        cellTextColor: '#374151',
        fontSize: 14,
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        hoverHighlight: true,
        stripedRows: true,
        responsiveTable: true,
    });

    const [tableData, setTableData] = useState<TableData>({
        headers: ['Header 1', 'Header 2', 'Header 3'],
        rows: [
            ['Row 1, Cell 1', 'Row 1, Cell 2', 'Row 1, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
        ],
    });

    const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);

    const generateCSS = () => {
        return `
.table-container {
    overflow-x: auto;
}

.custom-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: ${tableStyle.borderWidth}px solid ${tableStyle.borderColor};
    border-radius: ${tableStyle.borderRadius}px;
    overflow: hidden;
    font-size: ${tableStyle.fontSize}px;
}

.custom-table th,
.custom-table td {
    padding: ${tableStyle.padding}px;
    text-align: left;
    border-bottom: ${tableStyle.borderWidth}px solid ${tableStyle.borderColor};
}

.custom-table th {
    background-color: ${tableStyle.headerBackgroundColor};
    color: ${tableStyle.headerTextColor};
    font-weight: bold;
}

.custom-table td {
    color: ${tableStyle.cellTextColor};
}

${tableStyle.stripedRows ? `
.custom-table tr:nth-child(even) {
    background-color: ${tableStyle.rowEvenBackgroundColor};
}

.custom-table tr:nth-child(odd) {
    background-color: ${tableStyle.rowOddBackgroundColor};
}
` : `
.custom-table tr {
    background-color: ${tableStyle.rowEvenBackgroundColor};
}
`}

${tableStyle.hoverHighlight ? `
.custom-table tr:hover {
    background-color: #e5e7eb;
}
` : ''}

${tableStyle.responsiveTable ? `
@media (max-width: 640px) {
    .custom-table {
        border: 0;
    }
    .custom-table thead {
        display: none;
    }
    .custom-table tr {
        margin-bottom: 10px;
        display: block;
        border: ${tableStyle.borderWidth}px solid ${tableStyle.borderColor};
        border-radius: ${tableStyle.borderRadius}px;
    }
    .custom-table td {
        display: block;
        text-align: right;
        font-size: 13px;
        border-bottom: 1px dotted ${tableStyle.borderColor};
    }
    .custom-table td:last-child {
        border-bottom: 0;
    }
    .custom-table td:before {
        content: attr(data-label);
        float: left;
        text-transform: uppercase;
        font-weight: bold;
    }
}
` : ''}
`;
    };

    const generateHTML = () => {
        return `
<div class="table-container">
    <table class="custom-table">
        <thead>
            <tr>
                ${tableData.headers.map(header => `<th>${header}</th>`).join('\n                ')}
            </tr>
        </thead>
        <tbody>
            ${tableData.rows.map(row => `
            <tr>
                ${row.map((cell, index) => `<td${tableStyle.responsiveTable ? ` data-label="${tableData.headers[index]}"` : ''}>${cell}</td>`).join('\n                ')}
            </tr>`).join('\n            ')}
        </tbody>
    </table>
</div>
`;
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const updateStyle = (property: keyof TableStyle, value: string | number | boolean) => {
        setTableStyle({ ...tableStyle, [property]: value });
    };

    const addRow = () => {
        const newRow = new Array(tableData.headers.length).fill('New Cell');
        setTableData({ ...tableData, rows: [...tableData.rows, newRow] });
    };

    const addColumn = () => {
        const newHeader = `Header ${tableData.headers.length + 1}`;
        const newRows = tableData.rows.map(row => [...row, 'New Cell']);
        setTableData({
            headers: [...tableData.headers, newHeader],
            rows: newRows,
        });
    };

    const removeRow = (index: number) => {
        const newRows = tableData.rows.filter((_, i) => i !== index);
        setTableData({ ...tableData, rows: newRows });
    };

    const removeColumn = (index: number) => {
        const newHeaders = tableData.headers.filter((_, i) => i !== index);
        const newRows = tableData.rows.map(row => row.filter((_, i) => i !== index));
        setTableData({ headers: newHeaders, rows: newRows });
    };

    const startEditing = (row: number, col: number) => {
        setEditingCell({ row, col });
    };

    const handleCellEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editingCell) {
            const { row, col } = editingCell;
            const newRows = [...tableData.rows];
            newRows[row][col] = e.target.value;
            setTableData({ ...tableData, rows: newRows });
        }
    };

    const stopEditing = () => {
        setEditingCell(null);
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto max-h-[95vh]">
                <h2 className="text-2xl font-bold mb-6">Table Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Color</label>
                        <input
                            type="color"
                            value={tableStyle.borderColor}
                            onChange={(e) => updateStyle('borderColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Header Background Color</label>
                        <input
                            type="color"
                            value={tableStyle.headerBackgroundColor}
                            onChange={(e) => updateStyle('headerBackgroundColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Header Text Color</label>
                        <input
                            type="color"
                            value={tableStyle.headerTextColor}
                            onChange={(e) => updateStyle('headerTextColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Row Even Background Color</label>
                        <input
                            type="color"
                            value={tableStyle.rowEvenBackgroundColor}
                            onChange={(e) => updateStyle('rowEvenBackgroundColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Row Odd Background Color</label>
                        <input
                            type="color"
                            value={tableStyle.rowOddBackgroundColor}
                            onChange={(e) => updateStyle('rowOddBackgroundColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cell Text Color</label>
                        <input
                            type="color"
                            value={tableStyle.cellTextColor}
                            onChange={(e) => updateStyle('cellTextColor', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Font Size (px)</label>
                        <input
                            type="number"
                            value={tableStyle.fontSize}
                            onChange={(e) => updateStyle('fontSize', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Padding (px)</label>
                        <input
                            type="number"
                            value={tableStyle.padding}
                            onChange={(e) => updateStyle('padding', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Width (px)</label>
                        <input
                            type="number"
                            value={tableStyle.borderWidth}
                            onChange={(e) => updateStyle('borderWidth', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Border Radius (px)</label>
                        <input
                            type="number"
                            value={tableStyle.borderRadius}
                            onChange={(e) => updateStyle('borderRadius', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={tableStyle.hoverHighlight}
                                onChange={(e) => updateStyle('hoverHighlight', e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Hover Highlight</span>
                        </label>
                    </div>

                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={tableStyle.stripedRows}
                                onChange={(e) => updateStyle('stripedRows', e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Striped Rows</span>
                        </label>
                    </div>

                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={tableStyle.responsiveTable}
                                onChange={(e) => updateStyle('responsiveTable', e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700">Responsive Table</span>
                        </label>
                    </div>

                    <div className="flex space-x-2">
                        <button onClick={addRow} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add Row
                        </button>
                        <button onClick={addColumn} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add Column
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-8 bg-white overflow-hidden">
                    <style>{generateCSS()}</style>
                    <div className="table-container">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    {tableData.headers.map((header, index) => (
                                        <th key={index}>
                                            {header}
                                            <button onClick={() => removeColumn(index)} className="ml-2 text-red-500">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, colIndex) => (
                                            <td key={colIndex} data-label={tableData.headers[colIndex]}>
                                                {editingCell && editingCell.row === rowIndex && editingCell.col === colIndex ? (
                                                    <div className="flex items-center">
                                                        <input
                                                            type="text"
                                                            value={cell}
                                                            onChange={handleCellEdit}
                                                            className="w-full p-1 border rounded"
                                                            autoFocus
                                                        />
                                                        <button onClick={stopEditing} className="ml-2 text-green-500">
                                                            <FontAwesomeIcon icon={faSave} />
                                                        </button>
                                                        <button onClick={stopEditing} className="ml-2 text-red-500">
                                                            <FontAwesomeIcon icon={faTimes} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <span>{cell}</span>
                                                        <button onClick={() => startEditing(rowIndex, colIndex)} className="text-blue-500">
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        ))}
                                        <td>
                                            <button onClick={() => removeRow(rowIndex)} className="text-red-500">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

export default TableGenerator;