<template>
  <div class="sidebar-wrapper" :class="{open: isOpen}" @click="clickOutside">
    <div class="sidebar">
      <header class="sidebar-header">
        <search-box ref="search" @search="close"/>
      </header>
      <nav class="sidebar-nav">
        <router-button class="nav-button" v-for="(cate, i) in categories" 
          :value="cate" @click="close" :key="`nav_${i}`" :link="`/${cate}`" after/>
      </nav>
      <footer class="sidebar-footer">
        <sidebar-footer/>
      </footer>
    </div>
  </div>
</template>

<script>
import RouterButton from '@/components/buttons/RouterButton.vue'
import SearchBox from '@/components/form/SearchBox.vue'
import SidebarFooter from './SidebarFooter.vue'

const CATEGORIES = ['watcher', 'traveler', 'notice']

export default{
  name: "layout.sidebar",
  components: {
    SearchBox,
    RouterButton,
    SidebarFooter
  },
  data() {
    return {
      categories: CATEGORIES,
      isOpen: false
    }
  },
  methods: {
    open() {
      this.isOpen = true
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.touchAction = 'none'
    },
    close() {
      this.$refs.search.clear()
      this.isOpen = false
      document.documentElement.style.overflow = ''
      document.documentElement.style.touchAction = ''
    },
    clickOutside(e) {
      let el = e.target
      // Close the sidebar, if click outside of it.
      if(el.classList.contains('sidebar-wrapper')) {
        this.close()
      }
    }
  }
}
</script>

<style scoped>
  .sidebar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: -webkit-calc(100 * var(--vh, 1vh));
    height: -moz-calc(100 * var(--vh, 1vh));
    height: calc(100 * var(--vh, 1vh));
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    visibility: hidden;
    opacity: 0;
    transition: all .25s ease-in-out;
  }
  .sidebar-wrapper.open {
    visibility: visible;
    opacity: 1;
  }
  .sidebar {
    position: relative;
    overflow: scroll;
    top: 0;
    left: -288px;
    width: 288px;
    height: 100%;
    background-color: white;
    padding-top: 18vh;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 24px;
    transition: all .45s ease-in-out;
  }
  .sidebar-wrapper.open .sidebar {
    box-shadow: 5px 0 20px 5px rgba(0, 0, 0, 0.5);
    transform: translateX(288px);
  }
  .sidebar-nav > .nav-button {
    width: 100%;
    margin: 8px 0;
  }
  .sidebar-footer {
    position: absolute;
    bottom: 24px;
  }
</style>