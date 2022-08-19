import axios from 'axios'

export default {
  async loadPokemonData({ dispatch, getters, commit, state }, { seccondLoad }) {
    if (state.loading) {
      return
    }
    dispatch('setLoading', true)

    let offset = null
    if (seccondLoad) {
      offset = state.pokemons.length
    }

    const { data } = await axios.get(`${getters.apiUrl}/pokemon`, {
      params: {
        offset,
        limit: 151,
      }
    })

    const mappedPokemons = data.results.map(pokemon => {
      let [pokemonId] = pokemon.url.match(/\d+\/$/g);
      pokemonId = pokemonId.replace("/", "");

      return {
        id: pokemonId,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
        types: []
      };
    });

    commit("STORE_POKEMONS", mappedPokemons);

    setTimeout(() => {
      dispatch("setLoading", false);
    }, 2000)

    mappedPokemons.forEach(pokemon => {
      dispatch('tryGetPokemonData', pokemon)
    });
  },
  async loadPokemonTypes({ getters, commit }) {
    const { data } = await axios.get(`${getters.apiUrl}/type`);

    const mappedTypes = data.results.map(pokemonType => pokemonType.name)
    commit("STORE_POKEMON_TYPES", mappedTypes);
  },
  async tryGetPokemonData({ dispatch }, pokemon) {
    try {
      await dispatch("getPokemonData", pokemon);
    } catch (e) {
      if (!pokemon.tried) {
        console.info('Tring get pokemon again.', pokemon.id);
        return await dispatch("tryGetPokemonData", { ...pokemon, tried: true });
      }

      console.error("Error loading pokemon data.", pokemon.id);
      throw e
    }
  },
  async getPokemonData({ getters, commit }, { id }) {
    const { data } = await axios.get(`${getters.apiUrl}/pokemon/${id}`);

    const pokemonData = {
      id,
      types: data.types.map(pokemonType => pokemonType.type.name)
    };
    commit("STORE_SPECIFIC_POKEMONS", pokemonData);
  },
  async getPokemonStats({ getters, commit }, id) {
    let pokemonData;
    let speciesData;

    try {
      const { data: pokemonDataRequest } = await axios.get(`${getters.apiUrl}/pokemon/${id}`);
      pokemonData = pokemonDataRequest;

      const { data: speciesDataRequest } = await axios.get(`${getters.apiUrl}/pokemon-species/${id}`);
      speciesData = speciesDataRequest;
    } catch(e) {
      console.error(e);
    }

    const stats = pokemonData.stats.reduce((amount, statData) => {
      amount[statData.stat.name] = statData.base_stat

      return amount
    }, {})

    let flavorTexts
    if (speciesData) {
      flavorTexts = speciesData.flavor_text_entries
        .filter(({ language }) => language.name === "en")
        .map(flavorText => flavorText.flavor_text);
    } else {
      flavorTexts = ['?']
    }

    const pokemon = {
      id,
      stats,
      flavorTexts,
      name: pokemonData.name,
      types: pokemonData.types.map(pokemonType => pokemonType.type.name),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.png`,
    };

    return pokemon
  },
  setLoading({ commit }, loading) {
    commit('SET_LOADING', loading)
  }
}
