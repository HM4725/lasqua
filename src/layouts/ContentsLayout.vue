<template>
  <div class="contents-wrapper">
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: "ContentsLayout"
}
</script>

<style scoped>
.contents-wrapper {
  display: -webkit-box;
  display: flex;
  width: 100%;
  margin: auto;
  -webkit-box-pack: center;
  justify-content: center;
}
</style>
