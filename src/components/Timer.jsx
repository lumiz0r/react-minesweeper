import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Timer({ gameStarted, resetCounter, gameOver }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    setTime(0);
  }, [resetCounter]);  

  return <div>Time: {time}</div>;
}
  
export default Timer