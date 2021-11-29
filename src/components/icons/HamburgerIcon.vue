<template>
  <base-icon :size="size" viewBox="0 0 24 24">
    <line x1="3" y1="12" x2="21" y2="12" stroke-linecap="round"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
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