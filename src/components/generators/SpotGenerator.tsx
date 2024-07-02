"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const spotTypes = {
    static: "Static",
    pulse: "Pulse",
    ripple: "Ripple"
};

const ImageSpotGenerator = () => {
    const [image, setImage] = useState(null);
    const [spots, setSpots] = useState([]);
    const [activeSpot, setActiveSpot] = useState(null);
    const [previewSpot, setPreviewSpot] = useState(null);
    const imageRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setImage(event.target.result);
            setSpots([]);
            setPreviewSpot({
                id: 'preview',
                x: 50,
                y: 50,
                color: '#ff0000',
                size: 20,
                type: 'static'
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleAddSpot = () => {
        if (previewSpot) {
            const newSpot = { ...previewSpot, id: Date.now() };
            setSpots([...spots, newSpot]);
            setActiveSpot(null);
        }
    };

    const handleSpotClick = (spot) => {
        setActiveSpot(spot);
        setPreviewSpot({ ...spot });
    };

    const handleUpdateSpot = () => {
        if (activeSpot && previewSpot) {
            const updatedSpots = spots.map(spot =>
                spot.id === activeSpot.id ? { ...previewSpot, id: spot.id } : spot
            );
            setSpots(updatedSpots);
            setActiveSpot(null);
        }
    };

    const handleRemoveSpot = (id) => {
        setSpots(spots.filter((spot) => spot.id !== id));
        setActiveSpot(null);
    };

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const updatePreviewSpot = (property, value) => {
        setPreviewSpot(prev => ({ ...prev, [property]: value }));
    };

    const generateHTML = () => {
        return `
<div class="image-container" style="position: relative;">
  <img src="${image}" alt="Uploaded image" style="max-width: 100%; height: auto;" />
  ${spots.map(spot => `
  <div class="spot ${spot.type}" style="
    position: absolute;
    left: ${spot.x}%;
    top: ${spot.y}%;
    width: ${spot.size}px;
    height: ${spot.size}px;
    border-radius: 50%;
    background-color: ${spot.color};
    transform: translate(-50%, -50%);
  "></div>`).join('')}
</div>
    `;
    };

    const generateCSS = () => {
        return `
.image-container {
  position: relative;
}

.spot {
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0.7;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

.ripple {
  animation: ripple 2s infinite;
}

@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(255, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}
    `;
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Image Spot Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                        />
                    </div>

                    {previewSpot && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Spot Color</label>
                                <input
                                    type="color"
                                    value={previewSpot.color}
                                    onChange={(e) => updatePreviewSpot('color', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Spot Size (px)</label>
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    value={previewSpot.size}
                                    onChange={(e) => updatePreviewSpot('size', Number(e.target.value))}
                                    className="mt-1 block w-full"
                                />
                                <span>{previewSpot.size}px</span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Spot Type</label>
                                <select
                                    value={previewSpot.type}
                                    onChange={(e) => updatePreviewSpot('type', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    {Object.entries(spotTypes).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Position X (%)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={previewSpot.x}
                                    onChange={(e) => updatePreviewSpot('x', Number(e.target.value))}
                                    className="mt-1 block w-full"
                                />
                                <span>{previewSpot.x}%</span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Position Y (%)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={previewSpot.y}
                                    onChange={(e) => updatePreviewSpot('y', Number(e.target.value))}
                                    className="mt-1 block w-full"
                                />
                                <span>{previewSpot.y}%</span>
                            </div>

                            <button
                                onClick={activeSpot ? handleUpdateSpot : handleAddSpot}
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                <FontAwesomeIcon icon={activeSpot ? faPen : faPlus} className="mr-2" />
                                {activeSpot ? 'Update Spot' : 'Add Spot'}
                            </button>
                        </>
                    )}

                    {spots.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Existing Spots</h3>
                            {spots.map((spot, index) => (
                                <div key={spot.id} className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2">
                                    <span>Spot {index + 1}</span>
                                    <div>
                                        <button
                                            onClick={() => handleSpotClick(spot)}
                                            className="text-blue-500 mr-2"
                                        >
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                        <button
                                            onClick={() => handleRemoveSpot(spot.id)}
                                            className="text-red-500"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full md:w-2/3 p-8 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border p-8 bg-white overflow-hidden">
                    {image && (
                        <div className="relative inline-block" ref={imageRef}>
                            <img
                                src={image}
                                alt="Uploaded"
                                className="max-w-full h-auto"
                            />
                            {spots.map((spot) => (
                                <div
                                    key={spot.id}
                                    className={`spot ${spot.type}`}
                                    style={{
                                        position: 'absolute',
                                        left: `${spot.x}%`,
                                        top: `${spot.y}%`,
                                        width: `${spot.size}px`,
                                        height: `${spot.size}px`,
                                        borderRadius: '50%',
                                        backgroundColor: spot.color,
                                        transform: 'translate(-50%, -50%)',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleSpotClick(spot)}
                                />
                            ))}
                            {previewSpot && (
                                <div
                                    className={`spot ${previewSpot.type}`}
                                    style={{
                                        position: 'absolute',
                                        left: `${previewSpot.x}%`,
                                        top: `${previewSpot.y}%`,
                                        width: `${previewSpot.size}px`,
                                        height: `${previewSpot.size}px`,
                                        borderRadius: '50%',
                                        backgroundColor: previewSpot.color,
                                        transform: 'translate(-50%, -50%)',
                                        cursor: 'pointer',
                                        boxShadow: '0 0 0 2px white, 0 0 0 4px black',
                                    }}
                                />
                            )}
                        </div>
                    )}
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

export default ImageSpotGenerator;