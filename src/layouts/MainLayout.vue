<template>
  <main class="main-wrapper">
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <component :key="$route.fullPath" :is="Component"></component>
      </transition>
    </router-view>
  </main>
</template>

<script>
export default {
  name: "layout.main",
}
</script>

<style scoped>
  .main-wrapper {
    display: -webkit-box;
    display: flex;
    width: 100%;
    min-height: -webkit-calc(100 * var(--vh, 1vh) - 48px);
    min-height: -moz-calc(100 * var(--vh, 1vh) - 48px);
    min-height: calc(100 * var(--vh, 1vh) - 48px);
    height: auto;
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
