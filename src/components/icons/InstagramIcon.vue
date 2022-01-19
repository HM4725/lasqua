<template>
  <base-icon class="instagram-icon" :size="size" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
  </base-icon>
</template>

<script>
import BaseIcon from './BaseIcon.vue'

export default{
  name: 'components.icons.sns.instagram',
  components: {
    BaseIcon
  },
  props: {
    size: {
     type: Number,
      default: 24
    }
  }
}
</script>

<style scoped>
  .instagram-icon {
    fill: none;
  }
  .instagram-icon > * {
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>