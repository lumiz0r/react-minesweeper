// PokeDadJoke.js
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function PokeAnimeId({ pokemonId }) {
  const [animeName, setAnimeName] = useState("");

  useEffect(() => {
    if (pokemonId) {
      console.log(pokemonId)
      // Fetch anime data using the Pokemon ID
      fetch(`https://api.jikan.moe/v4/anime/${pokemonId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Anime not found");
          }
          return response.json();
        })
        .then((data) => {
          setAnimeName(data.data.title);
          console.log(data.data.title)
        })
        .catch((error) => {
          console.error(error.message);
          setAnimeName("Error fetching anime data.");
        });
    }
  }, [pokemonId]);

  return (
    <div className="">
      <h2>Anime for Pokemon ID {pokemonId}:</h2>
      <p>{animeName}</p>
    </div>
  );
}

export default PokeAnimeId;
