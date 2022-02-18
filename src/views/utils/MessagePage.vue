<template>
  <div class="message-page">
    <p v-if="message">{{message}}</p>
    <p>잠시 후 이동합니다.</p>
  </div>
</template>

<script>
export default{
  name: 'utils.message.page',
  props: {
    message: String,
    redirect: String
  },
  data() {
    return {
      time: 1.5
    }
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({
        path: this.redirect || '/',
        query: this.$route.query
      })
    }, this.time * 1000)
  }
}
</script>

<style scoped>
  .message-page > p:first-child {
    margin-bottom: 24px;
  }
  @media (max-width: 767px) {
    .message-page {
      padding: var(--mobile-padding-size);
    }
  }
</style>