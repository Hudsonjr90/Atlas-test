<template>
  <section class="pokedex-list">
    <div class="pokedex-list__inputs-wrapper">
      <fm-input
        class="pokedex-list__input"
        placeholder="Search"
        icon="magnifier"
        type="text"
        v-model="filters.search"
      />

      <fm-select
        class="pokedex-list__input"
        placeholder="Show All"
        icon="chevron-down"
        type="number"
        v-model="filters.type"
        :options="types"
      />
    </div>

    <div class="pokedex-list__pokemons-list">
      <pokemon-card
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        :identifier="pokemon.id"
        :name="pokemon.name"
        :image="pokemon.image"
        :types="pokemon.types"
      />
    </div>

      <img
        v-show="loading"
        class="pokedex-list__loading-pokeball"
        src="/images/loading-pokeball.gif"
        alt="Loading Pokeball"
      />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import FmInput from '/components/atoms/FmInput.vue'
import FmSelect from '/components/atoms/FmSelect.vue'
import PokemonCard from '/partials/List/PokemonCard.vue'

export default {
  name: 'pokedex-list',
  components: {
    FmInput,
    FmSelect,
    PokemonCard
  },
  data() {
    return {
      filters: {
        search: null,
        type: null
      }
    }
  },
  computed: {
    ...mapState('PokemonApi', ['pokemons', 'types', 'loading']),
    filteredPokemons() {
      if (!this.pokemons) {
        return null
      }

      let filteredPokemons = [...this.pokemons]

      if (this.filters.search) {
        filteredPokemons = filteredPokemons.filter(({ name }) => {
          return name.includes(this.filters.search)
        })
      }

      if (this.filters.type) {
        filteredPokemons = filteredPokemons.filter(({ types }) => {
          return types.includes(this.filters.type)
        })
      }

      return filteredPokemons
    }
  },
  methods: {
    getPokemons(seccondLoad = false) {
      this.$store.dispatch('PokemonApi/loadPokemonData', { seccondLoad })
    },
    getPokemonTypes() {
      this.$store.dispatch('PokemonApi/loadPokemonTypes')
    },
    startEndScrollListener() {
      window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          this.getPokemons(true)
        }
      })
    }
  },
  mounted() {
    this.getPokemons()
    this.getPokemonTypes()
    this.startEndScrollListener()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../sass";
@import "@/sass/_mixins.scss";

.pokedex-list {
  @extend .flex-column;

  gap: 30px;
  margin-bottom: 20px;
  @include media('tablet', 'min') {
    gap: 20px;
    margin-bottom: 93px;
  }

  &__input {
    @include media('tablet', 'min') {
      width: 200px;
    }
  }

  &__inputs-wrapper {
    margin-top: 23px;

    gap: 17px;
    display: flex;
    flex-direction: column;

    @include media('tablet', 'min') {
      margin-top: 30px;

      gap: 21px;
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  &__pokemons-list {
    display: grid;
    gap: 15px;

    @include media('tablet', 'min') {
      grid-template-columns: repeat(3,1fr);
      gap: 20px;
    }

    @include media('tablet', '>') {
      grid-template-columns: repeat(4,1fr);
      gap: 20px;
    }
  }

  &__loading-pokeball {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 80px;
    z-index: 5;
  }
}
</style>
