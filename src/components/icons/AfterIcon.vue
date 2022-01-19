<template>
  <base-icon class="after-icon" :size="size" viewBox="0 0 16 16">
    <polygon points="2,0 2,16 14,8"/>
  </base-icon>
</template>

<script>
import BaseIcon from './BaseIcon.vue'

export default{
  name: 'components.icons.after',
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