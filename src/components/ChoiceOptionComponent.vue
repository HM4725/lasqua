<template>
  <router-link :to="option">
    <button class="choice-option-button btn btn-light fs-4">{{option}}</button>
  </router-link>
</template>

<script>
export default{
  props: {
      option: String
  }
}
</script>

<style scoped>
.choice-option-button {
  width: 10rem;
  height: 10rem;
  color: #333333;
  border: 1px solid #333333;
  border-radius: 100%;
  text-align: center;
  margin: 1rem;
}
.choice-option-button:hover {
  color: #999999;
}
</style>