import SadEmoji from '../images/CryEmoji.gif';

// eslint-disable-next-line react/prop-types
function LoseGame({ resetGame }) {
  return (
    <div className="lose-game">
      <h2>Game Over</h2>
      <img src={SadEmoji} className="sad-emoji"/>
      <button className="reset-button" onClick={resetGame}>Try Again</button>
    </div>
  );
}

export default LoseGame;
