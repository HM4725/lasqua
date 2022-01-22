<template>
  <div>
    
  </div>
</template>

<script>
export default{
  name: 'utils.test.page',
  methods: {
    async test() {
        const response = await this.$api("GET", `/user/${id}/info`)
        console.log(response.data)
    },
  },
  mounted() {
    
  }
}
</script>

<style scoped>

</style>