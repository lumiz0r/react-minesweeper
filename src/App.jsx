import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <>
      <h1 className="text-4xl font-bold mt-10 mb-10">Minesweeper React 💣</h1>
      <div>
        <Board />
      </div>
    </>
  );
}

export default App;
