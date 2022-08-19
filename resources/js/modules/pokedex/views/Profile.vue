<template>
  <section class="pokedex-profile">
    <div class="pokedex-profile__showcase">
      <img
        class="pokedex-profile__image"
        :src="pokemon.image"
        :alt="pokemon.name"
      >

      <h1 class="pokedex-profile__name">{{pokemonId | idNormalizer }} {{ pokemon.name }}</h1>

      <profile-background
        class="pokedex-profile__background-decorator"
        :main-pokemon-type="mainPokemonType"
      />
    </div>

    <div class="pokedex-profile__stats">
      <pokemon-statistics
        :types="pokemon.types"
        :stats="pokemon.stats"
        :descriptions="pokemon.flavorTexts"
      />
    </div>
  </section>
</template>

<script>
import PokemonStatistics from "@/js/modules/pokedex/partials/Profile/PokemonStatistics.vue";
import ProfileBackground from "@/js/modules/pokedex/decorators/Profile/ProfileBackground.vue";

export default {
  name: 'pokedex-profile',
  components: {
    PokemonStatistics,
    ProfileBackground,
  },
  props: {
    pokemonId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      pokemon: {}
    }
  },
  computed: {
    mainPokemonType() {
      if (!this.pokemon || !this.pokemon.types) {
        return 'no-defined'
      }

      const [mainType] = this.pokemon.types

      return mainType || 'no-defined'
    },
  },
  methods: {
    async getPokemon() {
      this.pokemon = await this.$store.dispatch('PokemonApi/getPokemonStats', this.pokemonId)
    },
  },
  mounted() {
    this.getPokemon()
    // this.getPokemonTypes()
  }
}
</script>

<style lang="scss" scoped>
@import "@/sass/_flex.scss";
@import "@/sass/_colors.scss";
@import "@/sass/_fonts.scss";
@import "@/sass/_mixins.scss";

.pokedex-profile {
  @extend .flex;

  margin-top: 10px;
  flex-direction: column;
  min-height: 80vh;

  @include media('tablet', 'min') {
    gap: 20px;
    margin-top: 13px;
    flex-direction: row;

    max-width: 860px;
    margin-left: auto;
    margin-right: auto;
  }

  &__showcase {
    @extend .flex-column;
    @extend .flex-center-center;
    gap: 16px;

    position: relative;
    @include media('tablet', 'min') {
      width: 100%;
      position: initial;
    }
  }

  &__image {
    width: 200px;

    @include media('tablet', 'min') {
      width: 362px;
    }
  }

  &__name {
    padding: 9px 0;
    font-size: 30px;
    @extend .flex-center;
    @extend .fm-text-color-1;
    @extend .fm-font-weight-bold;
    @extend .fm-font-align-center;
    text-transform: capitalize;

    @include media('tablet', 'min') {
      font-size: 45px;
    }
  }

  &__stats {
    @include media('tablet', 'min') {
      width: 100%;
      max-width: 420px;
    }
  }

  &__background-decorator {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
    width: 100%;
    height: 233px;
    @include media('tablet', 'min'){
       height: 500px;
       top: inherit;
       bottom: 0;
    }
  }
}
</style>
