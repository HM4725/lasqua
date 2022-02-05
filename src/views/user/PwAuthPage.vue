<template>
  <form class="validation-page" @submit.prevent="submit" method="POST">
    <h1>본인확인</h1>
    <div class="message">비밀번호를 입력하세요.</div>
    <input-box id="pwauth-password" type="password" placeholder="비밀번호"
      @input="v=>pw=v" focus/>
    <div v-if="error" class="error">비밀번호가 일치하지 않습니다.</div>
    <footer>
      <default-button class="button" value="뒤로" @click="cancel"/>
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
      if(auth) {
        this.$router.push({name: this.page, params: {valid: 'true'}})
      } else {
        this.error = true
      }
    },
    cancel() {
      this.$router.push('/user/account')
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
    text-align: left;
    padding-left: 8px;
    margin-bottom: 16px;
  }
  .validation-page > .error {
    margin-top: 16px;
    color: red;
  }
  .validation-page > footer {
    text-align: right;
    padding: 16px 0;
  }
  .validation-page > footer .button {
    margin-left: 16px;
  }
</style>