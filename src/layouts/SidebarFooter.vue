<template>
  <ul class="sidebar-footer-list">
    <template v-if="isLoggedIn">
      <li>
        <router-link class="wide-click" to="/logout" @click="closeSidebar">로그아웃</router-link>
      </li>
    </template>
    <template v-else>
      <li>
        <router-link class="wide-click" to="/login" @click="closeSidebar">로그인</router-link>
      </li>
      <li>
        <router-link class="wide-click" to="/signup" @click="closeSidebar">회원가입</router-link>
      </li>
    </template>
  </ul>
</template>

<script>
export default{
  name: "layout.sidebar.footer",
  computed: {
    isLoggedIn() {
      return this.$store.getters.userId
    }
  },
  methods: {
    closeSidebar() {
      this.$parent.close()
    }
  }
}
</script>

<style scoped>
  ul, li {
    all: unset;
  }
  .sidebar-footer-list li {
    float: left;
    margin-right: 3px;
  }
  .sidebar-footer-list li::before {
    content: "|";
    color: var(--base-color);
    position: relative;
    top: -1px;
    padding-right: 3px;
  }
  .sidebar-footer-list li:first-child::before {
    content: "";
  }
</style>