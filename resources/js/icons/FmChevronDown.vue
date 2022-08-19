<template>
  <svg :width="width" :height="height" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.10156 6.45312C5.3125 6.66406 5.66406 6.66406 5.875 6.45312L10.4453 1.90625C10.6562 1.67188 10.6562 1.32031 10.4453 1.10938L9.90625 0.570312C9.69531 0.359375 9.34375 0.359375 9.10938 0.570312L5.5 4.17969L1.86719 0.570312C1.63281 0.359375 1.28125 0.359375 1.07031 0.570312L0.53125 1.10938C0.320312 1.32031 0.320312 1.67188 0.53125 1.90625L5.10156 6.45312Z" fill="#CCCCCC"/>
</svg>
</template>

<script>
export default {
  name: 'fm-home-icon',
  props: {
    width: {
      type: [String, Number],
      default: 11
    },
    height: {
      type: [String, Number],
      default: 7
    },
  }
}
</script>
