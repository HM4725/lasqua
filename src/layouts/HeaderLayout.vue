<template>
  <div class="header-wrapper">
    <ul class="left-icons">
      <li>|||</li>
    </ul>
    <div class="center-icon">
      <router-link to="/">
        <img class="logo" :src="logoPath"/>
      </router-link>
    </div>
    <ul class="right-icons">
      <li>①</li>
      <li>②</li>
      <li>③</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HeaderLayout",

  data() {
    return {
      logoPath: require("@/assets/logo.png"),
    }
  },
}
</script>

<style scoped>
  .header-wrapper {
    display: flex;
    width: 100%;
    height: 4rem;
    border-bottom: 1px solid #aaaaaa;
    justify-content: space-between;
  }
  .left-icons {
    width: 10rem;
  }
  .left-icons > li {
    float: left;
  }
  .center-icon {
    height: 100%;
    width: 10rem;
  }
  .right-icons {
    width: 10rem;
  }
  .right-icons > li {
    float: right;
  }
  .logo {
    height: 100%;
  }
</style>
