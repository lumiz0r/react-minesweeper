import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Timer({ gameStarted }) {
    const [time, setTime] = useState(0);

    useEffect(() => {
      if (gameStarted) {
        const timer = setInterval(() => {
          setTime((time) => time + 1);
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [gameStarted]);
    return (
        <div>Time: {time}</div>
    );
  }
  
  export default Timer