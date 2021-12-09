<template>
  <base-icon class="close-icon" :size="size" viewBox="0 0 24 24">
    <line x1="6" y1="6" x2="18" y2="18"/>
    <line x1="6" y1="18" x2="18" y2="6"/>
  </base-icon>
</template>

<script>
import BaseIcon from './BaseIcon.vue'

export default{
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
  line {
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }
</style>