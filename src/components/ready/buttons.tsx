"use client";
import React, { useState } from 'react';

const buttons = [
    {
        html: `<button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
    Glowing Button
  </span>
</button>`
    },
    {
        html: `<button class="relative px-8 py-4 bg-green-500 text-white font-bold rounded-lg transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
  3D Button
  <span class="absolute bottom-0 left-0 w-full h-2 bg-green-600 rounded-b-lg"></span>
</button>`
    },
    {
        html: `<button class="relative inline-block px-8 py-3 font-medium group">
  <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
  <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
  <span class="relative text-black group-hover:text-white">Neon Button</span>
</button>`
    },
    {
        html: `<button class="relative px-6 py-3 font-bold text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500">
  <span class="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
  <span class="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
  <span class="relative">Ripple Button</span>
</button>`
    },
    {
        html: `<button class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
      <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Gradient Border
      </span>
    </button>`
    },
    {
        html: `<button class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-black rounded-md shadow-2xl group">
      <span class="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
      <span class="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
      <span class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
      <span class="relative">Pulse Effect</span>
    </button>`
    }, {
        html: `<button class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-indigo-500 rounded-full shadow-md group">
      <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-500 group-hover:translate-x-0 ease">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </span>
      <span class="absolute flex items-center justify-center w-full h-full text-indigo-500 transition-all duration-300 transform group-hover:translate-x-full ease">Shiny Button</span>
      <span class="relative invisible">Shiny Button</span>
    </button>`
    },
    {
        html: `<button class="px-6 py-3 text-lg font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
      Neumorphic
    </button>`
    },
    {
        html: `<button class="relative inline-flex items-center justify-center px-8 py-3 m-2 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group">
      <span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
      <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
        <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
        <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
      </span>
      <span class="relative text-white">Rotating Border</span>
    </button>`
    },
    {
        html: `<button class="relative inline-block px-8 py-3 font-medium group">
      <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
      <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
      <span class="relative text-black group-hover:text-white">Perspective Tilt</span>
    </button>`
    },
    {
        html: `<button class="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-md group">
      <span class="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-indigo-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
      <span class="absolute inset-0 w-full h-full bg-white rounded-md "></span>
      <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-indigo-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
      <span class="relative text-indigo-600 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">Glitch Effect</span>
    </button>`
    },
    {
        html: `<button class="relative px-10 py-3 font-medium text-white transition duration-300 bg-indigo-600 rounded-md hover:bg-indigo-500 ease">
      <span class="absolute bottom-0 left-0 h-full -ml-2">
        <svg viewBox="0 0 487 487" class="w-auto h-full opacity-100 object-stretch" xmlns="http://www.w3.org/2000/svg"><path d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" fill="#FFF" fill-opacity=".1"/></svg>
      </span>
      <span class="absolute top-0 right-0 w-12 h-full -mr-3">
        <svg viewBox="0 0 487 487" class="object-cover w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" fill="#FFF" fill-opacity=".1"/></svg>
      </span>
      <span class="relative">Smoke Effect</span>
    </button>`
    },
    {
        html: `<button class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" role="button">
      <span class="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-gray-600 rounded-xl"></span>
      <span class="absolute inset-0 w-full h-full bg-white rounded-xl"></span>
      <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-gray-900 rounded-xl"></span>
      <span class="relative text-base font-bold tracking-wider uppercase">Cyberpunk</span>
    </button>`
    },
    {
        html: `<button class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
      <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
      <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Liquid Effect</span>
    </button>`
    },

    {
        html: `<button class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
      <div class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
      <span class="relative text-black group-hover:text-white">Polaroid</span>
    </button>`
    },
    {
        html: `<button class="relative px-6 py-3 font-bold text-white rounded-lg group">
      <span class="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
      <span class="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
      <span class="relative">Origami</span>
    </button>`
    },

    {
        html: `<button class="relative px-10 py-3 font-medium text-white group">
      <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
      <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
      <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
      <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
      <span class="relative">Brushstroke</span>
    </button>`
    },

    {
        html: `<button class="relative px-10 py-3 font-medium text-white transition duration-300 ease-out group">
      <span class="absolute inset-0 w-full h-full rounded-lg transform -skew-x-6 bg-gradient-to-br from-blue-400 to-purple-500 group-hover:skew-x-6"></span>
      <span class="absolute inset-0 w-full h-full rounded-lg transform skew-x-6 bg-gradient-to-br from-purple-500 to-blue-400 group-hover:-skew-x-6"></span>
      <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
      <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-blue-400 -rotate-12"></span>
      <span class="relative">Watercolor</span>
    </button>`
    },
    {
        html: `<button class="relative px-10 py-3 font-medium text-white transition duration-300 ease-out group">
      <span class="absolute inset-0 w-full h-full rounded-lg opacity-50 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></span>
      <span class="absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-70 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 group-hover:opacity-100 group-hover:rotate-180"></span>
      <span class="absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 group-hover:opacity-0"></span>
      <span class="relative">Aurora</span>
    </button>`
    },
    {
        html: `<button class="group relative w-48 h-16 overflow-hidden rounded-lg bg-white shadow-md">
      <div class="absolute inset-0 w-full h-full transition duration-300 ease-out transform rotate-0 bg-white group-hover:rotate-180"></div>
      <div class="absolute inset-0 w-full h-full transition duration-300 ease-out transform -rotate-180 bg-purple-600 group-hover:rotate-0"></div>
      <div class="relative text-purple-600 transition duration-300 group-hover:text-white">
        <p class="font-semibold">3D Rotate</p>
      </div>
    </button>`
    },
    {
        html: `<button class="relative px-8 py-4 rounded-xl bg-white text-black font-bold text-lg shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-100 ease-linear hover:translate-y-1 hover:shadow-[0_10px_25px_rgba(8,_112,_184,_0.6)] active:translate-y-2 active:shadow-[0_5px_12px_rgba(8,_112,_184,_0.5)]">
      3D Push
    </button>`
    },
    {
        html: `<button class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
      <div class="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
      <div class="absolute inset-0 w-full h-full bg-gradient-to-t from-green-300 to-green-500 opacity-0 transition-all duration-[250ms] ease-out group-hover:opacity-100"></div>
      <span class="relative text-black group-hover:text-white">3D Layered</span>
    </button>`
    },

    {
        html: `<button class="relative inline-block px-8 py-3 text-black transition bg-white border border-current group">
      <span class="absolute inset-y-0 left-0 w-0 bg-black transition-all group-hover:w-full"></span>
      <span class="relative text-black transition-colors group-hover:text-white">Expanding Border</span>
    </button>`
    },



];

const ButtonsPage = () => {
    const [copiedButton, setCopiedButton] = useState('');

    const copyToClipboard = (text: any, index: any) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedButton(`Button ${index + 1}`);
            setTimeout(() => setCopiedButton(''), 2000);
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Awesome Tailwind Buttons</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {buttons.map((button, index) => (
                    <div key={index} className="border rounded-lg p-4 flex flex-col items-center justify-center h-40">
                        <div
                            className="cursor-pointer"
                            onClick={() => copyToClipboard(button.html, index)}
                            dangerouslySetInnerHTML={{ __html: button.html }}
                        />
                    </div>
                ))}
            </div>

            {copiedButton && (
                <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-lg" role="alert">
                    <span className="block sm:inline">Copied {copiedButton} code to clipboard!</span>
                </div>
            )}
        </div>
    );
};

export default ButtonsPage;