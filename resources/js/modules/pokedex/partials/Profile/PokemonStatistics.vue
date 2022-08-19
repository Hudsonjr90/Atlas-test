<template>
  <div class="statistics">
    <pokemon-statistics-card
      title="Descrição"
      :main-pokemon-type="mainPokemonType"
    >
      <h4 class="statistics__description">{{currentDescription}}</h4>

      <div class="statistics__types">
        <div
          v-for="type in types"
          :key="type"
          class="statistics-types-item"
        >
          <img
            class="statistics-types-item__symbol"
            :src="`/images/pokemon-types/${type}.png`"
          />
          <h5 class="statistics-types-item__text" >
            {{ type }}
          </h5>
        </div>
      </div>
    </pokemon-statistics-card>

    <pokemon-statistics-card
      title="Estatistica"
      :main-pokemon-type="mainPokemonType"
    >
      <pokemon-stats
        class="statistics__stats"
        :stats="stats"
        :main-pokemon-type="mainPokemonType"
      />
    </pokemon-statistics-card>
  </div>
</template>

<script>
import PokemonStats from './PokemonStats.vue'
import PokemonStatisticsCard from './PokemonStatisticsCard.vue'

export default {
  name: 'pokemon-statistics',
  components: {
    PokemonStats,
    PokemonStatisticsCard
  },
  props: {
    descriptions: {
      type: Array,
      default: () => []
    },
    types: {
      type: Array,
      default: () => []
    },
    stats: {
      type: Object
    }
  },
  computed: {
    mainPokemonType() {
      const [mainType] = this.types

      return mainType || 'no-defined'
    },
    currentDescription() {
      const randomDescription = Math.floor(Math.random() * this.descriptions.length);

      return this.descriptions[randomDescription]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/sass/_flex.scss";
@import "@/sass/_fonts.scss";
@import "@/sass/_colors.scss";
@import "@/sass/_mixins.scss";

$transitionDuration: 2s;

.statistics {
  width: 100%;
  height: 100%;
  @extend .flex-column;
  @extend .flex-space-between;

  @extend .fm-background-3;
  box-shadow: 0px 0px 10px map-get($colors, 2);
  border-radius: 4px;

  &__description {
    @extend .fm-text-color-1;
    @extend .fm-font-size-14;
    @extend .fm-font-weight-regular;
    @extend .fm-font-align-center;
    margin-top: 20px;
    line-height: 15px;
  }

  &__types {
    margin-top: 40px;
    @extend .flex-space-around;
  }

  &-types-item {
    @extend .flex-align-center;
    gap: 10px;

    &__symbol {
      width: 52px;
    }

    &__text {
      text-transform: capitalize;
      @extend .fm-text-color-1;
      @extend .fm-font-size-14;
      @extend .fm-font-weight-regular;
    }
  }

  &__stats {
    padding: 32px 15px 27px;
  }
}
</style>
