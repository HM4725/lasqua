<template>
  <div>
    
  </div>
</template>

<script>
export default{
  name: 'utils.test.page',
  methods: {
    async test() {
      try {
        const id = this.$store.getters.userId
        const response = await this.$api("GET", `/user/${id}/info`)
        console.log(response.data)
      } catch(error) {
        console.error(error)
      }
    },
  },
  mounted() {
    this.test() 
  }
}
</script>

<style scoped>

</style>