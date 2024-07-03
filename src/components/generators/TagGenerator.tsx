"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TagInputGeneratorProps { }

interface TagInputStyles {
    backgroundColor: string;
    textColor: string;
    tagBackgroundColor: string;
    tagTextColor: string;
    borderColor: string;
    borderRadius: number;
    fontSize: number;
}

const TagInputGenerator: React.FC<TagInputGeneratorProps> = () => {
    const [tags, setTags] = useState<string[]>(['React', 'TypeScript']);
    const [inputValue, setInputValue] = useState<string>('');
    const [styles, setStyles] = useState<TagInputStyles>({
        backgroundColor: '#ffffff',
        textColor: '#000000',
        tagBackgroundColor: '#e0e0e0',
        tagTextColor: '#333333',
        borderColor: '#cccccc',
        borderRadius: 4,
        fontSize: 14,
    });
    const [placeholder, setPlaceholder] = useState<string>('Add tags...');
    const [maxTags, setMaxTags] = useState<number>(10);
    const [copiedHTML, setCopiedHTML] = useState<boolean>(false);
    const [copiedCSS, setCopiedCSS] = useState<boolean>(false);
    const [copiedJS, setCopiedJS] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            if (tags.length < maxTags) {
                setTags([...tags, inputValue.trim()]);
                setInputValue('');
            }
        }
    };

    const removeTag = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const generateHTML = () => {
        return `
<div class="tag-input-container">
  <div class="tags">
    ${tags.map(tag => `<span class="tag">${tag}<span class="tag-remove">×</span></span>`).join('')}
  </div>
  <input type="text" class="tag-input" placeholder="${placeholder}">
</div>
    `.trim();
    };

    const generateCSS = () => {
        return `
.tag-input-container {
  background-color: ${styles.backgroundColor};
  border: 1px solid ${styles.borderColor};
  border-radius: ${styles.borderRadius}px;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 8px 0 0 0;
}

.tag {
  width: auto;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${styles.tagTextColor};
  padding: 0 8px;
  font-size: ${styles.fontSize}px;
  list-style: none;
  border-radius: 6px;
  margin: 0 8px 8px 0;
  background: ${styles.tagBackgroundColor};
}

.tag-remove {
  display: block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size: 14px;
  margin-left: 8px;
  color: ${styles.tagTextColor};
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}

.tag-input {
  flex: 1;
  border: none;
  height: 46px;
  font-size: ${styles.fontSize}px;
  padding: 4px 0 0 0;
  color: ${styles.textColor};
  background: ${styles.backgroundColor};
}

.tag-input:focus {
  outline: transparent;
}
    `.trim();
    };

    const generateJS = () => {
        return `
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.tag-input-container');
  const input = container.querySelector('.tag-input');

  container.addEventListener('click', function() {
    input.focus();
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
      const tag = createTag(this.value.trim());
      this.value = '';
      const tags = container.querySelector('.tags');
      tags.appendChild(tag);
    }
  });

  function createTag(label) {
    const div = document.createElement('div');
    div.setAttribute('class', 'tag');
    const span = document.createElement('span');
    span.innerHTML = label;
    const closeBtn = document.createElement('span');
    closeBtn.setAttribute('class', 'tag-remove');
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', function() {
      div.remove();
    });
    div.appendChild(span);
    div.appendChild(closeBtn);
    return div;
  }
});
    `.trim();
    };

    const copyToClipboard = (text: string, setCopiedState: React.Dispatch<React.SetStateAction<boolean>>) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedState(true);
            setTimeout(() => setCopiedState(false), 2000);
        });
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-4">
                <h2 className="text-2xl font-bold mb-4">Tag Input Configuration</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Placeholder</label>
                    <input
                        type="text"
                        value={placeholder}
                        onChange={(e) => setPlaceholder(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Max Tags</label>
                    <input
                        type="number"
                        value={maxTags}
                        onChange={(e) => setMaxTags(parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Background Color</label>
                    <input
                        type="color"
                        value={styles.backgroundColor}
                        onChange={(e) => setStyles({ ...styles, backgroundColor: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Text Color</label>
                    <input
                        type="color"
                        value={styles.textColor}
                        onChange={(e) => setStyles({ ...styles, textColor: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tag Background Color</label>
                    <input
                        type="color"
                        value={styles.tagBackgroundColor}
                        onChange={(e) => setStyles({ ...styles, tagBackgroundColor: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tag Text Color</label>
                    <input
                        type="color"
                        value={styles.tagTextColor}
                        onChange={(e) => setStyles({ ...styles, tagTextColor: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Border Color</label>
                    <input
                        type="color"
                        value={styles.borderColor}
                        onChange={(e) => setStyles({ ...styles, borderColor: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Border Radius (px)</label>
                    <input
                        type="number"
                        value={styles.borderRadius}
                        onChange={(e) => setStyles({ ...styles, borderRadius: parseInt(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Font Size (px)</label>
                    <input
                        type="number"
                        value={styles.fontSize}
                        onChange={(e) => setStyles({ ...styles, fontSize: parseInt(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
            </div>

            <div className="w-full md:w-2/3 p-4">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="mb-8 p-4 border rounded" style={{ backgroundColor: styles.backgroundColor }}>
                    <div className="tag-input-container" style={{
                        backgroundColor: styles.backgroundColor,
                        border: `1px solid ${styles.borderColor}`,
                        borderRadius: `${styles.borderRadius}px`,
                        padding: '5px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}>
                        <div className="tags" style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            padding: 0,
                            margin: '8px 0 0 0'
                        }}>
                            {tags.map((tag, index) => (
                                <span key={index} className="tag" style={{
                                    width: 'auto',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: styles.tagTextColor,
                                    padding: '0 8px',
                                    fontSize: `${styles.fontSize}px`,
                                    listStyle: 'none',
                                    borderRadius: '6px',
                                    margin: '0 8px 8px 0',
                                    background: styles.tagBackgroundColor
                                }}>
                                    {tag}
                                    <span className="tag-remove" onClick={() => removeTag(index)} style={{
                                        display: 'block',
                                        width: '16px',
                                        height: '16px',
                                        lineHeight: '16px',
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        marginLeft: '8px',
                                        color: styles.tagTextColor,
                                        borderRadius: '50%',
                                        background: '#fff',
                                        cursor: 'pointer'
                                    }}>×</span>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            className="tag-input"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            placeholder={placeholder}
                            style={{
                                flex: 1,
                                border: 'none',
                                height: '46px',
                                fontSize: `${styles.fontSize}px`,
                                padding: '4px 0 0 0',
                                color: styles.textColor,
                                background: styles.backgroundColor
                            }}
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">HTML</h3>
                        <button
                            onClick={() => copyToClipboard(generateHTML(), setCopiedHTML)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                        >
                            <FontAwesomeIcon icon={copiedHTML ? faCheck : faCopy} className="mr-2" />
                            {copiedHTML ? 'Copied!' : 'Copy HTML'}
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
                            onClick={() => copyToClipboard(generateCSS(), setCopiedCSS)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                        >
                            <FontAwesomeIcon icon={copiedCSS ? faCheck : faCopy} className="mr-2" />
                            {copiedCSS ? 'Copied!' : 'Copy CSS'}
                        </button>
                    </div>
                    <SyntaxHighlighter language="css" style={vscDarkPlus} showLineNumbers>
                        {generateCSS()}
                    </SyntaxHighlighter>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">JavaScript</h3>
                        <button
                            onClick={() => copyToClipboard(generateJS(), setCopiedJS)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                        >
                            <FontAwesomeIcon icon={copiedJS ? faCheck : faCopy} className="mr-2" />
                            {copiedJS ? 'Copied!' : 'Copy JavaScript'}
                        </button>
                    </div>
                    <SyntaxHighlighter language="javascript" style={vscDarkPlus} showLineNumbers>
                        {generateJS()}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default TagInputGenerator;