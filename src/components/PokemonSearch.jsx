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
        <input type="text" className="ml-2" value={pokemonName} onChange={handleInputChange} />
      </label>

      <button
        className="flex justify-start inline-block px-2 py-2 mt-2 mb-2 rounded-lg bg-zinc-700 text-white text-base text-center no-underline"
        onClick={handleSetNumber}
      >
        Search
      </button>

      <PokemonImage name={pokemonData} />
    </div>
  );
}

export default PokemonSearch;