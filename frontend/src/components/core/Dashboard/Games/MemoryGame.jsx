import React, { useEffect, useState } from 'react';

const MemoryGame = ({ onBackToMenu }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (solved.length === emojis.length * 2) {
      setGameCompleted(true);
      setShowCongrats(true);
    }
  }, [solved]);

  const initializeGame = () => {
    const pairs = [...emojis, ...emojis];
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    console.log(shuffled)
    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setGameCompleted(false);
    setShowCongrats(false);
  };

  const handleCardClick = (index) => {
    if (gameCompleted || flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setSolved([...solved, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-dark-richblack-5 text-light-richblack-5">
        Memory Game
      </h2>
      
      {showCongrats && (
        <div className="fixed inset-0 bg-dark-richblack-900/50 dark:bg-dark-richblack-900/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-richblack-800 p-6 rounded-lg max-w-md w-full mx-4 border border-dark-richblack-700 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-dark-caribbeangreen-400">
              Congratulations!
            </h3>
            <p className="mb-4 dark:text-dark-richblack-100 text-light-richblack-600">
              You completed the game in {moves} moves!
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  initializeGame();
                  setShowCongrats(false);
                }}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
              >
                Play Again
              </button>
              <button
                onClick={onBackToMenu}
                className="px-4 py-2 bg-dark-richblack-700 hover:bg-dark-richblack-600 text-white rounded-md transition-colors duration-200"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 dark:text-dark-richblack-100 text-light-richblack-600">
        Moves: {moves} | Matched: {solved.length / 2} / {emojis.length}
      </div>
      
      <div className="grid grid-cols-4 gap-3 w-72 mx-auto mb-6">
        {cards.map((emoji, index) => (
          <div
            key={index}
            className={`w-16 h-16 flex items-center justify-center text-2xl cursor-pointer rounded-lg 
              ${flipped.includes(index) || solved.includes(index) ? 
                'bg-white dark:bg-dark-richblack-100' : 
                'bg-blue-500 dark:bg-dark-blue-400'}
              ${solved.includes(index) ? 'opacity-70' : ''}
              transition-all duration-200 shadow-md hover:shadow-lg`}
            onClick={() => handleCardClick(index)}
          >
            {(flipped.includes(index) || solved.includes(index)) ? (
              <span className="text-3xl">{emoji}</span>
            ) : (
              <span className="text-transparent">?</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={initializeGame}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
        >
          Reset Game
        </button>
        <button
          onClick={onBackToMenu}
          className="px-4 py-2 bg-dark-richblack-700 hover:bg-dark-richblack-600 text-white rounded-md transition-colors duration-200"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default MemoryGame;


