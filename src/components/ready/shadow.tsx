"use client";
import React, { useState } from 'react';

const shadows = [

    {
        name: "Soft Spread",
        classes: "bg-white p-6 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
    },
    {
        name: "Floating Paper",
        classes: "bg-white p-6 rounded-lg shadow-[rgba(0,_0,_0,_0.07)_0px_1px_2px,_rgba(0,_0,_0,_0.07)_0px_2px_4px,_rgba(0,_0,_0,_0.07)_0px_4px_8px,_rgba(0,_0,_0,_0.07)_0px_8px_16px,_rgba(0,_0,_0,_0.07)_0px_16px_32px,_rgba(0,_0,_0,_0.07)_0px_32px_64px]"
    },


    {
        name: "Prismatic Edge",
        classes: "bg-white p-6 rounded-lg shadow-[0_10px_50px_-20px_rgba(255,_0,_0,_0.5),_20px_0_50px_-20px_rgba(0,_255,_0,_0.5),_-20px_0_50px_-20px_rgba(0,_0,_255,_0.5)]"
    }, {
        name: "Subtle Lift",
        classes: "bg-white p-6 rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
    },
    {
        name: "Crisp Edge",
        classes: "bg-white p-6 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.06),_0_2px_4px_rgba(0,0,0,0.08)]"
    },
    {
        name: "Soft Glow",
        classes: "bg-white p-6 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.05)]"
    },
    {
        name: "Layered Depth",
        classes: "bg-white p-6 rounded-lg shadow-[0_1px_2px_#0000000b,_0_2px_4px_#0000000b,_0_4px_8px_#0000000b,_0_8px_16px_#0000000b,_0_16px_32px_#0000000b,_0_32px_64px_#0000000b]"
    },
    {
        name: "Inner Clarity",
        classes: "bg-gray-100 p-6 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]"
    },
    {
        name: "Perspective Lift",
        classes: "bg-white p-6 rounded-lg shadow-[-12px_-12px_24px_rgba(255,255,255,0.8),_12px_12px_24px_rgba(0,0,0,0.1)]"
    },
    {
        name: "Neon Edge",
        classes: "bg-white p-6 rounded-lg shadow-[0_0_0_2px_#000000,_0_0_0_4px_#ffffff,_0_0_0_6px_#000000,_0_0_0_8px_#ffffff,_0_0_0_10px_#000000,_10px_10px_0_0_rgba(0,0,0,0.2)]"
    },

    {
        name: "Retro Pixel",
        classes: "bg-white p-6 rounded-none shadow-[8px_8px_0_0_#000000,_16px_16px_0_0_#4a4a4a,_24px_24px_0_0_#828282]"
    },
    {
        name: "Gradient Edge",
        classes: "bg-white p-6 rounded-lg shadow-[4px_4px_10px_0_rgba(0,0,0,0.1),_-4px_-4px_10px_0_rgba(255,255,255,0.8),_inset_2px_2px_5px_0_rgba(255,255,255,0.9),_inset_-2px_-2px_5px_0_rgba(0,0,0,0.05)]"
    },
    {
        name: "Soft Halo",
        classes: "bg-white p-6 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1),_0_0_0_1px_rgba(0,0,0,0.05)]"
    },
    {
        name: "Contoured Lift",
        classes: "bg-gradient-to-br from-white to-gray-100 p-6 rounded-lg shadow-[4px_4px_10px_0_rgba(0,0,0,0.1),_-4px_-4px_10px_0_rgba(255,255,255,0.8)]"
    },
    {
        name: "Elegant Outline",
        classes: "bg-white p-6 rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.05),_0_4px_6px_rgba(0,0,0,0.05),_0_10px_20px_rgba(0,0,0,0.05)]"
    }, {
        name: "Neon Glow",
        classes: "bg-white  p-6 rounded-lg shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
    },
    {
        name: "Layered Depth",
        classes: "bg-white p-6 rounded-lg shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
    }


];

const ShadowPage = () => {
    const [copiedShadow, setCopiedShadow] = useState('');

    const copyToClipboard = (text: any, shadowName: any) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedShadow(shadowName);
            setTimeout(() => setCopiedShadow(''), 2000);
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Artistic Tailwind Shadows</h1>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {shadows.map((shadow, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div
                            className={`w-64 h-64 ${shadow.classes} flex items-center justify-center text-center cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105`}
                            onClick={() => copyToClipboard(shadow.classes, shadow.name)}
                        >
                            <p className="font-bold">{shadow.name}</p>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">Click to copy classes</p>
                    </div>
                ))}
            </div>

            {copiedShadow && (
                <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-lg" role="alert">
                    <span className="block sm:inline">Copied {copiedShadow} classes to clipboard!</span>
                </div>
            )}
        </div>
    );
};

export default ShadowPage;