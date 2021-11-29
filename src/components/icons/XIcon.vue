<template>
  <base-icon class="x-icon" :size="size">
    <line x1="0" y1="0" x2="100%" y2="100%"/>
    <line x1="0" y1="100%" x2="100%" y2="0"/>
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
      default: 32
    }
  }
}
</script>

<style scoped>
.x-icon {
  cursor: default;
}
</style>