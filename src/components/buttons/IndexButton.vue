<template>
  <router-button class="index-button" :link="category" :value="category"/>
</template>

<script>
import RouterButton from './RouterButton.vue'

export default{
  name: 'components.buttons.index',
  components: {
    RouterButton
  },
  props: {
    category: String
  }
}
</script>

<style scoped>
.index-button {
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  margin: 0 1rem;
  font-size: 1.5rem;
}
@media (max-width: 767px) {
  .index-button {
    width: -webkit-calc(6rem + 8vw);
    width: -moz-calc(6rem + 8vw);
    width: calc(6rem + 8vw);
    height: -webkit-calc(6rem + 8vw);
    height: -moz-calc(6rem + 8vw);
    height: calc(6rem + 8vw);
  }
}
</style>