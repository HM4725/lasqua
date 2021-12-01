<template>
  <base-icon class="before-icon" :size="size" viewBox="0 0 16 16">
    <polygon points="14,0 14,16 2,8"/>
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
      default: 16
    }
  }
}
</script>

<style scoped>
  .before-icon > * {
    stroke: none;
  }
</style>