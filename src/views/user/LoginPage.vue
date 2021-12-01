<template>
  <div class="login">
    <p class="f-title">la squadra di blu</p>
    <p>
      라스콰드라 디 블루에 속한<br>
      아티스트와 기업을 위한 페이지입니다.<br>
      제휴 희망시, 회원가입을 먼저 진행해주세요.
    </p>
    <form class="login-form">
      <div class="login-wrapper">
        <div class="login-info">
          <input-box class="info-box" type="text" id="id" placeholder="아이디" autocomplete="username" ref="id"/>
          <input-box class="info-box" type="password" id="pw" placeholder="비밀번호" autocomplete="current-password" ref="pw"/>
        </div>
        <default-button class="login-button" @click="login" type="submit" value="로그인"/>
      </div>
      <div v-show="error" class="error-message">
        아이디 또는 비밀번호가 잘못 입력 되었습니다.<br>
        <strong>아이디</strong>와 <strong>비밀번호</strong>를 정확히 입력해 주세요.
      </div>
    </form>
  </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import InputBox from '@/components/form/InputBox.vue'

export default{
  name: 'SignInView',
  components: {
    DefaultButton,
    InputBox
  },
  data() {
    return {
      id: '',
      pw: '',
      error: false,
    }
  },
  methods: {
    async login(e) {
      e.preventDefault()
      this.error = false;
      const info = {id: this.$refs.id.getValue(), pw: this.$refs.pw.getValue()}
      const result = await this.$store.dispatch("login", info)
      if(result === "success") {
        const redirect = this.$route.query.redirect
        if(redirect) {
          this.$router.push(redirect)
        } else {
          this.$router.go(-1)
        }
      } else {
        this.$refs.id.occurError();
        this.$refs.pw.occurError();
        this.error = true
      }
    },
  },
}
</script>

<style scoped>
  .login-wrapper {
    display: flex;
    justify-content: space-evenly;
    width: 20rem;
  }
  .login-info {
    width: 10rem;
  }
  .info-box {
    width: 100%;
    margin: 3px;
  }
  .error-message {
    color: red;
  }
</style>