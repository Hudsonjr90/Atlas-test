<template>
  <div
    class="select"
    :class="{'select--active': active}"
    @click="active = !active"
  >
    <input
      class="select__element"
      :placeholder="placeholder"
      :value="data"
      disabled
    >

    <div class="select__options-wrapper">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="select__option"
        :class="{'select__option--active': option === data}"
        @click="handleOption(option)"
      >
        <div class="select__option-content">
          <img
            :alt="`Pokemon type:${option}`"
            :src="`/images/pokemon-types/${option}.png`"
          >
          <span>{{ option }}</span>
        </div>
      </div>
    </div>

    <component
      v-if="mappedIcon"
      class="select__icon"
      :is="mappedIcon"
    />
  </div>
</template>

<script>
import FmMagnifier from '../../icons/FmMagnifier'
import FmChevronDown from '../../icons/FmChevronDown'

export default {
  name: 'fm-select',
  components: {
    FmMagnifier,
    FmChevronDown,
  },
  props: {
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      defualt: null
    },
    icon: {
      type: String,
      defualt: null
    },
    type: {
      type: String,
      defualt: 'text'
    },
    options: {
      type: Array,
      defualt: () => []
    }
  },
  data() {
    return {
      active: false,
      data: this.value,
    }
  },
  computed: {
    mappedIcon() {
      const icons = {
        'chevron-down': 'FmChevronDown',
        'magnifier': 'FmMagnifier',
      }

      return icons[this.icon] || null
    }
  },
  methods: {
    handleOption(selected) {
      let value = selected

      if (this.data === value) {
        value = null
      }

      this.data = value
      this.$emit('input', value)
    },
    hideOptions() {
      this.active = false
      console.log(this.active);
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  position: relative;

  display: flex;
  align-items: center;

  &__element {
    width: 100%;
    border: none;
    padding: 8px 18px;
    line-height: 12px;
    font-size: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: #FFFFFF;
    border: 1px solid #CCCCCC;

    border-radius: 20px;

    .select--active & {
      border-radius: 15px 15px 0 0;
    }

    &::placeholder {
      color: #cccccc;
    }

    &:focus-visible,
    &:active {
      outline: unset;
    }
  }

  &__options-wrapper {
    z-index: 3;
    position: absolute;
    top: 94%;
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-top: none;
    border-radius: 0 0 20px 20px;
    display: none;

    .select--active & {
      display: initial;
    }
  }

  &__option {
    cursor: pointer;
    height: 25px;
    padding: 0 20px;
    color: #cccccc;

    display: flex;
    align-items: center;

    &--active, &:hover {
      color: #000000;
    }

    &-content {
      display: flex;
      gap: 5px;

      img {
        width: 18px;
      }
    }
  }

  &__icon {
    position: absolute;
    right: 10px;

    height: 14px;
    width: 12px;
    transition: transform 0.5s ease;

    .select--active & {
      transform: rotate(180deg)
    }
  }
}
</style>
