import { useState } from "react";
import Cell from "./Cell";
import Timer from "./Timer";
import { generateBoard, checkWin } from "../logic/minesweeperLogic";
import LoseGame from "./LoseGame";
import Reset from '../images/Reset.gif';

const INITIAL_BOMBS = 15;

function Board() {
  const [board, setBoard] = useState(generateBoard(INITIAL_BOMBS));
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [flagged, setFlagged] = useState({});
  const [resetCounter, setResetCounter] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const calculateAdjacentBombs = (i, j) => {
    let count = 0;
    for (let x = Math.max(i - 1, 0); x <= Math.min(i + 1, 9); x++) {
      for (let y = Math.max(j - 1, 0); y <= Math.min(j + 1, 9); y++) {
        if (board[x][y] === "B") count++;
      }
    }
    return count;
  };

  const cascadeReveal = (board, row, col) => {
    // Check if the cell is out of bounds or already revealed (number or bomb)
    if (
      row < 0 ||
      row >= board.length ||
      col < 0 ||
      col >= board[0].length ||
      typeof board[row][col] === "number" ||
      board[row][col] === "B_clicked" ||
      board[row][col] === true
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

    // Update the board state
    setBoard([...board]);
  };

  const resetGame = () => {
    setBoard(generateBoard(INITIAL_BOMBS));
    setGameStarted(false);
    setGameOver(false);
    setFlagged({});
    setResetCounter((prev) => prev + 1);
    setGameWon(false);
  };

  const handleClick = (i, j) => {
    const bombCounter = calculateAdjacentBombs(i, j);
    const isFlagged = flagged[`${i}-${j}`];
    const newBoard = [...board];

    if (isFlagged || gameOver || board[i][j] === true) {
      return;
    }

    if (newBoard[i][j] === "B") {
      revealBombs();
      setGameStarted(false);
    } else if (bombCounter === 0) {
      cascadeReveal(newBoard, i, j);
    } else {
      newBoard[i][j] = calculateAdjacentBombs(i, j);
      setBoard(newBoard);
    }

    if (!gameStarted) {
      setGameStarted(true);
    }

    if (checkWin(board)) {
      revealAllBombs();
      setGameWon(true);
    }
  };

  const handleRightClick = (event, i, j) => {
    event.preventDefault();

    const isClicked =
      typeof board[i][j] === "number" || board[i][j] === "B_clicked";

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

  const revealAllBombs = () => {
    let newFlaggedState = {};
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === "B") {
          newFlaggedState[`${i}-${j}`] = true;
        }
      });
    });

    setFlagged(newFlaggedState);
  };

  return (
    <div className="board">
      <button onClick={resetGame}>
        <img src={Reset} className="reset"/>
      </button>
      <Timer
        gameStarted={gameStarted}
        resetCounter={resetCounter}
        gameOver={gameOver}
        gameWin={gameWon}
      />
      {gameOver && <LoseGame resetGame={resetGame} />}
      {gameWon && (
        <div className="win-game">
          <h2>Congratulations, you won!</h2>
        </div>
      )}
      {board.map((row, i) => (
        <div key={i} className="row">
          {row.map((_, j) => (
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
