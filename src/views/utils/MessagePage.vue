<template>
  <div>
    <p>{{message}}</p>
    <p>{{time}}초 후 이동합니다.</p>
  </div>
</template>

<script>
// [How To Use]
// this.$router.push({
//   name: 'message',
//   params: {
//     message: "${msg}",
//     redirect: "${path}"
//   }
// })
export default{
  data() {
    return {
      message: '',
      time: 2
    }
  },
  mounted() {
    if(this.$route.params.redirect) {
      this.message = this.$route.params.message
      setTimeout(() => {
        this.$router.push({path: this.$route.params.redirect})
      }, this.time * 1000)
    } else {
      this.$router.replace({path: '/'})
    }
  }
}
</script>

<style scoped>

</style>