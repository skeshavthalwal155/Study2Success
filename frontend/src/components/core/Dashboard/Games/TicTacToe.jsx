import React, { useState, useEffect } from 'react'

const TicTacToe = ({ onBackToMenu }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (winner) {
      setShowCongrats(true);
    }
  }, [winner]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (winner || board[i]) return;

    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setMoves(moves + 1);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (!newBoard.includes(null)) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setMoves(0);
    setShowCongrats(false);
  };

  const renderSquare = (i) => {
    return (
      <button
        className="w-16 h-16 border border-gray-300 text-2xl font-bold flex items-center justify-center dark:text-white hover:bg-gray-100 dark:hover:bg-dark-richblack-700 transition-colors cursor-pointer"
        onClick={() => handleClick(i)}
      >
        {board[i]}
      </button>
    );
  };

  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-dark-richblack-5 text-light-richblack-5">
        Tic-Tac-Toe
      </h2>
      
      {showCongrats && (
        <div className="fixed inset-0 bg-dark-richblack-900/50 dark:bg-dark-richblack-900/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-richblack-800 p-6 rounded-lg max-w-md w-full mx-4 border border-dark-richblack-700 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-dark-caribbeangreen-400">
              {winner === 'Draw' ? 'Game Over!' : 'Congratulations!'}
            </h3>
            <p className="mb-4 dark:text-dark-richblack-100 text-light-richblack-600">
              {winner === 'Draw' 
                ? 'The game ended in a draw!' 
                : `Player ${winner} wins in ${moves} moves!`}
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  resetGame();
                }}
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
        {winner 
          ? (winner === 'Draw' ? 'Game ended in a draw!' : `Winner: ${winner}`)
          : `Next player: ${isXNext ? 'X' : 'O'}`}
        <br />
        Moves: {moves}
      </div>
      
      <div className="grid grid-cols-3 gap-1 w-48 mx-auto mb-6">
        {Array(9).fill(null).map((_, i) => (
          <div key={i}>{renderSquare(i)}</div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 cursor-pointer"
        >
          Reset Game
        </button>
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

export default TicTacToe;