<template>
  <div>
    <p>{{message}}</p>
    <p>{{time}}초 후 이동합니다.</p>
  </div>
</template>

<script>
export default{
  data() {
    return {
      message: '',
      time: 3
    }
  },
  mounted() {
    this.message = this.$route.params.message
    setTimeout(() => {
      this.$router.push(this.$route.params.redirect)
    }, this.time * 1000)
  }
}
</script>

<style scoped>

</style>