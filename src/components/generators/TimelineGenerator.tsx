"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const TimelineGenerator = () => {
    const [orientation, setOrientation] = useState('vertical');
    const [lineColor, setLineColor] = useState('#3b82f6');
    const [lineWidth, setLineWidth] = useState(2);
    const [eventSpacing, setEventSpacing] = useState(50);
    const [eventAlignment, setEventAlignment] = useState('alternate');
    const [events, setEvents] = useState([
        { title: 'Event 1', date: '2023-01-01', description: 'Description for Event 1', color: '#3b82f6' },
        { title: 'Event 2', date: '2023-02-15', description: 'Description for Event 2', color: '#10b981' },
        { title: 'Event 3', date: '2023-03-30', description: 'Description for Event 3', color: '#f59e0b' },
    ]);

    const generateCSS = () => {
        return `
    .timeline {
      position: relative;
      margin: 0 auto;
      padding: 20px 0;
    }
    
    .timeline::after {
      content: '';
      position: absolute;
      ${orientation === 'vertical' ?
                `width: ${lineWidth}px;
        top: 0;
        bottom: 0;
        left: 50%;
        margin-left: -${lineWidth / 2}px;` :
                `height: ${lineWidth}px;
        left: 0;
        right: 0;
        top: 50%;
        margin-top: -${lineWidth / 2}px;`
            }
      background-color: ${lineColor};
    }
    
    .timeline-events {
      ${orientation === 'horizontal' ? `
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        padding-bottom: 100px;
      ` : ''}
    }
    
    .timeline-event {
      ${orientation === 'vertical' ? `
        padding: 10px 40px;
        position: relative;
        width: 50%;
      ` : `
        flex: 0 0 auto;
        width: 300px;
        margin-right: ${eventSpacing}px;
        padding: 100px 20px 20px;
        position: relative;
      `}
    }
    
    ${orientation === 'vertical' && eventAlignment !== 'right' ? `
    .timeline-event:nth-child(even) {
      left: 50%;
    }
    ` : ''}
    
    ${orientation === 'vertical' && eventAlignment === 'right' ? `
    .timeline-event {
      left: 50%;
    }
    ` : ''}
    
    ${orientation === 'vertical' && eventAlignment === 'left' ? `
    .timeline-event {
      left: 0;
    }
    ` : ''}
    
    .timeline-content {
      padding: 20px;
      background-color: white;
      position: relative;
      border-radius: 6px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }
    
    .timeline-content:hover {
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
      transform: translateY(-5px);
    }
    
    .timeline-dot {
      position: absolute;
      width: 20px;
      height: 20px;
      ${orientation === 'vertical' ?
                `right: -30px;
        top: 15px;` :
                `left: 50%;
        top: -10px;
        margin-left: -10px;`
            }
      border-radius: 50%;
      z-index: 1;
    }
    
    ${orientation === 'vertical' && eventAlignment !== 'right' ? `
    .timeline-event:nth-child(even) .timeline-dot {
      left: -30px;
    }
    ` : ''}
    
    .timeline-event-title {
      font-weight: bold;
      font-size: 1.2em;
      margin-bottom: 5px;
    }
    
    .timeline-event-date {
      color: #666;
      font-style: italic;
      margin-bottom: 10px;
    }
    
    .timeline-event-description {
      line-height: 1.5;
    }
    
    @media (max-width: 768px) {
      .timeline::after {
        ${orientation === 'horizontal' ? `
          top: 0;
          bottom: auto;
          margin-top: 0;
        ` : ''}
      }
    
      .timeline-event {
        ${orientation === 'horizontal' ? `
          width: 250px;
          padding-top: 50px;
        ` : ''}
      }
    }
    
    @media (max-width: 480px) {
      .timeline-event {
        ${orientation === 'horizontal' ? `
          width: 200px;
        ` : ''}
      }
    }
    `;
    };

    const generateHTML = () => {
        return `
    <div class="timeline">
      <div class="timeline-events">
        ${events.map((event, index) => `
        <div class="timeline-event">
          <div class="timeline-content" style="border-top: 4px solid ${event.color};">
            <div class="timeline-dot" style="background-color: ${event.color};"></div>
            <h3 class="timeline-event-title">${event.title}</h3>
            <p class="timeline-event-date">${event.date}</p>
            <p class="timeline-event-description">${event.description}</p>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
    `;
    };


    const handleCopyCode = (code: any) => {
        navigator.clipboard.writeText(code);
        // Optionally, add a toast notification here
    };

    const addEvent = () => {
        setEvents([...events, { title: `Event ${events.length + 1}`, date: '', description: '', color: '#3b82f6' }]);
    };

    const updateEvent = (index: any, field: any, value: any) => {
        const updatedEvents = [...events];
        updatedEvents[index] = { ...updatedEvents[index], [field]: value };
        setEvents(updatedEvents);
    };

    const removeEvent = (index: any) => {
        setEvents(events.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md overflow-y-auto max-h-[95vh]">
                <h2 className="text-2xl font-bold mb-6">Timeline Generator</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Orientation</label>
                        <select
                            value={orientation}
                            onChange={(e) => setOrientation(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="vertical">Vertical</option>
                            <option value="horizontal">Horizontal</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Line Color</label>
                        <input
                            type="color"
                            value={lineColor}
                            onChange={(e) => setLineColor(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Line Width (px)</label>
                        <input
                            type="number"
                            value={lineWidth}
                            onChange={(e) => setLineWidth(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Event Spacing (px)</label>
                        <input
                            type="number"
                            value={eventSpacing}
                            onChange={(e) => setEventSpacing(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    {orientation === 'vertical' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Event Alignment</label>
                            <select
                                value={eventAlignment}
                                onChange={(e) => setEventAlignment(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="alternate">Alternate</option>
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                    )}

                    <h3 className="text-lg font-semibold mt-6">Events</h3>
                    {events.map((event, index) => (
                        <div key={index} className="border p-4 rounded-md">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">Event {index + 1}</h4>
                                <button onClick={() => removeEvent(index)} className="text-red-500">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={event.title}
                                    onChange={(e) => updateEvent(index, 'title', e.target.value)}
                                    placeholder="Event Title"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <input
                                    type="date"
                                    value={event.date}
                                    onChange={(e) => updateEvent(index, 'date', e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <textarea
                                    value={event.description}
                                    onChange={(e) => updateEvent(index, 'description', e.target.value)}
                                    placeholder="Event Description"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    rows="2"
                                />
                                <input
                                    type="color"
                                    value={event.color}
                                    onChange={(e) => updateEvent(index, 'color', e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addEvent}
                        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add Event
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

export default TimelineGenerator;