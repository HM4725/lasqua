<template>
  <div class="message-page">
    <p v-if="message">{{message}}</p>
    <p>{{time}}초 후 이동합니다.</p>
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
      time: 2
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
    margin-bottom: 1.5rem;
  }
</style>