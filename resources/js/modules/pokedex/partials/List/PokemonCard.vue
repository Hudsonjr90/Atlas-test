<template>
  <a
    class="card"
    :href="`/list/${identifier}`"
  >
    <div class="card__image">
      <img :src="image" :alt="name" />
    </div>

    <div
      class="card__container"
      :class="`pokemon-color__background--${mainPokemonType}`"
    >
      <div class="card__header">
        <span class="card__identifier">{{ identifier | idNormalizer }}</span>
      </div>

      <div class="info">
        <div class="info__container">
          <div class="info__wrapper">
            <div class="info__pokemon-types">
              <img
                v-for="type in types"
                :key="type"
                :alt="`Pokemon type:${type}`"
                class="info__pokemon-types-item"
                :class="`info__pokemon-types-item--${type}`"
                :src="`/images/pokemon-types/${type}.png`"
              />
            </div>

            <div class="info__pokemon-name">
              <h4
                class="info__pokemon-name-text"
                :class="`pokemon-color__text--${mainPokemonType}`"
              >{{ name }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'pokemon-card',
  props: {
    identifier: {
      type: [String, Number],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    types: {
      type: Array,
      default: () => []
    },
    image: {
      type: String
    }
  },
  computed: {
    mainPokemonType() {
      const [mainType] = this.types

      return mainType || 'no-defined'
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

.card {
  position: relative;
  @extend .flex-column;

  @include media('tablet', 'min') {
    width: 20rem;
  }

  &__image {
    @extend .flex;

    position: absolute;
    right: 0;

    @include media('tablet', 'min') {
      position: initial;
      margin-bottom: -4rem;

      justify-content: center;
    }

    img {
      width: 10rem;
      height: 10rem;

      z-index: 2;
    }
  }

  &__container {
    border-radius: 8px;
    padding-bottom: 10px;
    transition: background-color $transitionDuration ease;

    .card__header {
      height: 2.5rem;

      @extend .flex;
      justify-content: flex-start;
      align-items: flex-start;

      @include media('tablet', 'min') {
        justify-content: flex-end;
        align-items: flex-end;
      }
    }

    .card__identifier {
      @extend .fm-text-color-1;
      @extend .fm-font-size-16;
      @extend .fm-font-weight-regular;

      margin: 3px 0 0 10px;

      @include media('tablet', 'min') {
        margin: 0 5px 2px 0;
      }
    }
  }

  .info {
    @extend .fm-background-1;

    @include media('mobile', 'max') {
      padding-right: 10rem;
    }

    &__container {
      padding: 10px;
    }

    &__wrapper {
      position: relative;
      height: 4.5rem;
      @extend .flex;
      flex-direction: row-reverse;
    }

    &__pokemon-types {
      @include media('tablet', 'min') {
        position: absolute;
        left: 0;
      }

      height: 100%;
      @extend .flex-column;
      @extend .flex-center;
      gap: 7px;

      &-item {
        height: 18px;
        @extend .flex-center-center;
      }
    }

    &__pokemon-name {
      flex-grow: 1;
      @extend .flex-align-center;

      @include media('tablet', 'min') {
        justify-content: center;
      }

      &-text {
        height: 100%;
        @extend .flex-align-center;
        @extend .fm-font-size-18;
        @extend .fm-font-weight-regular;
        transition: color $transitionDuration ease;

        @include media('tablet', 'min') {
          padding: 0 20px;
          text-align: center;
        }
      }
    }
  }
}
</style>
