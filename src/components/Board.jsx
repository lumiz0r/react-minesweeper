import { useState, useEffect } from "react";
import { Cell } from "./Cell";

const INITIAL_BOMBS = 10

export const Board = () => {
    const [board, setBoard] = useState(Array(10).fill(Array(10).fill(null)));
    const [time, setTime] = useState(0);
    const [flags, setFlags] = useState(INITIAL_BOMBS);
    // const [bombs, setBombs] = useState(INITIAL_BOMBS);
    const [gameStarted, setGameStarted] = useState(false);
  

    // TIMER
    useEffect(() => {
      if (gameStarted) {
        const timer = setInterval(() => {
          setTime(time => time + 1);
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [gameStarted]);
  

    // CELL CLICK
    const handleCellClick = () => {
      if (!gameStarted) {
        setGameStarted(true);
      }
      // handle cell click logic here
    };
  
    // FLAG CLICK
    // const handleFlagClick = () => {
    //   setFlags(flags => flags - 1);
    //   // handle flag click logic here
    // };
  
    return (
      <div>
        <div>Time: {time}</div>
        <div>Flags: {flags}</div>
        <table>
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <Cell 
                  key={cellIndex} 
                  onClick={handleCellClick}>

                  </Cell>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
