import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function PokemonImage({ name }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    if (name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Pokemon not found");
          }
          return res.json();
        })
        .then((data) => setPokemonData(data))
        .catch((error) => {
          console.error(error.message);
          setPokemonData(null);
        });
    }
  }, [name]);

  return (
    <div className="">
      {pokemonData ? (
        <div className="">
          <img className="w-32 float-left"
            alt={`Pokemon ${pokemonData.name}`}
            src={pokemonData.sprites.front_default}
          />
          <p className="flex justify-start"> Id: {pokemonData.id}</p>
        </div>
      ) : (
        <p className="flex justify-start">Pokémon not found</p>
      )}
    </div>
  );
}

export default PokemonImage;