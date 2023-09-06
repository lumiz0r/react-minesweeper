import { useState } from "react";

import PokemonImage from "./PokemonImage";

function PokemonSearch() {
  // Step 3: Define state and a function to update it
  const [pokemonName, setEnteredNumber] = useState("");

  const handleInputChange = (e) => {
    setEnteredNumber(e.target.value);
  };

  const handleSetNumber = () => {
    setEnteredNumber(pokemonName);
  };

  return (
    <div className="">
      <label className="flex justify-start">
        Enter a name:
        <input type="text" value={pokemonName} onChange={handleInputChange} />
      </label>

      <p className="flex justify-start">Name: {pokemonName}</p>

      <button className="flex justify-start inline-block px-2 py-2.5 rounded-lg bg-zinc-700 text-white text-base text-center no-underline" onClick={handleSetNumber}>Set Number</button>

      <PokemonImage name={pokemonName} />
    </div>
  );
}

export default PokemonSearch;
