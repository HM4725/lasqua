<template>
  <router-link :to="link">
    <button-component class="nav-button" @click="closeSidebar" :value="link"/>
  </router-link>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue'

export default{
  props: {
    link: String
  },
  components: {
    ButtonComponent
  },
  methods: {
    closeSidebar() {
      this.$parent.close()
    }
  }
}
</script>

<style scoped>
  .nav-button {
    width: 100%;
    margin: .5rem 0;
    display: inline-flex;
    justify-content: flex-start;
  }
</style>