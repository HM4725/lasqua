<template>
  <div>
    <div class="header">
      <header-layout/>
    </div>
    <div class="content align-middle">
      <router-view/>
    </div>
  </div>
</template>

<script>
import HeaderLayout from './layouts/HeaderLayout.vue'

export default {
  components: {
    HeaderLayout,
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  width: 100vw;
  min-height: 100vh;
}
a {
  color: #333333 !important;
  text-decoration: none !important;
}
.header {
  width: 100vw;
  height: 3rem;
  border-bottom: 1px solid #cccccc;
}
.content {
  display: table-cell;
  width: 100vw;
  height: calc(100vh - 3rem);
  justify-content: center;
  align-items: center;
}
</style>
