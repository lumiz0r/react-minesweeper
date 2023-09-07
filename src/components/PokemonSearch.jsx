import { useState } from "react";
import PokemonImage from "./PokemonImage";

function PokemonSearch() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);

  const handleInputChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleSetNumber = () => {
    setPokemonData(pokemonName);
  };

  return (
    <div className="">
      <label className="flex justify-start">
        Enter Pokémon name or Id:
        <input
          type="text"
          className="ml-2"
          value={pokemonName}
          onChange={handleInputChange}
        />
      </label>

      <button
        className="flex justify-start inline-block px-4 py-2 rounded bg-zinc-700 text-white text-base cursor-pointer transition duration-300 ease-in-out hover:bg-zinc-900"
        onClick={handleSetNumber}
      >
        Search
      </button>

      <PokemonImage name={pokemonData} />
    </div>
  );
}

export default PokemonSearch;
