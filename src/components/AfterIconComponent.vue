<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24">
    <path d="M21 12l-18 12v-24z"/>
  </svg>
</template>

<script>
export default{
  props: {
    size: {
      type: Number,
      default: 16
    }
  }
}
</script>