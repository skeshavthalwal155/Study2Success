import React, { useEffect, useState, useRef } from 'react';

const Snake = ({ onBackToMenu }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const gameBoardRef = useRef(null);

  const gridSize = 20;
  const cellSize = 20;

  // Handle keyboard controls
  useEffect(() => {
    if (!isPlaying) return;
    
    const handleKeyPress = (e) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 's':
        case 'arrowdown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'a':
        case 'arrowleft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'd':
        case 'arrowright':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPlaying]);

  // Handle touch controls
  useEffect(() => {
    if (!isPlaying) return;

    const handleTouchStart = (e) => {
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    };

    const handleTouchMove = (e) => {
      setTouchEnd({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const xDiff = touchEnd.x - touchStart.x;
      const yDiff = touchEnd.y - touchStart.y;
      
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // Horizontal swipe
        if (xDiff > 0 && direction !== 'LEFT') {
          setDirection('RIGHT');
        } else if (xDiff < 0 && direction !== 'RIGHT') {
          setDirection('LEFT');
        }
      } else {
        // Vertical swipe
        if (yDiff > 0 && direction !== 'UP') {
          setDirection('DOWN');
        } else if (yDiff < 0 && direction !== 'DOWN') {
          setDirection('UP');
        }
      }
      
      setTouchStart(null);
      setTouchEnd(null);
    };

    const board = gameBoardRef.current;
    if (board) {
      board.addEventListener('touchstart', handleTouchStart);
      board.addEventListener('touchmove', handleTouchMove);
      board.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (board) {
        board.removeEventListener('touchstart', handleTouchStart);
        board.removeEventListener('touchmove', handleTouchMove);
        board.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [touchStart, touchEnd, direction, isPlaying]);

  useEffect(() => {
    if (gameOver) {
      setShowCongrats(true);
      if (score > highScore) {
        setHighScore(score);
      }
    }
  }, [gameOver, score, highScore]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

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

        // Check wall collision
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];
        
        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10);
          generateFood(newSnake);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver, isPlaying]);

  const generateFood = (snake) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    setFood(newFood);
  };

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    generateFood([{ x: 10, y: 10 }]);
    setIsPlaying(true);
    setShowCongrats(false);
  };

  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-dark-richblack-5 text-light-richblack-5">
        Snake Game
      </h2>
      
      {showCongrats && (
        <div className="fixed inset-0 bg-dark-richblack-900/50 dark:bg-dark-richblack-900/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-richblack-800 p-6 rounded-lg max-w-md w-full mx-4 border border-dark-richblack-700 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-dark-caribbeangreen-400">
              Game Over!
            </h3>
            <p className="mb-2 dark:text-dark-richblack-100 text-light-richblack-600">
              Your score: {score}
            </p>
            <p className="mb-4 dark:text-dark-richblack-100 text-light-richblack-600">
              High score: {highScore}
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={startGame}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 cursor-pointer"
              >
                Play Again
              </button>
              <button
                onClick={onBackToMenu}
                className="px-4 py-2 bg-dark-richblack-700 hover:bg-dark-richblack-600 text-white rounded-md transition-colors duration-200 cursor-pointer"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 dark:text-dark-richblack-100 text-light-richblack-600">
        Score: {score} | High Score: {highScore}
      </div>
      
      <div 
        ref={gameBoardRef}
        className="mx-auto mb-6 border-2 border-dark-richblack-700 bg-dark-richblack-900 dark:bg-dark-richblack-900 relative touch-none"
        style={{ 
          width: gridSize * cellSize, 
          height: gridSize * cellSize,
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          touchAction: 'none' // Prevent default touch behaviors like scrolling
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute ${index === 0 ? 'bg-dark-caribbeangreen-400' : 'bg-dark-caribbeangreen-200'} rounded-sm`}
            style={{
              left: segment.x * cellSize,
              top: segment.y * cellSize,
              width: cellSize,
              height: cellSize,
            }}
          />
        ))}
        <div
          className="absolute bg-dark-pink-400 rounded-full animate-pulse"
          style={{
            left: food.x * cellSize,
            top: food.y * cellSize,
            width: cellSize,
            height: cellSize,
          }}
        />
      </div>
      
      <div className="mb-4 text-sm dark:text-dark-richblack-300 text-light-richblack-600">
        Controls: {window.innerWidth > 768 ? (
          <>W (Up), A (Left), S (Down), D (Right)</>
        ) : (
          <>Swipe on the game board to change direction</>
        )}
      </div>

      {/* Mobile control buttons (only shown on mobile) */}
      {window.innerWidth <= 768 && (
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-6">
          <div></div>
          <button
            onClick={() => direction !== 'DOWN' && setDirection('UP')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-md"
            disabled={!isPlaying || gameOver}
          >
            ↑
          </button>
          <div></div>
          <button
            onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-md"
            disabled={!isPlaying || gameOver}
          >
            ←
          </button>
          <button
            onClick={() => setIsPlaying(prev => !prev)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-md"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-md"
            disabled={!isPlaying || gameOver}
          >
            →
          </button>
          <div></div>
          <button
            onClick={() => direction !== 'UP' && setDirection('DOWN')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-md"
            disabled={!isPlaying || gameOver}
          >
            ↓
          </button>
          <div></div>
        </div>
      )}
      
      <div className="flex justify-center space-x-4">
        {!isPlaying || gameOver ? (
          <button
            onClick={startGame}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 cursor-pointer"
          >
            {gameOver ? 'Try Again' : 'Start Game'}
          </button>
        ) : (
          <button
            onClick={() => setIsPlaying(false)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors duration-200 cursor-pointer"
          >
            Pause Game
          </button>
        )}
        <button
          onClick={onBackToMenu}
          className="px-4 py-2 bg-dark-richblack-700 hover:bg-dark-richblack-600 text-white rounded-md transition-colors duration-200 cursor-pointer"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default Snake;