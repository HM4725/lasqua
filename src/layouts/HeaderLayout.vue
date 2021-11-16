<template>
  <div class="nav-button">|||</div>
  <router-link to="/"><img class="logo" :src="logoPath"/></router-link>
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      logoPath: require("@/assets/logo.png"),
    }
  },
  mounted() {
    console.log(this.logoSrc)
  }
}
</script>

<style scoped>
  .header {
    width: 100vw;
    height: 3rem;
    border-bottom: 1px solid #cccccc;
  }
  .nav-button {
    position: absolute;
    padding: 1rem;
    top: 0;
    left: 0;
  }
  .logo {
    height: 100%;
  }
</style>
