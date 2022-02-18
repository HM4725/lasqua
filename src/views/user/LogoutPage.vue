<template>
  <div class="logout-page">
    {{msg}}
  </div>
</template>

<script>
export default{
  name: "user.logout.page",
  data() {
    return {
      msg: '로그아웃 중입니다.'
    }
  },
  methods: {
    async logout() {
      this.$store.getters.userId &&
        await this.$store.dispatch("logout")
      this.$router.go(-1)
    }
  },
  mounted() {
    this.logout()
  }
}
</script>

<style scoped>
  @media (max-width: 767px) {
    .logout-page {
      padding: var(--mobile-padding-size);
    }
  }
</style>