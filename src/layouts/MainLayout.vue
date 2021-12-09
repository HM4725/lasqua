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
    margin: auto;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 2rem 3rem;
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
