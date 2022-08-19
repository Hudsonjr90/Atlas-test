<template>
  <a
    class="item"
    :href="href"
  >
    <div class="item__content">
      <component class="item__icon" :is="icon" />

      <span
        class="item__text"
        :class="{'item__text--exact': isExact }"
      >
        {{ label }}
      </span>
    </div>
  </a>
</template>

<script>
import FmHomeIcon from "../../icons/FmHomeIcon.vue";
import FmListIcon from "../../icons/FmListIcon.vue";

export default {
  name: 'fm-menu-item',
  components: {
    FmHomeIcon,
    FmListIcon
  },
  props: {
    label: {
      type: String,
      default: 'Menu Item',
      required: true
    },
    href: {
      type: String,
      default: '#',
      required: false
    },
    hash: {
      type: String,
      default: '#'
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExact() {
      return this.href === window.location.pathname
    },
    icon() {
      const icons = {
        home: 'fm-home-icon',
        list: 'fm-list-icon',
      }

      return icons[this.name]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/sass/_flex.scss";
@import "@/sass/_colors.scss";
@import "@/sass/_fonts.scss";
@import "@/sass/_mixins.scss";

.item {
  @include media('tablet', 'min') {
    height: 100%;
  }

  &__content {
    width: 100%;
    min-width: 200px;

    gap: 29px;

    @extend .flex-align-center;

    @include media('tablet', 'min') {
      justify-content: center;
    }
  }

  &__text {
    @extend .fm-text-color-1;
    @extend .fm-font-size-25;
    @extend .fm-font-weight-bold;

    @include media('tablet', 'min') {
      text-align: center;
      font-size: 16px;

      &:not(&--exact) {
        font-weight: 450;
      }
    }
  }

  &__icon {
    @include media('tablet', 'min') {
      display: none;
    }
  }
}
</style>
