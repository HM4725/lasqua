<template>
  <div class="wrapper">
    <header-layout v-show="appStart"/>
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
  },
  computed: {
    appStart() {
      return this.$route.path !== "/"
    }
  }
}
</script>


<style>
*, :after, :before {
  box-sizing: border-box;
}
html, body {
  height: 100% !important;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  height: 100%;
  line-height: 1.5;
}
a {
  color: #333333 !important;
  text-decoration: none !important;
}
ul {
  list-style-type: none !important;
  padding: 0 !important;
}
button, input, optgroup, select, textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
