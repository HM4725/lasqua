<template>
  <base-icon class="after-icon" :size="size" viewBox="0 0 24 24">
    <path d="M21 12l-18 12v-24z"/>
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
  .after-icon > * {
    stroke: none;
  }
</style>