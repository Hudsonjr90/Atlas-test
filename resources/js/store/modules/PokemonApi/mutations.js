export default {
  STORE_POKEMONS(state, pokemons) {
    state.pokemons = [ ...state.pokemons, ...pokemons];
  },
  STORE_SPECIFIC_POKEMONS(state, { id, ...pokemonData }) {
    let pokemon = state.pokemons.find(pokemon => pokemon.id === id);

    if (!pokemon) {
      pokemon = { id, ...pokemonData };
      state.pokemons.push(pokemon)
    }

    pokemon.types = pokemonData.types;
  },
  STORE_POKEMON_TYPES(state, pokemonsTypes) {
    state.types = pokemonsTypes;
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
};
