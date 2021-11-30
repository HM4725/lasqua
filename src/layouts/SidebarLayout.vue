<template>
  <div class="sidebar-wrapper" :class="{open: isOpen}" @click="clickOutside">
    <div class="sidebar">
      <header class="sidebar-header">
        <search-box ref="search"/>
      </header>
      <nav class="sidebar-nav">
        <router-button class="nav-button" @click="close" v-for="(cate, i) in categories" :key="i" :link="cate" after/>
      </nav>
      <footer class="sidebar-footer">
        <sidebar-footer/>
      </footer>
    </div>
  </div>
</template>

<script>
import RouterButton from '@/components/common/RouterButton.vue'
import SearchBox from '@/components/common/SearchBox.vue'
import SidebarFooter from './SidebarFooter.vue'

const CATEGORIES = ['watcher', 'traveler', 'notice']

export default{
  name: "SidebarLayout",
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
    },
    close() {
      this.$refs.search.clear()
      this.isOpen = false
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
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
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
  .sidebar-wrapper.open .sidebar {
    box-shadow: 5px 0 20px 5px rgba(0, 0, 0, 0.2);
    transform: translateX(18rem);
  }
  .sidebar-nav > .nav-button {
    width: 100%;
    margin: .5rem 0;
  }
  .sidebar-footer {
    position: absolute;
    bottom: 1.5rem;
  }
</style>