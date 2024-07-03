"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = 'RIGHT';

const SnakeGame: React.FC = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState(INITIAL_FOOD);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const moveSnake = useCallback(() => {
        if (gameOver) return;

        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        switch (direction) {
            case 'UP':
                head.y -= 1;
                break;
            case 'DOWN':
                head.y += 1;
                break;
            case 'LEFT':
                head.x -= 1;
                break;
            case 'RIGHT':
                head.x += 1;
                break;
        }

        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            setGameOver(true);
            return;
        }

        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
            setGameOver(true);
            return;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            setScore(prevScore => prevScore + 1);
            generateFood(newSnake);
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    }, [snake, direction, food, gameOver]);

    const generateFood = (currentSnake: { x: number; y: number }[]) => {
        let newFood: any;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
        } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        setFood(newFood);
    };

    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowUp':
                setDirection(prev => prev !== 'DOWN' ? 'UP' : prev);
                break;
            case 'ArrowDown':
                setDirection(prev => prev !== 'UP' ? 'DOWN' : prev);
                break;
            case 'ArrowLeft':
                setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev);
                break;
            case 'ArrowRight':
                setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev);
                break;
        }
    }, []);

    const handleDirectionButton = (newDirection: string) => {
        setDirection(prev => {
            switch (newDirection) {
                case 'UP':
                    return prev !== 'DOWN' ? 'UP' : prev;
                case 'DOWN':
                    return prev !== 'UP' ? 'DOWN' : prev;
                case 'LEFT':
                    return prev !== 'RIGHT' ? 'LEFT' : prev;
                case 'RIGHT':
                    return prev !== 'LEFT' ? 'RIGHT' : prev;
                default:
                    return prev;
            }
        });
    };

    useEffect(() => {
        const intervalId = setInterval(moveSnake, 150);
        return () => clearInterval(intervalId);
    }, [moveSnake]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    const restartGame = () => {
        setSnake(INITIAL_SNAKE);
        setFood(INITIAL_FOOD);
        setDirection(INITIAL_DIRECTION);
        setGameOver(false);
        setScore(0);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-4">Snake Game</h1>
            <div className="mb-4">Score: {score}</div>
            <div
                style={{
                    width: GRID_SIZE * CELL_SIZE,
                    height: GRID_SIZE * CELL_SIZE
                }}
                className="border-2 border-gray-400 relative"
            >
                {snake.map((segment, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: segment.x * CELL_SIZE,
                            top: segment.y * CELL_SIZE,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            backgroundColor: index === 0 ? 'green' : 'lightgreen',
                        }}
                    />
                ))}
                <div
                    style={{
                        position: 'absolute',
                        left: food.x * CELL_SIZE,
                        top: food.y * CELL_SIZE,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        backgroundColor: 'red',
                        borderRadius: '50%',
                    }}
                />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 md:hidden">
                <button onClick={() => handleDirectionButton('UP')} className="col-start-2 bg-blue-500 text-white p-2 rounded">
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 md:hidden">
                <button onClick={() => handleDirectionButton('LEFT')} className="bg-blue-500 text-white p-2 rounded">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button onClick={() => handleDirectionButton('DOWN')} className="bg-blue-500 text-white p-2 rounded">
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
                <button onClick={() => handleDirectionButton('RIGHT')} className="bg-blue-500 text-white p-2 rounded">
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
            {gameOver && (
                <div className="mt-4">
                    <p className="text-xl font-bold mb-2">Game Over!</p>
                    <button
                        onClick={restartGame}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Restart Game
                    </button>
                </div>
            )}
            <div className="mt-4 text-center">
                <p>Use arrow keys or buttons to control the snake</p>
                <p>Eat the red food to grow and increase your score</p>
            </div>
        </div>
    );
};

export default SnakeGame;