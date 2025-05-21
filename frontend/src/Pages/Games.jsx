import React, { useState } from 'react';
import TicTacToe from '../components/core/Dashboard/Games/TicTacToe';
import MemoryGame from '../components/core/Dashboard/Games/MemoryGame';
import Snake from '../components/core/Dashboard/Games/Snake';
import memoryGameImg from '../assets/Games/Memory.jpg'
import snakeGameImg from '../assets/Games/Snake.jpg'
import ticGameImg from '../assets/Games/Tic.jpg'
const Games = () => {   
    const [activeGame, setActiveGame] = useState(null);
    const games = [
        {
            id: 1,
            name: 'Memory Match',
            description: 'Make pairs of cards to test your memory',
            image: memoryGameImg,
            component: <MemoryGame onBackToMenu={() => setActiveGame(null)} />
        },
        {
            id: 2,
            name: 'Tic Tac Toe',
            description: 'X and O game against the computer',
            image: ticGameImg,
            component: <TicTacToe onBackToMenu={() => setActiveGame(null)} />
        },
        {
            id: 3,
            name: 'Snake',
            description: 'Guide the snake to eat food and grow',
            image: snakeGameImg,
            component: <Snake onBackToMenu={() => setActiveGame(null)} />
        },
    ];

    const handleGameSelect = (gameId) => {
        setActiveGame(gameId);
    };

    const handleBackToGames = () => {
        setActiveGame(null);
    };

    return (
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <h1 className='mb-14 text-3xl font-medium dark:text-dark-richblack-5 text-light-richblack-5'>
                Games
            </h1>

            {activeGame ? (
                <div>
                    <button
                        onClick={handleBackToGames}
                        className="mb-6 px-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
                    >
                        ← Back to Games
                    </button>
                    {games.find(game => game.id === activeGame)?.component}
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className='bg-light-richblack-900 hover:scale-105 dark:bg-dark-richblack-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-richblack-700'
                        >
                            <div className='w-full h-48 bg-gray-100 dark:bg-dark-richblack-900 flex items-center justify-center'>
                                <img
                                    src={game.image}
                                    alt={game.name}
                                    className='w-full h-full'
                                />
                            </div>
                            <div className='p-5'>
                                <h2 className='text-xl font-semibold dark:text-dark-richblack-5 text-light-richblack-5 mb-2'>
                                    {game.name}
                                </h2>
                                <p className='text-sm dark:text-dark-richblack-200 text-light-richblack-600 mb-4'>
                                    {game.description}
                                </p>
                                <button
                                    className='w-full py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors duration-200'
                                    onClick={() => handleGameSelect(game.id)}
                                >
                                    Play Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Games;