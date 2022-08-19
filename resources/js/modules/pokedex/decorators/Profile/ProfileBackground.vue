<template>
  <svg
    preserveAspectRatio="none"
    viewBox="0 0 320 216"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :class="`pokemon-color__icon--${mainPokemonType}`"
      d="M-2 58.9695C-2 58.9695 62.0227 1.83396 87.1789 0.0390214C112.335 -1.75591 198.495 58.9695 198.495 58.9695H320V200H-2V58.9695Z"
      fill-opacity="0.51"
    ></path>
    <path
      :class="`pokemon-color__icon--${mainPokemonType}`"
      d="M-1 74.9695C-1 74.9695 62.8238 17.834 87.9019 16.039C112.98 14.2441 198.873 74.9695 198.873 74.9695H320V216H-1V74.9695Z"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "profile-background",
  props: {
    mainPokemonType: {
      type: String,
      required: true,
    },
  },
};
</script>
