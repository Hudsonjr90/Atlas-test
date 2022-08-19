<template>
  <div class="logo">
    <h2 class="logo__title">PokeAtlas</h2>

    <div class="logo__decorators-wrapper">
      <div class="logo__line" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'fm-menu-logo'
}
</script>

<style lang="scss" scoped>
@import "@/sass/_flex.scss";
@import "@/sass/_colors.scss";
@import "@/sass/_fonts.scss";
@import "@/sass/_mixins.scss";

.logo {
  @extend .flex-space-between;
  gap: 19px;

  &__title {
    @extend .fm-text-color-1;
    @extend .fm-font-size-20;
    @extend .fm-font-weight-regular;
  }

  &__decorators-wrapper {
    width: 70px;
    @include media('tablet', 'max') {
      display: none;
    }

    @extend .flex-column;
    @extend .flex-center;
  }

  &__line {
    border: 1px solid map-get($colors, 1);
  }
}

</style>
