// eslint-disable-next-line no-unused-vars
import React from "react";

import WinEmoji from '../images/WinEmoji.gif';

// eslint-disable-next-line react/prop-types
function WinGame({ resetGame }) {
  return (
    <div className="lose-game">
      <h2>You Win!</h2>
      <img src={WinEmoji} className="sad-emoji"/>
      <button className="reset-button" onClick={resetGame}>Play Again</button>
    </div>
  );
}

export default WinGame;