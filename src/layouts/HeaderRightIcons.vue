<template>
  <span v-if="isLoggedIn">
    <profile-icon @click="$router.push('/mypage')"/>
  </span>
</template>

<script>
import ProfileIcon from '@/components/icons/ProfileIcon.vue'
export default{
  components: {
    ProfileIcon
  },
  computed: {
    isLoggedIn() {
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