import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Timer({ gameStarted, resetCounter, gameOver, gameWin }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (gameStarted && !gameOver && !gameWin) {
      const timer = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver, gameWin]);

  useEffect(() => {
    setTime(0);
  }, [resetCounter]);  

  return <div>Time: {time}</div>;
}
  
export default Timer