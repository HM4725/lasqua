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
      return this.$route.name !== "index.logout"
    }
  }
}
</script>


<style>
  @import "./assets/css/default.css";
  @import "./assets/css/wide-click.css";
  @import "./assets/css/font.css";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--base-color);
    height: 100%;
    line-height: 1.5;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
</style>
