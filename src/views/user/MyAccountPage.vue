<template>
  <div>
    {{info}}
  </div>
</template>

<script>
export default{
  data() {
    return {
      info: {}
    }
  },
  methods: {
    async getUser() {
      const id = this.$store.getters.getUserId
      const { data } = await this.$api("GET", `/user/${id}/info`)
      this.info = data
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<style scoped>

</style>