<template>
  <div class="findid-page">
    <h1>아이디 찾기 결과</h1>
    <span>{{id}}</span>
  </div>
</template>

<script>
export default{
  name: 'user.findid.page2',
  props: {
    auth: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: '',
    }
  },
  methods: {
    async findId() {
      try {
        const response = await this.$api('POST', `/id/${this.auth}`, 
          {email: this.email})
        const data = response.data
        this.id = data.id
      } catch(error) {
        console.error(error)
      }
    }
  },
  created() {
    if(this.auth === '' || this.email === '') {
      this.$handleWrongAccess('/')
    } else {
      this.findId()
    }
  }
}
</script>

<style scoped>

</style>