<template>
  <div class="input">
    <input
      class="input__element"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="handleInput"
    />

    <component
      v-if="mappedIcon"
      class="input__icon"
      :is="mappedIcon"
    />
  </div>
</template>

<script>
import FmMagnifier from '../../icons/FmMagnifier'
import FmChevronDown from '../../icons/FmChevronDown'

export default {
  name: 'fm-input',
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
    handleInput({ target }) {
      this.$emit('input', target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  position: relative;

  display: flex;
  align-items: center;

  &__element {
    width: 100%;
    border: none;
    padding: 8px 18px;
    border-radius: 100px;
    line-height: 12px;
    font-size: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: #FFFFFF;
    border: 1px solid #CCCCCC;

    &::placeholder {
      color: #cccccc;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type=number] {
      -moz-appearance:textfield; /* Firefox */
    }

    &:focus-visible,
    &:active {
      outline: unset;
    }
  }

  &__icon {
    position: absolute;
    right: 10px;

    height: 14px;
    width: 12px;
  }
}
</style>
