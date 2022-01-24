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
  name: "lasqua.app",
  components: {
    HeaderLayout,
    MainLayout
  },
  computed: {
    appStart() {
      return this.$route.path !== "/"
    }
  },
  methods: {
    setFullScreen() {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  },
  created() {
    this.$store.dispatch("validateIdSession")
  },
  mounted() {
    if(this.$isMobile()) {
      this.setFullScreen()
      window.addEventListener('resize', this.setFullScreen)
    }
  },
  beforeUnmount() {
    this.$isMobile() &&
      window.removeEventListener('resize', this.setFullScreen)
  }
}
</script>


<style>
  @import "./assets/css/default.css";
  @import "./assets/css/wide-click.css";

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
