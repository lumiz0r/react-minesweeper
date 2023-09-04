// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Timer({ gameStarted, resetCounter, gameOver, gameWon }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (gameStarted && !gameOver && !gameWon) {
      const timer = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver, gameWon]);

  useEffect(() => {
    setTime(0);
  }, [resetCounter]);

  return (
    <div
      data-testid="timer"
      className="float-left
    font-bold mb-5 mr-96 inline-block px-6 py-2.5 border-none bg-zinc-700 text-white text-base text-center no-underline"
    >
      Time: {time}
    </div>
  );
}

export default Timer;
