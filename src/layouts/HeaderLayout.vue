<template>
  <transition name="fade" mode="out-in">
    <header class="header-wrapper" ref="header">
      <div class="side">
        <sidebar-component/>
      </div>
      <div class="middle">
        <router-link to="/">
          <div class="logo-wrapper">
            <img class="logo" :src="logoPath"/>
          </div>
        </router-link>
      </div>
      <div class="side">
        <span>①</span>
        <span>②</span>
        <span>③</span>
      </div>
    </header>
  </transition>
</template>

<script>
import SidebarComponent from '../components/SidebarComponent.vue'
export default {
  name: "HeaderLayout",
  components: {
    SidebarComponent
  },
  data() {
    return {
      logoPath: require("@/assets/img/logo.png"),
    }
  },
}
</script>

<style scoped>
  .header-wrapper {
    display: flex;
    width: 100%;
    height: 48px;
    border-bottom: 1px solid #aaaaaa;
    justify-content: space-between;
    align-items: center;
  }
  .side {
    width: 6rem;
    padding: 0 1rem;
  }
  .middle {
    width: 8rem;
    height: 80%;
  }
  .logo-wrapper {
    height: 100%;
  }
  .logo-wrapper:active {
    background-color: var(--active-bg-color);
  }
  .middle .logo {
    height: 100%;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s ease;
  }
  .fade-enter-from,
  .fade-leave-active {
    opacity: 0;
  }
</style>
