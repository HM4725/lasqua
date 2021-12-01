<template>
  <div>
    {{info}}
  </div>
</template>

<script>
export default{
  name: "user/MyAccountPage",
  data() {
    return {
      info: {}
    }
  },
  methods: {
    async getUser() {
      const id = this.$store.getters.getUserId
      try {
        const { data } = await this.$api("GET", `/user/${id}/info`)
        this.info = data
      } catch(error) {
        this.info.error = error
      }
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<style scoped>

</style>