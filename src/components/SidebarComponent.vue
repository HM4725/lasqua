<template>
  <!-- Always visible -->
  <div class="sidebar-icon">
    <hamburger-button-component @click="toggle" ref="icon"/>
  </div>
  <!-- Visible if button clicked -->
  <div class="sidebar" :class="{open: isOpen}" @click="clickOutside">
    <div class="sidebar-menu">
      <div class="sidebar-header">
        <search-box-component/>
      </div>
      <div class="sidebar-nav">
        <nav>
          <sidebar-cate-button-component v-for="(cate, i) in categories" :key="i" :link="cate"/>
        </nav>
      </div>
      <div class="sidebar-footer">
        <sidebar-footer-component/>
      </div>
    </div>
  </div>
</template>

<script>
import HamburgerButtonComponent from './HamburgerButtonComponent.vue'
import SearchBoxComponent from './SearchBoxComponent.vue'
import SidebarCateButtonComponent from './SidebarCateButtonComponent.vue'
import SidebarFooterComponent from './SidebarFooterComponent.vue'

export default{
  components: {
      HamburgerButtonComponent,
      SearchBoxComponent,
      SidebarCateButtonComponent,
      SidebarFooterComponent
  },
  data() {
    return {
      categories: ['watcher', 'traveler', 'notice'],
      isOpen: false
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    close() {
      this.$refs.icon.inactivate()
      this.isOpen = false
    },
    clickOutside(e) {
      let el = e.target
      // Close the sidebar, if click outside of it.
      if(el.classList.contains('sidebar')) {
        this.close()
      }
    }
  }
}
</script>

<style scoped>
  .sidebar-icon {
    position: relative;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
    visibility: hidden;
    opacity: 0;
    transition: all .25s ease-in-out;
  }
  .sidebar.open {
    visibility: visible;
    opacity: 1;
  }
  .sidebar-menu {
    position: relative;
    top: 0;
    left: -18rem;
    width: 18rem;
    height: 100%;
    background-color: white;
    padding-top: 18vh;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 1.5rem;
    transition: all .45s ease-in-out;
  }
  .sidebar.open .sidebar-menu {
    box-shadow: 5px 0 20px 5px rgba(0, 0, 0, 0.2);
    transform: translateX(18rem);
  }
  .sidebar-footer {
    position: absolute;
    bottom: 1.5rem;
  }
</style>