// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
function WinGame({ resetGame }) {
  return (
    <>
      <h2 className="inline-block px-5 py-2.5 border-none bg-zinc-700 text-white text-base text-center no-underline" data-testid="win-game">
        You Win!
      </h2>
      <button className="inline-block px-5 py-2.5 border-none bg-zinc-600 text-white text-base text-center no-underline rounded-md mt-5 mb-5 hover:bg-zinc-900" onClick={resetGame}>
        Play Again
      </button>
    </>
  );
}

export default WinGame;
