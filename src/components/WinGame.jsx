// eslint-disable-next-line no-unused-vars
import React from "react";

import WinEmoji from '../images/WinEmoji.gif';

// eslint-disable-next-line react/prop-types
function WinGame({ resetGame }) {
  return (
    <>
      <h2 className="dark" data-testid="lose-game">You Win!</h2>
      <button className="reset-button"  onClick={resetGame}>Play Again</button>
    </>
  );
}

export default WinGame;