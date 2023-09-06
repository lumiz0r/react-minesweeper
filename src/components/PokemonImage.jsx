/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function PokemonImage({ name }) {
  // Step 3: Define state and a function to update it
  const [pokemonId, setId] = useState();

  useEffect(() => {
    fetch(`pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(data => setId(data.pokemonId))
  }, [name]);

  return (
    <div className="">
      {pokemonId && <p>{pokemonId}</p>}
      {/* <img alt="Pokemon Image" src={imageUrl}></img> */}
    </div>
  );
}

export default PokemonImage;
