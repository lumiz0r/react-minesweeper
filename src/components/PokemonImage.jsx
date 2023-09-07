import { useEffect, useState } from "react";
import PokeAnimeId from "./PokeAnimeId";

// eslint-disable-next-line react/prop-types
function PokemonImage({ name }) {
  const [pokemonData, setPokemonData] = useState("");

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
    <div>
      {pokemonData ? (
        <div className="">
          <img className="w-32 float-left"
            alt={`Pokemon ${pokemonData.name}`}
            src={pokemonData.sprites.front_default}
          />
          <p className="flex justify-start font-bold mb-5 mr-96 inline-block px-6 py-2.5 border-none text-white text-base text-center no-underline"> Id: {pokemonData.id}</p>
        </div>
      ) : (
        <p className="flex justify-start">Pokémon not found</p>
      )}
            <PokeAnimeId pokemonId={pokemonData.id} />
    </div>
    
  );
}

export default PokemonImage;