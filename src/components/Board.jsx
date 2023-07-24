import { useState } from "react";
import Cell from "./Cell";
import Timer from "./Timer";

const INITIAL_BOMBS = 10;

function Board() {
  const [board, setBoard] = useState(generateBoard());
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [flagged, setFlagged] = useState({});

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
        if (board[x][y] === "B") count++;
      }
    }
    return count;
  };

  const handleClick = (i, j) => {
    const bombCounter = calculateAdjacentBombs(i, j)

    const isFlagged = flagged[`${i}-${j}`];
    if (isFlagged) {
      return;
    }

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
    } else if (bombCounter === 0) {
      cascadeReveal(newBoard, i, j);
    } else {
      newBoard[i][j] = calculateAdjacentBombs(i, j);
      setBoard(newBoard);
    }

    // Use Effect
    if (!gameStarted) {
      setGameStarted(true);
    }
  };

  const cascadeReveal = (board, row, col) => {
    // Check if the cell is out of bounds or already revealed (number or bomb)
    if (
      row < 0 ||
      row >= board.length ||
      col < 0 ||
      col >= board[0].length ||
      typeof board[row][col] === "number" ||
      board[row][col] === "B_clicked"
    ) {
      return;
    }
  
    // Reveal the cell with its adjacent bombs count
    board[row][col] = calculateAdjacentBombs(row, col);
  
    // If the cell is a 0, recursively reveal its neighbors
    if (board[row][col] === 0) {
      cascadeReveal(board, row - 1, col - 1);
      cascadeReveal(board, row - 1, col);
      cascadeReveal(board, row - 1, col + 1);
      cascadeReveal(board, row, col - 1);
      cascadeReveal(board, row, col + 1);
      cascadeReveal(board, row + 1, col - 1);
      cascadeReveal(board, row + 1, col);
      cascadeReveal(board, row + 1, col + 1);
    }
  };

  const handleRightClick = (event, i, j) => {
    event.preventDefault();

    const isClicked = typeof board[i][j] === "number" || board[i][j] === "B_clicked";
    if (isClicked) {
      return; // If the cell is already clicked, return from the function without flagging it
    }

    setFlagged((prev) => {
      return {
        ...prev,
        [`${i}-${j}`]: !prev[`${i}-${j}`],
      };
    });
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
      <Timer gameStarted={gameStarted} />
      {board.map((row, i) => (
        <div key={i} className="row">
          {row.map((isClicked, j) => (
            <Cell
              key={`${i}-${j}`}
              onClick={() => handleClick(i, j)}
              onContextMenu={(event) => handleRightClick(event, i, j)}
              value={board[i][j]}
              flagged={flagged}
              i={i}
              j={j}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
