<template>
  <div class="logout">
    {{msg}}
  </div>
</template>

<script>
export default{
  data() {
    return {
      msg: '로그아웃 중입니다.'
    }
  },
  methods: {
    async logout() {
      this.$store.getters.isLoggedIn &&
      await this.$store.dispatch("logout") &&
      console.log('logout success')

      this.$router.go(-1)
    }
  },
  mounted() {
    this.logout()
  }
}
</script>

<style scoped>

</style>