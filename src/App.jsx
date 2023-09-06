import "./App.css";
import Board from "./components/Board";
import PokemonSearch from "./components/PokemonSearch";

function App() {
  return (
    <>
      <h1 className="text-4xl font-bold mt-10 mb-10">Minesweeper React 💣</h1>
      <div>
        <PokemonSearch />
        <Board />

      </div>
    </>
  );
}

export default App;
