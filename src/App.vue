<template>
  <div class="wrapper">
    <header-layout v-show="appStart"/>
    <main-layout/>
  </div>
</template>

<script>
import HeaderLayout from './layouts/HeaderLayout.vue'
import MainLayout from './layouts/MainLayout.vue'

export default {
  name: "laSquaApp",
  components: {
    HeaderLayout,
    MainLayout
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
:root {
  --base-color: black;
  --active-color: rgba(0, 0, 0, 0.25);
  --active-bg-color: #dddddd;
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
  color: var(--base-color);
  height: 100%;
  line-height: 1.5;
}
a {
  all: unset;
  color: var(--base-color);
  text-decoration: none;
}
a:hover {
  color: var(--active-color);
  cursor: pointer;
}
a:active {
  color: var(--active-color);
}
ul, li {
  all: unset;
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
