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
        <header-right-icons/>
      </div>
    </header>
  </transition>
</template>

<script>
import SidebarLayout from './SidebarLayout.vue'
import HamburgerIcon from '@/components/icons/HamburgerIcon.vue'
import HeaderRightIcons from './HeaderRightIcons.vue'

export default {
  name: "layout.header",
  components: {
    SidebarLayout,
    HamburgerIcon,
    HeaderRightIcons
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
    height: 32px;
    padding: 0 16px;
  }
  .side.left {
    text-align: left;
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
