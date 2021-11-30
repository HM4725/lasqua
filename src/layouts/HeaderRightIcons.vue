<template>
  <span v-if="isLoggedIn">
    <profile-icon @click="$router.push('myaccount')"/>
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
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>