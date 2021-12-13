<template>
  <main class="main-wrapper">
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </main>
</template>

<script>
export default {
  name: "MainLayout"
}
</script>

<style scoped>
  .main-wrapper {
    display: -webkit-box;
    display: flex;
    width: 100%;
    height: 100%;
    -webkit-box-pack: center;
  }
  .main-wrapper > div {
    margin: auto;
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
