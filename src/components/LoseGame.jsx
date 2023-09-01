// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
function LoseGame({ resetGame }) {
  return (
    <>
      <h2 className="inline-block px-5 py-2.5 border-none bg-zinc-700 text-white text-base text-center no-underline" data-testid="lose-game">
        Game Over
      </h2>
      <button className="inline-block px-5 py-2.5 border-none bg-zinc-600 text-white text-base text-center no-underline rounded-md mt-5 mb-5 hover:bg-zinc-900" onClick={resetGame}>
        Try Again
      </button>
    </>
  );
}

export default LoseGame;
