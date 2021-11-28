<template>
  <!-- Always visible -->
  <div class="sidebar-icon">
    <hamburger-icon @click="open"/>
  </div>
  <!-- Visible if button clicked -->
  <div class="sidebar-wrapper" :class="{open: isOpen}" @click="clickOutside">
    <div class="sidebar">
      <header class="sidebar-header">
        <search-box ref="search"/>
      </header>
      <nav class="sidebar-nav">
        <router-button class="nav-button" @click="close" v-for="(cate, i) in categories" :key="i" :link="cate" after/>
      </nav>
      <footer class="sidebar-footer">
        <ul>
          <li><router-link to="/login">로그인</router-link></li>
          <li><router-link to="/login">회원가입</router-link></li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script>
import RouterButton from './common/RouterButton.vue'
import HamburgerIcon from './icons/HamburgerIcon.vue'
import SearchBox from './common/SearchBox.vue'

export default{
  components: {
    HamburgerIcon,
    SearchBox,
    RouterButton
  },
  data() {
    return {
      categories: ['watcher', 'traveler', 'notice'],
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
  .sidebar-footer li {
    padding: .5rem 0 .5rem .5rem;
  }
  .sidebar-footer li:last-of-type {
    padding: .5rem;
  }
  .sidebar-footer li:not(:last-of-type):after {
    content: '';
    margin-left: .5rem;
    border-right: 1px solid var(--base-color);
  }
  .sidebar-footer li:active {
    background-color: var(--active-bg-color);
  }
</style>