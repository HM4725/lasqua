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
  width: 160px;
  height: 160px;
  border-radius: 100%;
  margin: 0 16px;
  font-size: 1.5rem;
}
@media (max-width: 767px) {
  .index-button {
    width: -webkit-calc(96px + 8vw);
    width: -moz-calc(96px + 8vw);
    width: calc(96px + 8vw);
    height: -webkit-calc(96px + 8vw);
    height: -moz-calc(96px + 8vw);
    height: calc(96px + 8vw);
  }
}
</style>