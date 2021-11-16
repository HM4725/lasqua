<template>
  <router-link :to="option">
    <div class="choice-option-button">
      <span class="fs-4">{{option}}</span>
    </div>
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
  border: 1px solid black;
  border-radius: 100%;
  text-align: center;
  line-height: 10rem;
  margin: 1rem;
}
</style>