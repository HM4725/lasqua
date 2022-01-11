<template>
  <span v-if="loginUser">
    <profile-icon @click="$router.push(`/artist/${loginUser}`)"/>
  </span>
</template>

<script>
import ProfileIcon from '@/components/icons/ProfileIcon.vue'
export default{
  components: {
    ProfileIcon
  },
  computed: {
    loginUser() {
      return this.$store.getters.userId
    }
  }
}
</script>

<style scoped>
  span {
    display: inline-block;
  }
</style>