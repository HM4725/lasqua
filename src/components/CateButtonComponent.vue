<template>
  <router-link :to="category">
    <button-component class="cate-button" :value="category"/>
  </router-link>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue'
export default{
  components: {
    ButtonComponent
  },
  props: {
      category: String
  }
}
</script>

<style scoped>
.cate-button {
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  border-color: #333333;
  margin: 0 1rem;
  font-size: 1.5rem;
}
@media (max-width: 767px) {
  .cate-button {
    width: -webkit-calc(6rem + 8vw);
    width: -moz-calc(6rem + 8vw);
    width: calc(6rem + 8vw);
    height: -webkit-calc(6rem + 8vw);
    height: -moz-calc(6rem + 8vw);
    height: calc(6rem + 8vw);
  }
}
</style>