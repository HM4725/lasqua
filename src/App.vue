<template>
  <div class="wrapper">
    <header-layout/>
    <contents-layout/>
  </div>
</template>

<script>
import HeaderLayout from './layouts/HeaderLayout.vue'
import ContentsLayout from './layouts/ContentsLayout.vue'

export default {
  name: "laSquaApp",
  components: {
    HeaderLayout,
    ContentsLayout
  }
}
</script>


<style>
html, body {
  height: 100% !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  height: 100%;
}
a {
  color: #333333 !important;
  text-decoration: none !important;
}
ul {
  list-style-type: none !important;
  padding: 0 !important;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
