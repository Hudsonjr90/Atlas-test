<template>
  <div class="statistics-card">
    <h3 class="statistics-card__text">{{ title }}</h3>

    <hr
      class="statistics-card__line"
      :class="`pokemon-color__border--${mainPokemonType}`"
    >

    <div class="statistics-card__container">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'pokemon-statistics-card',
  props: {
    title: {
      type: String,
      required: true
    },
    mainPokemonType: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/sass/_flex.scss";
@import "@/sass/_fonts.scss";
@import "@/sass/_colors.scss";

.statistics-card {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  @extend .flex-column;

  &__text {
    position: relative;
    @extend .fm-text-color-1;
    @extend .fm-font-size-25;
    @extend .fm-font-weight-bold;
    @extend .flex-center-center;
    height: 60px;
  }

  &__container {
    flex-grow: 1;
    @extend .flex-column;
    @extend .flex-space-around;
  }
}
</style>
