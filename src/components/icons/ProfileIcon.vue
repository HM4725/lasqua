<template>
  <base-icon class="profile-icon" :size="size" viewBox="0 0 600 600">  
    <circle cx="300" cy="300" r="265" />
    <circle cx="300" cy="230" r="115" />	
    <path d="M106.81863443903,481.4 a205,205 1 0,1 386.36273112194,0" stroke-linecap="butt" />
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
  .profile-icon {
    fill: none;
    stroke-width: 30;
  }
</style>