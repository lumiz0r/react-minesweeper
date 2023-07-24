import { useState } from "react";
import Cell from "./Cell";
import Timer from "./Timer";

const INITIAL_BOMBS = 10;

function Board() {
  const [board, setBoard] = useState(generateBoard());
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  function generateBoard() {
    let board = Array.from({ length: 10 }, () => Array(10).fill(false));
    for (let i = 0; i < INITIAL_BOMBS; i++) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      board[row][col] = "B";
    }
    return board;
  }

  const calculateAdjacentBombs = (i, j) => {
    let count = 0;
    for (let x = Math.max(i - 1, 0); x <= Math.min(i + 1, 9); x++) {
      for (let y = Math.max(j - 1, 0); y <= Math.min(j + 1, 9); y++) {
        if (board[x][y] === 'B') count++;
      }
    }
    return count;
  };
  
  const handleClick = (i, j) => {
    
    if (gameOver) {
      return;
    }
    
    if (board[(i, j)] === true) {
      return;
    }

    const newBoard = [...board];
    if (newBoard[i][j] === "B") {
      revealBombs();
      setGameStarted(false);
      //   reset
      //   setBoard(generateBoard());
    } else {
      newBoard[i][j] = calculateAdjacentBombs(i, j);
      setBoard(newBoard);
    }

    // Use Effect
    if (!gameStarted) {
      setGameStarted(true);
    }
  };

  const revealBombs = () => {
    let newBoard = board.map((row) =>
      row.map((cell) => (cell === "B" ? "B_clicked" : true))
    );
    setBoard(newBoard);
    setGameOver(true);
  };
  
  return (
    <div className="board">
      <Timer gameStarted={gameStarted}/>
      {board.map((row, i) => (
        <div key={i} className="row">
          {row.map((isClicked, j) => (
            <Cell
              key={`${i}-${j}`}
              onClick={() => handleClick(i, j)}
              value={board[i][j]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;