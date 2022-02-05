<template>
  <form class="validation-page" @submit.prevent="submit" method="POST">
    <h1>본인확인</h1>
    <div class="message">비밀번호를 입력하세요.</div>
    <input-box id="pwauth-password" type="password" placeholder="비밀번호"
      @input="v=>pw=v" focus/>
    <div v-if="error" class="error">비밀번호가 일치하지 않습니다.</div>
    <footer>
      <default-button class="button" type="submit" value="다음"/>
    </footer>
  </form>
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
  data() {
    return {
      pw: '',
      error: false
    }
  },
  methods: {
    async submit() {
      this.error = false
      const auth = await this.$store.dispatch('validatePassword', {pw: this.pw})
      console.log(this.pw)
      console.log(auth)
      if(auth) {
        this.$router.push({name: this.page, params: {valid: 'true'}})
      } else {
        this.error = true
      }
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
  .validation-page {
    display: flex;
    flex-direction: column;
    margin: auto;
  }
  .validation-page > .message {
    margin-bottom: 1rem;
  }
  .validation-page > .error {
    margin-top: 1rem;
    color: red;
  }
  .validation-page > footer {
    text-align: right;
  }
  .validation-page > footer .button {
    margin: 1rem;
  }
</style>