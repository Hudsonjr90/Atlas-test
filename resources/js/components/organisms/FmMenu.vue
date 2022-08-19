<template>
  <nav
    class="menu"
    :class="{'menu--active': isShowMenu}"
  >
    <fm-menu-logo class="menu__logo" />

    <fm-menu-button
      class="menu__button"
      :is-show-menu.sync="isShowMenu"
    />

    <div class="menu__items" @click="isShowMenu = false">
      <div class="menu__container">
        <fm-menu-item
          v-for="(item, index) in menuItems"
          :key="`${index}-${item}`"
          :label="item.label"
          :href="item.path"
          :hash="item.id"
          :name="item.name"
          class="menu__item"
          :class="`menu__item--${item.name}`"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import FmMenuItem from  '../atoms/FmMenuItem.vue'
import FmMenuLogo from  '../atoms/FmMenuLogo.vue'
import FmMenuButton from  '../atoms/FmMenuButton.vue'

export default {
  name: 'fm-menu',
  components: {
    FmMenuItem,
    FmMenuLogo,
    FmMenuButton
  },
  data () {
    return {
      menuItems: [
        {
          label: 'Home',
          path: '/',
          id: 'home',
          name: 'home',
        },
        {
          label: 'Lista',
          path: '/list',
          id: 'list',
          name: 'list',
        },
      ],
      isShowMenu: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/sass/_flex.scss";
@import "@/sass/_colors.scss";
@import "@/sass/_mixins.scss";
@import "@/sass/_container.scss";

@keyframes show-menu {
  0% {
    transform: translate3d(50px, 0, 0);
    opacity: 0;
  }
  80% {
    opacity: 0;
  }
  100% {
    transform: translate3d( 0, 0, 0);
  }
}

.menu {
  @extend .pokeatlas-container;

  @extend .flex-space-between;
  @extend .flex-center-center;

  position: relative;
  width: auto;
  height: 60px;

  margin: 0 auto;
  padding: 0 20px;

  @include media('tablet', 'min') {
    padding: 20px 0;
  }

  &__logo, &__button {
    z-index: 101;
  }

  &__button {
    @include media('tablet', 'min') {
      display: none !important;
    }
  }

  &__items {
    height: 35px;

    display: flex;
    justify-content: space-between;

    @include media('mobile', 'max') {
      top: 0;
      left: 0;

      position: fixed;

      width: 100vw;
      height: 100%;

      z-index: 100;
      background-color: #2C2C2D;

      transform: translate3d(100vw, 0, 0);
      transition: ease 1s;

      .menu--active & {
        transform: translate3d(0, 0, 0);
      }
    }

    .menu__container {
      display: flex;
      gap: 10px;

      @include media('mobile', 'max') {
        margin-top: 100px;

        width: 100%;
        gap: 30px;
        flex-direction: column;
      }
    }
  }

  &__item {
    display: flex;

    gap: 10px;
    flex-direction: row;

    @include media('mobile', 'max') {
      gap: 30px;
      flex-direction: column;

      width: 100%;
      padding: 0 30px;
    }

    &:nth-child(odd) {
      &:after {
        content: '';
        border: 1px solid map-get($colors, 1);

        height: 33px;

        @include media('mobile', 'max') {
          height: initial;
          margin: 0 50px;
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
