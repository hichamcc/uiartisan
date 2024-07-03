"use client";
import React, { useState, useEffect, useRef } from 'react';

const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "Where there's a will, there's a way.",
    "The early bird catches the worm.",
    "Actions speak louder than words.",
    "Beauty is in the eye of the beholder.",
    "Every cloud has a silver lining.",
    "Knowledge is power, but enthusiasm pulls the switch.",
    "Life is what happens when you're busy making other plans.",
    "The pen is mightier than the sword.",
    "When in Rome, do as the Romans do.",
    "Don't count your chickens before they hatch.",
    "A picture is worth a thousand words.",
    "Two wrongs don't make a right.",
    "The apple doesn't fall far from the tree.",
    "Practice makes perfect, but nobody's perfect, so why practice?",
    "Curiosity killed the cat, but satisfaction brought it back.",
    "You can't judge a book by its cover.",
    "When life gives you lemons, make lemonade.",
    "The grass is always greener on the other side of the fence.",
    "A watched pot never boils.",
    "Rome wasn't built in a day.",
    "Better late than never, but never late is better.",
    "Birds of a feather flock together.",
    "You can't have your cake and eat it too.",
    "Fortune favors the bold.",
    "People who live in glass houses shouldn't throw stones.",
    "The best things in life are free."
];

const TypingSpeedGame: React.FC = () => {
    const [currentSentence, setCurrentSentence] = useState('');
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState<number | null>(null);
    const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (gameState === 'ready') {
            setCurrentSentence(sentences[Math.floor(Math.random() * sentences.length)]);
        }
    }, [gameState]);

    const startGame = () => {
        console.log('playing');
        setGameState('playing');
        setStartTime(Date.now());
        setUserInput('');
        setWpm(null);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserInput(value);

        if (value === currentSentence) {
            setEndTime(Date.now());
            console.log(startTime, Date.now());
            setGameState('finished');
            calculateWpm();
        }
    };

    const calculateWpm = () => {
        console.log(startTime, endTime);
        if (startTime && Date.now()) {
            const timeInSeconds = (Date.now() - startTime) / 1000;
            const timeInMinutes = timeInSeconds / 60;
            const wordCount = currentSentence.trim().split(/\s+/).length;
            const calculatedWpm = Math.round(wordCount / timeInMinutes);
            setWpm(calculatedWpm);
        }
    };

    const resetGame = () => {
        setGameState('ready');
        setUserInput('');
        setStartTime(null);
        setEndTime(null);
        setWpm(null);
        setCurrentSentence(sentences[Math.floor(Math.random() * sentences.length)]);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-4">Typing Speed Test</h1>
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                {gameState === 'ready' && (
                    <div className="text-center">
                        <p className="mb-4">Click the button below to start the typing test.</p>
                        <button
                            onClick={startGame}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Start Typing Test
                        </button>
                    </div>
                )}
                {gameState === 'playing' && (
                    <div>
                        <p className="mb-4 text-lg font-semibold">{currentSentence}</p>
                        <input
                            ref={inputRef}
                            type="text"
                            value={userInput}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Start typing here..."
                            autoFocus
                        />
                    </div>
                )}
                {gameState === 'finished' && (
                    <div className="text-center">
                        <p className="mb-4 text-2xl font-bold">
                            Your typing speed: {wpm} WPM
                        </p>
                        <button
                            onClick={resetGame}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TypingSpeedGame;

