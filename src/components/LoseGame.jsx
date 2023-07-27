// eslint-disable-next-line no-unused-vars
import React from "react";
import SadEmoji from '../images/CryEmoji.gif';

// eslint-disable-next-line react/prop-types
function LoseGame({ resetGame }) {
  return (
    <div className="lose-game" data-testid="lose-game">
      <h2>Game Over</h2>
      <img src={SadEmoji} className="sad-emoji"/>
      <button className="reset-button" onClick={resetGame}>Try Again</button>
    </div>
  );
}

export default LoseGame;