import { useState } from "react";
import "./App.css";

function App() {
  const initialBoard = () => Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard());
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([initialBoard()]);
  const [gameStatus, setGameStatus] = useState("in progress");
  const [moveNumber, setMoveNumber] = useState(0);

  const calculateWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || gameStatus !== "in progress") return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    
    setBoard(newBoard);
    
    const newHistory = history.slice(0, moveNumber + 1).concat([newBoard]);
    setHistory(newHistory);
    setMoveNumber(moveNumber + 1);
    
    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameStatus("winner");
    } else if (!newBoard.includes(null)) {
      setGameStatus("draw");
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const jumpTo = (move) => {
    setMoveNumber(move);
    setBoard(history[move]);
    setXIsNext(move % 2 === 0);
    setGameStatus("in progress");
  };

  const resetGame = () => {
    setBoard(initialBoard());
    setHistory([initialBoard()]);
    setXIsNext(true);
    setGameStatus("in progress");
    setMoveNumber(0);
  };

  let statusMessage;
  if (gameStatus === "winner") {
    statusMessage = `Winner: ${xIsNext ? "X" : "O"}`;
  } else if (gameStatus === "draw") {
    statusMessage = "Game ended in a draw";
  } else {
    statusMessage = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="main-container">
      <h1>Tic-Tac-Toe</h1>
      <h2>{statusMessage}</h2>
      
      <div className="tic-tac-block">
        <div className="container">
          {board.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="block"
            >
              {value}
            </div>
          ))}
        </div>
        
        <div className="history-buttons">
          <h3>Game History</h3>
          {history.map((_, index) => (
            <button 
              key={index} 
              onClick={() => jumpTo(index)}
              disabled={index === moveNumber}
              className={index === moveNumber ? "active-move" : ""}
            >
              {index === 0 
                ? "Game Start" 
                : `Move #${index}: ${index % 2 === 0 ? "O" : "X"}`}
            </button>
          ))}
        </div>
      </div>
      
      <button onClick={resetGame} className="reset-button">Reset Game</button>
    </div>
  );
}

export default App;