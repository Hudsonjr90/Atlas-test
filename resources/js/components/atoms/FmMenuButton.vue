<template>
  <div
    class="button"
    :class="{ 'button--active': isShowMenu }"
    @click="handleClick"
  >
    <span />
    <span />
    <span />
  </div>
</template>

<script>
export default {
  name: "fm-menu-button",
  props: {
    isShowMenu: {
      type: Boolean,
      defalt: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('update:is-show-menu', !this.isShowMenu)
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  &,
  span {
    transition: 1s ease;
  }

  span {
    width: 25px;
    border: 1.5px solid #ffffff;
    background: #ffffff;
  }

  &--active {
    span:nth-child(1) {
      transform:
        rotate(35deg)
        translate3d(4px, 5px, 0);
    }

    span:nth-child(2) {
      opacity: 0;
    }

    span:nth-child(3) {
      transform:
        rotate(-35deg)
        translate3d(3px, -6px, 0);
    }
  }
}
</style>
