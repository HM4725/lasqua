<template>
  <div class="validation-page">
    <h1>본인인증</h1>
    <input-box id="pwauth-password" type="text" placeholder="비밀번호"/>
    <default-button @click="authenticatePassword" value="다음"/>
  </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import InputBox from '@/components/form/InputBox.vue'

export default{
  name: 'user.pwauth.page',
  components: {
    DefaultButton,
    InputBox
  },
  props: {
    page: {
      type: String,
      default: ''
    }
  },
  methods: {
    authenticatePassword() {
      this.$router.push({name: this.page, params: {valid: 'true'}})
    }
  },
  created() {
    if(this.page === '') {
      this.$handleWrongAccess('/')
    }
  }
}
</script>

<style scoped>

</style>