<template>
  <transition name="fade" mode="out-in">
    <header class="header-wrapper" ref="header">
      <div class="side left">
        <hamburger-icon class="wide-click" @click="openSidebar"/>
        <sidebar-layout ref="sidebar"/>
      </div>
      <div class="middle">
        <img  @click="$router.push('/')" class="logo wide-click" :src="logoPath"/>
      </div>
      <div class="side right">
        <span>①</span>
        <span>②</span>
        <span>③</span>
      </div>
    </header>
  </transition>
</template>

<script>
import SidebarLayout from './SidebarLayout.vue'
import HamburgerIcon from '@/components/icons/HamburgerIcon.vue'

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
    justify-content: space-between;
    align-items: center;
  }
  .side {
    width: 80px;
    padding: 0 16px;
  }
  .side.left {
    text-align: left;
    height: 32px;
  }
  .middle {
    width: 150px;
    height: 100%;
  }
  .middle > .logo {
    height: 40px;
  }
  .side.right {
    text-align: right;
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
