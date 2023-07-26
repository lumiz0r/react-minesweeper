import SadEmoji from '../images/CryEmoji.gif';

// eslint-disable-next-line react/prop-types
function WinGame({ resetGame }) {
  return (
    <div className="lose-game">
      <h2>You Win!</h2>
      <img src={SadEmoji} className="sad-emoji"/>
      <button className="reset-button" onClick={resetGame}>Try Again</button>
    </div>
  );
}

export default WinGame;