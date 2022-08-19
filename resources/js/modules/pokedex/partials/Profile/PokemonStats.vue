<template>
  <div class="stats">
    <div
      v-for="(statValue, statKey) in stats"
      :key="`${statKey}-${statValue}`"
      class="stats-item"
    >
      <h6 class="stats-item__label">{{ getStatName(statKey) }}</h6>

      <div class="stats-item__bar stats-item-bar">
        <div
          class="stats-item-bar__content"
          :class="`pokemon-color__background--${mainPokemonType}`"
          :style="{ width: `${getStatPercent(statValue)}%` }"
          />
      </div>
    </div>
  </div>
</template>

<script>
const MAX_POWER = 160;

export default {
  name: 'pokemon-stats',
  props: {
    mainPokemonType: {
      type: String,
      required: true
    },
    stats: {
      type: Object
    }
  },
  methods: {
    getStatName(key) {
      const mapStats = {
        "hp": "HP",
        "attack": "ATK",
        "defense": "DEF",
        "special-attack": "SpP",
        "special-defense": "SpD",
        "speed": "SPD"
      }

      return mapStats[key] || key
    },
    getStatPercent(value) {
      return (100*value)/MAX_POWER
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/sass/_flex.scss";
@import "@/sass/_fonts.scss";
@import "@/sass/_colors.scss";

.stats {
  @extend .flex-column;
  gap: 17px;

  &-item {
    @extend .flex;
    gap: 15px;

    &__label {
      min-width: 50px;
      @extend .fm-text-color-1;
      @extend .fm-font-size-25;
      @extend .fm-font-weight-bold;
      @extend .fm-font-align-end;
    }

    &__bar {
      flex-grow: 1;
    }
  }


  &-item-bar {
    height: 20px;
    background: #c4c4c4;

    &, &__content {
      border-radius: 10px;
    }

    &__content {
      height: 100%;
    }
  }
}
</style>
