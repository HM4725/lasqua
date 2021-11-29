<template>
  <transition name="fade" mode="out-in">
    <header class="header-wrapper" ref="header">
      <div class="side">
        <hamburger-icon @click="openSidebar"/>
        <sidebar-layout ref="sidebar"/>
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
import SidebarLayout from './SidebarLayout.vue'
import HamburgerIcon from '../components/icons/HamburgerIcon.vue'


export default {
  name: "HeaderLayout",
  components: {
    SidebarLayout,
    HamburgerIcon
  },
  data() {
    return {
      logoPath: require("@/assets/img/logo.png"),
    }
  },
  methods: {
    openSidebar() {
      this.$refs.sidebar.open()
    }
  }
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
