<template>
  <router-link :to="option">
    <button-component class="choice-option-button" :value="option"/>
  </router-link>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue'
export default{
  components: {
    ButtonComponent
  },
  props: {
      option: String
  }
}
</script>

<style scoped>
.choice-option-button {
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  border-color: #333333;
  margin: 0 1rem;
  font-size: 1.5rem;
}
@media (max-width: 767px) {
  .choice-option-button {
    width: -webkit-calc(6rem + 8vw);
    width: -moz-calc(6rem + 8vw);
    width: calc(6rem + 8vw);
    height: -webkit-calc(6rem + 8vw);
    height: -moz-calc(6rem + 8vw);
    height: calc(6rem + 8vw);
  }
}
</style>